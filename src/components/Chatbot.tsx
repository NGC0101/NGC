import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send } from 'lucide-react';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-80 h-96 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-surface-subtle)]">
              <span className="font-semibold text-sm">Injazify Assistant</span>
              <button onClick={() => setIsOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-lg text-xs ${m.role === 'user' ? 'bg-[var(--accent-surface)] self-end' : 'bg-[var(--bg-surface-subtle)]'}`}>
                  {m.text}
                </div>
              ))}
              {loading && <div className="text-xs text-[var(--text-muted)]">Typing...</div>}
            </div>
            <div className="p-3 border-t border-[var(--border-color)] flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 text-xs px-2 py-1 bg-[var(--bg-surface-subtle)] rounded-lg border border-[var(--border-color)]"
                placeholder="Ask about mentorship..."
              />
              <button onClick={sendMessage} className="p-1.5 rounded-lg bg-[var(--accent-primary)] text-white"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="p-4 rounded-full bg-[var(--accent-primary)] text-white shadow-lg"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
