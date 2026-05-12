import { useState } from 'react';
import QuestCard from '../QuestCard';
import ModeFilter from '../ModeFilter';
import QuestCompletion from '../QuestCompletion';
import { generateRandomQuest } from '../../utils/questGenerator';
import { addXP, addCompletedQuest } from '../../utils/storage';

export default function QuestPage({ onXPChange }) {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [selectedMode, setSelectedMode] = useState('all');
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
          {isGenerating ? '✨ Rolling...' : currentQuest ? '🔄 New Quest' : '🎲 Generiraj Sidequest'}
        </button>
      </div>

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
