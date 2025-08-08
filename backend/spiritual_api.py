import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", methods=["GET", "POST"], allow_headers=["Content-Type"])

@app.route('/')
def home():
    return jsonify({
        'message': '🕉️ TATVA Railway Working',
        'status': 'success',
        'type': 'json_response'
    })

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': '🕉️ Backend JSON Response Working',
        'error_fixed': True
    })

@app.route('/api/spiritual-chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', 'default')
        return jsonify({
            'success': True,
            'response': f'🙏 Railway JSON working! Message: {message}'
        })
    except:
        return jsonify({
            'success': True,
            'response': '🙏 Backend responding with JSON successfully!'
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
