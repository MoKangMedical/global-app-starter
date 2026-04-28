#!/bin/bash

# 出海之父 - 部署脚本
# 使用方法: ./scripts/deploy.sh

set -e

echo "=== 出海之父 - 部署脚本 ==="
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

# 安装依赖
echo "=== 安装依赖 ==="
npm install

if [ $? -ne 0 ]; then
    echo "✗ 依赖安装失败"
    exit 1
fi

echo "✓ 依赖安装成功"
echo ""

# 类型检查
echo "=== 类型检查 ==="
npm run type-check

if [ $? -ne 0 ]; then
    echo "✗ 类型检查失败"
    exit 1
fi

echo "✓ 类型检查通过"
echo ""

# 代码检查
echo "=== 代码检查 ==="
npm run lint

if [ $? -ne 0 ]; then
    echo "✗ 代码检查失败"
    exit 1
fi

echo "✓ 代码检查通过"
echo ""

# 构建项目
echo "=== 构建项目 ==="
npm run build

if [ $? -ne 0 ]; then
    echo "✗ 项目构建失败"
    exit 1
fi

echo "✓ 项目构建成功"
echo ""

# 部署选项
echo "=== 选择部署方式 ==="
echo ""
echo "1. 本地预览"
echo "2. 部署到 Vercel"
echo "3. 部署到 Netlify"
echo "4. 构建 Docker 镜像"
echo "5. 仅构建，不部署"
echo ""

read -p "请选择 (1-5): " deploy_choice

case $deploy_choice in
    1)
        echo ""
        echo "=== 启动本地预览 ==="
        echo ""
        echo "访问 http://localhost:3000 查看应用"
        echo "访问 http://localhost:3000/en/dashboard 查看出海控制台"
        echo ""
        echo "按 Ctrl+C 停止服务器"
        echo ""
        npm start
        ;;
    2)
        echo ""
        echo "=== 部署到 Vercel ==="
        echo ""
        
        # 检查 Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo "安装 Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "正在部署到 Vercel..."
        vercel --prod
        
        echo ""
        echo "✓ 部署成功!"
        echo ""
        ;;
    3)
        echo ""
        echo "=== 部署到 Netlify ==="
        echo ""
        
        # 检查 Netlify CLI
        if ! command -v netlify &> /dev/null; then
            echo "安装 Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        echo "正在部署到 Netlify..."
        netlify deploy --prod --dir=.next
        
        echo ""
        echo "✓ 部署成功!"
        echo ""
        ;;
    4)
        echo ""
        echo "=== 构建 Docker 镜像 ==="
        echo ""
        
        # 检查 Docker
        if ! command -v docker &> /dev/null; then
            echo "✗ 未检测到 Docker"
            echo "请安装 Docker: https://docs.docker.com/get-docker/"
            exit 1
        fi
        
        # 创建 Dockerfile
        if [ ! -f Dockerfile ]; then
            cat > Dockerfile << 'EOF'
FROM node:18-alpine AS base

# 依赖安装阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 生产阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
EOF
            echo "✓ Dockerfile 已创建"
        fi
        
        echo "正在构建 Docker 镜像..."
        docker build -t global-app-starter .
        
        echo ""
        echo "✓ Docker 镜像构建成功!"
        echo ""
        echo "运行容器:"
        echo "  docker run -p 3000:3000 global-app-starter"
        echo ""
        ;;
    5)
        echo ""
        echo "=== 构建完成 ==="
        echo ""
        echo "项目已构建到 .next 目录"
        echo ""
        echo "手动部署:"
        echo "  npm start"
        echo ""
        ;;
    *)
        echo "无效选择"
        exit 1
        ;;
esac

echo ""
echo "=== 部署完成 ==="
echo ""
echo "项目信息:"
echo "  - GitHub: https://github.com/MoKangMedical/global-app-starter"
echo "  - 文档: ./docs/"
echo "  - 出海控制台: /dashboard"
echo ""
echo "感谢使用出海之父!"