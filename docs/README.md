# Global App - 出海项目工业化搭建指南
 
## 🚀 快速开始
 
### 1. 环境准备
 
```bash
# 克隆项目
git clone <repository-url>
cd global-app-starter
 
# 安装依赖
npm install
 
# 复制环境变量
cp .env.example .env.local
```
 
### 2. 配置环境变量
 
编辑 `.env.local` 文件，填入以下必要配置：
 
#### 必需配置
```bash
# 站点配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Global App
 
# Stripe 支付（必需）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```
 
#### 可选配置
```bash
# 认证
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
 
# 分析工具
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_GA_ID=G-xxx
 
# 错误监控
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```
 
### 3. 本地开发
 
```bash
# 启动开发服务器
npm run dev
 
# 类型检查
npm run type-check
 
# 代码检查
npm run lint
 
# 运行测试
npm run test
```
 
访问 http://localhost:3000 查看应用。
 
## 📦 项目结构
 
```
global-app-starter/
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── [locale]/          # 国际化路由
│   ├── components/
│   │   ├── layout/            # 布局组件
│   │   ├── ui/                # UI 组件
│   │   └── analytics/         # 分析组件
│   ├── lib/
│   │   └── stripe.ts          # Stripe 配置
│   ├── i18n/                  # 国际化配置
│   ├── hooks/                 # 自定义 Hooks
│   ├── utils/                 # 工具函数
│   └── styles/                # 样式文件
├── messages/                  # 翻译文件
│   ├── en.json
│   ├── zh.json
│   └── ...
├── public/                    # 静态资源
├── tests/                     # 测试文件
├── .github/workflows/         # CI/CD 配置
└── docs/                      # 文档
```
 
## 🌍 国际化配置
 
### 支持的语言
- English (en) - 默认
- 中文 (zh)
- 日本語 (ja)
- 한국어 (ko)
- Español (es)
- Français (fr)
- Deutsch (de)
- Português (pt)
 
### 添加新语言
 
1. 在 `messages/` 目录创建翻译文件
2. 更新 `src/i18n/request.ts` 中的语言列表
3. 更新 `next.config.js` 中的 i18n 配置
 
### 翻译文件格式
 
```json
{
  "nav": {
    "home": "Home",
    "features": "Features"
  },
  "hero": {
    "title": "Build Something Amazing",
    "subtitle": "The all-in-one platform"
  }
}
```
 
## 💳 Stripe 支付集成
 
### 配置步骤
 
1. **创建 Stripe 账户**
   - 访问 https://stripe.com 注册
   - 获取 API 密钥
 
2. **创建产品和价格**
   ```bash
   # Stripe Dashboard > Products > Add Product
   # 创建三个价格：
   # - Starter: $9/month
   # - Pro: $29/month  
   # - Enterprise: Custom
   ```
 
3. **配置 Webhook**
   ```bash
   # Stripe Dashboard > Developers > Webhooks
   # 添加端点：https://your-domain.com/api/webhooks/stripe
   # 选择事件：
   # - checkout.session.completed
   # - customer.subscription.updated
   # - customer.subscription.deleted
   # - invoice.payment_succeeded
   # - invoice.payment_failed
   ```
 
4. **测试支付流程**
   ```bash
   # 使用测试卡号：4242 4242 4242 4242
   # 任意未来日期和 CVC
   ```
 
### API 端点
 
- `POST /api/checkout` - 创建支付会话
- `POST /api/portal` - 创建客户门户会话
- `POST /api/webhooks/stripe` - Stripe Webhook 处理
 
## 📊 分析和监控
 
### PostHog（推荐）
 
1. 注册 https://posthog.com
2. 获取 Project API Key
3. 添加到环境变量：`NEXT_PUBLIC_POSTHOG_KEY`
 
### Google Analytics
 
1. 创建 GA4 属性
2. 获取 Measurement ID
3. 添加到环境变量：`NEXT_PUBLIC_GA_ID`
 
### Sentry 错误监控
 
1. 注册 https://sentry.io
2. 创建 Next.js 项目
3. 获取 DSN
4. 添加到环境变量：`NEXT_PUBLIC_SENTRY_DSN`
 
## 🚢 部署指南
 
### 部署到 Vercel（推荐）
 
1. **连接 GitHub 仓库**
   ```bash
   # 安装 Vercel CLI
   npm i -g vercel
 
   # 登录
   vercel login
 
   # 部署
   vercel
   ```
 
2. **配置环境变量**
   - 在 Vercel Dashboard 设置所有环境变量
   - 确保 Stripe Webhook URL 指向生产域名
 
3. **配置域名**
   ```bash
   # 在 Vercel Dashboard > Settings > Domains
   # 添加你的域名
   # 配置 DNS 记录
   ```
 
### 部署到 Netlify
 
```bash
# 安装 Netlify CLI
npm i -g netlify-cli
 
# 登录
netlify login
 
# 部署
netlify deploy --prod
```
 
### 自托管部署
 
```bash
# 构建应用
npm run build
 
# 启动生产服务器
npm start
 
# 或使用 PM2
npm i -g pm2
pm2 start npm --name "global-app" -- start
```
 
## 🔄 CI/CD 流程
 
### GitHub Actions 配置
 
项目已配置完整的 CI/CD 流程：
 
1. **CI 流程** (`ci.yml`)
   - 代码检查 (Lint)
   - 类型检查 (TypeScript)
   - 单元测试
   - 安全扫描
 
2. **CD 流程** (`cd.yml`)
   - 自动部署到生产环境
   - E2E 测试
   - 部署通知
 
### 配置 GitHub Secrets
 
在 GitHub 仓库设置以下 Secrets：
 
```bash
# Stripe
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
 
# Vercel
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
 
# 分析工具
POSTHOG_KEY
GA_ID
SENTRY_DSN
 
# 其他
SNYK_TOKEN
SLACK_WEBHOOK_URL
CODECOV_TOKEN
```
 
## 🛡️ 安全最佳实践
 
### 环境变量安全
- 永远不要提交 `.env.local` 到 Git
- 使用不同的密钥用于开发和生产
- 定期轮换 API 密钥
 
### Stripe 安全
- 使用 Webhook 签名验证
- 不要在客户端暴露 Secret Key
- 实施速率限制
 
### 内容安全策略
- 配置适当的 CSP 头部
- 限制脚本来源
- 使用 HTTPS
 
## 📈 性能优化
 
### 图片优化
```tsx
import Image from 'next/image';
 
<Image
  src="/image.jpg"
  width={500}
  height={300}
  alt="Description"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```
 
### 代码分割
```tsx
import dynamic from 'next/dynamic';
 
const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
});
```
 
### 缓存策略
- 静态页面生成 (SSG)
- 增量静态再生 (ISR)
- 边缘缓存
 
## 🔧 常见问题
 
### Q: 如何添加新的语言支持？
A: 参考国际化配置部分，添加翻译文件和更新配置。
 
### Q: Stripe Webhook 返回 400 错误？
A: 检查 Webhook Secret 是否正确，确保签名验证通过。
 
### Q: 如何自定义定价方案？
A: 修改 `src/lib/stripe.ts` 中的 `PLANS` 对象。
 
### Q: 部署后国际化不工作？
A: 确保 Vercel/Netlify 配置了正确的 i18n 设置。
 
## 📞 支持
 
- 文档：https://docs.your-domain.com
- 邮箱：support@your-domain.com
- GitHub Issues：https://github.com/your-org/global-app/issues
 
## 📄 许可证
 
MIT License
