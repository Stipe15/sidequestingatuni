import { modeIcons } from '../data/quests';

const modes = [
  { id: 'solo', label: 'Solo', icon: modeIcons.solo },
  { id: 'duo', label: 'Duo', icon: modeIcons.duo },
  { id: 'squad', label: 'Squad', icon: modeIcons.squad }
];

export default function ModeFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {modes.map(mode => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`
            tap-scale px-4 py-2 rounded-xl font-medium transition-all duration-200
            flex items-center gap-2
            ${selected === mode.id
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'glass text-gray-300 hover:text-white'
            }
          `}
        >
          <span className="text-lg">{mode.icon}</span>
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
