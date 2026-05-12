import { rarityColors } from '../data/quests';

export default function RarityBadge({ rarity }) {
  const colors = rarityColors[rarity] || rarityColors.common;
  const isLegendary = rarity === 'legendary';

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
        ${colors.bg} ${colors.border} ${colors.text} border
        ${isLegendary ? 'shimmer-gold' : ''}
      `}
    >
      {rarity}
    </span>
  );
}
