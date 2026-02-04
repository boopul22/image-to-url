import { getCloudflareContext } from "@opennextjs/cloudflare"
import {
  getMissingR2Env,
  getR2Env,
  R2_REQUIRED_PUBLIC_KEYS,
  R2_REQUIRED_STORAGE_KEYS,
  R2_REQUIRED_UPLOAD_KEYS,
  type R2Env,
} from "@/lib/r2/env"

type R2BucketLike = {
  put: (
    key: string,
    value: ArrayBuffer | Blob | ReadableStream,
    options?: {
      httpMetadata?: {
        contentType?: string
        cacheControl?: string
      }
    },
  ) => Promise<unknown>
  delete: (key: string) => Promise<void>
  head: (key: string) => Promise<unknown | null>
}

let s3ClientPromise: Promise<import("@aws-sdk/client-s3").S3Client> | null = null
let cachedS3Env: R2Env | null = null

export function getR2BucketBinding(): R2BucketLike | null {
  try {
    const ctx = getCloudflareContext()
    const env = (ctx?.env ?? {}) as Record<string, unknown>
    const bucket = env.R2_BUCKET as R2BucketLike | undefined
    return bucket ?? null
  } catch {
    return null
  }
}

function ensureR2Env(requiredKeys: (keyof R2Env)[]): R2Env {
  const env = getR2Env()
  const missing = getMissingR2Env(env, requiredKeys)
  if (missing.length > 0) {
    throw new Error(`Missing R2 environment variables: ${missing.join(", ")}`)
  }
  return env
}

export function getRequiredUploadEnvKeys(hasBinding: boolean): (keyof R2Env)[] {
  return hasBinding ? R2_REQUIRED_PUBLIC_KEYS : R2_REQUIRED_UPLOAD_KEYS
}

async function getS3Client(): Promise<import("@aws-sdk/client-s3").S3Client> {
  if (!s3ClientPromise) {
    s3ClientPromise = (async () => {
      const { S3Client } = await import("@aws-sdk/client-s3")
      cachedS3Env = cachedS3Env ?? ensureR2Env(R2_REQUIRED_STORAGE_KEYS)
      return new S3Client({
        region: "auto",
        endpoint: `https://${cachedS3Env.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: cachedS3Env.accessKeyId!,
          secretAccessKey: cachedS3Env.secretAccessKey!,
        },
      })
    })()
  }

  return s3ClientPromise
}

export async function putObjectToR2(params: {
  key: string
  body: ArrayBuffer
  contentType: string
  cacheControl?: string
}): Promise<void> {
  const bucket = getR2BucketBinding()
  if (bucket) {
    await bucket.put(params.key, params.body, {
      httpMetadata: {
        contentType: params.contentType,
        cacheControl: params.cacheControl,
      },
    })
    return
  }

  const env = ensureR2Env(R2_REQUIRED_UPLOAD_KEYS)
  const { PutObjectCommand } = await import("@aws-sdk/client-s3")
  const client = await getS3Client()

  await client.send(
    new PutObjectCommand({
      Bucket: env.bucketName!,
      Key: params.key,
      Body: Buffer.from(params.body),
      ContentType: params.contentType,
      CacheControl: params.cacheControl,
    }),
  )
}

export async function deleteObjectFromR2(r2Key: string): Promise<void> {
  const bucket = getR2BucketBinding()
  if (bucket) {
    await bucket.delete(r2Key)
    return
  }

  const env = ensureR2Env(R2_REQUIRED_STORAGE_KEYS)
  const { DeleteObjectCommand } = await import("@aws-sdk/client-s3")
  const client = await getS3Client()

  await client.send(
    new DeleteObjectCommand({
      Bucket: env.bucketName!,
      Key: r2Key,
    }),
  )
}

export async function headObjectInR2(r2Key: string): Promise<boolean> {
  const bucket = getR2BucketBinding()
  if (bucket) {
    const result = await bucket.head(r2Key)
    return Boolean(result)
  }

  const env = ensureR2Env(R2_REQUIRED_STORAGE_KEYS)
  const { HeadObjectCommand } = await import("@aws-sdk/client-s3")
  const client = await getS3Client()

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: env.bucketName!,
        Key: r2Key,
      }),
    )
    return true
  } catch (error: unknown) {
    const err = error as { name?: string }
    if (err.name === "NotFound" || err.name === "NoSuchKey") {
      return false
    }
    throw error
  }
}
