import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function HlsPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src || !videoRef.current) {
      return undefined;
    }

    const video = videoRef.current;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      return undefined;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    return undefined;
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      playsInline
      className="aspect-video w-full rounded-xl bg-black"
    />
  );
}
