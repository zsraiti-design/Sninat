import React from 'react';
import { X, PhoneCall, AlertTriangle, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onBookImmediateSlot: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onBookImmediateSlot,
}) => {
  if (!isOpen) return null;

  const isRtl = currentLang === 'ar';

  const onCallCenters = [
    {
      city: isRtl ? 'الدار البيضاء' : 'Casablanca',
      name: 'Permanence Urgences Dentaires Grand Casablanca',
      phone: '+212 5 22 20 40 40',
      address: '24h/24 · Bd Abdelmoumen & Hôpital 20 Août',
      wait: '~15 min',
    },
    {
      city: isRtl ? 'الرباط' : 'Rabat',
      name: 'Pôle d’Urgence Odontologique Rabat-Salé',
      phone: '+212 5 37 77 12 12',
      address: '24h/24 · Agdal / CHU Ibn Sina',
      wait: '~20 min',
    },
    {
      city: isRtl ? 'مراكش' : 'Marrakech',
      name: 'Clinique Dentaire d’Urgence Marrakech',
      phone: '+212 5 24 44 88 00',
      address: 'Garde 7j/7 · Guéliz & Hivernage',
      wait: '~25 min',
    },
    {
      city: isRtl ? 'طنجة' : 'Tanger',
      name: 'Centre d’Astreinte Dentaire Détroit',
      phone: '+212 5 39 33 22 11',
      address: '7j/7 · Centre Ville & Malabata',
      wait: '~20 min',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden my-6">
        
        {/* Top Emergency Alert Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-2xl bg-white/20 backdrop-blur-sm">
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
            </span>
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-white/25 px-2.5 py-0.5 rounded-full mb-1">
                {isRtl ? 'خدمة طوارئ الأسنان 24/7' : 'Urgences Dentaires 24h/24 & 7j/7'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                {isRtl ? 'طوارئ وأطباء المداومة (الأرجون)' : 'Urgences & Gardes Dentaires au Maroc'}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-red-100 max-w-xl">
            {isRtl
              ? 'توجيه فوري للمرضى في حالات الألم الحاد، النزيف، أو كسر الأسنان. أطباء أسنان متاحون حالياً بدون انتظار.'
              : 'Prise en charge prioritaire sans délai : rage de dent aiguë, traumatisme, hémorragie ou infection.'}
          </p>

          {/* Quick Hotline Banner */}
          <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/25">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-5 h-5 text-yellow-300" />
              <div>
                <p className="text-[11px] text-red-100 font-medium">
                  {isRtl ? 'الخط الساخن للمداومة المباشرة' : 'Numéro vert d’urgence dentaire'}
                </p>
                <p className="text-base sm:text-lg font-black tracking-wider text-yellow-300 font-mono">
                  +212 5 22 00 11 22
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookImmediateSlot();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white text-red-600 font-bold text-xs sm:text-sm shadow-md hover:bg-red-50 transition-all flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>{isRtl ? 'حجز موعد طارئ في أقل من ساعة' : 'Créneau d’urgence immédiat'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B68] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{isRtl ? 'مراكز وعيادات المداومة المفتوحة الآن' : 'Centres & Cabinets de Garde Ouverts Aujourd’hui'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onCallCenters.map((center, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-red-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                      {center.city}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {center.wait}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#172B68] mb-1">
                    {center.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mb-2">
                    {center.address}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200/80">
                    <a
                      href={`tel:${center.phone}`}
                      className="text-xs font-bold text-[#0066CC] hover:underline flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{center.phone}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookImmediateSlot();
                      }}
                      className="text-[11px] font-bold text-red-600 hover:text-red-700"
                    >
                      {isRtl ? 'حجز فوري ←' : 'RDV d’urgence →'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-500">
            {isRtl ? 'خدمة مدمجة ومجانية لجميع المواطنين بالمغرب' : 'Service d’orientation médicale gratuit au Maroc'}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isRtl ? 'إغلاق' : 'Fermer'}
          </button>
        </div>

      </div>
    </div>
  );
};
