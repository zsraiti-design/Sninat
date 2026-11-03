import React from 'react';
import { X, Star, MapPin, Phone, ShieldCheck, Clock, CheckCircle2, Navigation, Calendar } from 'lucide-react';
import { Doctor, Language } from '../types';
import { getTranslation } from '../data/translations';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  currentLang: Language;
  onClose: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  currentLang,
  onClose,
  onBookAppointment,
}) => {
  if (!doctor) return null;
  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const doctorTitle = isRtl && doctor.titleAr ? doctor.titleAr : doctor.title;
  const doctorBio = isRtl && doctor.bioAr ? doctor.bioAr : doctor.bio;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#E3ECE8] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with clinic cover and close button */}
        <div className="relative h-36 sm:h-44 bg-[#E8F5F0] overflow-hidden shrink-0">
          <img
            src="/src/assets/images/sninat_clinic_interior_1793322670400.jpg"
            alt="Intérieur du cabinet dentaire"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#243330] flex items-center justify-center shadow-xs transition-colors z-10"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Clinic badge on cover */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="text-xs font-medium text-white/90 drop-shadow-xs">{doctor.city} · {doctor.district}</p>
            <h4 className="text-base sm:text-lg font-bold drop-shadow-xs truncate">{doctor.clinicName}</h4>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Doctor header card */}
          <div className="flex items-start gap-4">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-md -mt-10 sm:-mt-12 bg-white shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-[#4A7C6F] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.verifiedDoctor}</span>
              </div>
              <h3 className="text-xl font-bold text-[#243330] leading-snug">{doctor.name}</h3>
              <p className="text-xs text-[#5A6A6A] font-medium">{doctorTitle}</p>

              <div className="flex items-center gap-2 mt-2 text-xs text-[#5A6A6A]">
                <div className="flex items-center gap-1 text-[#C9A86C]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-[#243330] tabular-nums">{doctor.rating}</span>
                </div>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{doctor.reviewsCount} {t.ratingReviews}</span>
              </div>
            </div>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#F9F9F7] p-3.5 rounded-2xl border border-[#E3ECE8]">
            <div>
              <span className="text-[#8A9A9A] font-medium block">Langues parlées</span>
              <span className="text-[#243330] font-semibold mt-0.5 block">{doctor.languages.join(' · ')}</span>
            </div>
            <div>
              <span className="text-[#8A9A9A] font-medium block">Prochain créneau</span>
              <span className="text-[#4A7C6F] font-semibold mt-0.5 block">{doctor.nextAvailableSlot}</span>
            </div>
          </div>

          {/* Bio / Presentation */}
          <div>
            <h4 className="text-sm font-bold text-[#243330] mb-2">{t.aboutDoctor}</h4>
            <p className="text-xs text-[#5A6A6A] leading-relaxed bg-white border border-[#E3ECE8] p-4 rounded-2xl">
              {doctorBio}
            </p>
          </div>

          {/* Clinic Address & Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-[#E3ECE8] p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-[#243330] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#4A7C6F]" />
                <span>{t.address}</span>
              </h4>
              <p className="text-xs text-[#5A6A6A] leading-relaxed mb-3">{doctor.address}</p>
              <div className="flex items-center gap-2 text-xs text-[#4A7C6F] font-semibold">
                <Phone className="w-3.5 h-3.5" />
                <span>{doctor.phone}</span>
              </div>
            </div>

            <div className="border border-[#E3ECE8] p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-[#243330] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#4A7C6F]" />
                <span>{t.openingHours}</span>
              </h4>
              <div className="space-y-1 text-xs text-[#5A6A6A]">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium text-[#243330]">09:00 - 18:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium text-[#243330]">09:00 - 13:30</span>
                </div>
                <div className="flex justify-between text-[#4A7C6F] font-medium">
                  <span>Dimanche</span>
                  <span>Urgences sur appel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarifs et Actes */}
          <div>
            <h4 className="text-sm font-bold text-[#243330] mb-3">{t.servicesTitle}</h4>
            <div className="divide-y divide-[#F0F5F2] border border-[#E3ECE8] rounded-2xl overflow-hidden">
              {doctor.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3.5 text-xs hover:bg-[#F9F9F7] transition-colors">
                  <span className="font-medium text-[#243330]">
                    {isRtl && service.nameAr ? service.nameAr : service.name}
                  </span>
                  <span className="font-bold text-[#4A7C6F] tabular-nums shrink-0 ml-4">
                    {service.price}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#8A9A9A] mt-2">
              * Honoraires conventionnés indicatifs selon la complexité du cas clinique.
            </p>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-[#E3ECE8] bg-[#F9F9F7] flex items-center justify-between gap-4 shrink-0">
          <div className="hidden sm:block">
            <p className="text-xs text-[#5A6A6A]">{t.nextSlot}</p>
            <p className="text-xs font-bold text-[#4A7C6F]">{doctor.nextAvailableSlot}</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium rounded-xl text-[#5A6A6A] hover:bg-[#E8F5F0] transition-colors"
            >
              {t.close}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookAppointment(doctor);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-white transition-all shadow-xs hover:brightness-105 active:scale-[0.98] border border-[#B89558]"
              style={{ backgroundColor: '#C9A86C' }}
            >
              {t.bookAppointment}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
