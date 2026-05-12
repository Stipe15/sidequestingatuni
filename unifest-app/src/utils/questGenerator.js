import { quests, rarityWeights } from '../data/quests';

function getRandomRarity() {
  const total = Object.values(rarityWeights).reduce((a, b) => a + b, 0);
  const random = Math.random() * total;

  let cumulative = 0;
  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    cumulative += weight;
    if (random <= cumulative) {
      return rarity;
    }
  }
  return 'common';
}

export function generateRandomQuest(mode = null) {
  const rarity = getRandomRarity();

  let filteredQuests = quests.filter(q => q.rarity === rarity);

  if (mode && mode !== 'all') {
    filteredQuests = filteredQuests.filter(q => q.mode === mode);
  }

  if (filteredQuests.length === 0) {
    filteredQuests = quests.filter(q =>
      (mode === 'all' || !mode || q.mode === mode)
    );
  }

  if (filteredQuests.length === 0) {
    filteredQuests = quests;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuests.length);
  return filteredQuests[randomIndex];
}

export function getQuestsByMode(mode) {
  if (mode === 'all' || !mode) return quests;
  return quests.filter(q => q.mode === mode);
}
