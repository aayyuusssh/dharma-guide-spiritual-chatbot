// import React, { useState, useEffect } from 'react';

// function App() {
//   const [messages, setMessages] = useState([
//     {
//       id: 'welcome',
//       text: '🙏 नमस्कार! मैं आपका आध्यात्मिक मार्गदर्शक हूँ। कोई भी प्रश्न पूछें!',
//       sender: 'bot',
//       timestamp: new Date().toLocaleTimeString()
//     }
//   ]);
  
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiStatus, setApiStatus] = useState('checking');

//   // API health check on component mount
//   useEffect(() => {
//     console.log('🚀 [React] Component mounted, checking API health...');
//     checkAPIHealth();
//   }, []);

//   const checkAPIHealth = async () => {
//     try {
//       console.log('🩺 [React] Checking backend health...');
//       const response = await fetch('http://localhost:5001/api/health');
//       const data = await response.json();
//       console.log('✅ [React] Backend health:', data);
//       setApiStatus('connected');
//     } catch (error) {
//       console.error('❌ [React] Health check failed:', error);
//       setApiStatus('error');
//     }
//   };

//   const handleSendMessage = async () => {
//     console.log('🔥 [React] === SEND MESSAGE CLICKED ===');
//     console.log('📝 [React] Input message:', inputMessage);
    
//     if (!inputMessage.trim() || isLoading) {
//       console.log('⚠️ [React] Message blocked - empty or loading');
//       return;
//     }

//     const userMessage = {
//       id: 'user-' + Date.now(),
//       text: inputMessage.trim(),
//       sender: 'user',
//       timestamp: new Date().toLocaleTimeString()
//     };

//     console.log('👤 [React] User message created:', userMessage);

//     // Update messages state
//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       console.log('📡 [React] Making API call to backend...');
//       console.log('🔗 [React] URL: http://localhost:5001/api/spiritual-chat');
      
//       const response = await fetch('http://localhost:5001/api/spiritual-chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: userMessage.text,
//           temperature: 0.67,
//           top_p: 0.82,
//           top_K: 40,
//           max_tokens: 500
//         })
//       });

//       console.log('📨 [React] Response status:', response.status);
//       console.log('📨 [React] Response ok:', response.ok);

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('✅ [React] Response data:', data);

//       if (data && data.success) {
//         const botMessage = {
//           id: 'bot-' + Date.now(),
//           text: data.response,
//           sender: 'bot',
//           timestamp: data.timestamp || new Date().toLocaleTimeString()
//         };
        
//         console.log('🤖 [React] Bot message created:', botMessage);
//         setMessages(prev => [...prev, botMessage]);
//         console.log('🎉 [React] SUCCESS! Spiritual response added to React UI!');
//       } else {
//         throw new Error(data?.error || 'Invalid response format');
//       }

//     } catch (error) {
//       console.error('💥 [React] API call failed:', error);
      
//       const errorMessage = {
//         id: 'error-' + Date.now(),
//         text: `🚨 API Error: ${error.message}\n\nHTML version working, but React integration issue.`,
//         sender: 'bot',
//         isError: true,
//         timestamp: new Date().toLocaleTimeString()
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//       console.log('🏁 [React] Send message process completed');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !isLoading) {
//       console.log('⌨️ [React] Enter key pressed');
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-100 p-4">
//       <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 text-center">
//           <h1 className="text-2xl font-bold">🕉️ Dharma Guide</h1>
//           <p className="text-sm opacity-90">आध्यात्मिक ज्ञान का भंडार</p>
//           <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
//             apiStatus === 'connected' ? 'bg-green-500' : 
//             apiStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
//           }`}>
//             {apiStatus === 'connected' ? '🟢 Connected' : 
//              apiStatus === 'error' ? '🔴 Disconnected' : '🟡 Checking...'}
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="h-96 overflow-y-auto p-4 space-y-4">
//           {messages.map(message => (
//             <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                 message.sender === 'user' 
//                   ? 'bg-orange-500 text-white' 
//                   : message.isError 
//                     ? 'bg-red-100 text-red-800' 
//                     : 'bg-gray-100 text-gray-800'
//               }`}>
//                 <div className="whitespace-pre-wrap">{message.text}</div>
//                 <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
//               </div>
//             </div>
//           ))}
          
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg animate-pulse">
//                 🔄 आध्यात्मिक ज्ञान खोजा जा रहा है...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t bg-gray-50">
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => {
//                 console.log('📝 [React] Input changed:', e.target.value);
//                 setInputMessage(e.target.value);
//               }}
//               onKeyPress={handleKeyPress}
//               placeholder="आध्यात्मिक प्रश्न पूछें..."
//               disabled={isLoading}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
//             />
//             <button
//               onClick={() => {
//                 console.log('🔥 [React] SEND BUTTON CLICKED!');
//                 handleSendMessage();
//               }}
//               disabled={!inputMessage.trim() || isLoading}
//               className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isLoading ? '⏳' : '▶'}
//             </button>
//           </div>
          
//           {/* Status Bar */}
//           <div className="mt-2 text-xs text-center text-gray-600 space-x-4">
//             <span className={`px-2 py-1 rounded ${
//               apiStatus === 'connected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//             }`}>
//               Backend: {apiStatus}
//             </span>
//             <span>React: http://localhost:8080</span>
//             <span>Messages: {messages.length}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
