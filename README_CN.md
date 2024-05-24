<div align="center">

# 屏幕截图转代码

简体中文 / [English](./README.md)

</div>
一个简单的工具，使用AI将屏幕截图、模型和Figma设计转换成干净、功能性的代码。现在支持gpt-4O

https://github.com/abi/screenshot-to-code/assets/23818/6cebadae-2fe3-4986-ac6a-8fb9db030045

支持的技术栈：

- HTML + Tailwind
- React + Tailwind
- Vue + Tailwind
- Bootstrap
- Ionic + Tailwind
- SVG

支持的AI模型：

- GPT-4O - Best model!
- GPT-4 Turbo (Apr 2024)
- GPT-4 Vision (Nov 2023)
- Claude 3 Sonnet
- DALL-E 3 用于图像生成

查看[示例](#-示例)部分以下了解更多演示。

我们还刚刚添加了实验性支持，可以将网站的视频/屏幕录像转化为功能原型。

![google in app quick 3](https://github.com/abi/screenshot-to-code/assets/23818/8758ffa4-9483-4b9b-bb66-abd6d1594c33)

[了解更多关于视频的信息](https://github.com/abi/screenshot-to-code/wiki/Screen-Recording-to-Code).

[在Twitter上关注我获取更新](https://twitter.com/_abi_).

赞助商
<a href="https://platform.sh/try-it-now/?utm_source=fastapi-signup&utm_medium=banner&utm_campaign=FastAPI-signup-June-2023" target="_blank" title="在现代、可靠和安全的 PaaS 上构建、运行和扩展您的应用。"><img src="https://fastapi.tiangolo.com/img/sponsors/platform-sh.png"></a>

## 🚀 无需安装即可试用

[在托管版本上试用（收费）](https://screenshottocode.com).

## 🛠 开始使用

应用程序有一个React/Vite前端和一个FastAPI后端。你需要拥有OpenAI API密钥，可访问GPT-4 Vision API，或者如果你想使用Claude Sonnet，需要Anthropic的密钥，或者用于实验性视频支持。

运行后端（我使用Poetry进行包管理 - 如果你没有，请使用`pip install poetry`安装）：

```bash
cd backend
echo "OPENAI_API_KEY=sk-your-key" > .env
poetry install
poetry shell
poetry run uvicorn main:app --reload --port 7001
```

如果你想使用Anthropic，请在`backend/.env`中添加`ANTHROPIC_API_KEY`，并在Anthropic中获取你的API密钥。

运行前端：

```bash
cd frontend
yarn
yarn dev
```

打开 http://localhost:5173 使用应用程序。

如果你想在不同的端口上运行后端，请更新`frontend/.env.local`中的VITE_WS_BACKEND_URL

为了调试目的，如果你不想浪费GPT4-Vision的使用次数，你可以在模拟模式下运行后端（它会流式传输预录的响应）：

```bash
MOCK=true poetry run uvicorn main:app --reload --port 7001
```

## Docker

如果你的系统上安装了Docker，在根目录中运行：

```bash
echo "OPENAI_API_KEY=sk-your-key" > .env
docker-compose up -d --build
```

应用程序将在 http://localhost:5173 运行。注意，使用这个设置无法开发应用程序，因为文件更改不会触发重建。

## 🙋‍♂️ 常见问题解答

- **在设置后端时遇到错误，如何解决？** [试试这个](https://github.com/abi/screenshot-to-code/issues/3#issuecomment-1814777959)。如果仍然不起作用，请开一个问题。
- **如何获取OpenAI API密钥？** 参见https://github.com/abi/screenshot-to-code/blob/main/Troubleshooting.md
- **我怎样才能配置OpenAI代理？** - 如果你无法直接访问OpenAI API（例如因为国家限制），你可以尝试一个 ***，或者你可以配置OpenAI的基本URL以使用代理：在`backend/.env`中设置OPENAI_BASE_URL，或者直接在UI的设置对话框中设置。确保URL中包含"v1"路径，例如： `https://xxx.xxxxx.xxx/v1`
- **如何更新前端连接的后端主机？** - 在front/.env.local中配置VITE_HTTP_BACKEND_URL和VITE_WS_BACKEND_URL 例如设置VITE_HTTP_BACKEND_URL=http://124.10.20.1:7001
- **在运行后端时看到UTF-8错误怎么办？** - 在windows上，用notepad++打开.env文件，然后去到编码选择UTF-8。
- **如何提供反馈？** 有关反馈、功能请求和错误报告，请开一个问题或在[Twitter](https://twitter.com/_abi_)上联系我。

## 📚 示例

**纽约时报**

| 原始                                                                                                                                                          | 复制                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="1238" alt="Screenshot 2023-11-20 at 12 54 03 PM" src="https://github.com/abi/screenshot-to-code/assets/23818/3b644dfa-9ca6-4148-84a7-3405b6671922"> | <img width="1414" alt="Screenshot 2023-11-20 at 12 59 56 PM" src="https://github.com/abi/screenshot-to-code/assets/23818/26201c9f-1a28-4f35-a3b1-1f04e2b8ce2a"> |

**Instagram 页面（非Taylor Swift图片）**

https://github.com/abi/screenshot-to-code/assets/23818/503eb86a-356e-4dfc-926a-dabdb1ac7ba1

**Hacker News** 但首次获取颜色错误，因此我们会推送修正

https://github.com/abi/screenshot-to-code/assets/23818/3fec0f77-44e8-4fb3-a769-ac7410315e5d

## 🌍 托管版本

🆕 [在这里尝试（收费）](https://screenshottocode.com)。或查看[开始使用](#-开始使用)以了解本地安装说明，并使用您自己的API密钥。

[!["给我买杯咖啡"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/abiraja)