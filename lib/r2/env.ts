import { getCloudflareContext } from "@opennextjs/cloudflare"

export type R2Env = {
  accountId?: string
  accessKeyId?: string
  secretAccessKey?: string
  bucketName?: string
  publicUrl?: string
}

const ENV_NAME_MAP = {
  accountId: "R2_ACCOUNT_ID",
  accessKeyId: "R2_ACCESS_KEY_ID",
  secretAccessKey: "R2_SECRET_ACCESS_KEY",
  bucketName: "R2_BUCKET_NAME",
  publicUrl: "R2_PUBLIC_URL",
} as const

export const R2_REQUIRED_UPLOAD_KEYS: (keyof R2Env)[] = [
  "accountId",
  "accessKeyId",
  "secretAccessKey",
  "bucketName",
  "publicUrl",
]

export const R2_REQUIRED_PUBLIC_KEYS: (keyof R2Env)[] = ["publicUrl"]

export const R2_REQUIRED_STORAGE_KEYS: (keyof R2Env)[] = [
  "accountId",
  "accessKeyId",
  "secretAccessKey",
  "bucketName",
]

function readProcessEnv(): R2Env {
  return {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME,
    publicUrl: process.env.R2_PUBLIC_URL,
  }
}

function mergeEnv(base: R2Env, override: Partial<R2Env>): R2Env {
  return {
    accountId: base.accountId ?? override.accountId,
    accessKeyId: base.accessKeyId ?? override.accessKeyId,
    secretAccessKey: base.secretAccessKey ?? override.secretAccessKey,
    bucketName: base.bucketName ?? override.bucketName,
    publicUrl: base.publicUrl ?? override.publicUrl,
  }
}

export function getR2Env(): R2Env {
  const base = readProcessEnv()

  console.log("[R2 Env] Checking process.env:", {
    hasAccountId: !!base.accountId,
    hasAccessKeyId: !!base.accessKeyId,
    hasSecretAccessKey: !!base.secretAccessKey,
    hasBucketName: !!base.bucketName,
    hasPublicUrl: !!base.publicUrl,
  })

  if (R2_REQUIRED_UPLOAD_KEYS.every((key) => Boolean(base[key]))) {
    console.log("[R2 Env] All keys found in process.env")
    return base
  }

  try {
    console.log("[R2 Env] Trying getCloudflareContext()...")
    const ctx = getCloudflareContext()
    console.log("[R2 Env] Cloudflare context:", ctx ? "found" : "null")
    const cfEnv = ctx.env as Record<string, string | undefined>
    console.log("[R2 Env] Cloudflare env keys:", Object.keys(cfEnv || {}))
    const merged = mergeEnv(base, {
      accountId: cfEnv.R2_ACCOUNT_ID,
      accessKeyId: cfEnv.R2_ACCESS_KEY_ID,
      secretAccessKey: cfEnv.R2_SECRET_ACCESS_KEY,
      bucketName: cfEnv.R2_BUCKET_NAME,
      publicUrl: cfEnv.R2_PUBLIC_URL,
    })
    console.log("[R2 Env] After merge:", {
      hasAccountId: !!merged.accountId,
      hasAccessKeyId: !!merged.accessKeyId,
      hasSecretAccessKey: !!merged.secretAccessKey,
      hasBucketName: !!merged.bucketName,
      hasPublicUrl: !!merged.publicUrl,
    })
    return merged
  } catch (error) {
    console.error("[R2 Env] getCloudflareContext error:", error)
    return base
  }
}

export function getMissingR2Env(env: R2Env, requiredKeys: (keyof R2Env)[]): string[] {
  return requiredKeys
    .filter((key) => !env[key])
    .map((key) => ENV_NAME_MAP[key])
}
