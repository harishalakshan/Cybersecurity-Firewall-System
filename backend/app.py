
from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load("rf_model.pkl")

# In-memory logs (could be DB)
threat_logs = []

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]

    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "data": data,
        "prediction": "threat" if prediction == 1 else "normal"
    }
    threat_logs.append(log_entry)
    return jsonify(log_entry)

@app.route("/logs")
def logs():
    return jsonify(threat_logs)

if __name__ == "__main__":
    app.run(port=5000)
