import { useState, useEffect, useRef } from 'react';

const useSpeechSynthesis = (text, options = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const utteranceRef = useRef(null);
  
  const {
    voice = null,
    rate = 1,
    pitch = 1,
    volume = 1,
    onEnd = () => {},
    onStart = () => {},
    onPause = () => {},
    onResume = () => {},
    onError = () => {},
  } = options;

  useEffect(() => {
    const synth = window.speechSynthesis;
    
    // Get available voices
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    
    // Some browsers (like Chrome) load voices asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    
    return () => {
      synth.cancel(); // Stop any ongoing speech when component unmounts
    };
  }, []);

  useEffect(() => {
    if (!text) return;
    
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply options
    if (voice) {
      utterance.voice = voice;
    } else {
      // Try to find a good default voice
      const defaultVoice = voices.find(v => 
        v.lang === 'en-US' && v.name.includes('Female')
      ) || voices.find(v => v.lang === 'en-US') || voices[0];
      
      if (defaultVoice) {
        utterance.voice = defaultVoice;
      }
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    // Set event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      onStart();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      onEnd();
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      onError(event);
    };
    
    utteranceRef.current = utterance;
    
    return () => {
      synth.cancel();
    };
  }, [text, voice, rate, pitch, volume, voices, onStart, onEnd, onError]);

  const speak = () => {
    const synth = window.speechSynthesis;
    
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      onResume();
    } else {
      synth.cancel();
      synth.speak(utteranceRef.current);
    }
  };

  const pause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
    onPause();
  };

  const cancel = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return {
    speak,
    pause,
    cancel,
    isSpeaking,
    isPaused,
    voices,
  };
};

export default useSpeechSynthesis;