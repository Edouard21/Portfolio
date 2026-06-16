import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import type { ChatMessage } from '../types';
import './ChatWidget.css';

// Simple pattern-matching knowledge base
const knowledgeBase: Record<string, { fr: string; en: string }> = {
  experience: {
    fr: "Édouard est ingénieur IA & Data avec une expertise en Machine Learning, Deep Learning et Data Engineering. Il a travaillé sur des projets variés : NLP, Computer Vision, pipelines de données et déploiement MLOps.",
    en: "Édouard is an AI & Data Engineer with expertise in Machine Learning, Deep Learning and Data Engineering. He has worked on diverse projects: NLP, Computer Vision, data pipelines and MLOps deployment.",
  },
  technologies: {
    fr: "Ses technologies principales sont : Python, PyTorch, TensorFlow, Scikit-Learn, SQL, Apache Spark, Airflow, React, Docker, AWS et GCP. Il maîtrise également LangChain, MLflow et Kubernetes.",
    en: "His core technologies are: Python, PyTorch, TensorFlow, Scikit-Learn, SQL, Apache Spark, Airflow, React, Docker, AWS and GCP. He also masters LangChain, MLflow and Kubernetes.",
  },
  suisse: {
    fr: "Édouard est attiré par l'écosystème suisse pour son excellence en recherche, sa culture de la précision et son dynamisme technologique. Il cherche à contribuer à des projets innovants en Suisse.",
    en: "Édouard is drawn to the Swiss ecosystem for its research excellence, culture of precision and technological dynamism. He seeks to contribute to innovative projects in Switzerland.",
  },
  formation: {
    fr: "Édouard a une formation solide en ingénierie informatique avec une spécialisation en Intelligence Artificielle et Science des Données.",
    en: "Édouard has a strong background in computer engineering with a specialization in Artificial Intelligence and Data Science.",
  },
  contact: {
    fr: "Vous pouvez contacter Édouard via le formulaire de contact en bas de cette page, ou directement sur LinkedIn et GitHub.",
    en: "You can reach Édouard through the contact form at the bottom of this page, or directly via LinkedIn and GitHub.",
  },
  default: {
    fr: "Je suis l'assistant IA d'Édouard. Vous pouvez me poser des questions sur son expérience, ses technologies, sa motivation pour la Suisse, ou sa formation. Essayez une des suggestions ci-dessous !",
    en: "I'm Édouard's AI assistant. You can ask me about his experience, technologies, motivation for Switzerland, or education. Try one of the suggestions below!",
  },
};

const suggestions = {
  fr: ["Quelle est son expérience ?", "Quelles technologies ?", "Pourquoi la Suisse ?", "Comment le contacter ?"],
  en: ["What's his experience?", "What technologies?", "Why Switzerland?", "How to contact him?"],
};

function getResponse(input: string, lang: string): string {
  const lower = input.toLowerCase();
  const l = lang === 'en' ? 'en' : 'fr';

  if (lower.includes('expérien') || lower.includes('experienc') || lower.includes('parcour') || lower.includes('background'))
    return knowledgeBase.experience[l];
  if (lower.includes('techno') || lower.includes('compéten') || lower.includes('skill') || lower.includes('stack') || lower.includes('outil'))
    return knowledgeBase.technologies[l];
  if (lower.includes('suisse') || lower.includes('switzerland') || lower.includes('swiss') || lower.includes('pourquoi'))
    return knowledgeBase.suisse[l];
  if (lower.includes('formation') || lower.includes('éducation') || lower.includes('education') || lower.includes('diplôme') || lower.includes('degree'))
    return knowledgeBase.formation[l];
  if (lower.includes('contact') || lower.includes('email') || lower.includes('joindre') || lower.includes('reach'))
    return knowledgeBase.contact[l];

  return knowledgeBase.default[l];
}

export const ChatWidget = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.substring(0, 2) || 'fr';
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: lang === 'en'
        ? "Hi! 👋 I'm Édouard's AI assistant. Ask me anything about his background!"
        : "Bonjour ! 👋 Je suis l'assistant IA d'Édouard. Posez-moi une question sur son parcours !",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: msgText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: getResponse(msgText, lang),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const currentSuggestions = lang === 'en' ? suggestions.en : suggestions.fr;

  return (
    <div className="chat-widget" id="chat-widget">
      {isOpen && (
        <div className="chat-widget__window">
          <div className="chat-widget__header">
            <div className="chat-widget__header-info">
              <div className="chat-widget__avatar">ÉL</div>
              <div className="chat-widget__header-text">
                <h4>AI Assistant</h4>
                <p>{lang === 'en' ? 'Ask about Édouard' : "Posez une question sur Édouard"}</p>
              </div>
            </div>
            <button className="chat-widget__close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <FiX />
            </button>
          </div>

          <div className="chat-widget__messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-widget__message chat-widget__message--${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="chat-widget__suggestions">
              {currentSuggestions.map((s) => (
                <button key={s} className="chat-widget__suggestion" onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="chat-widget__input-area">
            <input
              className="chat-widget__input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'en' ? 'Ask a question...' : 'Posez une question...'}
              id="chat-input"
            />
            <button className="chat-widget__send" onClick={() => handleSend()} aria-label="Send">
              <FiSend />
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-widget__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
        id="chat-toggle"
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
};
