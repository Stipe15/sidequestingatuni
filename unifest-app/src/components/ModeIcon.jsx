import { modeIcons } from '../data/quests';

export default function ModeIcon({ mode, size = 'md' }) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <span className={`${sizeClasses[size]} select-none`} role="img" aria-label={mode}>
      {modeIcons[mode] || '👤'}
    </span>
  );
}
