import React from 'react';
import { Star, MapPin, Calendar, Clock, ShieldCheck, Video, Phone, ChevronRight } from 'lucide-react';
import { Doctor, Language } from '../types';
import { getTranslation } from '../data/translations';

interface DoctorCardProps {
  doctor: Doctor;
  currentLang: Language;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  currentLang,
  onViewProfile,
  onBookAppointment,
}) => {
  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const doctorTitle = isRtl && doctor.titleAr ? doctor.titleAr : doctor.title;
  const doctorSpecialty = isRtl && doctor.specialtyAr ? doctor.specialtyAr : doctor.specialty;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3ECE8] hover:border-[#C5DDD3] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        
        {/* Top Header: Photo, Verified Mark, Name, Rating */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E8F5F0] shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#4A7C6F] text-white flex items-center justify-center border-2 border-white shadow-xs"
              title={t.verifiedDoctor}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-[#4A7C6F] font-semibold mb-1">
              <span>{doctor.city}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#5A6A6A] font-normal truncate">{doctor.district}</span>
            </div>

            <h3 className="text-lg font-bold text-[#243330] leading-snug truncate">
              {doctor.name}
            </h3>

            <p className="text-xs text-[#5A6A6A] font-medium truncate mt-0.5">
              {doctorTitle}
            </p>

            {/* Rating & Reviews without pills */}
            <div className="flex items-center gap-2 mt-2 text-xs text-[#5A6A6A]">
              <div className="flex items-center gap-1 text-[#C9A86C]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-[#243330] tabular-nums">{doctor.rating}</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">({doctor.reviewsCount} {t.ratingReviews})</span>
            </div>
          </div>
        </div>

        {/* Clinic info and address */}
        <div className="space-y-1.5 py-3 border-y border-[#F0F5F2] text-xs text-[#5A6A6A]">
          <div className="flex items-center gap-2 text-[#243330] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C6F]" />
            <span className="truncate">{doctor.clinicName}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#4A7C6F] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{doctor.address}</span>
          </div>
        </div>

        {/* Next Slot pill and feature hints */}
        <div className="flex items-center justify-between gap-2 my-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#4A7C6F] font-medium bg-[#E8F5F0] px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">{doctor.nextAvailableSlot}</span>
          </div>

          <div className="flex items-center gap-2 text-[#5A6A6A]">
            {doctor.urgencyAccepted && (
              <span className="text-[11px] text-[#4A7C6F] font-medium">Urgences</span>
            )}
            {doctor.teleconsultation && (
              <span className="flex items-center gap-1 text-[11px]">
                <Video className="w-3 h-3 text-[#4A7C6F]" />
                <span className="hidden sm:inline">Visio</span>
              </span>
            )}
          </div>
        </div>

        {/* Popular acts preview */}
        <div className="bg-[#F9F9F7] rounded-xl p-3 mb-4 space-y-1.5">
          <p className="text-[11px] font-semibold text-[#5A6A6A] uppercase tracking-wider">
            {currentLang === 'ar' ? 'أمثلة من الفحوصات' : 'Actes fréquents'}
          </p>
          {doctor.services.slice(0, 2).map((srv, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-[#243330]">
              <span className="truncate text-[#5A6A6A]">
                {isRtl && srv.nameAr ? srv.nameAr : srv.name}
              </span>
              <span className="font-semibold tabular-nums shrink-0 ml-2">{srv.price}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Action Buttons: "Voir le profil" & "Réserver un rendez-vous" */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          type="button"
          onClick={() => onViewProfile(doctor)}
          className="px-3 py-2.5 text-xs font-semibold rounded-xl text-[#4A7C6F] bg-[#E8F5F0]/60 hover:bg-[#E8F5F0] border border-[#D5EAE2] transition-colors text-center truncate flex items-center justify-center gap-1"
        >
          <span>{t.viewProfile}</span>
        </button>

        <button
          type="button"
          onClick={() => onBookAppointment(doctor)}
          className="px-3 py-2.5 text-xs font-semibold rounded-xl text-white transition-all shadow-xs hover:brightness-105 active:scale-[0.98] text-center truncate flex items-center justify-center gap-1 border border-[#B89558]"
          style={{ backgroundColor: '#C9A86C' }}
        >
          <span>{t.bookAppointment}</span>
        </button>
      </div>
    </div>
  );
};
