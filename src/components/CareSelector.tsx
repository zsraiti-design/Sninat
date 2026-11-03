import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Smile, 
  Layers, 
  CircleDot, 
  HeartHandshake, 
  Crosshair, 
  ArrowRight,
  Check
} from 'lucide-react';
import { Language, CareCategory } from '../types';
import { getTranslation } from '../data/translations';
import { careCategoriesData } from '../data/mockData';

interface CareSelectorProps {
  currentLang: Language;
  selectedCareId: string;
  onSelectCare: (careId: string) => void;
  onQuickBookWithCare: (care: CareCategory) => void;
}

export const CareSelector: React.FC<CareSelectorProps> = ({
  currentLang,
  selectedCareId,
  onSelectCare,
  onQuickBookWithCare,
}) => {
  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#4A7C6F]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#4A7C6F]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#4A7C6F]" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-[#4A7C6F]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#4A7C6F]" />;
      case 'CircleDot':
        return <CircleDot className="w-5 h-5 text-[#4A7C6F]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#4A7C6F]" />;
      case 'Crosshair':
        return <Crosshair className="w-5 h-5 text-[#4A7C6F]" />;
      default:
        return <Smile className="w-5 h-5 text-[#4A7C6F]" />;
    }
  };

  return (
    <section id="soins" className="py-14 bg-white border-y border-[#E3ECE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A7C6F] tracking-wide uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
              <span>{t.chooseCare}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#243330] tracking-tight">
              {t.careCategoriesTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#5A6A6A] mt-1 max-w-2xl">
              {t.careCategoriesSubtitle}
            </p>
          </div>

          {selectedCareId && (
            <button
              type="button"
              onClick={() => onSelectCare('')}
              className="text-xs font-semibold text-[#4A7C6F] hover:underline self-start sm:self-auto"
            >
              {currentLang === 'ar' ? 'عرض جميع العلاجات' : 'Réinitialiser le filtre'}
            </button>
          )}
        </div>

        {/* 8 Care Categories Grid (matching the Moroccan flyer conditions + refined medical look) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {careCategoriesData.map((category) => {
            const isSelected = selectedCareId === category.id;
            const categoryName = isRtl
              ? category.nameAr
              : currentLang === 'en'
              ? category.nameEn
              : category.name;
            const categoryDesc = isRtl ? category.descriptionAr : category.description;

            return (
              <div
                key={category.id}
                className={`group relative p-5 rounded-2xl transition-all duration-200 border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E8F5F0] border-[#4A7C6F] shadow-sm ring-1 ring-[#4A7C6F]'
                    : 'bg-[#F9F9F7] hover:bg-white border-[#E3ECE8] hover:border-[#C5DDD3] hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Icon & Indicative Price Row */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-white shadow-xs' : 'bg-[#E8F5F0] group-hover:bg-[#DFEFE9]'
                      }`}
                    >
                      {getIcon(category.iconName)}
                    </div>

                    <span className="text-[11px] font-semibold text-[#4A7C6F] tabular-nums">
                      {category.estimatedPrice}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-[#243330] mb-1.5 leading-snug group-hover:text-[#4A7C6F] transition-colors">
                    {categoryName}
                  </h3>
                  <p className="text-xs text-[#5A6A6A] leading-relaxed line-clamp-2 mb-4">
                    {categoryDesc}
                  </p>
                </div>

                {/* Card Action Footers */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E3ECE8]/70 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectCare(isSelected ? '' : category.id)}
                    className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isSelected ? 'text-[#4A7C6F]' : 'text-[#5A6A6A] hover:text-[#243330]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{currentLang === 'ar' ? 'محدد' : 'Filtré'}</span>
                      </>
                    ) : (
                      <>
                        <span>{currentLang === 'ar' ? 'تصفية الأطباء' : 'Filtrer les praticiens'}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickBookWithCare(category)}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white hover:bg-[#E8F5F0] text-[#4A7C6F] border border-[#D5EAE2] transition-colors"
                  >
                    {currentLang === 'ar' ? 'احجز مباشرة' : 'Réserver'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
