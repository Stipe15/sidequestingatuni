const STORAGE_KEYS = {
  XP: 'unifest_xp',
  COMPLETED_QUESTS: 'unifest_completed',
  STATS: 'unifest_stats'
};

export function getXP() {
  const xp = localStorage.getItem(STORAGE_KEYS.XP);
  return xp ? parseInt(xp, 10) : 0;
}

export function addXP(amount) {
  const currentXP = getXP();
  const newXP = currentXP + amount;
  localStorage.setItem(STORAGE_KEYS.XP, newXP.toString());
  return newXP;
}

export function getLevel(xp) {
  return Math.floor(xp / 500) + 1;
}

export function getXPForNextLevel(currentXP) {
  const currentLevel = getLevel(currentXP);
  const xpForNextLevel = currentLevel * 500;
  return xpForNextLevel;
}

export function getXPProgress(currentXP) {
  const currentLevel = getLevel(currentXP);
  const xpAtCurrentLevel = (currentLevel - 1) * 500;
  const xpInCurrentLevel = currentXP - xpAtCurrentLevel;
  const xpNeededForLevel = 500;
  return (xpInCurrentLevel / xpNeededForLevel) * 100;
}

export function getCompletedQuests() {
  const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_QUESTS);
  return data ? JSON.parse(data) : [];
}

export function addCompletedQuest(quest) {
  const completed = getCompletedQuests();
  const questRecord = {
    ...quest,
    completedAt: Date.now()
  };
  completed.push(questRecord);
  localStorage.setItem(STORAGE_KEYS.COMPLETED_QUESTS, JSON.stringify(completed));
  return completed;
}

export function getStats() {
  const completed = getCompletedQuests();
  const xp = getXP();

  const rarityBreakdown = {
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0
  };

  const modeBreakdown = {
    solo: 0,
    duo: 0,
    squad: 0
  };

  completed.forEach(quest => {
    if (rarityBreakdown[quest.rarity] !== undefined) {
      rarityBreakdown[quest.rarity]++;
    }
    if (modeBreakdown[quest.mode] !== undefined) {
      modeBreakdown[quest.mode]++;
    }
  });

  return {
    totalXP: xp,
    level: getLevel(xp),
    totalQuests: completed.length,
    rarityBreakdown,
    modeBreakdown
  };
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.XP);
  localStorage.removeItem(STORAGE_KEYS.COMPLETED_QUESTS);
  localStorage.removeItem(STORAGE_KEYS.STATS);
}
