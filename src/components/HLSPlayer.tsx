'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  RotateCcw
} from 'lucide-react'
import './HLSPlayer.css'

interface HLSPlayerProps {
  url: string
  autoPlay?: boolean
  className?: string
}

interface PlayerState {
  playing: boolean
  muted: boolean
  volume: number
  duration: number
  currentTime: number
  buffered: number
  fullscreen: boolean
  ready: boolean
  error: string | null
}

export default function HLSPlayer({ url, autoPlay = true, className = '' }: HLSPlayerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [state, setState] = useState<PlayerState>({
    playing: autoPlay,
    muted: true, // 自动播放需要静音
    volume: 0.8,
    duration: 0,
    currentTime: 0,
    buffered: 0,
    fullscreen: false,
    ready: false,
    error: null
  })

  // 播放/暂停切换
  const handlePlayPause = useCallback(() => {
    setState(prev => ({ ...prev, playing: !prev.playing }))
  }, [])

  // 静音切换
  const handleMuteToggle = useCallback(() => {
    setState(prev => ({ ...prev, muted: !prev.muted }))
  }, [])

  // 音量变化
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value)
    setState(prev => ({ ...prev, volume, muted: volume === 0 }))
  }, [])

  // 进度条变化
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value)
    playerRef.current?.seekTo(seekTime)
    setState(prev => ({ ...prev, currentTime: seekTime }))
  }, [])

  // 全屏切换
  const handleFullscreenToggle = useCallback(() => {
    if (!containerRef.current) return

    if (!state.fullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }, [state.fullscreen])

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setState(prev => ({ 
        ...prev, 
        fullscreen: !!document.fullscreenElement 
      }))
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // 重新加载播放器
  const handleReload = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      error: null, 
      ready: false,
      currentTime: 0 
    }))
    
    // 强制重新加载
    if (playerRef.current) {
      playerRef.current.seekTo(0)
    }
  }, [])

  // 播放器事件处理
  const handleReady = useCallback(() => {
    console.log('Player ready')
    setState(prev => ({ ...prev, ready: true, error: null }))
  }, [])

  const handleStart = useCallback(() => {
    console.log('Player started')
    setState(prev => ({ ...prev, ready: true }))
  }, [])

  // 格式化时间显示
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0
  const volumePercentage = state.muted ? 0 : state.volume * 100

  // 使用 useEffect 来更新 CSS 变量
  useEffect(() => {
    const progressSlider = document.getElementById('progress-slider')
    const volumeSlider = document.getElementById('volume-slider')
    
    if (progressSlider) {
      progressSlider.style.setProperty('--progress', `${progressPercentage}%`)
    }
    if (volumeSlider) {
      volumeSlider.style.setProperty('--progress', `${volumePercentage}%`)
    }
  }, [progressPercentage, volumePercentage])

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${className} ${
        state.fullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* 播放器容器 */}
      <div className="relative w-full aspect-video">
        <ReactPlayer
          ref={playerRef}
          src={url}
          playing={state.playing}
          muted={state.muted}
          volume={state.volume}
          width="100%"
          height="100%"
          controls={false}
          onReady={handleReady}
          onStart={handleStart}
          config={{
            hls: {
              enableWorker: true,
              lowLatencyMode: true,
            }
          }}
          className="absolute inset-0"
        />

        {/* 错误提示 */}
        {state.error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center text-white p-6">
              <div className="text-lg mb-4">{state.error}</div>
              <button
                onClick={handleReload}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
                重新加载
              </button>
            </div>
          </div>
        )}

        {/* 加载提示 */}
        {!state.ready && !state.error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-lg">正在加载...</div>
          </div>
        )}

        {/* 控制条 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* 进度条 */}
          <div className="mb-3">
            <label htmlFor="progress-slider" className="sr-only">播放进度</label>
            <input
              id="progress-slider"
              type="range"
              min={0}
              max={state.duration || 0}
              value={state.currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer player-slider"
            />
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 播放/暂停 */}
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-red-400 transition-colors"
                aria-label={state.playing ? "暂停" : "播放"}
              >
                {state.playing ? <Pause size={24} /> : <Play size={24} />}
              </button>

              {/* 音量控制 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMuteToggle}
                  className="text-white hover:text-red-400 transition-colors"
                  aria-label={state.muted ? "取消静音" : "静音"}
                >
                  {state.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <label htmlFor="volume-slider" className="sr-only">音量</label>
                <input
                  id="volume-slider"
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={state.muted ? 0 : state.volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer player-slider"
                />
              </div>

              {/* 时间显示 */}
              <div className="text-white text-sm">
                {formatTime(state.currentTime)} / {formatTime(state.duration)}
              </div>
            </div>

            {/* 全屏按钮 */}
            <button
              onClick={handleFullscreenToggle}
              className="text-white hover:text-red-400 transition-colors"
              aria-label={state.fullscreen ? "退出全屏" : "全屏"}
            >
              {state.fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
