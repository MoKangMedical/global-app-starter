import crypto from 'crypto';
 
// 医疗数据加密配置
const ENCRYPTION_KEY = process.env.MEDICAL_ENCRYPTION_KEY || '';
const IV_LENGTH = 16; // For AES, this is always 16
const ALGORITHM = 'aes-256-cbc';
 
// 验证加密密钥
function validateKey(): void {
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
    throw new Error('MEDICAL_ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
  }
}
 
// 加密医疗数据
export function encryptMedicalData(data: string): string {
  validateKey();
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = Buffer.from(ENCRYPTION_KEY, 'hex');
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // 返回 IV + 加密数据
  return iv.toString('hex') + ':' + encrypted;
}
 
// 解密医疗数据
export function decryptMedicalData(encryptedData: string): string {
  validateKey();
  
  const parts = encryptedData.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted data format');
  }
  
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  const key = Buffer.from(ENCRYPTION_KEY, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
 
// 哈希医疗ID（用于去标识化）
export function hashMedicalId(medicalId: string): string {
  return crypto
    .createHash('sha256')
    .update(medicalId + process.env.MEDICAL_SALT)
    .digest('hex');
}
 
// 生成安全的医疗记录ID
export function generateMedicalRecordId(): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(8).toString('hex');
  return `MR-${timestamp}-${random}`.toUpperCase();
}
 
// 验证医疗数据完整性
export function verifyMedicalDataIntegrity(
  data: string,
  signature: string,
  publicKey: string
): boolean {
  const verify = crypto.createVerify('SHA256');
  verify.update(data);
  return verify.verify(publicKey, signature, 'hex');
}
 
// 签名医疗数据
export function signMedicalData(
  data: string,
  privateKey: string
): string {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  return sign.sign(privateKey, 'hex');
}
 
// 医疗数据脱敏
export function desensitizeMedicalData(data: Record<string, any>): Record<string, any> {
  const sensitiveFields = [
    'name',
    'email',
    'phone',
    'address',
    'ssn',
    'medical_record_number',
    'insurance_id',
  ];
  
  const result = {...data};
  
  for (const field of sensitiveFields) {
    if (result[field]) {
      if (field === 'email') {
        const [local, domain] = result[field].split('@');
        result[field] = `${local[0]}***@${domain}`;
      } else if (field === 'phone') {
        result[field] = result[field].slice(0, 3) + '****' + result[field].slice(-3);
      } else {
        result[field] = '***REDACTED***';
      }
    }
  }
  
  return result;
}
