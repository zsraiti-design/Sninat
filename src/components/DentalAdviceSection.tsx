import React from 'react';
import { PhoneCall, AlertTriangle, ShieldCheck, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface DentalAdviceSectionProps {
  currentLang: Language;
  onOpenBookingForEmergency: () => void;
}

export const DentalAdviceSection: React.FC<DentalAdviceSectionProps> = ({
  currentLang,
  onOpenBookingForEmergency,
}) => {
  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  return (
    <section id="urgences" className="py-14 bg-white border-t border-[#E3ECE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Emergency Alert Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#E8F5F0] border border-[#CDE5DC] mb-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4A7C6F] uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4 text-[#C9A86C]" />
                <span>Service d’Urgences Dentaires</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#243330] leading-snug mb-2">
                {currentLang === 'ar' ? 'طوارئ ألم الأسنان أو الحوادث المفاجئة' : 'Une urgence dentaire ? Ne restez pas avec la douleur.'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6A6A] leading-relaxed">
                {t.emergencyNotice}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="tel:+212522204580"
                className="px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl text-white bg-[#4A7C6F] hover:bg-[#3D685D] transition-colors flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>+212 5 22 20 45 80</span>
              </a>

              <button
                type="button"
                onClick={onOpenBookingForEmergency}
                className="px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl text-white transition-all shadow-xs hover:brightness-105 active:scale-[0.98] border border-[#B89558] flex items-center justify-center gap-2 whitespace-nowrap"
                style={{ backgroundColor: '#C9A86C' }}
              >
                <span>RDV Urgence dans l’heure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Why Sninat & Value Pillars (No pills, clean editorial hierarchy) */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A7C6F] tracking-wide uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
              <span>Engagement Médical</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#243330] tracking-tight">
              {t.whySninatTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#F9F9F7] border border-[#E3ECE8]">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#4A7C6F] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#243330] mb-1.5">{t.benefit1Title}</h3>
              <p className="text-xs text-[#5A6A6A] leading-relaxed">{t.benefit1Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F9F9F7] border border-[#E3ECE8]">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#4A7C6F] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#243330] mb-1.5">{t.benefit2Title}</h3>
              <p className="text-xs text-[#5A6A6A] leading-relaxed">{t.benefit2Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F9F9F7] border border-[#E3ECE8]">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#4A7C6F] flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#243330] mb-1.5">{t.benefit3Title}</h3>
              <p className="text-xs text-[#5A6A6A] leading-relaxed">{t.benefit3Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F9F9F7] border border-[#E3ECE8]">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F0] text-[#4A7C6F] flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#243330] mb-1.5">{t.benefit4Title}</h3>
              <p className="text-xs text-[#5A6A6A] leading-relaxed">{t.benefit4Desc}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
