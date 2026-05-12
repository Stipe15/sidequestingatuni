import { rarityColors } from '../data/quests';
import RarityBadge from './RarityBadge';
import ModeIcon from './ModeIcon';

export default function QuestCard({ quest, onComplete, showCompleteButton = true }) {
  const colors = rarityColors[quest.rarity] || rarityColors.common;

  return (
    <div
      className={`
        glass rounded-2xl p-6 ${colors.glow}
        transform transition-all duration-300
        ${colors.border} border-2
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <RarityBadge rarity={quest.rarity} />
        <div className="flex items-center gap-2">
          <ModeIcon mode={quest.mode} />
          <span className="text-sm text-gray-400 capitalize">{quest.mode}</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">{quest.title}</h2>

      <p className="text-gray-300 mb-6 text-lg leading-relaxed">
        {quest.description}
      </p>

      <div className="flex justify-between items-center">
        <div className={`text-xl font-bold ${colors.text}`}>
          +{quest.xp} XP
        </div>

        {showCompleteButton && (
          <button
            onClick={() => onComplete?.(quest)}
            className={`
              tap-scale px-6 py-3 rounded-xl font-bold text-white
              bg-gradient-to-r from-purple-600 to-pink-600
              hover:from-purple-500 hover:to-pink-500
              active:from-purple-700 active:to-pink-700
              transition-all duration-200 shadow-lg
              hover:shadow-purple-500/30
            `}
          >
            Complete Quest
          </button>
        )}
      </div>
    </div>
  );
}
