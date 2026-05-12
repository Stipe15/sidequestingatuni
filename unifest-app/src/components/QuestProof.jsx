import { useRef, useEffect, useState } from 'react';
import { rarityColors } from '../data/quests';

export default function QuestProof({ quest, capturedImage, onClose, onShare }) {
  const canvasRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const colors = rarityColors[quest.rarity];

  const rarityColorMap = {
    common: '#9ca3af',
    rare: '#3b82f6',
    epic: '#a855f7',
    legendary: '#fbbf24'
  };

  useEffect(() => {
    if (!canvasRef.current || !capturedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 1080;
    canvas.height = 1920;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.2)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.textAlign = 'center';

      ctx.font = 'bold 48px system-ui, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('UNIFEST QUEST', canvas.width / 2, 120);

      ctx.font = 'bold 64px system-ui, sans-serif';
      ctx.fillStyle = '#a855f7';
      ctx.fillText('COMPLETED', canvas.width / 2, 200);

      const badgeY = 280;
      const badgeWidth = 200;
      const badgeHeight = 50;
      const badgeX = (canvas.width - badgeWidth) / 2;

      ctx.fillStyle = rarityColorMap[quest.rarity] + '40';
      ctx.strokeStyle = rarityColorMap[quest.rarity];
      ctx.lineWidth = 3;
      roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 25);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.fillStyle = rarityColorMap[quest.rarity];
      ctx.fillText(quest.rarity.toUpperCase(), canvas.width / 2, badgeY + 33);

      ctx.font = 'bold 56px system-ui, sans-serif';
      ctx.fillStyle = '#ffffff';
      wrapText(ctx, quest.title, canvas.width / 2, canvas.height - 400, canvas.width - 100, 70);

      ctx.font = '32px system-ui, sans-serif';
      ctx.fillStyle = '#d1d5db';
      wrapText(ctx, quest.description, canvas.width / 2, canvas.height - 280, canvas.width - 120, 40);

      ctx.font = 'bold 72px system-ui, sans-serif';
      ctx.fillStyle = rarityColorMap[quest.rarity];
      ctx.fillText(`+${quest.xp} XP`, canvas.width / 2, canvas.height - 140);

      ctx.font = '24px system-ui, sans-serif';
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('unifest-quest.app', canvas.width / 2, canvas.height - 60);

      setGeneratedImage(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = capturedImage;
  }, [capturedImage, quest]);

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[i] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  }

  const handleSave = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.download = `unifest-quest-${quest.id}.jpg`;
    link.href = generatedImage;
    link.click();
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], `unifest-quest-${quest.id}.jpg`, { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'UNIFEST Quest Completed!',
          text: `I just completed "${quest.title}" and earned ${quest.xp} XP! 🎉`,
          files: [file]
        });
      } else {
        handleSave();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        handleSave();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <canvas ref={canvasRef} className="hidden" />

      <div className="max-w-sm w-full">
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Quest proof"
            className={`w-full rounded-2xl shadow-2xl ${colors.glow}`}
          />
        ) : (
          <div className="aspect-[9/16] bg-gray-800 rounded-2xl flex items-center justify-center">
            <div className="text-gray-400">Generating...</div>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            disabled={!generatedImage}
            className="tap-scale flex-1 py-4 rounded-xl font-bold text-white glass hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            💾 Save
          </button>
          <button
            onClick={handleShare}
            disabled={!generatedImage}
            className="tap-scale flex-1 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50"
          >
            📤 Share
          </button>
        </div>

        <button
          onClick={onClose}
          className="tap-scale w-full mt-4 py-4 rounded-xl font-bold text-gray-400 hover:text-white transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
