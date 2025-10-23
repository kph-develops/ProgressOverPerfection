const tabs = Array.from(document.querySelectorAll('.tab-button'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));
const historyList = document.getElementById('history-list');
const historyTemplate = document.getElementById('history-item-template');

const entries = [];

const tabIcons = {
  gratitude: '🌅',
  journal: '📓',
};

function formatDate(date) {
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function updateStats() {
  const streakEl = document.getElementById('streak-days');
  const entriesWeekEl = document.getElementById('entries-week');

  const sorted = [...entries].sort((a, b) => b.date - a.date);
  const today = new Date();
  let streak = 0;
  let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  for (const entry of sorted) {
    const entryDay = new Date(entry.date.getFullYear(), entry.date.getMonth(), entry.date.getDate());
    if (entryDay.getTime() === cursor.getTime()) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else if (entryDay.getTime() < cursor.getTime()) {
      break;
    }
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  const entriesThisWeek = entries.filter((entry) => entry.date >= oneWeekAgo).length;

  streakEl.textContent = streak === 1 ? '1 day streak' : `${streak} day streak`;
  entriesWeekEl.textContent = `${entriesThisWeek} entr${entriesThisWeek === 1 ? 'y' : 'ies'} this week`;
}

function renderHistory() {
  historyList.innerHTML = '';
  const sortedEntries = [...entries].sort((a, b) => b.date - a.date);

  if (!sortedEntries.length) {
    const emptyState = document.createElement('li');
    emptyState.className = 'history-item empty-state';
    emptyState.textContent = 'No entries yet. Start by adding gratitude or journal reflections!';
    historyList.appendChild(emptyState);
    return;
  }

  for (const entry of sortedEntries) {
    const node = historyTemplate.content.cloneNode(true);
    const listItem = node.querySelector('.history-item');
    listItem.querySelector('.history-item-icon').textContent = tabIcons[entry.type];
    listItem.querySelector('.history-item-type').textContent = entry.type === 'gratitude' ? 'Gratitude' : 'Journal';
    const timeEl = listItem.querySelector('.history-item-time');
    timeEl.textContent = formatDate(entry.date);
    timeEl.setAttribute('datetime', entry.date.toISOString());
    listItem.querySelector('.history-item-text').textContent = entry.text;
    historyList.appendChild(node);
  }
}

function handleTabChange(targetTab) {
  tabs.forEach((tab) => {
    const isActive = tab === targetTab;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    const shouldShow = panel.getAttribute('aria-labelledby') === targetTab.id;
    panel.toggleAttribute('hidden', !shouldShow);
    panel.classList.toggle('is-active', shouldShow);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => handleTabChange(tab));
});

function handleEntrySubmit(type, textArea) {
  const text = textArea.value.trim();
  if (!text) return;

  entries.push({
    type,
    text,
    date: new Date(),
  });

  textArea.value = '';
  updateStats();
  renderHistory();
  if (type === 'gratitude') {
    handleTabChange(document.getElementById('history-tab'));
  }
}

const gratitudeForm = document.getElementById('gratitude-form');
const journalForm = document.getElementById('journal-form');

if (gratitudeForm) {
  gratitudeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleEntrySubmit('gratitude', gratitudeForm.querySelector('textarea'));
  });
}

if (journalForm) {
  journalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleEntrySubmit('journal', journalForm.querySelector('textarea'));
  });
}

renderHistory();
updateStats();
