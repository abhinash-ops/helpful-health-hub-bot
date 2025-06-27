
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Dr. AI Assistant, your virtual healthcare companion. I'm here to help answer basic health questions and provide general medical information while your doctor is unavailable. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Emergency keywords
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || 
        lowerMessage.includes('chest pain') || lowerMessage.includes('heart attack') ||
        lowerMessage.includes('stroke') || lowerMessage.includes('bleeding') ||
        lowerMessage.includes('difficulty breathing')) {
      return "⚠️ This sounds like a medical emergency. Please call 911 immediately or go to your nearest emergency room. Do not delay seeking immediate medical attention.";
    }

    // Symptom responses
    if (lowerMessage.includes('headache')) {
      return "Headaches can have various causes including stress, dehydration, lack of sleep, or tension. For mild headaches, try rest, hydration, and over-the-counter pain relievers as directed. However, seek immediate medical attention for severe, sudden headaches, headaches with fever, vision changes, or neck stiffness.";
    }

    if (lowerMessage.includes('fever')) {
      return "Fever is often a sign your body is fighting an infection. For adults, a fever over 103°F (39.4°C) or persistent fever for more than 3 days warrants medical attention. Stay hydrated, rest, and consider acetaminophen or ibuprofen as directed. Seek immediate care for high fever with severe symptoms.";
    }

    if (lowerMessage.includes('cough')) {
      return "Coughs can be caused by various factors including viral infections, allergies, or irritants. For a persistent cough lasting more than 2 weeks, cough with blood, or accompanied by fever and difficulty breathing, please consult a healthcare provider. Stay hydrated and consider honey for throat soothing.";
    }

    if (lowerMessage.includes('stomach') || lowerMessage.includes('nausea') || lowerMessage.includes('vomiting')) {
      return "Stomach issues can range from minor digestive problems to more serious conditions. For mild nausea, try clear fluids, bland foods (BRAT diet), and rest. Seek medical attention for severe abdominal pain, persistent vomiting, signs of dehydration, or blood in vomit.";
    }

    if (lowerMessage.includes('cold') || lowerMessage.includes('flu')) {
      return "Cold and flu symptoms typically resolve on their own with rest, fluids, and supportive care. See a doctor if symptoms worsen after a week, you have a high fever, difficulty breathing, or if you're in a high-risk group (elderly, pregnant, chronic conditions).";
    }

    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return "I cannot provide specific medication advice or dosing recommendations. Please consult your pharmacist or healthcare provider for medication questions. Always follow prescribed dosing instructions and inform healthcare providers about all medications you're taking.";
    }

    if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      return "I cannot schedule appointments, but I recommend calling your healthcare provider's office directly. Many practices also offer online patient portals for appointment scheduling. For urgent concerns, consider urgent care centers or telehealth options.";
    }

    // General health topics
    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
      return "A balanced diet with fruits, vegetables, whole grains, lean proteins, and adequate hydration supports overall health. For specific dietary needs or restrictions, consult with a registered dietitian or your healthcare provider.";
    }

    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      return "Regular physical activity is important for health. Adults should aim for at least 150 minutes of moderate aerobic activity weekly. Start slowly and gradually increase intensity. Consult your doctor before beginning a new exercise program, especially if you have health conditions.";
    }

    if (lowerMessage.includes('sleep')) {
      return "Good sleep hygiene includes 7-9 hours of sleep nightly, consistent sleep schedule, comfortable sleep environment, and avoiding screens before bedtime. Persistent sleep problems may warrant evaluation by a healthcare provider.";
    }

    // Mental health
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('depression')) {
      return "Mental health is as important as physical health. Stress management techniques include deep breathing, exercise, meditation, and social support. If you're experiencing persistent anxiety, depression, or thoughts of self-harm, please reach out to a mental health professional or crisis hotline immediately.";
    }

    // Default responses
    const defaultResponses = [
      "I understand your concern. While I can provide general health information, it's important to consult with a healthcare professional for personalized medical advice. Can you tell me more about your specific symptoms?",
      "Thank you for sharing that with me. For the most accurate diagnosis and treatment, I recommend discussing this with your healthcare provider. In the meantime, is there any general health information I can help you with?",
      "I'm here to help with general health questions, but please remember that I cannot replace professional medical evaluation. If your symptoms are concerning or persistent, please contact your healthcare provider.",
      "That's an important health question. While I can offer general guidance, your healthcare provider would be the best person to give you specific advice based on your medical history and current condition."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue.trim()),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dr. AI Assistant</h1>
              <p className="text-sm text-gray-600">Virtual Healthcare Companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto p-4">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> This AI assistant provides general health information only and cannot replace professional medical advice, diagnosis, or treatment. For medical emergencies, call 911 immediately.
          </AlertDescription>
        </Alert>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}
              
              <Card className={`max-w-md p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border-gray-200'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </Card>

              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <Card className="bg-white border-gray-200 p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms or ask a health question..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Always consult healthcare professionals for medical decisions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
