# 快速收款能力 - Quick Payment Collection

## 🎯 概述

"快速收款能力"是出海之父框架的核心功能之一，提供完整的国际收款解决方案，支持信用卡、支付宝、微信支付等多种支付方式，覆盖全球45+国家和地区。

## 💳 支持的支付方式

### 信用卡/借记卡
- ✅ Visa
- ✅ Mastercard
- ✅ American Express
- ✅ Discover
- ✅ JCB
- ✅ UnionPay (银联)

### 数字钱包
- ✅ Alipay (支付宝)
- ✅ WeChat Pay (微信支付)
- ✅ Apple Pay
- ✅ Google Pay

### 银行转账
- ⏳ Wire Transfer (电汇)
- ⏳ ACH (美国)
- ⏳ SEPA (欧盟)
- ⏳ BACS (英国)

### 本地支付
- ⏳ iDEAL (荷兰)
- ⏳ Bancontact (比利时)
- ⏳ Giropay (德国)
- ⏳ Sofort (德国/奥地利)

## 🌍 支持的国家和地区

### 亚太地区
- 🇨🇳 中国 (CNY)
- 🇯🇵 日本 (JPY)
- 🇰🇷 韩国 (KRW)
- 🇸🇬 新加坡 (SGD)
- 🇦🇺 澳大利亚 (AUD)
- 🇭🇰 香港 (HKD)
- 🇹🇼 台湾 (TWD)

### 北美地区
- 🇺🇸 美国 (USD)
- 🇨🇦 加拿大 (CAD)

### 欧洲地区
- 🇬🇧 英国 (GBP)
- 🇩🇪 德国 (EUR)
- 🇫🇷 法国 (EUR)
- 🇮🇹 意大利 (EUR)
- 🇪🇸 西班牙 (EUR)
- 🇳🇱 荷兰 (EUR)

### 其他地区
- 🇧🇷 巴西 (BRL)
- 🇲🇽 墨西哥 (MXN)
- 🇮🇳 印度 (INR)

## 🔧 技术架构

### 核心组件

```
src/
├── components/
│   └── payment/
│       └── CheckoutForm.tsx      # 支付表单组件
├── app/
│   └── [locale]/
│       ├── checkout/
│       │   └── page.tsx          # 结账页面
│       └── payments/
│           └── page.tsx          # 支付历史页面
└── app/
    └── api/
        ├── checkout/
        │   └── route.ts          # 支付处理API
        └── payments/
            └── route.ts          # 支付历史API
```

### API 端点

#### 创建支付
```typescript
POST /api/checkout
{
  "productId": "pro",
  "email": "user@example.com",
  "name": "John Doe",
  "country": "US",
  "paymentMethod": "card",
  "amount": 4900,
  "currency": "usd"
}
```

#### 查询支付状态
```typescript
GET /api/checkout?payment_intent=pi_abc123
```

#### 获取支付历史
```typescript
GET /api/payments?email=user@example.com&limit=10
```

#### 获取支付详情
```typescript
POST /api/payments
{
  "paymentId": "pi_abc123"
}
```

## 💰 定价计划

### Starter - $9/月
- 基础国际化支持
- 2种语言
- 社区支持
- 基础分析
- 1,000 API调用/月

### Professional - $49/月
- 完整国际化框架
- 无限语言
- 支付集成
- GDPR合规
- 优先支持
- 高级分析
- 50,000 API调用/月
- 自定义域名

### Enterprise - $199/月
- Professional全部功能
- 临床试验管理
- 监管合规
- 专属支持
- 自定义集成
- SLA保障
- 无限API调用
- 白标选项
- 本地部署

## 🔒 安全合规

### 认证与合规
- ✅ PCI DSS Level 1 认证
- ✅ SOC 2 Type II 合规
- ✅ GDPR 合规
- ✅ PSD2 (欧盟)
- ✅ SCA (强客户认证)

### 数据安全
- ✅ 256-bit SSL/TLS 加密
- ✅ AES-256 数据加密
- ✅ 令牌化支付信息
- ✅ 实时欺诈检测
- ✅ 3D Secure 验证

### 隐私保护
- ✅ 不存储完整卡号
- ✅ 符合CCPA要求
- ✅ 数据本地化存储
- ✅ 用户数据删除权

## 📊 功能特性

### 支付处理
- ✅ 实时支付处理
- ✅ 自动重试失败支付
- ✅ 智能路由优化
- ✅ 多币种支持
- ✅ 自动汇率转换

### 订阅管理
- ✅ 灵活的计费周期
- ✅ 免费试用支持
- ✅ 计划升级/降级
- ✅ 自动续费
- ✅ 优惠券/折扣

### 退款处理
- ✅ 全额退款
- ✅ 部分退款
- ✅ 自动退款处理
- ✅ 退款原因跟踪

### 发票管理
- ✅ 自动生成发票
- ✅ 自定义发票模板
- ✅ 多语言发票
- ✅ PDF导出
- ✅ 自动发送

## 🚀 快速开始

### 1. 配置环境变量
```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问收款页面
- 结账页面: http://localhost:3000/en/checkout
- 支付历史: http://localhost:3000/en/payments

### 4. 测试支付
使用Stripe测试卡号:
- 成功: 4242 4242 4242 4242
- 失败: 4000 0000 0000 0002
- 需要3D Secure: 4000 0025 0000 3155

## 📈 监控与分析

### 实时指标
- 支付成功率
- 平均交易金额
- 支付方式分布
- 地区分布
- 失败原因分析

### 报表功能
- 每日/周/月报表
- 收入趋势分析
- 客户生命周期价值
- 流失分析

## 🔄 Webhook集成

### 支持的事件
```typescript
// 支付成功
payment_intent.succeeded

// 支付失败
payment_intent.payment_failed

// 退款
charge.refunded

// 订阅更新
customer.subscription.updated

// 订阅删除
customer.subscription.deleted
```

### Webhook处理
```typescript
// src/app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      // 处理成功支付
      break;
    case 'payment_intent.payment_failed':
      // 处理失败支付
      break;
  }
  
  return NextResponse.json({ received: true });
}
```

## 🛠️ 自定义配置

### 自定义支付方式
```typescript
// src/components/payment/CheckoutForm.tsx
const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: <CreditCard className="w-6 h-6" />,
    enabled: true
  },
  // 添加自定义支付方式
];
```

### 自定义产品
```typescript
// src/app/api/checkout/route.ts
const PRODUCTS = {
  custom: {
    name: 'Custom Plan',
    description: 'Custom product description',
    amount: 9900, // $99.00
    currency: 'usd',
    interval: 'month',
  },
};
```

## 📚 相关文档

- [Stripe文档](https://stripe.com/docs)
- [支付集成指南](https://stripe.com/docs/payments/integration-builder)
- [Webhook配置](https://stripe.com/docs/webhooks)
- [测试卡号](https://stripe.com/docs/testing#cards)

## 🆘 常见问题

### Q: 支付失败怎么办？
A: 检查以下几点:
1. 确认Stripe密钥配置正确
2. 检查网络连接
3. 查看浏览器控制台错误
4. 检查Stripe Dashboard的支付记录

### Q: 如何添加新的支付方式？
A: 在`src/components/payment/CheckoutForm.tsx`中添加新的支付方式配置，并在API中处理相应的支付方式类型。

### Q: 如何处理退款？
A: 使用Stripe Dashboard或API进行退款操作，系统会自动发送webhook通知。

### Q: 如何自定义发票？
A: 在Stripe Dashboard中配置发票模板，或使用API生成自定义发票。

## 📞 技术支持

- **文档**: [docs/](./docs/)
- **GitHub Issues**: [Issues](https://github.com/MoKangMedical/global-app-starter/issues)
- **邮箱**: contact@mokangmedical.com

---

**快速收款，全球覆盖，安全可靠。** 💳