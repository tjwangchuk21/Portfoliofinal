// Classroom Finder JavaScript — parses data.txt and provides search functions

let teachers = [];

async function loadData() {
  try {
    const res = await fetch('data.txt');
    const text = await res.text();
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    teachers = [];
    for (let i = 0; i + 2 < lines.length; i += 3) {
      const name = lines[i];
      const email = lines[i+1];
      const room = lines[i+2];
      teachers.push({ name, email, room });
    }
    document.getElementById('results').innerText = `Loaded ${teachers.length} records.`;
  } catch (err) {
    document.getElementById('results').innerText = 'Failed to load data.txt';
    console.error(err);
  }
}

function renderResults(list, title) {
  const out = document.getElementById('results');
  out.innerHTML = '';
  if (!list || list.length === 0) {
    out.innerHTML = '<p>No results found.</p>';
    return;
  }

  // Header
  const header = document.createElement('div');
  header.style.marginBottom = '12px';
  header.innerHTML = `<strong style="font-size:1rem;">${title || 'Results'}</strong> <span style="color:#6b7280;margin-left:8px;font-weight:800;">(Total: ${list.length})</span>`;
  out.appendChild(header);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gap = '10px';
  grid.style.gridTemplateColumns = 'repeat(auto-fill,minmax(260px,1fr))';

  list.forEach(t => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `<h3>${t.name}</h3><p><strong>Email:</strong> ${t.email}<br><strong>Room:</strong> ${t.room}</p>`;
    grid.appendChild(card);
  });

  out.appendChild(grid);
}

function search(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  // exact name match first
  const byName = teachers.filter(t => t.name.toLowerCase() === q);
  if (byName.length) return byName;
  // partial name or room/building
  return teachers.filter(t => t.name.toLowerCase().includes(q) || t.room.toLowerCase().includes(q) || t.email.toLowerCase().includes(q));
}

function listByBuilding(keyword) {
  const k = keyword.trim().toLowerCase();
  if (!k) return [];
  return teachers.filter(t => t.room.toLowerCase().includes(k));
}

// UI wiring
window.addEventListener('DOMContentLoaded', () => {
  loadData();

  document.getElementById('searchBtn').addEventListener('click', () => {
    const q = document.getElementById('searchInput').value;
    const res = search(q);
    renderResults(res, `Results for "${q}"`);
  });

  document.getElementById('listBuildingBtn').addEventListener('click', () => {
    const q = document.getElementById('searchInput').value;
    const res = listByBuilding(q);
    renderResults(res, `Teachers in "${q}"`);
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerText = `Loaded ${teachers.length} records.`;
  });

  document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('searchBtn').click();
    }
  });
});
