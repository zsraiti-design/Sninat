import React from 'react';
import { Search, MapPin, Stethoscope, Clock, ShieldCheck, CalendarCheck, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { getTranslation, citiesList } from '../data/translations';
import { careCategoriesData } from '../data/mockData';

interface HeroSectionProps {
  currentLang: Language;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedCare: string;
  onCareChange: (careId: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  selectedCity,
  onCityChange,
  selectedCare,
  onCareChange,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  onOpenBooking,
}) => {
  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  return (
    <section className="relative overflow-hidden pt-6 pb-14 lg:py-16 bg-[#F9F9F7]">
      {/* Subtle organic ambient backdrop glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-60"
        style={{ backgroundColor: '#E8F5F0' }}
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ backgroundColor: '#D8ECE4' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Search Console, Proof Points */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean unboxed kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A7C6F] tracking-wide uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
              <span>{t.heroKicker}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#5A6A6A] font-normal">{t.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243330] tracking-tight leading-[1.18] mb-4 text-balance"
              style={{ letterSpacing: '-0.025em' }}
            >
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5A6A6A] font-normal leading-relaxed mb-8 max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Interactive Search Console */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-[#E3ECE8] mb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit();
                }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
              >
                {/* City Picker */}
                <div className="sm:col-span-4 relative flex items-center bg-[#F9F9F7] rounded-xl px-3 py-2.5 border border-[#E3ECE8] hover:border-[#4A7C6F]/50 transition-colors">
                  <MapPin className="w-4 h-4 text-[#4A7C6F] shrink-0 mr-2" />
                  <select
                    value={selectedCity}
                    onChange={(e) => onCityChange(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#243330] font-medium focus:outline-hidden cursor-pointer"
                    aria-label={t.selectCity}
                  >
                    <option value="">{t.allCities}</option>
                    {citiesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {isRtl ? c.nameAr : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Care / Condition Picker */}
                <div className="sm:col-span-4 relative flex items-center bg-[#F9F9F7] rounded-xl px-3 py-2.5 border border-[#E3ECE8] hover:border-[#4A7C6F]/50 transition-colors">
                  <Stethoscope className="w-4 h-4 text-[#4A7C6F] shrink-0 mr-2" />
                  <select
                    value={selectedCare}
                    onChange={(e) => onCareChange(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#243330] font-medium focus:outline-hidden cursor-pointer truncate"
                    aria-label={t.chooseCare}
                  >
                    <option value="">{t.allCares}</option>
                    {careCategoriesData.map((care) => (
                      <option key={care.id} value={care.id}>
                        {isRtl ? care.nameAr : care.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Free Text / Doctor Name Search */}
                <div className="sm:col-span-4 relative flex items-center bg-[#F9F9F7] rounded-xl px-3 py-2.5 border border-[#E3ECE8] hover:border-[#4A7C6F]/50 transition-colors">
                  <Search className="w-4 h-4 text-[#4A7C6F] shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-sm text-[#243330] placeholder-[#8A9A9A] focus:outline-hidden"
                  />
                </div>

                {/* Action Buttons Row */}
                <div className="sm:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-[#F0F5F2] mt-1">
                  <div className="flex items-center gap-4 text-xs text-[#5A6A6A]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#4A7C6F]" />
                      <span>RDV 24h/24 & 7j/7</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C6F]" />
                      <span>100% Gratuit pour les patients</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#4A7C6F] hover:bg-[#3D685D] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{t.findDentistBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl text-white transition-all shadow-xs hover:brightness-105 active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap border border-[#B89558]"
                      style={{ backgroundColor: '#C9A86C' }}
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>{t.bookAppointment}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Quantitative trust indicators */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#E3ECE8]">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#243330] tabular-nums">450+</p>
                <p className="text-xs text-[#5A6A6A] mt-0.5 font-medium">Cabinets partenaires</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#243330] tabular-nums">98.6%</p>
                <p className="text-xs text-[#5A6A6A] mt-0.5 font-medium">Patients satisfaits</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#243330] tabular-nums">&lt; 2 min</p>
                <p className="text-xs text-[#5A6A6A] mt-0.5 font-medium">Délai moyen de RDV</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with Clinic & Smiling Patient */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main photo container */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-[#E8F5F0]">
                <img
                  src="/src/assets/images/sninat_hero_smile_care_1793322669211.jpg"
                  alt="Cabinet dentaire moderne Sninat avec chirurgien-dentiste et patient souriant"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle calm gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#243330]/60 via-transparent to-transparent" />

                {/* Floating quick reassurance badge on image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-md border border-[#E3ECE8]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center shrink-0 border border-[#CDE5DC]">
                        <ShieldCheck className="w-5 h-5 text-[#4A7C6F]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#243330]">
                          Ordre National des Médecins Dentistes
                        </p>
                        <p className="text-[11px] text-[#5A6A6A]">
                          100% Praticiens autorisés & vérifiés
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#4A7C6F] text-white hover:bg-[#3D685D] transition-colors whitespace-nowrap"
                    >
                      Prendre RDV
                    </button>
                  </div>
                </div>

              </div>

              {/* Decorative gentle corner pill with today's availability */}
              <div className="absolute -top-3 -right-3 bg-white py-2 px-3.5 rounded-2xl shadow-sm border border-[#E3ECE8] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4A7C6F]" />
                <span className="text-xs font-semibold text-[#243330]">
                  Urgences du jour acceptées
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
