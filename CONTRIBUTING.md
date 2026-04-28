# 贡献指南

感谢您对"出海之父"项目的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题
1. 在 [GitHub Issues](https://github.com/MoKangMedical/global-app-starter/issues) 中搜索是否已有相同问题
2. 如果没有，创建新的 Issue，包含：
   - 清晰的问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（操作系统、Node.js版本等）

### 提交代码
1. Fork 项目
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add your feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 创建 Pull Request

### 代码规范
- 使用 TypeScript
- 遵循 ESLint 规则
- 编写清晰的提交信息
- 添加必要的测试

## 📝 提交信息规范

使用以下格式：
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型
- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 示例
```
feat(i18n): add Japanese language support

- Add ja.json translation file
- Update language selector
- Add Japanese fonts

Closes #123
```

## 🧪 测试

### 运行测试
```bash
npm test
```

### 运行测试覆盖率
```bash
npm run test:coverage
```

### 编写测试
- 在 `tests/` 目录下创建测试文件
- 使用 Jest 和 Testing Library
- 测试文件命名：`*.test.ts` 或 `*.test.tsx`

## 📚 文档

### 更新文档
- 文档位于 `docs/` 目录
- 使用 Markdown 格式
- 保持文档与代码同步

### 添加新功能时
1. 更新 README.md
2. 添加相关文档
3. 更新 CHANGELOG.md

## 🌍 国际化

### 添加新语言
1. 在 `messages/` 目录创建新的 JSON 文件
2. 复制 `en.json` 的结构
3. 翻译所有文案
4. 在 `src/i18n/request.ts` 中注册新语言

### 翻译规范
- 保持 JSON 结构一致
- 使用有意义的键名
- 避免硬编码文本

## 🎨 设计规范

### 组件设计
- 使用 Tailwind CSS
- 遵循组件库规范
- 保持响应式设计

### 颜色使用
- 主色调：primary-600
- 成功：green-600
- 警告：yellow-600
- 错误：red-600

## 🔧 开发环境

### 环境要求
- Node.js 18+
- npm/yarn/pnpm
- Git

### 本地开发
```bash
# 克隆仓库
git clone https://github.com/MoKangMedical/global-app-starter.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 环境变量
创建 `.env.local` 文件：
```env
# 根据需要添加环境变量
```

## 📋 Pull Request 清单

提交 PR 前请确保：
- [ ] 代码通过 ESLint 检查
- [ ] 添加了必要的测试
- [ ] 测试全部通过
- [ ] 更新了相关文档
- [ ] 提交信息符合规范
- [ ] 没有引入新的警告

## 🐛 Bug 报告

### 报告模板
```markdown
**描述**
清晰描述问题

**复现步骤**
1. 访问 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

**预期行为**
描述您期望的行为

**实际行为**
描述实际发生的行为

**截图**
如果适用，添加截图

**环境**
- 操作系统: [e.g. macOS]
- 浏览器: [e.g. Chrome]
- 版本: [e.g. 22]
```

## 💡 功能建议

### 建议模板
```markdown
**问题描述**
描述您遇到的问题

**建议解决方案**
描述您希望的解决方案

**替代方案**
描述您考虑过的其他解决方案

**附加信息**
添加任何其他相关信息
```

## 📞 联系我们

- **GitHub Issues**: [Issues](https://github.com/MoKangMedical/global-app-starter/issues)
- **邮箱**: contact@mokangmedical.com

## 🙏 致谢

感谢所有贡献者的付出！

---

**让我们一起让中国科技走向世界！** 🌍