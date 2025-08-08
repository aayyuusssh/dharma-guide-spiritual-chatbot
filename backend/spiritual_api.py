import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

ALLOWED_ORIGIN = "https://dharma-guide-spiritual-chatbot.vercel.app"

CORS(
    app,
    resources={r"/api/*": {
        "origins": [ALLOWED_ORIGIN],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
    }},
    supports_credentials=False
)

@app.route("/", methods=["GET"])
def root():
    return jsonify({
        "ok": True,
        "service": "TATVA API",
        "health": "/api/health",
        "time": datetime.utcnow().isoformat() + "Z"
    })

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "message": "Backend JSON OK",
        "cors": "enabled",
        "origin_allowed": ALLOWED_ORIGIN
    })

@app.route("/api/spiritual-chat", methods=["POST"])
def spiritual_chat():
    data = request.get_json(silent=True) or {}
    msg = (data.get("message") or "").strip()
    return jsonify({
        "success": True, 
        "echo": msg or "empty", 
        "note": "CORS OK"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
