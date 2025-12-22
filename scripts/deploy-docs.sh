#!/usr/bin/env bash

# 脚本说明：将 VitePress 文档构建并部署到 GitHub Pages (gh-pages 分支)
# 用法: ./scripts/deploy-docs.sh

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 开始构建文档...${NC}"

# 进入 docs 目录并构建
cd packages/docs
pnpm build

echo -e "${GREEN}✅ 文档构建完成${NC}"

# 进入构建输出目录
cd .vitepress/dist

echo -e "${YELLOW}🚀 正在部署到 gh-pages 分支...${NC}"

# 初始化 git 仓库
git init
git add -A
git commit -m "docs: deploy documentation $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 gh-pages 分支
# 使用 --force 因为我们每次都是全新的提交
git push -f https://github.com/zhangzhichaolove/vue3-media.git main:gh-pages

echo -e "${GREEN}✅ 文档部署成功！${NC}"
echo -e "${GREEN}🌐 访问地址: https://zhangzhichaolove.github.io/vue3-media/${NC}"

# 返回项目根目录
cd ../../../..
