import {NextRequest, NextResponse} from 'next/server';
 
export interface ConsentData {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  medical_data: boolean;
  timestamp: string;
  version: string;
}
 
export const CONSENT_VERSION = '1.0.0';
 
export function getConsentFromCookies(req: NextRequest): ConsentData | null {
  const consentCookie = req.cookies.get('medical_consent');
  if (!consentCookie) return null;
  
  try {
    const consent = JSON.parse(consentCookie.value);
    return consent;
  } catch {
    return null;
  }
}
 
export function setConsentCookie(res: NextResponse, consent: ConsentData): void {
  res.cookies.set('medical_consent', JSON.stringify(consent), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
  });
}
 
export function validateConsent(consent: ConsentData): boolean {
  return (
    consent.necessary === true &&
    consent.version === CONSENT_VERSION &&
    new Date(consent.timestamp) <= new Date()
  );
}
 
// GDPR Article 9 - 特殊类别个人数据（医疗数据）
export function hasMedicalDataConsent(consent: ConsentData): boolean {
  return consent.medical_data === true && validateConsent(consent);
}
 
// HIPAA 合规检查
export function isHIPAACompliant(): boolean {
  return process.env.HIPAA_COMPLIANT === 'true';
}
 
// 数据保留策略
export const DATA_RETENTION_POLICIES = {
  medical_records: 7 * 365, // 7 years
  appointment_history: 3 * 365, // 3 years
  billing_records: 10 * 365, // 10 years
  communication_logs: 2 * 365, // 2 years
  analytics_data: 90, // 90 days
} as const;
 
// 审计日志
export interface AuditLog {
  user_id: string;
  action: string;
  resource: string;
  timestamp: string;
  ip_address: string;
  user_agent: string;
  success: boolean;
  details?: Record<string, any>;
}
 
export function createAuditLog(
  userId: string,
  action: string,
  resource: string,
  request: NextRequest,
  success: boolean,
  details?: Record<string, any>
): AuditLog {
  return {
    user_id: userId,
    action,
    resource,
    timestamp: new Date().toISOString(),
    ip_address: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    user_agent: request.headers.get('user-agent') || 'unknown',
    success,
    details,
  };
}
