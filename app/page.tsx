'use client';

import { useState } from 'react';

export default function GrokForge() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am Grok, your coding partner. What do you want to build or debug today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    // TODO: Later connect to real Grok API
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Here's a sample response. In the real version, I would write full code for you.\n\nExample code:\n\`\`\`js\nfunction hello() {\n  console.log("GrokForge is live!");\n}\n\`\`\`` 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col">
      <header className="p-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold">GrokForge</h1>
        <p className="text-gray-400">Powered by Grok • Built for Developers</p>
      </header>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'}`}>
              <pre className="whitespace-pre-wrap text-sm">{msg.content}</pre>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-400">Grok is thinking...</div>}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Describe what you want to build or debug..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
    }
