import { useRef, useState } from 'react';

export default function Camera({ onCapture, onClose }) {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    // Handle image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize/crop to 9:16 aspect ratio
          const canvas = document.createElement('canvas');
          canvas.width = 1080;
          canvas.height = 1920;
          const ctx = canvas.getContext('2d');

          const imgAspect = img.width / img.height;
          const canvasAspect = canvas.width / canvas.height;

          let sx, sy, sw, sh;

          if (imgAspect > canvasAspect) {
            // Image is wider - crop sides
            sh = img.height;
            sw = sh * canvasAspect;
            sx = (img.width - sw) / 2;
            sy = 0;
          } else {
            // Image is taller - crop top/bottom
            sw = img.width;
            sh = sw / canvasAspect;
            sx = 0;
            sy = (img.height - sh) / 2;
          }

          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL('image/jpeg', 0.92);
          onCapture(imageData);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
    // Handle video files - extract first frame
    else if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadeddata = () => {
        video.currentTime = 0.1; // Seek slightly to get a frame
      };
      video.onseeked = () => {
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

        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.92);
        URL.revokeObjectURL(video.src);
        onCapture(imageData);
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {isProcessing ? (
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">📸</div>
          <p className="text-white text-xl font-bold">Preparing your proof...</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📸</div>
            <h2 className="text-2xl font-bold text-white mb-2">Quest Proof</h2>
            <p className="text-gray-400">Slikaj ili snimi svoj sidequest</p>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <button
              onClick={openCamera}
              className="tap-scale w-full py-5 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              📷 Otvori kameru
            </button>

            <button
              onClick={onClose}
              className="tap-scale w-full py-4 rounded-xl font-bold text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
