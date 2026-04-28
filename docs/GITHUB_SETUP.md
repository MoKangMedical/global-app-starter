# GitHub 配置指南

## 方法 1: HTTPS + Personal Access Token (推荐)

### 步骤 1: 生成 Personal Access Token
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" -> "Generate new token (classic)"
3. 设置备注: "Global App Starter"
4. 选择权限:
   - repo (全部)
   - workflow
5. 点击 "Generate token"
6. 复制生成的 token (只会显示一次)

### 步骤 2: 配置 Git 凭据
```bash
# 配置 Git 用户信息
git config --global user.name "您的GitHub用户名"
git config --global user.email "您的GitHub邮箱"

# 配置凭据存储
git config credential.helper store

# 创建凭据文件
echo "https://您的用户名:您的token@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
```

### 步骤 3: 推送代码
```bash
# 如果需要代理
unset no_proxy && unset NO_PROXY
git -c http.proxy=socks5://127.0.0.1:7890 -c https.proxy=socks5://127.0.0.1:7890 push -u origin main

# 如果不需要代理
git push -u origin main
```

## 方法 2: SSH 密钥

### 步骤 1: 生成 SSH 密钥
```bash
# 生成 ED25519 密钥 (推荐)
ssh-keygen -t ed25519 -C "您的邮箱@example.com" -f ~/.ssh/id_ed25519 -N ""

# 或者生成 RSA 密钥
ssh-keygen -t rsa -b 4096 -C "您的邮箱@example.com" -f ~/.ssh/id_rsa -N ""
```

### 步骤 2: 添加公钥到 GitHub
1. 复制公钥内容:
```bash
cat ~/.ssh/id_ed25519.pub
# 或
cat ~/.ssh/id_rsa.pub
```

2. 访问 https://github.com/settings/ssh/new
3. 设置标题: "Global App Starter"
4. 粘贴公钥内容
5. 点击 "Add SSH key"

### 步骤 3: 更新远程仓库 URL
```bash
git remote set-url origin git@github.com:MoKangMedical/global-app-starter.git
```

### 步骤 4: 测试连接
```bash
ssh -T git@github.com
```

### 步骤 5: 推送代码
```bash
git push -u origin main
```

## 方法 3: 使用 GitHub CLI

### 步骤 1: 安装 GitHub CLI
```bash
# macOS
brew install gh

# 或者访问 https://cli.github.com/ 下载
```

### 步骤 2: 登录 GitHub
```bash
gh auth login --hostname github.com --git-protocol https --web
```

### 步骤 3: 推送代码
```bash
gh repo create MoKangMedical/global-app-starter --public --source=. --remote=origin --push
```

## 常见问题

### Q: 推送时提示 "Permission denied"
A: 检查以下几点:
1. 确认 Personal Access Token 有足够权限
2. 确认 SSH 密钥已添加到 GitHub
3. 确认远程仓库 URL 正确

### Q: 推送时提示 "Failed to connect"
A: 尝试配置代理:
```bash
git config http.proxy socks5://127.0.0.1:7890
git config https.proxy socks5://127.0.0.1:7890
```

### Q: 如何清除 Git 凭据?
A: 执行以下命令:
```bash
git credential reject <<EOF
protocol=https
host=github.com
EOF
```

## 验证配置

配置完成后，执行以下命令验证:
```bash
# 检查远程仓库
git remote -v

# 检查 Git 配置
git config --list

# 测试推送
git push -u origin main
```

## 启用 GitHub Pages

推送成功后，启用 GitHub Pages:
1. 访问 https://github.com/MoKangMedical/global-app-starter/settings/pages
2. Source: "Deploy from a branch"
3. Branch: main
4. Folder: / (root)
5. 点击 "Save"

您的项目将在以下地址可访问:
https://mokangmedical.github.io/global-app-starter/