import { useState, useEffect, useCallback } from 'react';
import { Send, Search, MessageSquare, Wifi, WifiOff, Circle } from 'lucide-react';
import { MOCK_MESSAGES } from '@/constants';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface ChatMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
  isTyping?: boolean;
}

const CONVERSATIONS = ['The Urban Brew', 'Skyline Fitness', 'Metro Bites', 'Bloom Spa & Wellness', 'TechHub Coworking'];

export default function UserChat() {
  const { user, supabaseUser } = useAuth();
  const [selected, setSelected] = useState<string>(CONVERSATIONS[0]);
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES as ChatMessage[]);
  const [q, setQ] = useState('');
  const [isOnline] = useState(true);
  const [typing, setTyping] = useState<Record<string, boolean>>({});
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sending, setSending] = useState(false);

  const filtered = CONVERSATIONS.filter(c => !q || c.toLowerCase().includes(q.toLowerCase()));
  const threadMessages = messages.filter(m => m.from === selected || m.to === selected);

  // Load messages from Supabase if user is authenticated
  const loadMessages = useCallback(async () => {
    if (!supabaseUser) return;
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('sender_id', supabaseUser.id)
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped: ChatMessage[] = data.map(m => ({
        id: m.id,
        from: m.sender_id === supabaseUser.id ? 'user' : m.sender_name,
        to: m.sender_id === supabaseUser.id ? m.receiver_name : 'user',
        content: m.content,
        timestamp: m.created_at,
        read: m.is_read,
      }));
      setMessages([...MOCK_MESSAGES as ChatMessage[], ...mapped]);
      setIsConnected(true);
    }
  }, [supabaseUser]);

  // Poll for new messages every 3 seconds
  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [loadMessages]);

  // Simulate bot reply for demo mode
  const simulateBotReply = useCallback((businessName: string) => {
    const replies = [
      "Thanks for your message! We'll get back to you shortly.",
      "Great to hear from you! How can we help?",
      "We've received your inquiry and will respond within the hour.",
      "Thank you! Our team will assist you soon.",
    ];
    setTimeout(() => {
      setTyping(prev => ({ ...prev, [businessName]: true }));
      setTimeout(() => {
        setTyping(prev => ({ ...prev, [businessName]: false }));
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          from: businessName,
          to: 'user',
          content: replies[Math.floor(Math.random() * replies.length)],
          timestamp: new Date().toISOString(),
          read: false,
        }]);
      }, 1500);
    }, 500);
  }, []);

  const sendMessage = async () => {
    if (!newMsg.trim() || !selected) return;
    setSending(true);
    const content = newMsg.trim();
    setNewMsg('');

    const localMsg: ChatMessage = {
      id: Date.now().toString(),
      from: 'user',
      to: selected,
      content,
      timestamp: new Date().toISOString(),
      read: true,
    };
    setMessages(prev => [...prev, localMsg]);

    // If real user, save to Supabase
    if (supabaseUser && user) {
      await supabase.from('chat_messages').insert({
        sender_id: supabaseUser.id,
        sender_name: user.name,
        sender_email: user.email,
        receiver_name: selected,
        content,
      });
    }

    setSending(false);
    simulateBotReply(selected);
  };

  const handleTyping = () => {
    if (typingTimeout) clearTimeout(typingTimeout);
    const t = setTimeout(() => {}, 1000);
    setTypingTimeout(t);
  };

  const getUnread = (conv: string) => messages.filter(m => m.from === conv && !m.read).length;
  const getLastMsg = (conv: string) => messages.filter(m => m.from === conv || m.to === conv).slice(-1)[0];

  return (
    <div className="flex flex-col h-screen overflow-hidden dark:bg-slate-950">
      <DashboardTopbar title="Messages" notifPath="/dashboard/user/notifications" />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-slate-400" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="flex-1 text-sm bg-transparent focus:outline-none text-slate-800 dark:text-white placeholder-slate-400" />
            </div>
          </div>

          {/* Connection status */}
          <div className={`flex items-center gap-1.5 px-4 py-2 text-xs ${isConnected ? 'text-accent-600' : 'text-slate-400'}`}>
            {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isConnected ? 'Live messages connected' : 'Demo mode'}
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => {
              const lastMsg = getLastMsg(conv);
              const unread = getUnread(conv);
              const isTypingNow = typing[conv];
              return (
                <button key={conv} onClick={() => setSelected(conv)} className={`w-full text-left p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 ${selected === conv ? 'bg-primary-50 dark:bg-primary-900/20 border-l-2 border-l-primary-500' : ''}`}>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {conv[0]}
                    </div>
                    <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-accent-500 text-accent-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">{conv}</p>
                      {unread > 0 && <span className="badge bg-primary-500 text-white ml-2 text-xs">{unread}</span>}
                    </div>
                    {isTypingNow ? (
                      <p className="text-xs text-accent-500 font-medium">typing...</p>
                    ) : (
                      <p className="text-xs text-slate-400 truncate mt-0.5">{lastMsg?.content || 'Start a conversation'}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
          {selected ? (
            <>
              <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {selected[0]}
                  </div>
                  <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-accent-500 text-accent-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{selected}</p>
                  <p className="text-xs text-accent-500">Online · Typically replies within 1 hour</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {threadMessages.map(m => (
                  <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.from !== 'user' && (
                      <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 self-end">
                        {m.from[0]}
                      </div>
                    )}
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.from === 'user' ? 'bg-primary-500 text-white rounded-br-md' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-md'}`}>
                      {m.content}
                      <p className={`text-xs mt-1 ${m.from === 'user' ? 'text-primary-200' : 'text-slate-400'}`}>
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing[selected] && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                      {selected[0]}
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map(i => (
                          <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce-dot" style={{ animationDelay: `${i * 0.16}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 flex gap-3">
                <input
                  value={newMsg}
                  onChange={e => { setNewMsg(e.target.value); handleTyping(); }}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder-slate-400"
                />
                <button onClick={sendMessage} disabled={!newMsg.trim() || sending} className="btn-primary px-4 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
                  {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
