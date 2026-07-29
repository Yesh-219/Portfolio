import { useState, useCallback, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const LOCAL_KNOWLEDGE: Record<string, string> = {
  'tell me about yeswanth': 'Yeswanth Kumar Kaluva is a highly skilled Backend & Full Stack Software Engineer from Andhra Pradesh, India. He specializes in Node.js, Express, MySQL, and Python. He has solved over 500+ DSA problems and completed 3 rigorous internships, demonstrating strong problem-solving abilities and a passion for building scalable architecture.',
  'explain the speech emotion recognition project': 'The Speech Emotion Recognition project is a deep learning application that detects human emotions from speech in real time. It utilizes a hybrid CNN-LSTM architecture built with Python and TensorFlow, alongside an optimized audio preprocessing pipeline using MFCC. It is exposed via a concurrent Flask REST API.',
  'show backend experience': 'Yeswanth has extensive backend experience! He interned as a Backend Engineer at nDMatrix, where he built secure REST APIs using Node.js and Express, designed complex relational MySQL schemas, and implemented JWT authentication with RBAC middleware.',
  'what technologies does he know': 'His core stack includes Node.js, Express, MySQL, React, and Python. He is also highly proficient in Java, C, Docker, Git, Azure, TensorFlow, and Flask. Check out the Skills section for a full constellation of his technologies!',
  'how many dsa problems has he solved': 'Yeswanth has solved over **500+ Data Structures and Algorithms problems**, demonstrating a rigorous grasp of algorithmic logic and optimization.',
  'show internships': '1. **nDMatrix** (Backend Engineering Intern)\n2. **Vignan University** (Software Engineering Intern)\n3. **Fusil Solutions** (Full Stack Development Intern)',
  'download resume': 'You can download his official resume by clicking the **Download Resume** button in the Resume Card to the right! 👉',
  'contact yeswanth': 'You can reach him instantly by filling out the Contact Form to the right, or by emailing him directly via the Social Links card! 📧',
  'show github': 'His GitHub features 35+ repositories and 950+ contributions! You can visit it via the GitHub card to the right, or directly at [github.com/yeswanth](https://github.com/yeswanth).',
  'show linkedin': 'You can connect with him on LinkedIn using the Social Links card on the right!'
};

const DEFAULT_RESPONSE = "I'm currently running on a local fallback model, so I can only answer specific questions about Yeswanth right now! Try clicking one of the suggested prompts, or ask about his **Experience**, **Skills**, or **Projects**.";

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi 👋\n\nI'm Yeswanth's AI Assistant.\nAsk me anything about his Experience, Projects, Skills, Internships, Technologies, Resume, Education, or Achievements!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const simulateStreaming = useCallback((fullText: string, messageId: string) => {
    let currentText = '';
    const words = fullText.split(' ');
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, content: currentText, isStreaming: true } : msg
        ));
        wordIndex++;
      } else {
        clearInterval(interval);
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isStreaming: false } : msg
        ));
        setIsTyping(false);
      }
    }, 50); // Speed of streaming
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim() || isTyping) return;

    const userMsgId = Date.now().toString();
    const assistantMsgId = (Date.now() + 1).toString();

    // 1. Add User Message
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content }]);
    setIsTyping(true);

    // 2. Find Response
    const lowerContent = content.toLowerCase().trim();
    // Simple exact match logic for the simulated local DB.
    // In production, this is where you'd call OpenAI API.
    let responseText = DEFAULT_RESPONSE;
    
    // Fuzzy search simulation
    for (const [key, value] of Object.entries(LOCAL_KNOWLEDGE)) {
      if (lowerContent.includes(key.replace('?', '')) || key.includes(lowerContent.replace('?', ''))) {
        responseText = value;
        break;
      }
    }

    // 3. Simulate Network Delay then Stream
    setTimeout(() => {
      setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '', isStreaming: true }]);
      simulateStreaming(responseText, assistantMsgId);
    }, 600);

  }, [isTyping, simulateStreaming]);

  return {
    messages,
    isTyping,
    sendMessage
  };
}
