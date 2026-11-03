import React, { useState } from 'react';
import { Filter, Search, RotateCcw, ShieldCheck, Stethoscope } from 'lucide-react';
import { Doctor, Language } from '../types';
import { DoctorCard } from './DoctorCard';
import { getTranslation, citiesList } from '../data/translations';

interface DoctorListProps {
  doctors: Doctor[];
  currentLang: Language;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedCareId: string;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  currentLang,
  selectedCity,
  onCityChange,
  selectedCareId,
  searchQuery,
  onSearchQueryChange,
  onViewProfile,
  onBookAppointment,
}) => {
  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const [filterToday, setFilterToday] = useState(false);
  const [filterUrgency, setFilterUrgency] = useState(false);
  const [filterTeleconsult, setFilterTeleconsult] = useState(false);

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    // City filter
    if (selectedCity && doc.cityKey !== selectedCity) return false;
    // Today filter
    if (filterToday && !doc.nextAvailableSlot.toLowerCase().includes("aujourd'hui")) return false;
    // Urgency filter
    if (filterUrgency && !doc.urgencyAccepted) return false;
    // Teleconsult filter
    if (filterTeleconsult && !doc.teleconsultation) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpecialty = doc.specialty.toLowerCase().includes(q);
      const matchCity = doc.city.toLowerCase().includes(q);
      const matchDistrict = doc.district.toLowerCase().includes(q);
      const matchClinic = doc.clinicName.toLowerCase().includes(q);
      if (!matchName && !matchSpecialty && !matchCity && !matchDistrict && !matchClinic) {
        return false;
      }
    }
    return true;
  });

  const resetAllFilters = () => {
    onCityChange('');
    onSearchQueryChange('');
    setFilterToday(false);
    setFilterUrgency(false);
    setFilterTeleconsult(false);
  };

  return (
    <section id="dentistes" className="py-14 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Metrics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A7C6F] tracking-wide uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
              <span>{t.navDentists}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#243330] tracking-tight">
              {currentLang === 'ar' ? 'أفضل جراحي وطب الأسنان المعتمدين' : 'Praticiens & Cabinets Dentaires Recommandés'}
            </h2>
            <p className="text-sm text-[#5A6A6A] mt-1">
              <span className="font-semibold text-[#243330] tabular-nums">{filteredDoctors.length}</span>{' '}
              {t.doctorsCountLabel}
            </p>
          </div>

          {/* City Quick Pills / Segmented buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              onClick={() => onCityChange('')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                !selectedCity
                  ? 'bg-[#4A7C6F] text-white shadow-xs'
                  : 'bg-white text-[#5A6A6A] hover:bg-[#E8F5F0] border border-[#E3ECE8]'
              }`}
            >
              {t.allCities}
            </button>
            {citiesList.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onCityChange(c.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  selectedCity === c.id
                    ? 'bg-[#4A7C6F] text-white shadow-xs'
                    : 'bg-white text-[#5A6A6A] hover:bg-[#E8F5F0] border border-[#E3ECE8]'
                }`}
              >
                {isRtl ? c.nameAr : c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Toolbar (Segmented controls, no static candy pills) */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E3ECE8] mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#5A6A6A] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#4A7C6F]" />
              <span>Filtres :</span>
            </span>

            <button
              type="button"
              onClick={() => setFilterToday(!filterToday)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                filterToday
                  ? 'bg-[#E8F5F0] border-[#4A7C6F] text-[#4A7C6F] font-semibold'
                  : 'border-[#E3ECE8] text-[#5A6A6A] hover:bg-[#F9F9F7]'
              }`}
            >
              {t.filterAvailableToday}
            </button>

            <button
              type="button"
              onClick={() => setFilterUrgency(!filterUrgency)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                filterUrgency
                  ? 'bg-[#E8F5F0] border-[#4A7C6F] text-[#4A7C6F] font-semibold'
                  : 'border-[#E3ECE8] text-[#5A6A6A] hover:bg-[#F9F9F7]'
              }`}
            >
              {t.filterUrgency}
            </button>

            <button
              type="button"
              onClick={() => setFilterTeleconsult(!filterTeleconsult)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                filterTeleconsult
                  ? 'bg-[#E8F5F0] border-[#4A7C6F] text-[#4A7C6F] font-semibold'
                  : 'border-[#E3ECE8] text-[#5A6A6A] hover:bg-[#F9F9F7]'
              }`}
            >
              {t.filterTeleconsultation}
            </button>
          </div>

          {(selectedCity || filterToday || filterUrgency || filterTeleconsult || searchQuery) && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-medium text-[#4A7C6F] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{currentLang === 'ar' ? 'إعادة ضبط' : 'Effacer les filtres'}</span>
            </button>
          )}
        </div>

        {/* Doctor Cards Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                currentLang={currentLang}
                onViewProfile={onViewProfile}
                onBookAppointment={onBookAppointment}
              />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E3ECE8] max-w-md mx-auto my-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5F0] flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-7 h-7 text-[#4A7C6F]" />
            </div>
            <h3 className="text-lg font-bold text-[#243330] mb-2">
              {currentLang === 'ar' ? 'لم يتم العثور على أطباء بهذا البحث' : 'Aucun chirurgien-dentiste trouvé'}
            </h3>
            <p className="text-xs text-[#5A6A6A] leading-relaxed mb-5">
              {currentLang === 'ar'
                ? 'جرب تغيير المدينة أو إزالة عوامل التصفية للاطلاع على مزيد من العيادات المتاحة.'
                : 'Essayez d’élargir vos critères de recherche ou de sélectionner une autre ville.'}
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#4A7C6F] text-white hover:bg-[#3D685D] transition-colors"
            >
              {currentLang === 'ar' ? 'عرض جميع الأطباء' : 'Réinitialiser les filtres'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
