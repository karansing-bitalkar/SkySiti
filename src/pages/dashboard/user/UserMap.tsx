import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Map, Search, Navigation, Star, Phone, Clock } from 'lucide-react';
import L from 'leaflet';
import { MOCK_BUSINESSES } from '@/constants';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom colored marker factory
const createMarker = (color: string) => L.divIcon({
  className: '',
  html: `<div style="width:32px;height:40px;display:flex;flex-direction:column;align-items:center">
    <div style="width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};box-shadow:0 4px 12px rgba(0,0,0,0.25);border:3px solid white;display:flex;align-items:center;justify-content:center;">
    </div>
    <div style="width:6px;height:8px;background:${color};clip-path:polygon(0 0,100% 0,50% 100%);margin-top:-2px;"></div>
  </div>`,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -44],
});

const primaryMarker = createMarker('#0EA5E9');
const selectedMarker = createMarker('#7C3AED');

// Mock coordinates for each business (City of Sydney area)
const BUSINESS_COORDS: Record<string, [number, number]> = {
  '1': [-33.8688, 151.2093],
  '2': [-33.8650, 151.2080],
  '3': [-33.8720, 151.2150],
  '4': [-33.8600, 151.2020],
  '5': [-33.8750, 151.2050],
  '6': [-33.8670, 151.2200],
};

function MapFlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 16, { duration: 1.2 });
  return null;
}

export default function UserMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const filtered = MOCK_BUSINESSES.filter(b => !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.category.toLowerCase().includes(q.toLowerCase()));
  const selectedBiz = MOCK_BUSINESSES.find(b => b.id === selected);
  const selectedCoords = selected ? BUSINESS_COORDS[selected] : null;

  return (
    <div className="flex flex-col h-screen overflow-hidden dark:bg-slate-950">
      <DashboardTopbar title="Map View" notifPath="/dashboard/user/notifications" />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search locations..."
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Map className="w-3.5 h-3.5 text-primary-500" />
              <span>{filtered.length} locations • Sydney, AU</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.map(b => (
              <button
                key={b.id}
                onClick={() => setSelected(b.id === selected ? null : b.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all ${selected === b.id ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-300 dark:border-primary-700' : 'hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-transparent'}`}
              >
                <div className="flex gap-3">
                  <img src={b.image} alt={b.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">{b.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{b.address}</p>
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{b.rating}</span>
                      <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 ml-1 text-xs">{b.category}</span>
                      {b.verified && <span className="badge bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-xs">✓</span>}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Leaflet Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[-33.8688, 151.2093]}
            zoom={14}
            style={{ width: '100%', height: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {MOCK_BUSINESSES.map(b => {
              const coords = BUSINESS_COORDS[b.id];
              if (!coords) return null;
              return (
                <Marker
                  key={b.id}
                  position={coords}
                  icon={selected === b.id ? selectedMarker : primaryMarker}
                  eventHandlers={{ click: () => setSelected(b.id === selected ? null : b.id) }}
                >
                  <Popup>
                    <div className="p-3 min-w-[200px]">
                      <img src={b.image} alt={b.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                      <h3 className="font-bold text-slate-900 text-sm">{b.name}</h3>
                      <p className="text-xs text-slate-500 mb-1">{b.address}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold">{b.rating}</span>
                        <span className="text-xs text-slate-400">({b.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                        <Clock className="w-3 h-3" /> {b.hours}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Phone className="w-3 h-3" /> {b.phone}
                      </div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 w-full flex items-center justify-center gap-1.5 bg-primary-500 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        <Navigation className="w-3 h-3" /> Get Directions
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Fly to selected */}
            {selectedCoords && <MapFlyTo lat={selectedCoords[0]} lng={selectedCoords[1]} />}
          </MapContainer>

          {/* Map attribution badge */}
          <div className="absolute top-4 right-4 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shadow-sm">
            <Map className="w-3.5 h-3.5 text-primary-500" /> Real-time map • OpenStreetMap
          </div>

          {/* Selected business detail card */}
          {selectedBiz && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-5 w-80 animate-slide-up border border-slate-100 dark:border-slate-700">
              <div className="flex gap-4">
                <img src={selectedBiz.image} alt={selectedBiz.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">{selectedBiz.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{selectedBiz.address}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">{selectedBiz.rating}</span>
                    <span className="text-xs text-slate-400">({selectedBiz.reviewCount})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedBiz.hours}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_COORDS[selectedBiz.id]?.[0]},${BUSINESS_COORDS[selectedBiz.id]?.[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1.5 no-underline"
                >
                  <Navigation className="w-3.5 h-3.5" /> Directions
                </a>
                <button onClick={() => setSelected(null)} className="p-2 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400">✕</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
