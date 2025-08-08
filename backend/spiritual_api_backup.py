# spiritual_api.py - Single CORS Configuration (Fixed)
import warnings
warnings.filterwarnings("ignore")

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

# SINGLE CORS configuration - No duplicates
CORS(app, origins="*", methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type"])

# Remove @app.after_request - This was causing duplicate headers!

# G4F import
try:
    from g4f.client import Client
    client = Client()
    print("✅ g4f successfully imported")
except Exception as e:
    print(f"❌ g4f error: {e}")
    client = None

def get_spiritual_response(Questionn, temperature=0.67, top_p=0.82, top_K=40, max_tokens=500):
    """Your exact original function"""
    if not client:
        return "🙏 G4F service not available. Please install: pip install g4f"
        
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user", 
                "content": f"""You are a spiritual advisor. Answer this question with references from Bhagavad Gita, Ramayana, or Mahabharata, plus modern psychology perspective. Keep it practical and helpful.

Question: {Questionn}"""
            }],
            temperature=temperature,
            max_tokens=max_tokens,
            top_K=top_K,
            top_p=top_p,
        )
        return response.choices[0].message.content
        
    except:
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[{
                    "role": "user", 
                    "content": f"""You are a spiritual advisor. Answer: {Questionn}"""
                }],
                temperature=temperature,
                max_tokens=max_tokens,
                top_K=top_K,
                top_p=top_p,
            )
            return response.choices[0].message.content
        except:
            return "🙏 माफ़ करें, तकनीकी समस्या है। कृपया पुनः प्रयास करें।"

@app.route('/')
def home():
    return jsonify({
        'message': '🕉️ Dharma Guide Spiritual API',
        'status': 'running',
        'cors_fixed': True
    })

@app.route('/api/spiritual-chat', methods=['POST'])
def spiritual_chat():
    try:
        print("\n[DEBUG] === NEW REQUEST ===")
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        print(f"[DEBUG] Message: {user_message}")
        
        if not user_message:
            return jsonify({'success': False, 'error': 'Message required'}), 400
        
        # Your exact parameters
        temperature = data.get('temperature', 0.67)
        top_p = data.get('top_p', 0.82)
        top_K = data.get('top_K', 40)
        max_tokens = data.get('max_tokens', 500)
        
        print(f"[DEBUG] Calling spiritual function...")
        response = get_spiritual_response(user_message, temperature, top_p, top_K, max_tokens)
        
        print(f"[DEBUG] Response: {len(response)} chars generated")
        
        return jsonify({
            'success': True,
            'response': response,
            'timestamp': datetime.now().strftime('%H:%M')
        })
        
    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    print("🩺 Health check requested")
    return jsonify({
        'status': 'healthy',
        'message': '🕉️ Spiritual API - CORS Fixed',
        'g4f_status': 'working' if client else 'not_working',
        'server_time': datetime.now().strftime('%H:%M:%S')
    })

if __name__ == '__main__':
    print("🕉️ Dharma Guide API - CORS Fixed Version")
    print("🌐 Server: http://localhost:5001")
    print("🔧 Single CORS config - No duplicate headers")
    app.run(debug=True, port=5001, host='0.0.0.0')
