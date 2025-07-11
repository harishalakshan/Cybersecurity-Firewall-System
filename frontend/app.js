
const root = document.getElementById("root");

function fetchLogs() {
  fetch("http://localhost:5000/logs")
    .then(res => res.json())
    .then(logs => {
      root.innerHTML = "<h2>Threat Logs</h2><ul>" +
        logs.map(log => `<li>${log.timestamp}: ${log.prediction}</li>`).join('') +
        "</ul>";
    });
}

function sendTestData() {
  fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ f1: 0.5, f2: 0.7, f3: 0.2, f4: 0.1, f5: 0.3 })
  })
  .then(res => res.json())
  .then(data => {
    alert("Prediction: " + data.prediction);
    fetchLogs();
  });
}

root.innerHTML = \`
  <button onclick="sendTestData()">Send Sample Data</button>
  <div id="logs"></div>
\`;

fetchLogs();
