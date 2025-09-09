import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

const TextToSpeech = ({ text, autoPlay = false }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef(null);
  
  useEffect(() => {
    // Initialize speech synthesis
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose a voice that sounds good
    const voices = synth.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang === 'en-US' && voice.name.includes('Female')
    ) || voices.find(voice => 
      voice.lang === 'en-US'
    ) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utteranceRef.current = utterance;
    
    // Auto-play if specified
    if (autoPlay) {
      speak();
    }
    
    // Clean up on unmount
    return () => {
      if (isSpeaking) {
        synth.cancel();
      }
    };
  }, [text, autoPlay]);
  
  const speak = () => {
    const synth = window.speechSynthesis;
    
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
    } else {
      // Cancel any ongoing speech
      synth.cancel();
      
      if (isMuted) return;
      
      synth.speak(utteranceRef.current);
    }
    
    setIsSpeaking(true);
  };
  
  const pause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };
  
  const stop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      stop();
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleMute}
        className={`p-2 rounded-full ${
          isMuted ? 'bg-neutral-200 text-neutral-600' : 'bg-secondary-100 text-secondary-600'
        }`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      
      {!isMuted && (
        <button
          onClick={isSpeaking ? (isPaused ? speak : pause) : speak}
          className="p-2 rounded-full bg-secondary-500 text-white"
          aria-label={isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Play'}
        >
          {isSpeaking && !isPaused ? <Pause size={18} /> : <Play size={18} />}
        </button>
      )}
    </div>
  );
};

export default TextToSpeech;