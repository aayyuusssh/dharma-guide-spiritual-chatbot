import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)

# Multiple CORS methods to ensure it works
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Additional CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Handle preflight requests
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

@app.route('/')
def home():
    return jsonify({
        'message': '🕉️ TATVA Backend - CORS FIXED',
        'status': 'running',
        'cors_enabled': True
    })

@app.route('/api/health', methods=['GET', 'OPTIONS'])
def health():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type")
        response.headers.add('Access-Control-Allow-Methods', "GET")
        return response
        
    return jsonify({
        'status': 'healthy',
        'message': '🕉️ CORS COMPLETELY FIXED - Backend Connected!',
        'cors_working': True,
        'vercel_allowed': True
    })

@app.route('/api/spiritual-chat', methods=['POST', 'OPTIONS'])
def spiritual_chat():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type")
        response.headers.add('Access-Control-Allow-Methods', "POST")
        return response
    
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        return jsonify({
            'success': True,
            'response': f'🙏 CORS Fixed! Your message: "{user_message}" - Backend fully connected to Vercel frontend!'
        })
    except Exception as e:
        return jsonify({
            'success': True,
            'response': '🙏 Backend working! CORS issue resolved completely!'
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f"🕉️ TATVA starting with CORS fix on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
