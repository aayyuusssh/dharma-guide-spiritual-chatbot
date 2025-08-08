import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const SpiritualGuide = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: '🙏 Namaste! Welcome to TATVA - your companion for Authentic Vedic and spiritual guidance. Ask me any question.',
      sender: 'bot' as const,
      timestamp: new Date().toTimeString().slice(0,5)
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    console.log('🚀 [SpiritualGuide] Component mounted, checking API health...');
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    try {
      console.log('🩺 [SpiritualGuide] Checking backend health...');
     const response = await fetch('https://tatva-spiritual-backend.onrender.com/api/health');

      const data = await response.json();
      console.log('✅ [SpiritualGuide] Backend health:', data);
      setApiStatus('connected');
    } catch (error) {
      console.error('❌ [SpiritualGuide] Health check failed:', error);
      setApiStatus('error');
    }
  };

  const handleSendMessage = async () => {
    console.log('🔥 [SpiritualGuide] Send message triggered!');
    
    if (!inputMessage.trim() || isLoading) {
      console.log('⚠️ [SpiritualGuide] Message blocked - empty or loading');
      return;
    }

    const userMessage = {
      id: 'user-' + Date.now(),
      text: inputMessage.trim(),
      sender: 'user' as const,
      timestamp: new Date().toTimeString().slice(0,5)
    };

    console.log('👤 [SpiritualGuide] User message:', userMessage.text);
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('📡 [SpiritualGuide] Making API call...');
      
      const response = await fetch('https://tatva-spiritual-backend.onrender.com/api/spiritual-chat', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          temperature: 0.9,
          top_p: 0.82,
          top_K: 60,
          max_tokens: 700
        })
      });

      console.log('📨 [SpiritualGuide] Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ [SpiritualGuide] Response data received');

      if (data && data.success) {
        const botMessage = {
          id: 'bot-' + Date.now(),
          text: data.response,
          sender: 'bot' as const,
          timestamp: data.timestamp || new Date().toTimeString().slice(0,5)
        };
        
        console.log('🤖 [SpiritualGuide] Adding bot response to UI');
        setMessages(prev => [...prev, botMessage]);
        console.log('🎉 [SpiritualGuide] SUCCESS! Your G4F spiritual logic working!');
      } else {
        throw new Error(data?.error || 'Invalid response format');
      }

    } catch (error) {
      console.error('💥 [SpiritualGuide] API call failed:', error);
      
      const errorMessage = {
        id: 'error-' + Date.now(),
        text: `🚨 Connection Error: ${error.message}`,
        sender: 'bot' as const,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl text-center">🕉️ Dharma Guide - TATVA</CardTitle>
            <p className="text-center opacity-90">आध्यात्मिक ज्ञान का भंडार</p>
            <div className={`text-xs text-center px-3 py-1 rounded-full inline-block mx-auto mt-2 ${
              apiStatus === 'connected' ? 'bg-green-500' : 
              apiStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`}>
              {apiStatus === 'connected' ? '🟢 Connected' : 
               apiStatus === 'error' ? '🔴 Disconnected' : '🟡 Checking...'}
            </div>
          </CardHeader>
        </Card>

        {/* Chat Interface */}
        <Card>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                    <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg animate-pulse">
                    🔄 Processing...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t p-6">
              <div className="flex space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask the Question..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isLoading ? '⏳' : 'Send'}
                </Button>
              </div>
              
              {/* Status */}
              <div className="mt-3 text-xs text-center text-gray-600">
                Backend: {apiStatus} | Messages: {messages.length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpiritualGuide;
