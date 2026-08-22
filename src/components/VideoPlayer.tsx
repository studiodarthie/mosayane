'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VideoPlayerProps {
  url: string;
  title: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  if (!url) {
    return (
      <div style={{ aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#F7F5F2', opacity: 0.4, fontSize: '13px' }}>Lien YouTube à ajouter</span>
      </div>
    );
  }

  return (
    <div 
      style={{ aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', background: '#111', position: 'relative', cursor: !isPlaying ? 'pointer' : 'default' }}
      onClick={() => !isPlaying && setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          {videoId ? (
            <Image 
              src={thumbnailUrl} 
              alt={title} 
              fill 
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#333' }}></div>
          )}
          {/* Play Button Overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="white"/>
            </svg>
          </div>
        </>
      ) : (
        <iframe 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src={`${url}?autoplay=1&rel=0&modestbranding=1`}
          title={title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      )}
    </div>
  );
}
