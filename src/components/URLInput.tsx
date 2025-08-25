'use client'

import { useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'

interface URLInputProps {
  currentUrl: string
  onUrlChange: (url: string) => void
  className?: string
}

export default function URLInput({ currentUrl, onUrlChange, className = '' }: URLInputProps) {
  const [url, setUrl] = useState(currentUrl)
  const [isValid, setIsValid] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 基本的URL验证
    try {
      new URL(url)
      setIsValid(true)
      onUrlChange(url)
    } catch {
      // 如果不是完整URL，检查是否是相对路径或简单字符串
      if (url.trim()) {
        setIsValid(true)
        onUrlChange(url)
      } else {
        setIsValid(false)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setIsValid(true) // 重置验证状态
  }

  // 预设的示例HLS URL
  const exampleUrls = [
    {
      name: 'Big Buck Bunny (测试流)',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
    },
    {
      name: 'Apple 示例流',
      url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8'
    }
  ]

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        流媒体URL设置
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="stream-url" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            HLS 流媒体 URL
          </label>
          <div className="flex gap-2 min-w-0"> {/* 添加min-w-0防止flex溢出 */}
            <input
              id="stream-url"
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder="输入HLS流媒体URL (例如: https://example.com/stream.m3u8)"
              className={`
                flex-1 min-w-0 px-3 py-2 border rounded-lg text-black
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
                ${isValid 
                  ? 'border-gray-300 dark:border-gray-600' 
                  : 'border-red-500 dark:border-red-500'
                }
              `}
            />
            <button
              type="submit"
              className="
                flex-shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                transition-colors duration-200 flex items-center gap-2
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                dark:focus:ring-offset-gray-800
              "
            >
              <Play size={16} />
              播放
            </button>
          </div>
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">
              请输入有效的URL
            </p>
          )}
        </div>
      </form>

      {/* 示例URL */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          示例流媒体：
        </h3>
        <div className="space-y-2">
          {exampleUrls.map((example, index) => (
            <button
              key={`example-${index}`}
              onClick={() => {
                setUrl(example.url)
                setIsValid(true)
              }}
              className="
                w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
                group relative
              "
              title={example.url} // 添加tooltip
            >
              <div className="flex items-center justify-between min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {example.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate pr-2">
                    {example.url}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ExternalLink 
                    size={16} 
                    className="text-gray-400 group-hover:text-red-500 transition-colors" 
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 当前播放URL显示 */}
      {currentUrl && currentUrl !== url && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">当前播放：</div>
          <div 
            className="text-sm font-mono text-gray-800 dark:text-gray-200 truncate cursor-pointer hover:text-red-500 transition-colors" 
            title={currentUrl} // 添加tooltip显示完整URL
          >
            {currentUrl}
          </div>
        </div>
      )}
    </div>
  )
}
