import { useState } from 'react';
import { MessageSquare, Send, Search } from 'lucide-react';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { MOCK_MESSAGES } from '@/constants';

const inbox = [
  { id: '1', from: 'Alex Johnson', preview: 'Hi, do you have availability this weekend?', time: '10:30 AM', unread: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop' },
  { id: '2', from: 'Emma Wilson', preview: 'I would like to book a table for 4 people.', time: 'Yesterday', unread: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop' },
  { id: '3', from: 'Mark Davis', preview: 'Great service! Question about your menu.', time: 'Mon', unread: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' },
];

export default function BusinessMessages() {
  const [selected, setSelected] = useState<string | null>(inbox[0].id);
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState<Record<string, {from: string, content: string}[]>>({
    '1': [{ from: 'customer', content: 'Hi, do you have availability this weekend?' }, { from: 'me', content: 'Thank you for your inquiry! We have tables available Saturday evening.' }],
    '2': [{ from: 'customer', content: 'I would like to book a table for 4 people.' }],
    '3': [{ from: 'customer', content: 'Great service! Question about your menu.' }, { from: 'me', content: 'Thank you! What would you like to know?' }],
  });

  const send = () => {
    if (!newMsg.trim() || !selected) return;
    setMessages(prev => ({ ...prev, [selected]: [...(prev[selected] || []), { from: 'me', content: newMsg }] }));
    setNewMsg('');
  };

  const thread = messages[selected || ''] || [];
  const conv = inbox.find(i => i.id === selected);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 0px)' }}>
      <DashboardTopbar title="Messages & Inquiries" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 border-r border-slate-100 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-slate-400" />
              <input placeholder="Search messages..." className="flex-1 text-sm bg-transparent focus:outline-none text-slate-800 placeholder-slate-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {inbox.map(i => (
              <button key={i.id} onClick={() => setSelected(i.id)} className={`w-full text-left p-4 flex items-center gap-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${selected === i.id ? 'bg-primary-50' : ''}`}>
                <img src={i.avatar} alt={i.from} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 text-sm">{i.from}</p>
                    <div className="flex items-center gap-1">
                      {i.unread && <div className="w-2 h-2 bg-primary-500 rounded-full" />}
                      <p className="text-xs text-slate-400">{i.time}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{i.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-slate-50">
          {conv ? (
            <>
              <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-3">
                <img src={conv.avatar} alt={conv.from} className="w-9 h-9 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{conv.from}</p>
                  <p className="text-xs text-slate-400">Customer inquiry</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {thread.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${m.from === 'me' ? 'bg-primary-500 text-white rounded-br-md' : 'bg-white text-slate-800 shadow-sm rounded-bl-md'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border-t border-slate-100 p-4 flex gap-3">
                <input value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Reply to customer..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 transition-all" />
                <button onClick={send} className="btn-primary px-4"><Send className="w-4 h-4" /></button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-slate-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
