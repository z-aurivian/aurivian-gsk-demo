import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Sparkles, Loader2, RotateCcw, ShieldCheck } from 'lucide-react';
import { queryAuri } from '../api/auriApi';
import { CLIENT, PRODUCT_OPTIONS, SUGGESTED_PROMPTS, AURI_PROMPTS } from '../config';

// Lookup a canned response by exact prompt match; enables the offline / safety-net path.
function lookupCanned(text) {
  if (!text) return null;
  return AURI_PROMPTS.find(
    (p) => p.prompt.trim().toLowerCase() === text.trim().toLowerCase()
  );
}

function CitationChip({ cite }) {
  const label = `${cite.type}:${cite.id}`;
  return (
    <span
      title="Source in your Intelligence Layer"
      className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20"
    >
      <ShieldCheck size={10} />
      {label}
    </span>
  );
}

/**
 * Reusable chat surface. Used by both the full-page /auri route and the
 * floating Auri sidebar.
 */
export default function AuriChatPanel({
  selectedProduct,
  compact = false,
  showIntro = true,
  className = '',
  initialDirective = '',
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [processedDirective, setProcessedDirective] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const productName = PRODUCT_OPTIONS.find((p) => p.id === selectedProduct)?.name;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [selectedProduct]);

  useEffect(() => {
    if (initialDirective && initialDirective !== processedDirective) {
      setProcessedDirective(initialDirective);
      handleSend(initialDirective);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDirective]);

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage = { role: 'user', content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Canned fast-path — if it matches a populated AURI_PROMPT, use it
      // directly with visible citations. Keeps demos reliable offline.
      const canned = lookupCanned(messageText);
      if (canned) {
        await new Promise((r) => setTimeout(r, 450)); // slight delay so it feels like work
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: canned.response, cites: canned.cites || [] },
        ]);
      } else {
        const response = await queryAuri(newMessages, selectedProduct);
        setMessages((prev) => [...prev, { role: 'assistant', content: response, cites: [] }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I encountered an error processing your request. Please try again.\n\n*Error: ${err.message}*`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const empty = messages.length === 0;

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-1">
        {empty && showIntro ? (
          <div className={`flex flex-col items-center justify-center text-center px-4 ${compact ? 'pt-6' : 'h-full'}`}>
            <div className={`${compact ? 'w-10 h-10 mb-3' : 'w-16 h-16 mb-6'} bg-auri-text/10 rounded-2xl flex items-center justify-center`}>
              <Sparkles size={compact ? 20 : 32} className="text-auri-text" />
            </div>
            <h2 className={`${compact ? 'text-base' : 'text-2xl'} font-semibold text-auri-text mb-1 font-michroma`}>
              {compact ? 'Auri' : 'Auri Intelligence'}
            </h2>
            {!compact && (
              <p className="text-auri-muted mb-6 max-w-lg text-sm">
                Grounded in your Intelligence Layer for {CLIENT.name}
                {productName ? <> — currently scoped to <span className="text-auri-text font-medium">{productName}</span></> : null}.
              </p>
            )}
            {compact && (
              <p className="text-auri-muted text-xs mb-4">
                Grounded in your Intelligence Layer.
              </p>
            )}
            <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-2 w-full ${compact ? '' : 'max-w-2xl'}`}>
              {SUGGESTED_PROMPTS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-left px-3 py-2 bg-auri-card border border-auri-border rounded-lg text-xs text-auri-muted hover:text-auri-text hover:border-auri-text/30 hover:bg-auri-text/5 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-auri-text/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-auri-text" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-auri-text text-auri-bg'
                    : 'bg-auri-card border border-auri-border text-auri-text'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <>
                    <div className="chat-message text-sm leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    </div>
                    {msg.cites?.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-auri-border flex flex-wrap gap-1.5">
                        {msg.cites.map((c, ci) => <CitationChip key={ci} cite={c} />)}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-auri-card rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} className="text-auri-muted" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-auri-text/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-auri-text" />
            </div>
            <div className="bg-auri-card border border-auri-border rounded-lg px-4 py-3">
              <Loader2 size={16} className="text-auri-text animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-auri-border pt-3 px-1">
        <div className="flex items-end gap-2">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              disabled={isLoading}
              title="New conversation"
              className="px-2.5 py-2.5 border border-auri-border rounded-lg text-auri-muted hover:text-auri-text hover:border-auri-text/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <RotateCcw size={14} />
            </button>
          )}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Auri…"
              rows={1}
              className="w-full px-3 py-2.5 bg-auri-card border border-auri-border rounded-lg text-sm text-auri-text placeholder:text-auri-muted/60 focus:outline-none focus:border-auri-text/50 resize-none"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-3 py-2.5 bg-auri-text rounded-lg hover:bg-auri-text/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send size={14} className="text-auri-bg" />
          </button>
        </div>
      </div>
    </div>
  );
}
