// // spiritualApi.js - Fixed version with better error handling
// const API_BASE_URL = 'http://localhost:5001/api';


// class SpiritualAPI {
//   async sendMessage(message) {
//     try {
//       console.log('🔄 [spiritualApi] Sending message:', message);
//       console.log('🔄 [spiritualApi] API URL:', `${API_BASE_URL}/spiritual-chat`);
      
//       const response = await fetch(`${API_BASE_URL}/spiritual-chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: message,
//           temperature: 0.67,
//           top_p: 0.82,
//           top_K: 40,
//           max_tokens: 500
//         })
//       });

//       console.log('📡 [spiritualApi] Response status:', response.status);
//       console.log('📡 [spiritualApi] Response ok:', response.ok);

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('✅ [spiritualApi] Success response:', data);
      
//       return data;

//     } catch (error) {
//       console.error('💥 [spiritualApi] Error details:', {
//         message: error.message,
//         stack: error.stack,
//         name: error.name
//       });
//       throw error;
//     }
//   }

//   async healthCheck() {
//     try {
//       console.log('🔍 [spiritualApi] Health check starting...');
//       const response = await fetch(`${API_BASE_URL}/health`);
//       const data = await response.json();
//       console.log('✅ [spiritualApi] Health check result:', data);
//       return data;
//     } catch (error) {
//       console.error('❌ [spiritualApi] Health check failed:', error);
//       return { status: 'error', message: error.message };
//     }
//   }
// }

// export default new SpiritualAPI();
