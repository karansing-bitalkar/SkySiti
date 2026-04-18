import { Link } from 'react-router-dom';
import { MapPin, Twitter, Instagram, Facebook, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-display font-bold text-white">Ready to explore your city?</h3>
            <p className="text-primary-100 mt-1">Join 50,000+ users discovering the best of SkySiti.</p>
          </div>
          <Link to="/register" className="flex items-center gap-2 bg-white text-primary-600 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors whitespace-nowrap">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">SkySiti</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-5 max-w-xs">
              The ultimate smart city platform. Discover local businesses, events, and exclusive deals near you.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-slate-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[['About Us', '/about'], ['Careers', '/about'], ['Press', '/about'], ['Blog', '/about'], ['Partners', '/about']].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="text-slate-400 hover:text-primary-400 transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[['City Explore', '/explore'], ['Events', '/events'], ['Deals & Offers', '/offers'], ['Business Listings', '/explore'], ['City Map', '/explore']].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="text-slate-400 hover:text-primary-400 transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 mb-6">
              {[['Privacy Policy', '#'], ['Terms of Service', '#'], ['Cookie Policy', '#'], ['GDPR', '#']].map(([label, path]) => (
                <li key={label}>
                  <a href={path} className="text-slate-400 hover:text-primary-400 transition-colors text-sm">{label}</a>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:hello@skysiti.com" className="flex items-center gap-2 text-slate-400 hover:text-primary-400 text-sm transition-colors">
                <Mail className="w-3.5 h-3.5" /> hello@skysiti.com
              </a>
              <a href="tel:+15550100" className="flex items-center gap-2 text-slate-400 hover:text-primary-400 text-sm transition-colors">
                <Phone className="w-3.5 h-3.5" /> +1 (555) 010-0000
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 SkySiti. All rights reserved.</p>
          <p className="text-slate-600 text-sm">Built with ❤️ for smart cities worldwide</p>
        </div>
      </div>
    </footer>
  );
}
