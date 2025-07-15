import React, { useEffect, useRef, useState } from 'react'
import { Close, Pause, PlayArrow, VolumeOff, VolumeUp } from '@mui/icons-material';

interface AudioProps {
    audioUrl: string;
    surahName: string;
    reciterName?: string;
    onClose?: () => void;
}

const AudioPlayer: React.FC<AudioProps> = ({ audioUrl, surahName, reciterName, onClose }) => {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const formatTime = (time: number) => {
        if(isNaN(time)) return '0:00';

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const togglePlayPause = () => {
        if(audioRef.current) {
			if(isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying)
		}
    }

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = parseFloat(e.target.value);
		setCurrentTime(newTime);

		if(audioRef.current) {
			audioRef.current.currentTime = newTime
		}
	}

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);

		if(audioRef.current) {
			audioRef.current.volume = newVolume
		}
		setIsMuted(newVolume === 0)
	}

	const toggleMute = () => {
		if(audioRef.current) {
			if(isMuted) {
				audioRef.current.volume = volume;
				setIsMuted(false);
			} else {
				audioRef.current.volume = 0;
				setIsMuted(true)
			}
		}
	}

	useEffect(() => {
		const audio = audioRef.current;
		if(!audio) return;

		const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
		const handleLoadedData = () => setIsLoading(false);
		const handleDurationChange = () => setDuration(audio.duration);
		const handleWaiting = () => setIsLoading(true);
    	const handleCanPlay = () => setIsLoading(false);
    	const handleEnded = () => setIsPlaying(false);

		audio.addEventListener('timeupdate', handleTimeUpdate);
		audio.addEventListener('durationchange', handleDurationChange);
		audio.addEventListener('loadeddata', handleLoadedData);
		audio.addEventListener('waiting', handleWaiting);
		audio.addEventListener('canplay', handleCanPlay);
		audio.addEventListener('ended', handleEnded);

		return () => {
			audio.removeEventListener('timeupdate', handleTimeUpdate);
			audio.removeEventListener('durationchange', handleDurationChange);
			audio.removeEventListener('loadeddata', handleLoadedData);
			audio.removeEventListener('waiting', handleWaiting);
			audio.removeEventListener('canplay', handleCanPlay);
			audio.removeEventListener('ended', handleEnded);
		}
	})
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50'>
		<audio ref={audioRef} src={audioUrl} preload='metadata' />

		<div className="max-w-7xl mx-auto">
        	{/* Progress Bar */}
        	<div className="mb-4">
          		<input
            		type="range"
            		min="0"
           		 	max={duration || 0}
            		value={currentTime}
           			onChange={handleProgressChange}
            		className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            		style={{
              			background: `linear-gradient(to right, #10b981 0%, #10b981 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
            		}}
          		/>
          		<div className="flex justify-between text-xs text-gray-400 mt-1">
            		<span>{formatTime(currentTime)}</span>
            		<span>{formatTime(duration)}</span>
          		</div>
        	</div>

        	<div className="flex items-center justify-between">
          		{/* Surah Info */}
          		<div className="flex-1 min-w-0">
            		<h3 className="text-white font-semibold text-sm md:text-base truncate">{surahName}</h3>
            		<p className="text-gray-400 text-xs md:text-sm truncate">{reciterName}</p>
          		</div>

          		{/* Controls */}
          		<div className="flex items-center gap-2 md:gap-4 mx-4">

            		<button onClick={togglePlayPause} disabled={isLoading} className="p-3 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 transition-colors">
              			{isLoading ? (
              			  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              			) : isPlaying ? (
              			  <Pause className="w-6 h-6 text-white" />
              			) : (
              			  <PlayArrow className="w-6 h-6 text-white" />
              			)}
            		</button>
          		</div>

          		{/* Volume Control */}
          		<div className="hidden md:flex items-center gap-2">
            		<button onClick={toggleMute} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
              			{isMuted ? (
              			  <VolumeOff className="w-5 h-5 text-white" />
              			) : (
              			  <VolumeUp className="w-5 h-5 text-white" />
              			)}
            		</button>
            		<input
              			type="range"
              			min="0"
              			max="1"
              			step="0.1"
              			value={isMuted ? 0 : volume}
              			onChange={handleVolumeChange}
              			className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              			style={{
              			  background: `linear-gradient(to right, #10b981 0%, #10b981 ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`
              			}}
            		/>
          		</div>

          		{/* Close Button */}
          		{onClose && (
            		<button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors ml-2">
              			<Close className='text-white' />
            		</button>
          		)}
        	</div>
      	</div>

		<style>{`
        	.slider::-webkit-slider-thumb {
        	  	appearance: none;
        	  	width: 20px;
        	  	height: 20px;
        	  	background: #10b981;
        	  	border-radius: 50%;
        	  	cursor: pointer;
        	  	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        	}
        
        	.slider::-moz-range-thumb {
          		width: 20px;
          		height: 20px;
          		background: #10b981;
          		border-radius: 50%;
          		cursor: pointer;
          		border: none;
          		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        	}
      `}</style>
    </div>
  )
}

export default AudioPlayer