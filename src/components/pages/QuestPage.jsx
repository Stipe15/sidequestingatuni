import { useState } from 'react';
import QuestCard from '../QuestCard';
import ModeFilter from '../ModeFilter';
import QuestCompletion from '../QuestCompletion';
import { generateRandomQuest } from '../../utils/questGenerator';
import { addXP, addCompletedQuest } from '../../utils/storage';

export default function QuestPage({ onXPChange }) {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [selectedMode, setSelectedMode] = useState('solo');
  const [completingQuest, setCompletingQuest] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const quest = generateRandomQuest(selectedMode === 'all' ? null : selectedMode);
      setCurrentQuest(quest);
      setIsGenerating(false);
    }, 300);
  };

  const handleComplete = (quest) => {
    setCompletingQuest(quest);
  };

  const handleQuestCompleted = (quest) => {
    addXP(quest.xp);
    addCompletedQuest(quest);
    onXPChange?.();
  };

  const handleCloseCompletion = () => {
    setCompletingQuest(null);
    setCurrentQuest(null);
  };

  return (
    <div className="flex flex-col min-h-full px-4 py-6 pb-24">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          🎯Sidequesting🎯
        </h1>
        <p className="text-gray-400">at UNIFEST</p>
      </header>

      <div className="mb-6">
        <ModeFilter selected={selectedMode} onChange={setSelectedMode} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {currentQuest ? (
          <div className="w-full max-w-md transform transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
            <QuestCard quest={currentQuest} onComplete={handleComplete} />
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <div className="text-6xl mb-4">🎲</div>
            <p>Uzmi izazov i započni avanturu!</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`
            tap-scale w-full max-w-md py-5 rounded-2xl font-bold text-xl text-white
            bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600
            bg-[length:200%_100%]
            hover:shadow-lg hover:shadow-purple-500/30
            transition-all duration-300
            disabled:opacity-70
            ${isGenerating ? 'animate-[shimmer_1s_linear_infinite]' : ''}
          `}
        >
          {isGenerating ? '✨ Rolling...' : currentQuest ? '🔄 Daj drugi quest' : '🎲 Generiraj Sidequest'}
        </button>

      </div>

      <a
        href="https://www.instagram.com/stipe05/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-25 left-4 z-40 tap-scale p-3 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-110 transition-all duration-200"
        aria-label="Instagram"
      >
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>

      {completingQuest && (
        <QuestCompletion
          quest={completingQuest}
          onComplete={handleQuestCompleted}
          onClose={handleCloseCompletion}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
}
