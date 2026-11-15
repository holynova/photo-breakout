# 破框 · Photo Breakout

把照片变成破框图。浏览器自动识别人像，让手、衣服和头发遮住白色分隔线。可选方格或 2–12 条竖格，调整线宽和外框，用画笔修正蒙版，再导出 PNG。手机上通过底部面板操作。

Create a breakout photo with white grid lines or vertical strips. The browser segments the person and uses the mask to keep them in front of the lines. Adjust the frame, touch up the mask, and export a PNG. The editor supports desktop and mobile layouts.

<img src="./assets/screenshot.png" width="390" alt="手机工作台的竖格模式">

[桌面工作台截图 / Desktop screenshot](./assets/screenshot-desktop.png)

- [Cloudflare Demo](https://xiaosang.cc/photo-breakout/)
- [GitHub Repo](https://github.com/holynova/photo-breakout)

<img src="./assets/qr.png" width="180" alt="扫码打开破框">

## 本地运行 / Run locally

```sh
npm ci
npm run dev
```

照片和蒙版在本机处理。Umami 记录页面访问。首次打开自选照片时会加载 MediaPipe 模型及运行库，模型约 16 MB。PNG 导出长边最高 1800 像素。

## 发布 / Deploy

Cloudflare Workers Static Assets 由 `xiaosang-portfolio` 提供，公开路径为 `/photo-breakout/`。从 `main` 构建，并将产物同步到作品集 `master`。

```sh
npm run check
npm run deploy:check
npm run stage:portfolio -- /path/to/holynova.github.io
```

在作品集仓库提交并推送 `photo-breakout/` 后，从同一提交执行手动部署。

```sh
npx --yes wrangler@4.128.0 deploy --dry-run --config wrangler.jsonc
npx --yes wrangler@4.128.0 deploy --config wrangler.jsonc
```

示例图由 ImageGen 生成。人像分割使用 Google MediaPipe SelfieMulticlass，运行库和模型采用 Apache 2.0。 [MediaPipe 模型卡](https://storage.googleapis.com/mediapipe-assets/Model%20Card%20Multiclass%20Segmentation.pdf)
