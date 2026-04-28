# 🌍 出海之父 - Global App Starter

> 中国科技企业出海一站式能力框架

一个完整的出海项目工业化模板，基于 Next.js 14 + TypeScript + Tailwind CSS，集成国际化、Stripe 支付、分析监控和 CI/CD。

## ✨ 核心能力

### 🌐 国际化能力
- ✅ 多语言支持 (中/英/日/韩等)
- ✅ 动态路由国际化
- ✅ 国家/地区选择器
- ✅ 浏览器语言自动检测
- ✅ 本地化文案管理

### 💳 全球支付
- ✅ Stripe 支付集成
- ✅ 多币种实时转换
- ✅ 货币汇率显示
- ✅ 订阅计费系统
- ✅ 税务合规 (VAT/GST)

### 🔒 合规与安全
- ✅ GDPR Cookie 同意管理
- ✅ 隐私政策生成
- ✅ 数据加密
- ✅ 审计日志
- ✅ 区域数据存储

### 🏥 医疗AI专项
- ✅ 临床试验跟踪器
- ✅ 多区域试验管理
- ✅ 监管状态监控 (FDA/CE/PMDA)
- ✅ 预算与里程碑跟踪
- ✅ 患者入组进度

### 📊 分析与监控
- ✅ PostHog 用户行为分析
- ✅ Sentry 错误追踪
- ✅ 性能监控
- ✅ A/B 测试框架
- ✅ 用户旅程映射

## 🚀 快速开始

### 先决条件
- Node.js 18+
- npm 或 yarn
- Stripe 账户 (用于支付)
- Vercel/Netlify 账户 (用于部署)

### 安装
```bash
# 克隆项目
git clone https://github.com/MoKangMedical/global-app-starter.git
cd global-app-starter

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env.local
```

### 配置
1. **编辑 `.env.local`**
   ```bash
   # 至少配置以下变量
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=***
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **访问应用**
   - 主页: http://localhost:3000
   - 出海控制台: http://localhost:3000/en/dashboard

## 📁 项目结构

```
global-app-starter/
├── messages/                 # 国际化文案
│   ├── en.json              # 英文
│   └── zh.json              # 中文
├── src/
│   ├── app/
│   │   └── [locale]/        # 国际化路由
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── dashboard/   # 出海控制台
│   ├── components/
│   │   ├── international/   # 国际化组件
│   │   │   ├── CountrySelector.tsx
│   │   │   └── CurrencyConverter.tsx
│   │   ├── compliance/      # 合规组件
│   │   │   └── GDPRConsent.tsx
│   │   ├── medical/         # 医疗AI组件
│   │   │   └── ClinicalTrialTracker.tsx
│   │   └── layout/          # 布局组件
│   ├── i18n/                # 国际化配置
│   └── middleware.ts        # 路由中间件
├── docs/                    # 文档
├── scripts/                 # 脚本
└── public/                  # 静态资源
```

## 🌍 支持的地区

### 优先级 1 (已完成)
- 🇺🇸 美国 (USD, en-US)
- 🇨🇳 中国 (CNY, zh-CN)

### 优先级 2 (进行中)
- 🇬🇧 英国 (GBP, en-GB)
- 🇪🇺 欧盟 (EUR, de-DE/fr-FR)
- 🇯🇵 日本 (JPY, ja-JP)
- 🇰🇷 韩国 (KRW, ko-KR)

### 优先级 3 (计划中)
- 🇨🇦 加拿大 (CAD, en-CA)
- 🇦🇺 澳大利亚 (AUD, en-AU)
- 🇸🇬 新加坡 (SGD, en-SG)

## 💰 商业化能力

### 定价策略
- **Starter**: 免费 - 基础国际化能力
- **Pro**: $99/月 - 完整出海工具链
- **Enterprise**: 定制 - 白标解决方案

### 收入来源
1. SaaS 订阅费
2. 技术咨询服务
3. 定制开发服务
4. 培训与认证

## 📚 文档

- [快速开始指南](./docs/quickstart.md)
- [GitHub 配置指南](./docs/GITHUB_SETUP.md)
- [医疗AI出海指南](./docs/medical-ai-go-global.md)
- [能力总结](./docs/SUMMARY.md)

## 🛠️ 开发

### 可用脚本
```bash
# 开发
npm run dev

# 构建
npm run build

# 启动生产服务器
npm start

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 测试
npm test

# 部署
./scripts/deploy.sh
```

### 国际化工作流
```bash
# 提取翻译文案
npm run i18n:extract

# 编译翻译文件
npm run i18n:compile
```

## 🚀 部署

### Vercel
```bash
npm run deploy:vercel
```

### Netlify
```bash
npm run deploy:netlify
```

### Docker
```bash
docker build -t global-app-starter .
docker run -p 3000:3000 global-app-starter
```

## 🤝 贡献

欢迎贡献代码、文档或建议！请查看 [贡献指南](./CONTRIBUTING.md)。

## 📄 许可证

本项目采用 [MIT 许可证](./LICENSE)。

## 📞 联系方式

- **项目负责人**: MoKangMedical
- **GitHub**: [MoKangMedical/global-app-starter](https://github.com/MoKangMedical/global-app-starter)
- **邮箱**: contact@mokangmedical.com

## 🙏 致谢

感谢所有贡献者的付出！

---

**出海之父** - 让中国科技走向世界 🌍