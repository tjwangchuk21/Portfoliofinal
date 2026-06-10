const state = {
  page: 'main',
  profile: { name: '', handicap: '', favClub: '' },
  distances: {
    driver: '', '3-wood': '', '5-wood': '', '3-iron': '', '4-iron': '', '5-iron': '',
    '6-iron': '', '7-iron': '', '8-iron': '', '9-iron': '', 'pitching-wedge': '',
    'sand-wedge': '', 'lob-wedge': '', putter: ''
  },
  distanceToHole: '',
  scores: Array.from({ length: 9 }, () => ({ par: 4, score: '' }))
};

const recommendations = {
  'Driver & Distance': [
    { name: 'TaylorMade Stealth 2 Driver', price: '$499', description: 'Latest technology for distance and forgiveness.' },
    { name: 'Callaway Rogue ST MAX', price: '$449', description: 'Designed for ball speed and control.' },
    { name: 'Ping G425 Driver', price: '$429', description: 'Consistent performance on the tee.' }
  ],
  'Iron Play': [
    { name: 'Titleist T200 Irons', price: '$1,200', description: 'Precision and distance in one set.' },
    { name: 'Callaway Apex DCB Irons', price: '$1,100', description: 'Forgiveness for approach shots.' },
    { name: 'Ping i525 Irons', price: '$1,050', description: 'Solid feel with strong ball flight.' }
  ],
  'Short Game': [
    { name: 'Titleist Vokey SM9 Wedges', price: '$159', description: 'Spin and control around the green.' },
    { name: 'Cleveland RTX ZipCore', price: '$149', description: 'Reliable feel for bunker shots.' },
    { name: 'TaylorMade MG3 Wedges', price: '$139', description: 'Consistent spin and versatility.' }
  ]
};

const app = document.getElementById('app');
const codeBlock = document.getElementById('codeBlock');
const codeText = document.getElementById('codeText');

const pages = {
  main: () => `
    <div style="padding:20px; background:#fff; border-radius:20px; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
      <h3>Golf Guru Mini App</h3>
      <p>Practice golf decisions with profile tracking, club distance planning, scorekeeping, and club recommendations.</p>
      <div style="display:grid; gap:14px; margin-top:20px;">
        <button class="primary-btn" onclick="navigate('profile')">Player Profile</button>
        <button class="secondary-btn" onclick="navigate('clubs')">Club Distances</button>
        <button class="secondary-btn" onclick="navigate('target')">Distance to Hole</button>
        <button class="secondary-btn" onclick="navigate('scorecard')">Scorecard Tracker</button>
      </div>
    </div>
  `,
  profile: () => `
    <div style="padding:20px; background:#fff; border-radius:20px; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
      <h3>Profile Setup</h3>
      <div style="display:grid; gap:14px; margin-top:20px;">
        <label>Name:<input id="profileName" class="demo-input" value="${state.profile.name}" /></label>
        <label>Handicap:<input id="profileHandicap" type="number" class="demo-input" value="${state.profile.handicap}" /></label>
        <label>Favorite Club:<input id="profileClub" class="demo-input" value="${state.profile.favClub}" /></label>
        <button class="primary-btn" onclick="saveProfile()">Save Profile</button>
      </div>
      <div style="margin-top:20px; background:#f8fafc; padding:16px; border-radius:14px;">
        <strong>Current Profile</strong>
        <p>Name: ${state.profile.name || 'Not set'}</p>
        <p>Handicap: ${state.profile.handicap || 'Not set'}</p>
        <p>Favorite Club: ${state.profile.favClub || 'Not set'}</p>
      </div>
      <button class="secondary-btn" style="margin-top:20px;" onclick="navigate('main')">Back</button>
    </div>
  `,
  clubs: () => `
    <div style="padding:20px; background:#fff; border-radius:20px; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
      <h3>Club Distances</h3>
      <p>Enter your average yardages for the clubs below.</p>
      <div style="display:grid; gap:12px; margin-top:18px;">
        ${Object.keys(state.distances).map(club => `
          <label style="display:flex;justify-content:space-between;align-items:center;">
            ${club}
            <input type="number" class="demo-input" id="club-${club}" value="${state.distances[club]}" placeholder="yards" />
          </label>
        `).join('')}
      </div>
      <button class="primary-btn" style="margin-top:20px;" onclick="saveDistances()">Save Distances</button>
      <button class="secondary-btn" style="margin-top:10px;" onclick="navigate('main')">Back</button>
    </div>
  `,
  target: () => `
    <div style="padding:20px; background:#fff; border-radius:20px; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
      <h3>Club Recommendation</h3>
      <p>Enter the distance to hole and get a suggested club.</p>
      <label style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;">
        Distance to hole
        <input type="number" class="demo-input" id="targetDistance" value="${state.distanceToHole}" placeholder="yards" />
      </label>
      <button class="primary-btn" style="margin-top:18px;" onclick="recommendClub()">Recommend Club</button>
      <div id="recommendation" style="margin-top:20px;font-weight:800;"></div>
      <button class="secondary-btn" style="margin-top:20px;" onclick="navigate('main')">Back</button>
    </div>
  `,
  scorecard: () => `
    <div style="padding:20px; background:#fff; border-radius:20px; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
      <h3>Scorecard Tracker</h3>
      <p>Track up to 9 holes and see total score vs par.</p>
      <div style="display:grid;gap:14px;margin-top:20px;">
        ${state.scores.map((item, index) => `
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;align-items:center;">
            <span>Hole ${index+1}</span>
            <select id="par-${index}" class="demo-input">
              <option value="3" ${item.par===3?'selected':''}>Par 3</option>
              <option value="4" ${item.par===4?'selected':''}>Par 4</option>
              <option value="5" ${item.par===5?'selected':''}>Par 5</option>
            </select>
            <input type="number" min="1" max="15" id="score-${index}" class="demo-input" value="${item.score}" placeholder="Score" />
          </div>
        `).join('')}
      </div>
      <button class="primary-btn" style="margin-top:18px;" onclick="saveScorecard()">Save Scorecard</button>
      <div style="margin-top:20px; background:#f8fafc; padding:14px; border-radius:12px;">
        <div>Total Score: ${totalScore()}</div>
        <div>Total Par: ${totalPar()}</div>
        <div>+/- Par: ${totalScore() - totalPar()}</div>
      </div>
      <button class="secondary-btn" style="margin-top:20px;" onclick="navigate('main')">Back</button>
    </div>
  `
};

function render() {
  app.innerHTML = pages[state.page]();
  if (state.page === 'main') {
    codeBlock.style.display = 'none';
  }
}

function navigate(page) {
  state.page = page;
  render();
}

function saveProfile() {
  state.profile.name = document.getElementById('profileName').value;
  state.profile.handicap = document.getElementById('profileHandicap').value;
  state.profile.favClub = document.getElementById('profileClub').value;
  alert('Profile saved.');
  render();
}

function saveDistances() {
  Object.keys(state.distances).forEach((club) => {
    const input = document.getElementById(`club-${club}`);
    if (input) {
      state.distances[club] = input.value;
    }
  });
  alert('Distances updated.');
}

function recommendClub() {
  state.distanceToHole = document.getElementById('targetDistance').value;
  const target = parseInt(state.distanceToHole, 10);
  const clubs = Object.entries(state.distances)
    .filter(([, v]) => v)
    .map(([club, value]) => ({ club, value: parseInt(value, 10) }))
    .sort((a, b) => Math.abs(a.value - target) - Math.abs(b.value - target));
  const result = clubs[0] ? `Try your ${clubs[0].club} (${clubs[0].value} yards)` : 'Enter club distances first.';
  document.getElementById('recommendation').innerText = result;
}

function saveScorecard() {
  state.scores = state.scores.map((item, index) => ({
    par: parseInt(document.getElementById(`par-${index}`).value, 10),
    score: document.getElementById(`score-${index}`).value
  }));
  alert('Scorecard saved.');
  render();
}

function totalScore() {
  return state.scores.reduce((sum, hole) => sum + (parseInt(hole.score, 10) || 0), 0);
}

function totalPar() {
  return state.scores.reduce((sum, hole) => sum + hole.par, 0);
}

window.openSource = function() {
  window.open('source.html', '_blank');
};

window.toggleCode = function() {
  if (codeBlock.style.display === 'none') {
    codeBlock.style.display = 'block';
    fetch('demo.js')
      .then((res) => res.text())
      .then((text) => {
        codeText.textContent = text;
      });
  } else {
    codeBlock.style.display = 'none';
  }
};

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('viewSourceBtn').addEventListener('click', openSource);
  document.getElementById('showCodeBtn').addEventListener('click', toggleCode);
  render();
});
