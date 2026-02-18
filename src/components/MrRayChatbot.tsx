import { useState, useRef, useEffect, useCallback } from 'react'
import { useAction } from 'convex/react'
import { api } from '@convex/_generated/api'
import { X, Send, Bot, User, Loader2, ExternalLink } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface ChatMessage {
  role: 'user' | 'model'
  content: string
}

const WELCOME_MESSAGE = `Bonjour ! 👋 Je suis **Mr Ray** 🐡, votre assistant virtuel du Consulat Général du Gabon en France.

Je peux vous aider à :
- 🏛️ Trouver des informations sur les **services consulaires**
- 📋 Vous orienter vers les **bonnes démarches**
- 🇬🇦 Répondre à vos questions sur la **vie en France**

Comment puis-je vous aider aujourd'hui ?`

const SUGGESTED_QUESTIONS = [
  'Carte consulaire',
  'Mariage au consulat',
  'OQTF : que faire ?',
  'Vie étudiante',
]

export function MrRayChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatAction = useAction(api.functions.chatbot.chat)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    setHasInteracted(true)
    const userMessage: ChatMessage = { role: 'user', content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const result = await chatAction({
        message: messageText,
        history,
      })

      const assistantMessage: ChatMessage = {
        role: 'model',
        content: result.response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content:
            "Désolé, une erreur s'est produite. Veuillez réessayer ou contacter le consulat par email à **consulatgeneralgabon@yahoo.fr**.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-border/60 chatbot-window"
          style={{
            background: 'var(--glass-panel-bg)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Mr Ray 🐡</h3>
                <p className="text-xs opacity-80">Assistant du Consulat</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[300px] max-h-[calc(70vh-140px)]">
            {/* Welcome message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-md max-w-[85%] text-sm leading-relaxed chatbot-message">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                        {href?.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                      </a>
                    ),
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    ul: ({ children }) => <ul className="list-none space-y-1 my-2">{children}</ul>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                  }}
                >
                  {WELCOME_MESSAGE}
                </ReactMarkdown>
              </div>
            </div>

            {/* Suggested questions */}
            {!hasInteracted && (
              <div className="flex flex-wrap gap-2 pl-11">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/10'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed chatbot-message ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-md'
                      : 'glass-card rounded-tl-md'
                  }`}
                >
                  {msg.role === 'model' ? (
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className={`font-medium inline-flex items-center gap-1 hover:underline ${
                              msg.role === 'model' ? 'text-primary' : 'text-primary-foreground underline'
                            }`}
                            target={href?.startsWith('http') ? '_blank' : undefined}
                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {children}
                            {href?.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                          </a>
                        ),
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
                        ),
                        li: ({ children }) => <li className="text-sm">{children}</li>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-md">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mr Ray réfléchit...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-border/50 px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                className="flex-1 bg-muted/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/50 mt-2 text-center">
              Propulsé par Gemini AI • Pour les démarches, utilisez{' '}
              <a
                href="https://consulat.ga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/60 hover:text-primary transition-colors"
              >
                CONSULAT.GA
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button — Spherical, vermillion-pink-yellow with heartbeat */}
      <button
        onClick={toggleChat}
        className={`fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-50 w-[144px] h-[144px] flex items-center justify-center rounded-full shadow-xl transition-all duration-300 ${
          isOpen
            ? 'bg-muted hover:bg-muted/80 text-muted-foreground'
            : 'text-white animate-heartbeat'
        }`}
        style={!isOpen ? {
          background: 'linear-gradient(135deg, #E74C3C 0%, #FF6B9D 35%, #EAB308 100%)',
          boxShadow: '0 6px 30px rgba(231, 76, 60, 0.4), 0 0 50px rgba(234, 179, 8, 0.2)',
        } : undefined}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat Mr Ray'}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <span className="font-extrabold text-2xl text-white drop-shadow-md tracking-wide">Mr Ray</span>
        )}
      </button>
    </>
  )
}
