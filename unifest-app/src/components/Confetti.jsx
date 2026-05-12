import { useEffect, useState } from 'react';

function ConfettiPiece({ style }) {
  return (
    <div
      className="absolute w-3 h-3 rounded-sm"
      style={{
        ...style,
        animation: `confetti-fall ${1.5 + Math.random()}s ease-out forwards`
      }}
    />
  );
}

export default function Confetti({ active, duration = 3000 }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff6b6b', '#4ecdc4', '#a855f7', '#fbbf24'];
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `-${Math.random() * 20}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          transform: `rotate(${Math.random() * 360}deg)`,
          '--fall-distance': `${100 + Math.random() * 50}vh`,
          '--rotation': `${Math.random() * 720 - 360}deg`
        }
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => setPieces([]), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(var(--fall-distance)) rotate(var(--rotation));
            opacity: 0;
          }
        }
      `}</style>
      {pieces.map(piece => (
        <ConfettiPiece key={piece.id} style={piece.style} />
      ))}
    </div>
  );
}
