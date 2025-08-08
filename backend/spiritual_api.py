# spiritual_api.py - Enhanced for Railway Production Deployment
import warnings
warnings.filterwarnings("ignore")

import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime
import logging

# Configure logging for production
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Enhanced CORS configuration for Railway + Vercel
CORS(app, 
     origins=["*"], 
     methods=["GET", "POST", "OPTIONS"], 
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=True
)

# Additional CORS headers for production
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

# G4F import with error handling
try:
    from g4f.client import Client
    client = Client()
    logger.info("✅ g4f successfully imported")
except Exception as e:
    logger.error(f"❌ g4f error: {e}")
    client = None

def get_spiritual_response(Questionn, temperature=0.8, top_p=0.9, top_K=60, max_tokens=800):
    """Enhanced spiritual response function with better parameters"""
    if not client:
        return "🙏 G4F service not available. Please install: pip install g4f"
        
    try:
        # Enhanced spiritual prompt for better responses
        spiritual_prompt = f"""
        You are TATVA - an AI spiritual guide providing authentic Vedic wisdom.
        
        Context: You have deep knowledge of:
        - Bhagavad Gita (all 18 chapters)
        - Ramayana and Mahabharata
        - Upanishads and Vedic scriptures
        - Modern spiritual psychology
        
        User Question: {Questionn}
        
        Guidelines:
        - Provide authentic spiritual guidance
        - Reference specific shlokas when relevant
        - Combine ancient wisdom with practical advice
        - Be compassionate and wise
        - Use both Hindi and English naturally
        - Keep responses detailed but focused
        
        Respond with genuine spiritual wisdom:
        """
        
        # Try primary model
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
        logger.warning(f"Primary model failed: {e1}")
        try:
            # Fallback to GPT-4
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": f"You are a spiritual advisor. Answer: {Questionn}"}],
                temperature=temperature,
                max_tokens=max_tokens,
                top_K=top_K,
                top_p=top_p,
            )
            return response.choices[0].message.content
        except Exception as e2:
            logger.error(f"Fallback model also failed: {e2}")
            return "🙏 माफ़ करें, तकनीकी समस्या है। कृपया पुनः प्रयास करें।"

@app.route('/')
def home():
    """Root endpoint for basic API info"""
    return jsonify({
        'message': '🕉️ TATVA - Truthful Answers Through Vedic Authenticity',
        'status': 'running',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health',
            'spiritual_chat': '/api/spiritual-chat'
        },
        'cors_fixed': True,
        'deployment': 'Railway Production'
    })

@app.route('/api/spiritual-chat', methods=['POST', 'OPTIONS'])
def spiritual_chat():
    """Main spiritual chatbot endpoint"""
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type")
        response.headers.add('Access-Control-Allow-Methods', "POST")
        return response
    
    try:
        logger.info("\n[DEBUG] === NEW SPIRITUAL REQUEST ===")
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No JSON data provided'}), 400
            
        user_message = data.get('message', '').strip()
        
        logger.info(f"[DEBUG] User Message: {user_message}")
        
        if not user_message:
            return jsonify({'success': False, 'error': 'Message required'}), 400
        
        # Enhanced parameters for better responses
        temperature = data.get('temperature', 0.8)
        top_p = data.get('top_p', 0.9)
        top_K = data.get('top_K', 60)
        max_tokens = data.get('max_tokens', 800)
        
        logger.info(f"[DEBUG] Parameters - temp: {temperature}, top_p: {top_p}, tokens: {max_tokens}")
        logger.info(f"[DEBUG] Calling spiritual function...")
        
        response = get_spiritual_response(user_message, temperature, top_p, top_K, max_tokens)
        
        logger.info(f"[DEBUG] Response generated: {len(response)} characters")
        
        return jsonify({
            'success': True,
            'response': response,
            'timestamp': datetime.now().strftime('%H:%M'),
            'model_used': 'g4f-enhanced',
            'server_time': datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        logger.error(f"[ERROR] Spiritual chat error: {str(e)}")
        return jsonify({
            'success': False, 
            'error': f'Server error: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    logger.info("🩺 Health check requested")
    
    # Check G4F status
    g4f_status = "working" if client else "not_working"
    
    return jsonify({
        'status': 'healthy',
        'message': '🕉️ TATVA Spiritual API - Production Ready',
        'g4f_status': g4f_status,
        'server_time': datetime.now().strftime('%H:%M:%S'),
        'version': '1.0.0',
        'deployment': 'Railway',
        'cors_enabled': True
    }), 200

# Error handlers for production
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'available_endpoints': ['/api/health', '/api/spiritual-chat'],
        'status': 404
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'status': 500,
        'message': 'Please try again later'
    }), 500

if __name__ == '__main__':
    # Production configuration
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') != 'production'
    
    logger.info("🕉️ TATVA Dharma Guide API Starting...")
    logger.info(f"🌐 Port: {port}")
    logger.info(f"🔧 Debug Mode: {debug}")
    logger.info(f"🚀 CORS: Enabled for all origins")
    logger.info(f"✨ Enhanced spiritual responses with better parameters")
    
    app.run(debug=debug, port=port, host='0.0.0.0')
