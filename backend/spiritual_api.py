from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timezone, timedelta
import os

IST = timezone(timedelta(hours=5, minutes=30))

app = Flask(__name__)
CORS(app, origins="*")

# G4F import with error handling (safe approach)
try:
    from g4f.client import Client
    client = Client()
    g4f_available = True
    print("✅ G4F successfully imported")
except Exception as e:
    print(f"❌ G4F import failed: {e}")
    client = None
    g4f_available = False

def get_spiritual_response(question, temperature=0.8, top_p=0.82, top_K=50, max_tokens=600):
    """Your spiritual wisdom function with G4F integration"""
    if not g4f_available or not client:
        return """🙏 नमस्ते! TATVA में आपका स्वागत है। 

तकनीकी कारणों से इस समय G4F AI सेवा अनुपलब्ध है, परंतु मैं आपको कुछ आध्यात्मिक मार्गदर्शन दे सकता हूँ:

📿 गीता के अनुसार: "योगः कर्मसु कौशलम्" - कर्म में कुशलता ही योग है।

🕉️ धैर्य रखें, सत्य का मार्ग कभी आसान नहीं होता। आपका आध्यात्मिक प्रश्न महत्वपूर्ण है।

कृपया बाद में पुनः प्रयास करें। 🙏"""
    
    try:
        # Enhanced spiritual prompt for authentic responses
        spiritual_prompt = f"""You are a spiritual advisor. Answer this question with references from Bhagavad Gita, Ramayana, or Mahabharata, plus modern psychology perspective. Keep it practical and helpful.
User's spiritual question: {question}
"""

        # Primary G4F call with your preferred parameters
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": spiritual_prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
            top_K=top_K,
            top_p=top_p,
        )
        return response.choices[0].message.content
        
    except Exception as e1:
        print(f"Primary G4F model failed: {e1}")
        try:
            # Fallback to GPT-4 with simpler prompt
            fallback_response = client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": f"You are a spiritual advisor with knowledge of Vedic scriptures. Provide wise guidance for: {question}"}],
                temperature=temperature,
                max_tokens=max_tokens,
                top_K=top_K,
                top_p=top_p,
            )
            return fallback_response.choices[0].message.content
        except Exception as e2:
            print(f"Fallback G4F model also failed: {e2}")
            return f"""🙏 प्रिय साधक, आपका प्रश्न "{question}" बहुत महत्वपूर्ण है।

इस समय तकनीकी समस्या के कारण विस्तृत उत्तर नहीं दे पा रहा, परंतु कुछ मार्गदर्शन:

🕉️ गीता में श्रीकृष्ण कहते हैं: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः"
अर्थ: मन ही मनुष्य के बंधन और मोक्ष का कारण है।

💫 आपके प्रश्न का उत्तर आपके अंतर्मन में ही है। ध्यान और आत्मचिंतन करें।

🙏 धैर्य रखें, सत्य की खोज में समय लगता है। कृपया पुनः प्रयास करें।

ॐ शान्ति शान्ति शान्तिः"""

@app.route('/')
def home():
    return jsonify({
        'message': '🕉️ TATVA Backend on Render!',
        'status': 'healthy',
        'platform': 'render',
        'g4f_status': 'available' if g4f_available else 'loading'
    })

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': '🕉️ Render Backend Connected Successfully!',
        'platform': 'render.com',
        'g4f_integration': 'active' if g4f_available else 'fallback_ready',
        'spiritual_responses': 'enabled'
    })

@app.route('/api/spiritual-chat', methods=['POST'])
def spiritual_chat():
    try:
        data = request.get_json() or {}
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                'success': False,
                'error': 'कृपया अपना प्रश्न लिखें।'
            }), 400
        
        print(f"\n[TATVA] New spiritual query: {user_message[:50]}...")
        
        # Extract G4F parameters from frontend (your original parameters)
        temperature = data.get('temperature', 0.8)
        top_p = data.get('top_p', 0.82) 
        top_K = data.get('top_K', 50)
        max_tokens = data.get('max_tokens', 600)
        
        print(f"[TATVA] Using parameters - temp: {temperature}, top_p: {top_p}, tokens: {max_tokens}")
        
        # Get spiritual wisdom response
        spiritual_response = get_spiritual_response(
            user_message, 
            temperature, 
            top_p, 
            top_K, 
            max_tokens
        )
        
        print(f"[TATVA] Response generated: {len(spiritual_response)} characters")
        
        ist_time = datetime.now(IST).strftime('%H:%M')
        return jsonify({
            'success': True,
            'response': spiritual_response,
            'timestamp': ist_time,
            'g4f_used': g4f_available,
            'platform': 'render'
        })
        
    except Exception as e:
        ist_time = datetime.now(IST).strftime('%H:%M')
        print(f"[ERROR] Spiritual chat error: {str(e)}")

        return jsonify({
            'success': True,
            'response': f'🙏 प्रणाम! आपका प्रश्न "{user_message}" प्राप्त हुआ है। तकनीकी समस्या के कारण विस्तृत उत्तर नहीं दे पा रहा, परंतु TATVA सेवा सक्रिय है। कृपया पुनः प्रयास करें। 🕉️',
            'timestamp': ist_time,
            'platform': 'render'
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🕉️ TATVA Spiritual API starting on Render port {port}")
    print(f"🤖 G4F Status: {'Available' if g4f_available else 'Fallback Ready'}")
    app.run(host='0.0.0.0', port=port, debug=False)
