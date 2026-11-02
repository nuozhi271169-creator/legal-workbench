# 法律人专业工作台（联网后端版）

这是在你之前本地版基础上搭建的**带后端版本**。数据存在服务器的 `data.json` 文件里，刷新、换电脑、关浏览器都不会丢失。

## 本地运行步骤（需要安装 Node.js）

1. 下载整个文件夹（或把这些文件放到同一个目录）。
2. 打开终端 / 命令提示符，进入这个文件夹。
3. 运行：
   ```bash
   npm install
   npm start
   ```
4. 浏览器打开：http://localhost:3000

## 部署到网上（免费）

推荐使用 [Render.com](https://render.com) 或 [Railway.app](https://railway.app)：

1. 把这个文件夹上传到 GitHub 仓库。
2. 在 Render/Railway 新建 Web Service，选择该仓库。
3. 构建命令：`npm install`
4. 启动命令：`npm start`
5. 部署完成后会得到一个公开网址，用手机、电脑都能访问。

## 功能说明

- 日历事项、期限追踪、摘录本、每日推荐全部保存在服务器。
- 机器人或其他工具可以通过 API 写入数据（例如 `/api/ai`）。
- 目前没有登录验证，**仅适合个人使用**。如果公开部署，建议后续加上简单密码保护。

## API 接口（供机器人调用）

- `GET /api/data` 获取全部数据
- `POST /api/events` 添加事项
- `POST /api/deadlines` 添加期限
- `POST /api/excerpts` 添加摘录
- `POST /api/ai` 保存每日推荐（body: `{ "content": "..." }`）

数据文件在 `data.json`，可直接备份。

---

需要我再帮你加登录保护、更好的提醒、或者优化界面，直接说即可。