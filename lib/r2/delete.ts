import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function deleteFromR2(r2Key: string): Promise<boolean> {
  try {
    console.log(`[R2 Delete] Attempting to delete: ${r2Key}`)

    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: r2Key,
      })
    )

    console.log(`[R2 Delete] Successfully deleted: ${r2Key}`)
    return true
  } catch (error) {
    console.error(`[R2 Delete] Failed to delete ${r2Key} from R2:`, error)
    return false
  }
}
