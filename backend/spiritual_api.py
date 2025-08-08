import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/')
def home():
    return jsonify({
        'message': '🕉️ TATVA Working Again!',
        'status': 'running',
        'fixed': True
    })

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': '🕉️ Backend Recovered Successfully!'
    })

@app.route('/api/spiritual-chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    return jsonify({
        'success': True,
        'response': f'🙏 Backend working! Your message: "{message}" received successfully!'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
