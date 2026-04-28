# 出海之父 - 快速开始指南

## 🚀 5分钟快速启动

### 前置要求
- Node.js 18+
- npm 或 yarn 或 pnpm

### 1. 安装依赖
```bash
cd global-app-starter
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 3. 访问出海控制台
访问 http://localhost:3000/en/dashboard 查看出海能力控制台。

## 🌍 国际化配置

### 支持的语言
- 英语 (en) - 默认
- 中文 (zh)

### 添加新语言
1. 在 `messages/` 目录创建新的 JSON 文件，例如 `ja.json`
2. 复制 `en.json` 的结构并翻译内容
3. 在 `src/i18n/request.ts` 中添加新语言配置

### 提取翻译文案
```bash
npm run i18n:extract
```

### 编译翻译文件
```bash
npm run i18n:compile
```

## 💳 支付配置

### Stripe 集成
1. 在 [Stripe Dashboard](https://dashboard.stripe.com) 获取 API 密钥
2. 创建 `.env.local` 文件：
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 多币种支持
- 自动根据用户地区显示货币
- 实时汇率转换
- 支持 10+ 种主要货币

## 🔒 合规配置

### GDPR Cookie 同意
GDPR 组件已自动集成，会根据用户地区显示：
- 欧盟用户：显示同意横幅
- 其他地区：可选择显示

### 自定义 Cookie 类别
编辑 `src/components/compliance/GDPRConsent.tsx` 中的 `defaultCategories` 数组。

## 🏥 医疗AI功能

### 临床试验跟踪
访问 `/dashboard` 页面，点击 "Clinical Trials" 标签页查看：
- 试验进度
- 监管状态
- 预算使用
- 里程碑跟踪

### 添加新试验
编辑 `src/components/medical/ClinicalTrialTracker.tsx` 中的 `mockTrials` 数组。

## 📊 监控配置

### Sentry 错误追踪
1. 在 [Sentry](https://sentry.io) 创建项目
2. 添加环境变量：
```env
NEXT_PUBLIC_SENTRY_DSN=xxx
```

### PostHog 用户分析
1. 在 [PostHog](https://posthog.com) 创建项目
2. 添加环境变量：
```env
NEXT_PUBLIC_POSTHOG_KEY=xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 🎨 自定义主题

### 颜色配置
编辑 `tailwind.config.js` 中的 `theme.extend.colors`：
```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... 更多色阶
    600: '#0284c7',
    700: '#0369a1',
  }
}
```

### 字体配置
在 `src/app/[locale]/layout.tsx` 中配置字体：
```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

## 📦 部署

### Vercel 部署
```bash
npm run deploy:vercel
```

### Netlify 部署
```bash
npm run deploy:netlify
```

### 自托管
```bash
npm run build
npm start
```

## 🔧 环境变量

创建 `.env.local` 文件：
```env
# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# Sentry
NEXT_PUBLIC_SENTRY_DSN=xxx

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=xxx
```

## 📚 常见问题

### Q: 如何更改默认语言？
A: 在 `src/i18n/request.ts` 中修改 `defaultLocale` 变量。

### Q: 如何添加新的国家/地区？
A: 在 `src/components/international/CountrySelector.tsx` 中的 `countries` 数组添加新条目。

### Q: 如何自定义 GDPR 横幅？
A: 编辑 `src/components/compliance/GDPRConsent.tsx` 中的文本和样式。

### Q: 如何添加新的临床试验？
A: 在 `src/components/medical/ClinicalTrialTracker.tsx` 中的 `mockTrials` 数组添加新试验。

### Q: 如何集成新的支付方式？
A: 参考 Stripe 文档，在 `src/components/international/CurrencyConverter.tsx` 中添加新支付方式。

## 🆘 获取帮助

- **文档**: [docs/](./docs/)
- **GitHub Issues**: [Issues](https://github.com/MoKangMedical/global-app-starter/issues)
- **邮件**: contact@mokangmedical.com

## 🎯 下一步

1. 阅读 [医疗AI出海指南](./docs/medical-ai-go-global.md)
2. 查看 [能力总结](./docs/SUMMARY.md)
3. 探索 [出海控制台](/dashboard)
4. 配置您的支付和监控服务

---

**祝您出海顺利！** 🚀