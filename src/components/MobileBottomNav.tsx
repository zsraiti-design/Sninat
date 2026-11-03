import React from 'react';
import { Home, Stethoscope, Users, Calendar } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface MobileBottomNavProps {
  currentLang: Language;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenAppointments: () => void;
  appointmentsCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentLang,
  activeSection,
  onNavigateSection,
  onOpenAppointments,
  appointmentsCount,
}) => {
  const t = getTranslation(currentLang);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3ECE8] px-2 py-1 shadow-lg">
      <div className="grid grid-cols-4 items-center h-14 max-w-md mx-auto">
        
        {/* Accueil */}
        <button
          type="button"
          onClick={() => onNavigateSection('hero')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
            activeSection === 'hero' ? 'text-[#4A7C6F]' : 'text-[#8A9A9A] hover:text-[#243330]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight mt-1">
            {t.navHome}
          </span>
        </button>

        {/* Choisir le soin */}
        <button
          type="button"
          onClick={() => onNavigateSection('soins')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
            activeSection === 'soins' ? 'text-[#4A7C6F]' : 'text-[#8A9A9A] hover:text-[#243330]'
          }`}
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight mt-1">
            {t.navCare}
          </span>
        </button>

        {/* Dentistes */}
        <button
          type="button"
          onClick={() => onNavigateSection('dentistes')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
            activeSection === 'dentistes' ? 'text-[#4A7C6F]' : 'text-[#8A9A9A] hover:text-[#243330]'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight mt-1">
            {t.navDentists}
          </span>
        </button>

        {/* Mes Rendez-vous */}
        <button
          type="button"
          onClick={onOpenAppointments}
          className="relative flex flex-col items-center justify-center min-h-[44px] text-[#8A9A9A] hover:text-[#243330] transition-colors"
        >
          <div className="relative">
            <Calendar className="w-5 h-5" />
            {appointmentsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#4A7C6F] text-white text-[9px] font-bold flex items-center justify-center">
                {appointmentsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-1">
            {t.navAppointments}
          </span>
        </button>

      </div>
    </div>
  );
};
