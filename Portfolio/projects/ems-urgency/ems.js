// Simple heuristic demo approximating the EMS Decision Tree model

function predict(data) {
  // Heuristic rules inspired by features in the dataset
  if (data.breathing_problem == 1 || data.chest_pain == 1 || data.oxygen_level < 90) {
    return 'High';
  }
  if (data.heart_rate >= 135 || data.blood_pressure >= 185) {
    return 'High';
  }
  if (data.pain_level >= 8 || data.previous_conditions == 1) {
    return 'Medium';
  }
  return 'Low';
}

function readForm() {
  return {
    age: parseInt(document.getElementById('age').value,10),
    breathing_problem: parseInt(document.getElementById('breathing_problem').value,10),
    chest_pain: parseInt(document.getElementById('chest_pain').value,10),
    oxygen_level: parseInt(document.getElementById('oxygen_level').value,10),
    heart_rate: parseInt(document.getElementById('heart_rate').value,10),
    blood_pressure: parseInt(document.getElementById('blood_pressure').value,10),
    pain_level: parseInt(document.getElementById('pain_level').value,10),
    previous_conditions: parseInt(document.getElementById('previous_conditions').value,10)
  };
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('predictBtn').addEventListener('click', () => {
    const d = readForm();
    const pred = predict(d);
    const out = document.getElementById('result');
    out.innerHTML = `<div class="stat-card"><h3>Predicted Urgency: ${pred}</h3><p>Heuristic demo result — run the Python script for the trained model.</p></div>`;
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('age').value = 68;
    document.getElementById('breathing_problem').value = 1;
    document.getElementById('chest_pain').value = 1;
    document.getElementById('oxygen_level').value = 86;
    document.getElementById('heart_rate').value = 128;
    document.getElementById('blood_pressure').value = 170;
    document.getElementById('pain_level').value = 8;
    document.getElementById('previous_conditions').value = 1;
    document.getElementById('result').innerHTML = '';
  });

  document.getElementById('viewPy').addEventListener('click', () => {
    window.open('ems_predictor.py', '_blank');
  });
});
