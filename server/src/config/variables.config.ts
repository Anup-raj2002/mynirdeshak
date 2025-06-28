import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const ConfigSchema = z.object({
  MONGODB_URI: z
    .string()
    .default('mongodb://localhost:27017/learning-platform'),
  STORAGE_PATH: z
    .string()
    .default('../assets'),
  PORT: z.coerce.number().int().positive().default(5000),
  DOMAIN_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z
    .enum(['development', 'production'])
    .default('development'),
  CASHFREE_APP_ID: z.string(),
  CASHFREE_SECRET_KEY: z.string(),
  CASHFREE_API_VERSION: z.string().default('2022-09-01'),
  GOOGLE_SCRIPT_URL: z.string().url(),
  GOOGLE_SCRIPT_VERIFICATION_CODE: z.string(),
});

const parsedConfig = ConfigSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedConfig.error.format(),
  );
  throw new Error('Invalid environment configuration');
}

export const config = {
  dbUri: parsedConfig.data.MONGODB_URI,
  port: parsedConfig.data.PORT,
  domainUrl: parsedConfig.data.DOMAIN_URL,
  nodeEnv: parsedConfig.data.NODE_ENV,
  storagePath: parsedConfig.data.STORAGE_PATH,
  photoUploadPath: parsedConfig.data.STORAGE_PATH,
  cashfreeAppId: parsedConfig.data.CASHFREE_APP_ID,
  cashfreeSecretKey: parsedConfig.data.CASHFREE_SECRET_KEY,
  cashfreeApiVersion: parsedConfig.data.CASHFREE_API_VERSION,
  googleScriptUrl: parsedConfig.data.GOOGLE_SCRIPT_URL,
  googleScriptVerificationCode: parsedConfig.data.GOOGLE_SCRIPT_VERIFICATION_CODE,
} as const;
