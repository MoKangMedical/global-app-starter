#!/bin/bash
 
# Global App Starter - 快速启动脚本
# 使用方法: ./scripts/setup.sh
 
set -e
 
echo "🌍 Global App Starter - 快速启动"
echo "================================"
 
# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "请先安装 Node.js 18+: https://nodejs.org/"
    exit 1
fi
 
# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi
 
echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"
 
# 安装依赖
echo ""
echo "📦 安装依赖..."
npm install
 
# 创建环境变量文件
if [ ! -f .env.local ]; then
    echo ""
    echo "🔧 创建环境变量文件..."
    cp .env.example .env.local
    echo "✅ 已创建 .env.local"
    echo ""
    echo "⚠️  请编辑 .env.local 文件，配置以下变量："
    echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_WEBHOOK_SECRET"
else
    echo "✅ .env.local 已存在"
fi
 
# 初始化 Git 仓库
if [ ! -d .git ]; then
    echo ""
    echo "📝 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Global App Starter"
    echo "✅ Git 仓库已初始化"
fi
 
# 构建检查
echo ""
echo "🔍 运行类型检查..."
npm run type-check
 
echo ""
echo "🧹 运行代码检查..."
npm run lint || true
 
echo ""
echo "✅ 设置完成！"
echo ""
echo "🚀 启动开发服务器："
echo "   npm run dev"
echo ""
echo "📖 查看文档："
echo "   open docs/QUICKSTART.md"
echo ""
echo "🎉 开始构建你的全球化产品吧！"
