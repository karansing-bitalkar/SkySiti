import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building2, Users, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const offices = [
  { city: 'Main Office', address: '100 Smart City Blvd, Innovation District', phone: '+1 (555) 010-0000', email: 'hello@skysiti.com' },
  { city: 'West Coast', address: '450 Pacific Ave, Tech Quarter, CA', phone: '+1 (555) 020-0000', email: 'west@skysiti.com' },
];

const faqs = [
  { q: 'How do I list my business on SkySiti?', a: 'Register as a Business Owner and use the business dashboard to create your listing. It takes less than 5 minutes!' },
  { q: 'Is SkySiti free to use?', a: 'Yes! SkySiti is completely free for users. Business listings have both free and premium tiers.' },
  { q: 'How long does listing verification take?', a: 'Verified listings are typically reviewed within 2-3 business days.' },
  { q: 'Can I manage multiple business locations?', a: 'Absolutely! The business dashboard supports multiple location management from a single account.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', type: 'general' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitted(true);
    toast.success('Message sent! We\'ll respond within 24 hours.');
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-5xl font-display font-black text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">Have a question, partnership idea, or just want to say hi? We'd love to hear from you.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Contact Details</h3>
              <div className="space-y-4">
                <a href="mailto:hello@skysiti.com" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 transition-colors">
                    <Mail className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-slate-800 font-medium group-hover:text-primary-600 transition-colors">hello@skysiti.com</p>
                  </div>
                </a>
                <a href="tel:+15550100" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-500 transition-colors">
                    <Phone className="w-5 h-5 text-secondary-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-slate-800 font-medium">+1 (555) 010-0000</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">HQ</p>
                    <p className="text-slate-800 font-medium">100 Smart City Blvd</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Hours</p>
                    <p className="text-slate-800 font-medium">Mon–Fri 9am–6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary-500" /> Our Offices</h3>
              {offices.map(o => (
                <div key={o.city} className="mb-4 last:mb-0 p-3 bg-slate-50 rounded-xl">
                  <p className="font-semibold text-slate-800 text-sm">{o.city}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{o.address}</p>
                  <p className="text-primary-600 text-xs mt-1">{o.phone}</p>
                </div>
              ))}
            </div>

            <div className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-slate-900">For Businesses</h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">Looking to list your business or explore partnership opportunities?</p>
              <a href="mailto:partnerships@skysiti.com" className="btn-primary text-sm w-full text-center block">partnerships@skysiti.com</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="card p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-accent-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '', type: 'general' }); }} className="btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Message Type</label>
                    <div className="flex gap-3 flex-wrap">
                      {[['general', 'General Inquiry'], ['business', 'Business Partnership'], ['support', 'Support'], ['press', 'Press']].map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, type: val }))}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${form.type === val ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary-50'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email Address *</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Subject</label>
                    <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input-field" placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={6} className="input-field resize-none" placeholder="Tell us everything..." />
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map(f => (
              <div key={f.q} className="card p-6">
                <h3 className="font-bold text-slate-900 mb-2">{f.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
