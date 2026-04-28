import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';
import {encryptMedicalData, generateMedicalRecordId} from '@/lib/security/encryption';
import {createAuditLog} from '@/lib/compliance/gdpr';
 
// 医疗记录验证schema
const medicalRecordSchema = z.object({
  patient_id: z.string().min(1),
  provider_id: z.string().min(1),
  record_type: z.enum(['consultation', 'prescription', 'lab_result', 'imaging', 'procedure']),
  diagnosis: z.array(z.string()).optional(),
  medications: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
    duration: z.string().optional(),
  })).optional(),
  notes: z.string().optional(),
  date: z.string().datetime(),
  follow_up: z.string().datetime().optional(),
});
 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = medicalRecordSchema.parse(body);
 
    // 生成医疗记录ID
    const recordId = generateMedicalRecordId();
 
    // 加密敏感数据
    const encryptedNotes = validated.notes 
      ? encryptMedicalData(validated.notes) 
      : null;
 
    // 创建审计日志
    const auditLog = createAuditLog(
      validated.provider_id,
      'CREATE_MEDICAL_RECORD',
      `medical_records/${recordId}`,
      req,
      true,
      {record_type: validated.record_type}
    );
 
    // TODO: 保存到数据库
    // await db.medical_records.create({
    //   id: recordId,
    //   ...validated,
    //   notes: encryptedNotes,
    //   created_at: new Date(),
    // });
 
    // TODO: 保存审计日志
    // await db.audit_logs.create(auditLog);
 
    return NextResponse.json({
      success: true,
      record_id: recordId,
      message: 'Medical record created successfully',
    });
  } catch (err) {
    console.error('Error creating medical record:', err);
 
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {error: 'Invalid data', details: err.errors},
        {status: 400}
      );
    }
 
    return NextResponse.json(
      {error: 'Internal server error'},
      {status: 500}
    );
  }
}
 
export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const patientId = searchParams.get('patient_id');
    const providerId = searchParams.get('provider_id');
    const recordType = searchParams.get('record_type');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
 
    // 验证权限
    if (!providerId) {
      return NextResponse.json(
        {error: 'Provider ID required'},
        {status: 400}
      );
    }
 
    // TODO: 从数据库查询记录
    // const records = await db.medical_records.findMany({
    //   where: {
    //     patient_id: patientId,
    //     provider_id: providerId,
    //     record_type: recordType,
    //     date: {
    //       gte: startDate ? new Date(startDate) : undefined,
    //       lte: endDate ? new Date(endDate) : undefined,
    //     },
    //   },
    //   orderBy: {date: 'desc'},
    // });
 
    // 模拟数据
    const records = [
      {
        id: 'MR-001',
        patient_id: patientId || 'P001',
        provider_id: providerId,
        record_type: 'consultation',
        diagnosis: ['Type 2 Diabetes', 'Hypertension'],
        date: '2024-03-15T10:00:00Z',
        follow_up: '2024-04-15T10:00:00Z',
      },
    ];
 
    return NextResponse.json({
      success: true,
      records,
      total: records.length,
    });
  } catch (err) {
    console.error('Error fetching medical records:', err);
    return NextResponse.json(
      {error: 'Internal server error'},
      {status: 500}
    );
  }
}
