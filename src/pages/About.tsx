import { Link } from 'react-router-dom';
import { MapPin, Users, Building2, Globe, Award, ArrowRight, Lightbulb, Heart, Shield, Zap, Target, CheckCircle } from 'lucide-react';

const team = [
  { name: 'Elena Rodriguez', role: 'CEO & Co-Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', bio: 'Former urban planner turned tech entrepreneur.' },
  { name: 'James Liu', role: 'CTO & Co-Founder', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', bio: 'Ex-Google engineer passionate about city tech.' },
  { name: 'Aisha Patel', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', bio: 'Award-winning UX designer with 10+ years in consumer apps.' },
  { name: 'Marcus Okafor', role: 'Head of Growth', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', bio: 'Scaled products to millions across 3 continents.' },
];

const values = [
  { icon: Heart, title: 'Community First', desc: 'We build for people. Every feature is designed to bring communities closer together.', color: 'bg-pink-100 text-pink-600' },
  { icon: Shield, title: 'Trust & Safety', desc: 'Every listing is verified. Your data is protected. We take accountability seriously.', color: 'bg-primary-100 text-primary-600' },
  { icon: Zap, title: 'Innovation', desc: 'We constantly push boundaries to deliver smarter city experiences for everyone.', color: 'bg-amber-100 text-amber-600' },
  { icon: Globe, title: 'Inclusivity', desc: 'SkySiti is built for everyone — regardless of background, language, or location.', color: 'bg-accent-100 text-accent-600' },
];

const milestones = [
  { year: '2021', event: 'SkySiti founded in a small co-working space', icon: Lightbulb },
  { year: '2022', event: 'Launched in first city with 500 businesses', icon: Building2 },
  { year: '2023', event: 'Expanded to 12 cities, 5M+ users served', icon: Globe },
  { year: '2024', event: 'Raised Series A — $18M for platform growth', icon: Target },
  { year: '2025', event: '24 cities, 50K+ active users, 12K+ listings', icon: Award },
  { year: '2026', event: 'Launching AI city guide and AR navigation', icon: Zap },
];

export default function About() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-950 to-secondary-950 py-28">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/40">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            We're Building <span className="text-gradient">Smarter Cities</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            SkySiti is on a mission to connect people with the best of their city. We believe local communities thrive when people have easy access to the businesses, events, and experiences that make their city unique.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '50K+', label: 'Active Users', color: 'text-primary-500' },
              { icon: Building2, value: '12.4K+', label: 'Businesses', color: 'text-secondary-500' },
              { icon: Globe, value: '24', label: 'Cities', color: 'text-accent-500' },
              { icon: Award, value: '98%', label: 'Satisfaction Rate', color: 'text-amber-500' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon className={`w-10 h-10 mx-auto mb-4 ${s.color}`} />
                <p className="text-4xl font-display font-black text-slate-900">{s.value}</p>
                <p className="text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-4xl font-display font-black text-slate-900 mb-5">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We started SkySiti because we believed there was a better way to explore cities. Traditional city guides were static, outdated, and impersonal. We built a living, breathing platform where businesses and communities can connect in real time.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Today, SkySiti powers city discovery for over 50,000 users across 24 cities — helping people find great food, fun events, local deals, and the hidden gems that make every city special.
              </p>
              <ul className="space-y-3">
                {['Real-time city discovery', 'Verified business listings', 'Community-driven reviews', 'Seamless event booking'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=450&fit=crop" alt="City" className="rounded-3xl shadow-2xl w-full object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
                <p className="text-3xl font-display font-black text-gradient">2021</p>
                <p className="text-slate-500 text-sm">Founded with a vision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">Our Values</h2>
            <p className="section-sub mx-auto">The principles that guide everything we build and every decision we make</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${v.color}`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">Our Journey</h2>
            <p className="section-sub mx-auto">From a tiny co-working space to a platform powering 24 cities</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />
            <div className="space-y-8">
              {milestones.map(m => (
                <div key={m.year} className="flex items-start gap-6 pl-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/30 z-10">
                    <m.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{m.year}</span>
                    <p className="text-slate-800 font-medium mt-2">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">Meet the Team</h2>
            <p className="section-sub mx-auto">The people building the future of city exploration</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(t => (
              <div key={t.name} className="card p-6 text-center group hover:-translate-y-1 transition-all duration-300">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 group-hover:ring-4 group-hover:ring-primary-200 transition-all" />
                <h3 className="font-bold text-slate-900">{t.name}</h3>
                <p className="text-primary-600 text-sm font-medium mt-0.5">{t.role}</p>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-black text-white mb-4">Join the SkySiti Community</h2>
          <p className="text-primary-100 text-lg mb-8">Whether you're a city explorer, business owner, or event organizer — there's a place for you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register" className="flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:bg-primary-50 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/20 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
