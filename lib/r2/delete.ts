import { S3Client, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export interface DeleteResult {
  success: boolean
  error?: string
  r2Key: string
}

/**
 * Verifies if an object exists in R2 bucket
 */
export async function checkObjectExists(r2Key: string): Promise<boolean> {
  try {
    await r2Client.send(
      new HeadObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: r2Key,
      })
    )
    return true
  } catch (error: unknown) {
    const err = error as { name?: string }
    if (err.name === "NotFound" || err.name === "NoSuchKey") {
      return false
    }
    // Re-throw other errors (network issues, auth problems, etc.)
    throw error
  }
}

/**
 * Deletes an object from R2 bucket with comprehensive error handling
 */
export async function deleteFromR2(r2Key: string): Promise<boolean> {
  const startTime = Date.now()

  try {
    // Validate r2Key
    if (!r2Key || typeof r2Key !== "string" || r2Key.trim() === "") {
      console.error(`[R2 Delete] Invalid r2_key provided: "${r2Key}"`)
      return false
    }

    console.log(`[R2 Delete] Attempting to delete: ${r2Key}`)

    // Send delete command
    const response = await r2Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: r2Key,
      })
    )

    const duration = Date.now() - startTime
    console.log(`[R2 Delete] Successfully deleted: ${r2Key} (${duration}ms)`)

    return true
  } catch (error: unknown) {
    const duration = Date.now() - startTime
    const err = error as { name?: string; message?: string; $metadata?: { httpStatusCode?: number } }

    console.error(`[R2 Delete] Failed to delete ${r2Key} from R2 (${duration}ms):`, {
      name: err.name,
      message: err.message,
      statusCode: err.$metadata?.httpStatusCode,
    })

    return false
  }
}

/**
 * Deletes an object with retry logic
 */
export async function deleteFromR2WithRetry(
  r2Key: string,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<DeleteResult> {
  let lastError: string | undefined

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[R2 Delete] Attempt ${attempt}/${maxRetries} for: ${r2Key}`)

      const success = await deleteFromR2(r2Key)

      if (success) {
        return { success: true, r2Key }
      }

      lastError = `Deletion returned false on attempt ${attempt}`
    } catch (error: unknown) {
      const err = error as Error
      lastError = err.message || "Unknown error"
      console.error(`[R2 Delete] Attempt ${attempt} failed:`, lastError)
    }

    // Wait before retry (exponential backoff)
    if (attempt < maxRetries) {
      const waitTime = delayMs * Math.pow(2, attempt - 1)
      console.log(`[R2 Delete] Waiting ${waitTime}ms before retry...`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }

  return {
    success: false,
    error: `Failed after ${maxRetries} attempts: ${lastError}`,
    r2Key,
  }
}

/**
 * Batch delete multiple objects from R2
 */
export async function deleteMultipleFromR2(
  r2Keys: string[]
): Promise<{ succeeded: string[]; failed: DeleteResult[] }> {
  const succeeded: string[] = []
  const failed: DeleteResult[] = []

  // Process in parallel with concurrency limit
  const concurrencyLimit = 5
  const chunks: string[][] = []

  for (let i = 0; i < r2Keys.length; i += concurrencyLimit) {
    chunks.push(r2Keys.slice(i, i + concurrencyLimit))
  }

  for (const chunk of chunks) {
    const results = await Promise.all(
      chunk.map(async (key) => {
        const result = await deleteFromR2WithRetry(key, 2, 500)
        return result
      })
    )

    for (const result of results) {
      if (result.success) {
        succeeded.push(result.r2Key)
      } else {
        failed.push(result)
      }
    }
  }

  console.log(`[R2 Delete] Batch complete: ${succeeded.length} succeeded, ${failed.length} failed`)

  return { succeeded, failed }
}
