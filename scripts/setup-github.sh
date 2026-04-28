#!/bin/bash

# GitHub 配置脚本
# 使用方法: ./scripts/setup-github.sh

echo "=== GitHub 配置脚本 ==="
echo ""

# 检查是否已配置 Git
if ! git config user.name > /dev/null 2>&1; then
    echo "请配置 Git 用户信息:"
    read -p "请输入您的 GitHub 用户名: " github_username
    read -p "请输入您的 GitHub 邮箱: " github_email
    
    git config --global user.name "$github_username"
    git config --global user.email "$github_email"
    echo "✓ Git 用户信息已配置"
else
    echo "✓ Git 用户信息已配置: $(git config user.name) <$(git config user.email)>"
fi

echo ""
echo "=== 配置 GitHub 认证 ==="
echo ""
echo "请选择认证方式:"
echo "1. HTTPS + Personal Access Token (推荐)"
echo "2. SSH 密钥"
echo ""

read -p "请选择 (1 或 2): " auth_choice

if [ "$auth_choice" = "1" ]; then
    echo ""
    echo "=== HTTPS 认证配置 ==="
    echo ""
    echo "请按照以下步骤操作:"
    echo "1. 访问 https://github.com/settings/tokens"
    echo "2. 点击 'Generate new token' -> 'Generate new token (classic)'"
    echo "3. 设置备注: 'Global App Starter'"
    echo "4. 选择权限: repo (全部), workflow"
    echo "5. 点击 'Generate token'"
    echo "6. 复制生成的 token"
    echo ""
    read -p "请输入您的 Personal Access Token: " github_token
    
    # 配置 Git 凭据存储
    git config credential.helper store
    
    # 创建凭据文件
    echo "https://MoKangMedical:${github_token}@github.com" > ~/.git-credentials
    chmod 600 ~/.git-credentials
    
    echo "✓ GitHub 凭据已配置"
    
elif [ "$auth_choice" = "2" ]; then
    echo ""
    echo "=== SSH 密钥配置 ==="
    echo ""
    
    # 检查是否已有 SSH 密钥
    if [ -f ~/.ssh/id_rsa.pub ] || [ -f ~/.ssh/id_ed25519.pub ]; then
        echo "✓ 检测到现有 SSH 密钥"
    else
        echo "未检测到 SSH 密钥，正在生成..."
        ssh-keygen -t ed25519 -C "contact@mokangmedical.com" -f ~/.ssh/id_ed25519 -N ""
        echo "✓ SSH 密钥已生成"
    fi
    
    # 显示公钥
    echo ""
    echo "请将以下公钥添加到 GitHub:"
    echo ""
    if [ -f ~/.ssh/id_ed25519.pub ]; then
        cat ~/.ssh/id_ed25519.pub
    else
        cat ~/.ssh/id_rsa.pub
    fi
    echo ""
    echo "添加步骤:"
    echo "1. 访问 https://github.com/settings/ssh/new"
    echo "2. 设置标题: 'Global App Starter'"
    echo "3. 粘贴上面的公钥"
    echo "4. 点击 'Add SSH key'"
    echo ""
    read -p "添加完成后按 Enter 继续..."
    
    # 更新远程仓库 URL 为 SSH
    git remote set-url origin git@github.com:MoKangMedical/global-app-starter.git
    echo "✓ 远程仓库 URL 已更新为 SSH"
    
else
    echo "无效选择"
    exit 1
fi

echo ""
echo "=== 测试连接 ==="
echo ""

if [ "$auth_choice" = "1" ]; then
    # 测试 HTTPS 连接
    git ls-remote https://github.com/MoKangMedical/global-app-starter.git > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ GitHub HTTPS 连接成功"
    else
        echo "✗ GitHub HTTPS 连接失败"
        echo "请检查您的 Personal Access Token 是否正确"
    fi
else
    # 测试 SSH 连接
    ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"
    if [ $? -eq 0 ]; then
        echo "✓ GitHub SSH 连接成功"
    else
        echo "✗ GitHub SSH 连接失败"
        echo "请检查您的 SSH 密钥是否已添加到 GitHub"
    fi
fi

echo ""
echo "=== 推送代码 ==="
echo ""

# 检查是否有代理配置
if [ -n "$http_proxy" ] || [ -n "$https_proxy" ]; then
    echo "检测到代理配置，尝试使用代理推送..."
    git -c http.proxy=socks5://127.0.0.1:7890 -c https.proxy=socks5://127.0.0.1:7890 push -u origin main
else
    echo "尝试直接推送..."
    git push -u origin main
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ 代码推送成功!"
    echo ""
    echo "您的项目已发布到: https://github.com/MoKangMedical/global-app-starter"
    echo ""
else
    echo ""
    echo "✗ 代码推送失败"
    echo ""
    echo "请尝试以下方法:"
    echo "1. 检查网络连接"
    echo "2. 配置代理: export http_proxy=socks5://127.0.0.1:7890"
    echo "3. 使用 SSH 方式推送"
    echo ""
fi

echo "=== 完成 ==="