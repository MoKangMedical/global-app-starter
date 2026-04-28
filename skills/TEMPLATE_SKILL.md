---
name: global-app-starter-template
description: 出海项目工业化模板 — Next.js + TypeScript + Stripe + 国际化，8语言支持，医疗行业合规模块
version: 1.2.0
category: development
triggers:
  - 出海项目
  - 国际化
  - global app
  - 多语言
  - 医疗出海
author: Global App Team
test_prompts:
  - "创建一个多语言医疗预约应用"
  - "搭建支持Stripe支付的SaaS落地页"
---

# Global App Starter: 出海项目模板

## 快速开始
```bash
cd ~/Desktop/global-app-starter
npm install
npm run dev  # http://localhost:3000
```

## 项目结构
```
~/Desktop/global-app-starter/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # UI组件
│   ├── i18n/             # 国际化配置 (8语言)
│   ├── stripe/           # Stripe支付集成
│   ├── security/         # GDPR/HIPAA合规模块
│   └── analytics/        # PostHog + Sentry
├── messages/             # 翻译文件
│   ├── zh.json           # 中文
│   ├── en.json           # 英文
│   ├── ja.json           # 日文
│   └── ...               # 8种语言
├── docs/                 # 文档
└── .github/workflows/    # CI/CD
```

## 工作流程

### Step 1: 克隆模板
```bash
cp -r ~/Desktop/global-app-starter ~/Desktop/my-new-app
cd ~/Desktop/my-new-app
```

### Step 2: 配置项目
编辑 `package.json` 中的 name/description
编辑 `src/i18n/config.ts` 选择需要的语言

### Step 3: 添加页面
```tsx
// src/app/[locale]/page.tsx
export default function Home() {
  return <HeroSection />;  // 使用 ~/Desktop/global-app-starter/src/components/HeroSection.tsx
}
```

### Step 4: 配置Stripe
```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```
参考: `~/Desktop/global-app-starter/src/stripe/`

### Step 5: 医疗合规模块 (可选)
```tsx
import { GDPRConsent } from '@/components/GDPRConsent';
import { HIPAAForm } from '@/components/HIPAAForm';
```
参考: `~/Desktop/global-app-starter/src/security/`

### Step 6: 部署
```bash
npm run build
vercel deploy  # 或 GitHub Actions自动部署
```

## 异常处理

| 场景 | 处理方式 |
|------|----------|
| 翻译缺失 | fallback到 `en.json`，控制台警告 |
| Stripe webhook失败 | 重试3次，记录日志到 `~/Desktop/global-app-starter/logs/` |
| 构建失败 | 自动回滚到上一个成功版本 |
| 环境变量缺失 | 启动时报错并列出缺失项 |

## 确认检查点
1. ⚠️ 部署前确认环境变量
2. ⚠️ 支付上线前确认Stripe测试模式
3. ⚠️ GDPR/HIPAA模块上线前需法务确认
4. ⚠️ 新增语言需确认翻译质量

## 参考文件
- CI/CD: `~/Desktop/global-app-starter/.github/workflows/deploy.yml`
- 部署文档: `~/Desktop/global-app-starter/DEPLOYMENT.md`
