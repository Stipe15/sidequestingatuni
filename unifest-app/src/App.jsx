import { useState, useCallback } from 'react';
import TabNavigation from './components/TabNavigation';
import QuestPage from './components/pages/QuestPage';
import ProgressPage from './components/pages/ProgressPage';
import ProfilePage from './components/pages/ProfilePage';

export default function App() {
  const [activeTab, setActiveTab] = useState('quest');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleXPChange = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const handleDataCleared = useCallback(() => {
    setRefreshKey(k => k + 1);
    setActiveTab('quest');
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col">
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'quest' && (
          <QuestPage key={`quest-${refreshKey}`} onXPChange={handleXPChange} />
        )}
        {activeTab === 'progress' && (
          <ProgressPage key={`progress-${refreshKey}`} />
        )}
        {activeTab === 'profile' && (
          <ProfilePage key={`profile-${refreshKey}`} onDataCleared={handleDataCleared} />
        )}
      </main>

      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
