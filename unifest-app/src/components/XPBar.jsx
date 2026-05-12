import { getLevel, getXPProgress, getXPForNextLevel } from '../utils/storage';

export default function XPBar({ xp }) {
  const level = getLevel(xp);
  const progress = getXPProgress(xp);
  const nextLevelXP = getXPForNextLevel(xp);

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white">
            {level}
          </div>
          <div>
            <div className="text-sm text-gray-400">Level {level}</div>
            <div className="text-white font-bold">{xp} XP</div>
          </div>
        </div>
        <div className="text-right text-sm text-gray-400">
          {nextLevelXP} XP for Level {level + 1}
        </div>
      </div>

      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
