// import React, { useState, useEffect } from 'react';
// import { Mic, MicOff, Loader } from 'lucide-react';
// import { motion } from 'framer-motion';

// const VoiceRecorder = ({ onTranscriptionResult, isListening, setIsListening }) => {
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     // Clean up when component unmounts
//     return () => {
//       if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//         mediaRecorder.stop();
//       }
//     };
//   }, [mediaRecorder]);

//   const startRecording = async () => {
//     setErrorMessage('');
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       setAudioChunks([]);

//       recorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           setAudioChunks((chunks) => [...chunks, e.data]);
//         }
//       };

//       recorder.onstop = async () => {
//         if (audioChunks.length === 0) return;

//         setIsProcessing(true);
//         try {
//           const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          
//           // Convert blob to base64
//           const reader = new FileReader();
//           reader.readAsDataURL(audioBlob);
//           reader.onloadend = async () => {
//             const base64data = reader.result;
            
//             // Send to server for transcription
//             const response = await fetch('/api/openai/transcribe', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ audioData: base64data }),
//             });
            
//             if (!response.ok) {
//               const errorData = await response.json();
//               throw new Error(errorData.message || 'Failed to transcribe audio');
//             }
            
//             const data = await response.json();
//             onTranscriptionResult(data.text);
//           };
//         } catch (error) {
//           console.error('Error processing audio:', error);
//           setErrorMessage('Failed to process audio. Please try again.');
//         } finally {
//           setIsProcessing(false);
//         }
//       };

//       recorder.start();
//       setMediaRecorder(recorder);
//       setIsListening(true);
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//       setErrorMessage('Could not access microphone. Please check permissions.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//       mediaRecorder.stop();
      
//       // Stop all audio tracks
//       mediaRecorder.stream.getTracks().forEach(track => track.stop());
      
//       setIsListening(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <motion.button
//         whileTap={{ scale: 0.9 }}
//         onClick={isListening ? stopRecording : startRecording}
//         disabled={isProcessing}
//         className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
//           isListening 
//             ? 'bg-red-500 hover:bg-red-600 mic-pulse' 
//             : 'bg-primary-500 hover:bg-primary-600'
//         }`}
//         aria-label={isListening ? 'Stop listening' : 'Start listening'}
//       >
//         {isProcessing ? (
//           <Loader size={24} className="text-white animate-spin" />
//         ) : isListening ? (
//           <MicOff size={24} className="text-white" />
//         ) : (
//           <Mic size={24} className="text-white" />
//         )}
//       </motion.button>
      
//       <p className="mt-2 text-sm font-medium">
//         {isProcessing ? 'Processing...' : isListening ? 'Listening...' : 'Tap to speak'}
//       </p>
      
//       {errorMessage && (
//         <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default VoiceRecorder;
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";

const VoiceRecorder = ({ onTranscriptionResult, isListening, setIsListening }) => {
  const recognitionRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.error("❌ SpeechRecognition API not supported in this browser");
      setErrorMessage("Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("🎤 Recognition started");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("✅ Heard:", transcript);
      onTranscriptionResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error("❌ Recognition error:", event.error);
      setErrorMessage("Speech recognition error: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("🛑 Recognition ended");
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscriptionResult, setIsListening]);

  const startListening = () => {
    if (recognitionRef.current) {
      console.log("▶️ Starting recognition...");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      console.log("⏹ Stopping recognition...");
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={isListening ? stopListening : startListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 mic-pulse"
            : "bg-primary-500 hover:bg-primary-600"
        }`}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening ? (
          <MicOff size={24} className="text-white" />
        ) : (
          <Mic size={24} className="text-white" />
        )}
      </motion.button>

      <p className="mt-2 text-sm font-medium">
        {isListening ? "Listening..." : "Tap to speak"}
      </p>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default VoiceRecorder;


