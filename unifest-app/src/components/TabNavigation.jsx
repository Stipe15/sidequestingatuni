const tabs = [
  { id: 'quest', label: 'Quest', icon: '🎯' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'profile', label: 'Profile', icon: '👤' }
];

export default function TabNavigation({ activeTab, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-strong safe-bottom z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              tap-scale flex-1 flex flex-col items-center gap-1 py-3 px-4
              transition-all duration-200
              ${activeTab === tab.id
                ? 'text-purple-400'
                : 'text-gray-500 hover:text-gray-300'
              }
            `}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-1 w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
