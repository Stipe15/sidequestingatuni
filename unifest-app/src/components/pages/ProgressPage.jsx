import XPBar from '../XPBar';
import RarityBadge from '../RarityBadge';
import ModeIcon from '../ModeIcon';
import { getXP, getCompletedQuests } from '../../utils/storage';

export default function ProgressPage() {
  const xp = getXP();
  const completedQuests = getCompletedQuests();

  const sortedQuests = [...completedQuests].sort((a, b) => b.completedAt - a.completedAt);

  return (
    <div className="flex flex-col min-h-full px-4 py-6 pb-24">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">📊 Progress</h1>
      </header>

      <div className="mb-6">
        <XPBar xp={xp} />
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {completedQuests.length}
          </div>
          <div className="text-gray-400">Quests Completed</div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-4">Completed Quests</h2>

      {sortedQuests.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <div className="text-5xl mb-4">🏆</div>
          <p>No quests completed yet.</p>
          <p className="text-sm mt-2">Complete your first quest to see it here!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedQuests.map((quest, index) => (
            <div
              key={`${quest.id}-${quest.completedAt}`}
              className="glass rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-shrink-0">
                <ModeIcon mode={quest.mode} size="lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white truncate">{quest.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <RarityBadge rarity={quest.rarity} />
                  <span className="text-sm text-purple-400">+{quest.xp} XP</span>
                </div>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
