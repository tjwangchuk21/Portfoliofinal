const map = [
  [5, 1, 3, 1, 2, 4, 2, 1],
  [2, 4, 0, 3, 1, 4, 3, 2],
  [6, 1, 5, 2, 1, 5, 4, 1],
  [2, 3, 4, 1, 2, 2, 1, 0],
  [4, 1, 4, 2, 6, 4, 2, 3],
  [1, 3, 3, 3, 4, 1, 5, 2]
];

function analyze(threshold) {
  const rows = map.length;
  const cols = map[0].length;
  const deadly = Array.from({ length: rows }, () => Array(cols).fill(''));
  let count = 0;

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      const sum = map[i][j] + map[i - 1][j] + map[i + 1][j] + map[i][j - 1] + map[i][j + 1];
      if (sum > threshold) {
        deadly[i][j] = 'D';
        count++;
      }
    }
  }

  return { deadly, count };
}

function renderGrid(title, grid, highlight = false) {
  const wrapper = document.createElement('div');
  wrapper.style.marginTop = '20px';
  wrapper.innerHTML = `<h3>${title}</h3>`;
  const table = document.createElement('div');
  table.style.display = 'grid';
  table.style.gridTemplateColumns = `repeat(${grid[0].length}, 48px)`;
  table.style.gap = '8px';

  grid.forEach(row => {
    row.forEach(cell => {
      const tile = document.createElement('div');
      tile.style.width = '48px';
      tile.style.height = '48px';
      tile.style.display = 'flex';
      tile.style.alignItems = 'center';
      tile.style.justifyContent = 'center';
      tile.style.borderRadius = '12px';
      tile.style.fontWeight = '900';
      tile.style.background = '#f8fafc';
      tile.style.border = '1px solid #d1d5db';
      tile.style.color = highlight && cell === 'D' ? '#991b1b' : '#111827';
      tile.textContent = cell === '' ? '' : cell;
      if (highlight && cell === 'D') {
        tile.style.background = '#fee2e2';
      }
      table.appendChild(tile);
    });
  });

  wrapper.appendChild(table);
  return wrapper;
}

function renderResult(threshold) {
  const out = document.getElementById('output');
  out.innerHTML = '';
  const result = analyze(threshold);

  out.appendChild(renderGrid('Original Map', map));
  out.appendChild(renderGrid('Deadly Desert Map', result.deadly, true));

  const summary = document.createElement('div');
  summary.style.marginTop = '20px';
  summary.style.padding = '18px';
  summary.style.borderRadius = '16px';
  summary.style.background = '#fff';
  summary.style.boxShadow = '0 18px 40px rgba(15, 23, 42, 0.12)';
  summary.innerHTML = `<strong>Total deadly spots:</strong> ${result.count}`;
  out.appendChild(summary);
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('analyzeBtn').addEventListener('click', () => {
    const threshold = parseInt(document.getElementById('threshold').value, 10) || 15;
    renderResult(threshold);
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('threshold').value = 15;
    renderResult(15);
  });

  document.getElementById('viewCodeBtn').addEventListener('click', () => {
    window.open('Main.java', '_blank');
  });

  renderResult(15);
});
