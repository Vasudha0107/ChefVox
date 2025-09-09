import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Coffee, AlertTriangle, MessageSquareText } from 'lucide-react';
import VoiceRecorder from '../voice/VoiceRecorder';
import TextToSpeech from '../voice/TextToSpeech';

const CookingInterface = ({ recipe }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [showAssistant, setShowAssistant] = useState(false);
  const stepsRef = useRef(null);

  const currentStep = recipe?.steps?.[currentStepIndex];

  useEffect(() => {
    // Scroll to the current step when it changes
    if (stepsRef.current) {
      stepsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  const goToNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

 const [repeatTrigger, setRepeatTrigger] = useState(0);

const repeatCurrentStep = () => {
  console.log("🔄 Repeating current step");
  setRepeatTrigger(prev => prev + 1);
};


  // const handleTranscriptionResult = async (text) => {
  //   setLastCommand(text);
    
  //   // Process voice commands
  //   const lowerText = text.toLowerCase();
    
  //   if (lowerText.includes('next') || lowerText.includes('next step')) {
  //     goToNextStep();
  //   } else if (lowerText.includes('previous') || lowerText.includes('back') || lowerText.includes('go back')) {
  //     goToPreviousStep();
  //   } else if (lowerText.includes('repeat') || lowerText.includes('again')) {
  //     repeatCurrentStep();
  //   } else if (lowerText.includes('help') || lowerText.includes('stuck') || lowerText.includes('problem') || lowerText.includes('how do i')) {
  //     // Request cooking assistance from ChatGPT
  //     await getCookingAssistance(text);
  //   }
  // };
const handleTranscriptionResult = async (text) => {
  console.log("📥 handleTranscriptionResult received:", text);
  setLastCommand(text);

  const lowerText = text.toLowerCase();

  if (lowerText.includes('next') || lowerText.includes('next step')) {
    console.log("➡️ Going to next step");
    goToNextStep();
  } else if (
    lowerText.includes('previous') ||
    lowerText.includes('back') ||
    lowerText.includes('go back')
  ) {
    console.log("⬅️ Going to previous step");
    goToPreviousStep();
  } else if (lowerText.includes('repeat') || lowerText.includes('again')) {
    console.log("🔄 Repeating step");
    repeatCurrentStep();
  } else if (
    lowerText.includes('help') ||
    lowerText.includes('stuck') ||
    lowerText.includes('problem') ||
    lowerText.includes('how') ||
    lowerText.includes('what') ||
    lowerText.includes('why') ||
    lowerText.includes('when') ||
    lowerText.includes('which') ||
    lowerText.endsWith('?')
  ) {
    console.log("🤖 Sending query to ChatGPT:", text);
    await getCookingAssistance(text);
  } else {
    console.log("ℹ️ Command not recognized:", text);
  }
};



  const getCookingAssistance = async (query) => {
    try {
      const response = await fetch('/api/openai/cooking-assistance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          recipeContext: {
            name: recipe.name,
            currentStepNumber: currentStepIndex + 1,
            currentStep: currentStep?.instruction,
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get cooking assistance');
      }
      
      const data = await response.json();
      setAssistantResponse(data.response);
      setShowAssistant(true);
    } catch (error) {
      console.error('Error getting cooking assistance:', error);
      setAssistantResponse('Sorry, I had trouble understanding. Please try again.');
      setShowAssistant(true);
    }
  };

  const stepIndicator = (index) => {
    return (
      <div
        className={`w-3 h-3 rounded-full mx-1 ${
          index === currentStepIndex
            ? 'bg-primary-500'
            : index < currentStepIndex
            ? 'bg-secondary-500'
            : 'bg-neutral-300'
        }`}
      ></div>
    );
  };

  if (!recipe || !recipe.steps) {
    return <div className="text-center py-12">Loading recipe...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with recipe info */}
        <div className="bg-primary-500 text-white p-6">
          <h1 className="text-2xl font-bold">{recipe.name}</h1>
          <p className="text-primary-100">
            Step {currentStepIndex + 1} of {recipe.steps.length}
          </p>
        </div>

        {/* Current step display */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-50 p-6 rounded-lg border border-neutral-200"
              ref={stepsRef}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Step {currentStepIndex + 1}</h2>
                <TextToSpeech text={currentStep.instruction} autoPlay={true} />
              </div>
              <p className="text-lg text-neutral-700">{currentStep.instruction}</p>
              {currentStep.duration > 0 && (
                <div className="mt-4 flex items-center text-secondary-700">
                  <Coffee size={20} className="mr-2" />
                  <span>Takes about {Math.round(currentStep.duration / 60)} minutes</span>
                </div>
              )}
              {currentStep.tips && (
                <div className="mt-4 p-3 bg-secondary-50 border-l-4 border-secondary-500 text-secondary-700 rounded">
                  <p className="flex items-start">
                    <MessageSquareText size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                    <span>{currentStep.tips}</span>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Voice assistant response */}
          <AnimatePresence>
            {showAssistant && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-neutral-100 rounded-lg border border-neutral-200"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium flex items-center">
                    <MessageSquareText size={18} className="mr-2 text-primary-500" />
                    Chef Assistant
                  </h3>
                  <button
                    onClick={() => setShowAssistant(false)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    &times;
                  </button>
                </div>
                <p className="mt-2">{assistantResponse}</p>
                <div className="mt-2">
                  <TextToSpeech text={assistantResponse} autoPlay={true} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={goToPreviousStep}
              disabled={currentStepIndex === 0}
              className={`btn flex items-center ${
                currentStepIndex === 0 ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'btn-outline'
              }`}
            >
              <ChevronLeft size={20} className="mr-1" />
              Previous
            </button>

            <div className="flex items-center">
              {recipe.steps.map((_, index) => (
                <div key={index}>{stepIndicator(index)}</div>
              ))}
            </div>

            <button
              onClick={goToNextStep}
              disabled={currentStepIndex === recipe.steps.length - 1}
              className={`btn flex items-center ${
                currentStepIndex === recipe.steps.length - 1
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              Next
              <ChevronRight size={20} className="ml-1" />
            </button>
          </div>

          {/* Extra buttons */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={repeatCurrentStep}
              className="btn-outline flex items-center py-1.5 px-3 text-sm"
            >
              <RefreshCw size={16} className="mr-1.5" />
              Repeat Step
            </button>
            
            <button
              onClick={() => {
                setShowAssistant(true);
                setAssistantResponse("Need help? Just say what you need assistance with, like 'How do I know when it's done?' or 'I don't have this ingredient'");
              }}
              className="btn-outline flex items-center py-1.5 px-3 text-sm"
            >
              <AlertTriangle size={16} className="mr-1.5" />
              I Need Help
            </button>
          </div>
        </div>

        {/* Voice commands section */}
        <div className="bg-neutral-100 p-6 border-t border-neutral-200">
          <div className="max-w-md mx-auto">
            <h3 className="text-center text-lg font-medium mb-4">Voice Commands</h3>
            
            <VoiceRecorder
              onTranscriptionResult={handleTranscriptionResult}
              isListening={isListening}
              setIsListening={setIsListening}
            />
            
            {lastCommand && (
              <div className="mt-4 text-center">
                <p className="text-sm text-neutral-500">I heard:</p>
                <p className="text-neutral-700">{lastCommand}</p>
              </div>
            )}
            
            <div className="mt-6">
              <p className="text-sm text-neutral-500 text-center mb-2">Try saying:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white p-2 rounded border border-neutral-200 text-center">"Next step"</div>
                <div className="bg-white p-2 rounded border border-neutral-200 text-center">"Go back"</div>
                <div className="bg-white p-2 rounded border border-neutral-200 text-center">"Repeat that"</div>
                <div className="bg-white p-2 rounded border border-neutral-200 text-center">"How do I...?"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingInterface;