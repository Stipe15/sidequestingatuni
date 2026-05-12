import { getStats, clearAllData, getLevel } from '../../utils/storage';
import { rarityColors } from '../../data/quests';

export default function ProfilePage({ onDataCleared }) {
  const stats = getStats();

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      clearAllData();
      onDataCleared?.();
    }
  };

  const rarities = ['common', 'rare', 'epic', 'legendary'];
  const modes = ['solo', 'duo', 'squad'];

  return (
    <div className="flex flex-col min-h-full px-4 py-6 pb-24">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">👤 Profile</h1>
      </header>

      <div className="glass rounded-2xl p-6 mb-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">
            {stats.level}
          </span>
        </div>
        <div className="text-xl font-bold text-white mb-1">Level {stats.level}</div>
        <div className="text-gray-400">{stats.totalXP} Total XP</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-white">{stats.totalQuests}</div>
          <div className="text-sm text-gray-400">Quests Done</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{stats.totalXP}</div>
          <div className="text-sm text-gray-400">Total XP</div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-3"></h2>
      <div className="glass rounded-xl p-4 mb-6">
        <div className="space-y-3">
          {rarities.map(rarity => {
            const count = stats.rarityBreakdown[rarity];
            const colors = rarityColors[rarity];
            const maxCount = Math.max(...Object.values(stats.rarityBreakdown), 1);
            const percentage = (count / maxCount) * 100;

            return (
              <div key={rarity} className="flex items-center gap-3">
                <div className={`w-20 text-sm font-medium capitalize ${colors.text}`}>
                  {rarity}
                </div>
                <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      rarity === 'common' ? 'bg-gray-500' :
                      rarity === 'rare' ? 'bg-blue-500' :
                      rarity === 'epic' ? 'bg-purple-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-8 text-right text-sm text-gray-400">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-3"></h2>
      <div className="glass rounded-xl p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          {modes.map(mode => (
            <div key={mode}>
              <div className="text-2xl mb-1">
                {mode === 'solo' ? '👤' : mode === 'duo' ? '👥' : '👨‍👩‍👧‍👦'}
              </div>
              <div className="text-xl font-bold text-white">{stats.modeBreakdown[mode]}</div>
              <div className="text-xs text-gray-400 capitalize">{mode}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleClearData}
        className="tap-scale py-4 rounded-xl font-medium text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
      >
        Reset All Progress
      </button>

      <div className="mt-6 text-center text-gray-500 text-sm">
        Sidequesting at UNIFEST, 2026
      </div>
    </div>
  );
}
