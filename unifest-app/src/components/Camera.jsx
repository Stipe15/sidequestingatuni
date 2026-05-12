import { useRef, useState, useEffect, useCallback } from 'react';

export default function Camera({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const startCamera = useCallback(async (facing) => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1080 },
          height: { ideal: 1920 }
        },
        audio: false
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      setError(null);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.onloadedmetadata = () => {
          setIsReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please allow camera permissions.');
    }
  }, [stream]);

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFlip = () => {
    const newFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacing);
    setIsReady(false);
    startCamera(newFacing);
  };

  const handleCapture = () => {
    if (!videoRef.current || !isReady) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');

    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext('2d');

    const videoAspect = video.videoWidth / video.videoHeight;
    const canvasAspect = canvas.width / canvas.height;

    let sx, sy, sw, sh;

    if (videoAspect > canvasAspect) {
      sh = video.videoHeight;
      sw = sh * canvasAspect;
      sx = (video.videoWidth - sw) / 2;
      sy = 0;
    } else {
      sw = video.videoWidth;
      sh = sw / canvasAspect;
      sx = 0;
      sy = (video.videoHeight - sh) / 2;
    }

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    onCapture(imageData);
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6">
        <div className="text-red-400 text-center mb-6">{error}</div>
        <button
          onClick={onClose}
          className="tap-scale px-6 py-3 rounded-xl font-bold text-white bg-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
        />

        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-12 h-12 rounded-full glass flex items-center justify-center tap-scale z-10"
        >
          <span className="text-2xl">✕</span>
        </button>

        <button
          onClick={handleFlip}
          className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center tap-scale z-10"
        >
          <span className="text-2xl">🔄</span>
        </button>
      </div>

      <div className="safe-bottom bg-black/80 py-6 flex justify-center">
        <button
          onClick={handleCapture}
          disabled={!isReady}
          className={`
            tap-scale w-20 h-20 rounded-full
            bg-white border-4 border-gray-300
            flex items-center justify-center
            transition-all duration-200
            ${isReady ? 'hover:scale-110 active:scale-95' : 'opacity-50'}
          `}
        >
          <div className="w-16 h-16 rounded-full bg-white" />
        </button>
      </div>
    </div>
  );
}
