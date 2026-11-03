import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';
import { getTranslation, citiesList } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onSelectCity: (cityId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onSelectCity, onOpenBooking }) => {
  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  return (
    <footer className="bg-[#243330] text-white pt-14 pb-12 border-t border-[#1C2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo
                size="md"
                theme="dark"
                subtitleText={t.tagline}
                showArabicName={currentLang === 'ar'}
              />
            </div>
            <p className="text-xs text-[#B8C7C2] leading-relaxed max-w-sm">
              {t.footerDescription}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E8F5F0]">
              <ShieldCheck className="w-4 h-4 text-[#C9A86C]" />
              <span>Conforme aux recommandations de l’Ordre National des Médecins Dentistes</span>
            </div>
          </div>

          {/* Villes couvertes */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'ar' ? 'المدن المغطاة' : 'Villes Desservies au Maroc'}
            </h4>
            <ul className="space-y-2 text-xs text-[#B8C7C2]">
              {citiesList.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCity(city.id)}
                    className="hover:text-white transition-colors"
                  >
                    Dentiste à {isRtl ? city.nameAr : city.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Actes et soins */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'ar' ? 'العلاجات الشائعة' : 'Soins Dentaires Fréquents'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#B8C7C2]">
              <span className="hover:text-white cursor-pointer">Détartrage & Polissage</span>
              <span className="hover:text-white cursor-pointer">Blanchiment Dentaire</span>
              <span className="hover:text-white cursor-pointer">Orthodontie & Aligneurs</span>
              <span className="hover:text-white cursor-pointer">Implants Dentaires</span>
              <span className="hover:text-white cursor-pointer">Dents de sagesse</span>
              <span className="hover:text-white cursor-pointer">Urgences 7j/7</span>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2.5 text-xs font-semibold rounded-xl text-white transition-all hover:brightness-105 border border-[#B89558]"
                style={{ backgroundColor: '#C9A86C' }}
              >
                {t.bookAppointment}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A9E97]">
          <p>© 2026 {t.brandName} · {t.rightsReserved}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Mentions Légales</span>
            <span className="hover:text-white cursor-pointer">Confidentialité & Données de Santé</span>
            <span className="hover:text-white cursor-pointer">Espace Professionnel</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
