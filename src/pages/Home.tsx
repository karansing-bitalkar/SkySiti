
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Users, Shield, Zap, Search, TrendingUp, Globe, ChevronRight, CheckCircle, Play, Building2, CalendarDays, Tag } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_EVENTS } from '@/constants';
import BusinessCard from '@/components/features/BusinessCard';
import EventCard from '@/components/features/EventCard';
import SearchBar from '@/components/features/SearchBar';
import heroImg from '@/assets/hero-city.jpg';

const stats = [
  { label: 'Businesses Listed', value: '12,400+', icon: Building2, color: 'text-primary-500' },
  { label: 'Monthly Events', value: '850+', icon: CalendarDays, color: 'text-secondary-500' },
  { label: 'Active Users', value: '50,000+', icon: Users, color: 'text-accent-500' },
  { label: 'Cities Covered', value: '24', icon: Globe, color: 'text-amber-500' },
];

const features = [
  { icon: Search, title: 'Smart Discovery', desc: 'AI-powered search to find the best spots near you based on your preferences and location.', color: 'bg-primary-100 text-primary-600' },
  { icon: MapPin, title: 'Live City Map', desc: 'Interactive map view showing all businesses, events, and offers in real time.', color: 'bg-secondary-100 text-secondary-600' },
  { icon: Tag, title: 'Exclusive Deals', desc: 'Access hundreds of exclusive local deals and offers you won\'t find anywhere else.', color: 'bg-accent-100 text-accent-600' },
  { icon: Shield, title: 'Verified Listings', desc: 'Every business is reviewed and verified to ensure accurate, trustworthy information.', color: 'bg-amber-100 text-amber-600' },
  { icon: Zap, title: 'Instant Booking', desc: 'Reserve tables, book event tickets, and schedule services in one click.', color: 'bg-pink-100 text-pink-600' },
  { icon: TrendingUp, title: 'City Trends', desc: "Stay on top of what's trending in your city with real-time activity feeds.", color: 'bg-blue-100 text-blue-600' },
];

const testimonials = [
  { name: 'Jessica Park', role: 'Food Blogger', text: 'SkySiti completely changed how I explore my city. I discover new restaurants every week!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop', rating: 5 },
  { name: 'Daniel Lee', role: 'Startup Founder', text: 'Our business saw a 40% increase in foot traffic after listing on SkySiti. Incredible platform.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop', rating: 5 },
  { name: 'Priya Sharma', role: 'Event Organizer', text: 'Managing events has never been easier. We sold out our last 3 events through SkySiti!', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop', rating: 5 },
];

const categories = [
  { label: 'Restaurants', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop', count: 2400 },
  { label: 'Nightlife', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop', count: 560 },
  { label: 'Shopping', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop', count: 1200 },
  { label: 'Wellness', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&h=200&fit=crop', count: 890 },
  { label: 'Arts', img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=200&h=200&fit=crop', count: 340 },
  { label: 'Sports', img: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=200&h=200&fit=crop', count: 720 },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Smart City" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-secondary-900/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-yellow-400" /> Powering 24 cities across the country
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6 animate-slide-up">
            Your City.<br />
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Smarter.</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Discover local businesses, book events, grab exclusive deals, and connect with your city community — all in one powerful platform.
          </p>
          <div className="max-w-2xl mx-auto mb-10 animate-slide-up">
            <SearchBar onSearch={() => {}} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <Link to="/register" className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-2xl hover:shadow-primary-500/40 text-lg">
              Explore Your City <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 transition-all text-lg">
              <Play className="w-5 h-5" /> Watch Demo
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-md transition-all">
                <s.icon className={`w-8 h-8 mx-auto mb-3 ${s.color}`} />
                <p className="text-3xl font-display font-black text-slate-900">{s.value}</p>
                <p className="text-slate-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Browse by Category</h2>
            <p className="section-sub mx-auto">Find exactly what you're looking for across hundreds of categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link key={cat.label} to="/explore" className="group relative rounded-2xl overflow-hidden aspect-square hover:shadow-xl transition-all duration-300">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-sm">{cat.label}</p>
                  <p className="text-slate-300 text-xs">{cat.count.toLocaleString()}+ places</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/explore" className="btn-outline inline-flex items-center gap-2">View All Categories <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading mb-2">Trending Spots</h2>
              <p className="text-slate-500">Discover the hottest places in your city right now</p>
            </div>
            <Link to="/explore" className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:gap-2 transition-all text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_BUSINESSES.slice(0, 3).map(b => (
              <BusinessCard key={b.id} business={b} linkTo={`/dashboard/user/place/${b.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Upcoming Events</h2>
              <p className="text-slate-400">Don't miss what's happening around you</p>
            </div>
            <Link to="/events" className="hidden sm:flex items-center gap-1 text-primary-400 font-semibold text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_EVENTS.slice(0, 3).map(e => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">Everything You Need</h2>
            <p className="section-sub mx-auto">A complete smart city ecosystem at your fingertips</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="card p-6 group hover:border-primary-200 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${f.color} group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Loved by Thousands</h2>
            <p className="section-sub mx-auto">Hear from our community of city explorers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">How SkySiti Works</h2>
            <p className="section-sub mx-auto">Get started in minutes and explore your city like never before</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200" />
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up in seconds with your email or social account', icon: Users },
              { step: '02', title: 'Set Location', desc: 'Tell us where you are and what you love', icon: MapPin },
              { step: '03', title: 'Discover', desc: 'Browse curated recommendations tailored for you', icon: Search },
              { step: '04', title: 'Enjoy', desc: 'Book, visit, and share your city experiences', icon: Star },
            ].map((s) => ( // Removed 'i' as it was unused and could be the source of the parsing error if 's, i' was interpreted incorrectly without surrounding parentheses for destructuring. But given the error line, it's more likely a general JSX parsing issue. The actual error was a misplaced comma before the closing square bracket of the lucide-react import.
              <div key={s.step} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-4xl font-display font-black text-slate-100 absolute -top-2 left-1/2 -translate-x-1/2 -z-10">{s.step}</span>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-5">
            Ready to explore?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-xl mx-auto">
            Join 50,000+ residents discovering the best of their city every day on SkySiti.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:bg-primary-50 transition-all text-lg shadow-2xl">
              Start Exploring <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl border border-white/30 transition-all text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
