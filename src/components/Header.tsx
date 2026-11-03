import React from 'react';
import { Calendar, PhoneCall, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenAppointments: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  appointmentsCount: number;
  onReturnToGateway?: () => void;
  onOpenEmergency?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenBooking,
  onOpenAppointments,
  onNavigateSection,
  activeSection,
  appointmentsCount,
  onReturnToGateway,
  onOpenEmergency,
}) => {
  const t = getTranslation(currentLang);

  return (
    <header className="sticky top-0 z-40 bg-[#F9F9F7]/95 backdrop-blur-md border-b border-[#E3ECE8] transition-colors shadow-xs">
      {/* Front / Top Row: Logo ALONE and HUGE with Role Switcher & Emergency */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {onReturnToGateway ? (
          <button
            type="button"
            onClick={onReturnToGateway}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
          >
            {currentLang === 'ar' ? '← تغيير الصفة' : '← Changer de profil'}
          </button>
        ) : <div className="w-16 hidden sm:block" />}

        <div className="flex-1 flex justify-center">
          <Logo
            size="xl"
            subtitleText={t.tagline}
            showArabicName={currentLang === 'ar'}
            onClick={() => onNavigateSection('hero')}
            className="hover:scale-102 transition-transform duration-200"
          />
        </div>

        {onOpenEmergency && (
          <button
            type="button"
            onClick={onOpenEmergency}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs shrink-0 flex items-center gap-1.5 animate-pulse hover:animate-none"
          >
            <span>{currentLang === 'ar' ? 'طوارئ (الأرجون)' : 'Urgences 24/7'}</span>
          </button>
        )}
      </div>

      {/* Bottom Row: Nav Links, Language Switcher & Appointments ("hado dorhom lteht") */}
      <div className="border-t border-[#E3ECE8]/80 bg-[#F2F7F4]/90 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-semibold text-[#5A6A6A] overflow-x-auto py-0.5">
            <button
              type="button"
              onClick={() => onNavigateSection('hero')}
              className={`whitespace-nowrap transition-colors hover:text-[#0066CC] ${
                activeSection === 'hero' ? 'text-[#0066CC] font-bold' : ''
              }`}
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('soins')}
              className={`whitespace-nowrap transition-colors hover:text-[#0066CC] ${
                activeSection === 'soins' ? 'text-[#0066CC] font-bold' : ''
              }`}
            >
              {t.navCare}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('dentistes')}
              className={`whitespace-nowrap transition-colors hover:text-[#0066CC] ${
                activeSection === 'dentistes' ? 'text-[#0066CC] font-bold' : ''
              }`}
            >
              {t.navDentists}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('urgences')}
              className={`whitespace-nowrap transition-colors hover:text-[#0066CC] ${
                activeSection === 'urgences' ? 'text-[#0066CC] font-bold' : ''
              }`}
            >
              {t.navEmergency}
            </button>
          </nav>

          {/* Right Controls: Language Switcher & Appointments */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher FR / AR / EN */}
            <div className="flex items-center bg-[#E4F2EC] p-0.5 sm:p-1 rounded-xl border border-[#D5EAE2]">
              <span className="hidden sm:inline-block pl-1.5 pr-1 text-[#4A7C6F]">
                <Globe className="w-3.5 h-3.5" />
              </span>
              {(['fr', 'ar', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all duration-150 uppercase ${
                    currentLang === lang
                      ? 'bg-[#172B68] text-white shadow-xs'
                      : 'text-[#172B68] hover:bg-[#D5EAE2]'
                  }`}
                  aria-label={`Changer de langue: ${lang}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mes Rendez-vous quick access button */}
            <button
              type="button"
              onClick={onOpenAppointments}
              className="relative px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#172B68] hover:text-[#0066CC] bg-[#E4F2EC]/80 hover:bg-[#E4F2EC] border border-[#D5EAE2] rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
              title={t.navAppointments}
            >
              <Calendar className="w-3.5 h-3.5 text-[#0066CC]" />
              <span className="hidden sm:inline">{t.navAppointments}</span>
              {appointmentsCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#0066CC] rounded-full">
                  {appointmentsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
