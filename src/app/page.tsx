'use client'

import { useState } from 'react'
import HLSPlayer from '../components/HLSPlayer'
import URLInput from '../components/URLInput'
import ThemeToggle from '../components/ThemeToggle'
import { Monitor, Smartphone } from 'lucide-react'

export default function Home() {
  // 默认的HLS流媒体URL
  const [currentUrl, setCurrentUrl] = useState(
    'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  )

  const handleUrlChange = (newUrl: string) => {
    setCurrentUrl(newUrl)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* 头部 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  HLS 流媒体播放器
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  基于 React Player 的现代化播放器
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Monitor className="w-4 h-4" />
                <span>桌面端</span>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <Smartphone className="w-4 h-4" />
                <span>移动端</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 播放器区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  视频播放器
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  支持 HLS 流媒体播放，具有自适应宽度和全屏功能
                </p>
              </div>
              
              <HLSPlayer 
                url={currentUrl}
                autoPlay={true}
                className="w-full"
              />
              
              {/* 播放器信息 */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  播放器功能：
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 自动播放 HLS 流媒体内容</li>
                  <li>• 完整的播放控制（播放、暂停、进度条、音量）</li>
                  <li>• 响应式设计，支持全屏显示</li>
                  <li>• 支持动态更换流媒体 URL</li>
                  <li>• 移动端和桌面端兼容</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 控制面板 */}
          <div className="space-y-6">
            {/* URL输入组件 */}
            <URLInput 
              currentUrl={currentUrl}
              onUrlChange={handleUrlChange}
            />

            {/* 技术栈信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                技术栈
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">框架</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Next.js 15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">UI 库</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">React 19</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">播放器</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">React Player</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">样式</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Tailwind CSS 4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">包管理</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">pnpm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">类型系统</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">TypeScript</span>
                </div>
              </div>
            </div>

            {/* 使用说明 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                使用说明
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">1. 更换流媒体：</strong>
                  <br />在上方URL输入框中输入新的HLS流媒体地址，点击播放按钮。
                </div>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">2. 播放控制：</strong>
                  <br />使用播放器底部的控制栏进行播放、暂停、调节音量等操作。
                </div>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">3. 全屏模式：</strong>
                  <br />点击播放器右下角的全屏按钮进入全屏播放模式。
                </div>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">4. 主题切换：</strong>
                  <br />点击右上角的主题切换按钮在明暗模式间切换。
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>© 2025 HLS 流媒体播放器 - 使用 React Player 构建</p>
            <p className="mt-2">支持 HLS、DASH 和多种视频格式</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
