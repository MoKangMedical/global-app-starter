#!/bin/bash

# 出海之父 - 快速启动脚本
# 使用方法: ./scripts/start.sh

set -e

echo "=== 出海之父 - 快速启动 ==="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "✗ 未检测到 Node.js"
    echo "请安装 Node.js 18+: https://nodejs.org/"
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "✗ 未检测到 npm"
    echo "请安装 npm"
    exit 1
fi

echo "✓ Node.js $(node --version)"
echo "✓ npm $(npm --version)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "=== 安装依赖 ==="
    npm install
    echo "✓ 依赖安装完成"
    echo ""
fi

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    echo "=== 创建环境变量文件 ==="
    cp .env.example .env.local
    echo "✓ 已创建 .env.local"
    echo ""
    echo "请编辑 .env.local 文件，配置以下变量:"
    echo "  - NEXT_PUBLIC_SITE_URL"
    echo "  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    echo "  - STRIPE_SECRET_KEY"
    echo ""
fi

echo "=== 启动开发服务器 ==="
echo ""
echo "访问以下地址查看应用:"
echo "  - 主页: http://localhost:3000"
echo "  - 演示页: http://localhost:3000/en/demo"
echo "  - 控制台: http://localhost:3000/en/dashboard"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev