# HLS 流媒体播放器

基于 React Player 的现代化 HLS 流媒体播放器，支持自动播放、全屏显示、黑夜模式等功能。

## 🎥 功能特性

- ✅ **HLS 流媒体播放** - 支持 HLS 格式的直播和点播
- ✅ **自动播放** - 页面加载时自动开始播放（静音状态）
- ✅ **完整播放控制** - 播放/暂停、进度条、音量控制
- ✅ **全屏支持** - 支持全屏播放模式
- ✅ **响应式设计** - 兼容桌面端和移动端
- ✅ **黑夜模式** - 支持明暗主题切换
- ✅ **动态 URL** - 可以动态更换流媒体地址
- ✅ **错误处理** - 播放错误时显示重试按钮
- ✅ **加载状态** - 显示加载进度

## 🛠 技术栈

- **框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **播放器**: React Player 3.3.2
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **语言**: TypeScript
- **包管理**: pnpm

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- pnpm (推荐) 或 npm/yarn

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 应用将运行在 http://localhost:3000
```

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页
│   └── globals.css        # 全局样式
├── components/             # React 组件
│   ├── HLSPlayer.tsx      # HLS 播放器组件
│   ├── HLSPlayer.css      # 播放器样式
│   ├── URLInput.tsx       # URL 输入组件
│   └── ThemeToggle.tsx    # 主题切换组件
└── contexts/              # React Context
    └── ThemeContext.tsx   # 主题上下文
```

## 🎮 使用方法

### 基本用法

```tsx
import HLSPlayer from '@/components/HLSPlayer'

function App() {
  return (
    <HLSPlayer 
      url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      autoPlay={true}
      className="w-full max-w-4xl"
    />
  )
}
```

### 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `url` | `string` | 必填 | HLS 流媒体 URL |
| `autoPlay` | `boolean` | `true` | 是否自动播放 |
| `className` | `string` | `''` | 自定义 CSS 类名 |

### 主题切换

```tsx
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* 其他组件 */}
    </ThemeProvider>
  )
}
```

## 🌟 示例 HLS 地址

项目内置了几个测试用的 HLS 流媒体地址：

1. **Big Buck Bunny (测试流)**
   ```
   https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
   ```

2. **Apple 示例流**
   ```
   https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8
   ```

## 🎨 自定义样式

### 修改播放器颜色

可以通过修改 `src/components/HLSPlayer.css` 文件来自定义播放器样式：

```css
/* 修改进度条颜色 */
.player-slider {
  background: linear-gradient(
    to right,
    #your-color 0%,
    #your-color var(--progress, 0%),
    rgba(255, 255, 255, 0.3) var(--progress, 0%),
    rgba(255, 255, 255, 0.3) 100%
  );
}

/* 修改按钮悬停颜色 */
.text-white.hover\:text-red-400:hover {
  color: #your-hover-color;
}
```

### 自定义主题

可以在 `src/app/globals.css` 中修改主题变量：

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

## 🔧 配置选项

### React Player 配置

HLS 播放器使用以下配置：

```tsx
config={{
  hls: {
    enableWorker: true,      // 启用 Web Worker
    lowLatencyMode: true,    // 低延迟模式
  }
}}
```

### 更多配置选项

可以参考 [React Player 官方文档](https://github.com/CookPete/react-player) 了解更多配置选项。

## 📱 移动端优化

- 自动适配移动端屏幕尺寸
- 触摸友好的控制界面
- 支持移动端全屏播放
- 响应式布局设计

## 🐛 故障排除

### 常见问题

1. **视频无法自动播放**
   - 现代浏览器要求视频必须静音才能自动播放
   - 确保 `muted={true}` 属性已设置

2. **HLS 流无法播放**
   - 检查流地址是否正确
   - 确保流服务器支持 CORS
   - 检查网络连接

3. **构建错误**
   - 确保所有依赖已正确安装
   - 检查 TypeScript 类型错误
   - 运行 `pnpm build` 查看详细错误信息

### 调试技巧

启用 React Player 的调试模式：

```tsx
<ReactPlayer
  onReady={() => console.log('Player ready')}
  onError={(error) => console.error('Player error:', error)}
  onProgress={(progress) => console.log('Progress:', progress)}
/>
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

---

**享受流媒体播放！** 🎬
