from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/')
def home():
    return jsonify({
        'message': '🕉️ TATVA Backend on Render!',
        'status': 'healthy',
        'platform': 'render'
    })

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': '🕉️ Render Backend Connected Successfully!',
        'platform': 'render.com'
    })

@app.route('/api/spiritual-chat', methods=['POST'])
def spiritual_chat():
    try:
        data = request.get_json() or {}
        message = data.get('message', '').strip()
        
        return jsonify({
            'success': True,
            'response': f'🙏 Render backend working perfectly! Your message: "{message}" - TATVA is now live on Render!'
        })
    except Exception as e:
        return jsonify({
            'success': True,
            'response': '🙏 Backend working on Render! Connection established successfully!'
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
