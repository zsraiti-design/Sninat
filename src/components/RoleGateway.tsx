import React from 'react';
import {
  User,
  Stethoscope,
  Wrench,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Building2,
  CalendarCheck,
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { OfficialSninatBadge } from './Logo';

interface RoleGatewayProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectRole: (role: UserRole) => void;
  onOpenEmergency: () => void;
}

export const RoleGateway: React.FC<RoleGatewayProps> = ({
  currentLang,
  onLanguageChange,
  onSelectRole,
  onOpenEmergency,
}) => {
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Sleek Minimalist Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <OfficialSninatBadge sizeClassName="w-9 h-9" />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                Sninat
              </span>
              <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                {isRtl ? 'المغرب • صحة وتكنولوجيا الأسنان' : 'Maroc • Dentaire & Prothèse'}
              </span>
            </div>
          </div>

          {/* Action Center: Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimalist Segmented Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {(['fr', 'ar', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all uppercase ${
                    currentLang === lang
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  aria-label={`Langue ${lang}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-14 flex flex-col justify-center">
        {/* Minimalist Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center mb-5">
            <div className="transition-transform duration-200 hover:scale-105">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden shadow-lg border border-sky-200/80 bg-sky-100 ring-4 ring-sky-50">
                <img
                  src="/assets/aistudio/IMG_6592_dc166d2d.jpeg"
                  alt="Logo Officiel Sninat"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isRtl
              ? 'مرحباً بكم في منصة سنينات'
              : 'Bienvenue sur la plateforme Sninat'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            {isRtl
              ? 'المنظومة الوطنية الموحدة لطب الأسنان بالمغرب. حدد صفتك المهنية أو الشخصية للولوج إلى فضائك المخصص:'
              : "L'écosystème numérique unifié pour la médecine bucco-dentaire au Maroc. Choisissez votre profil pour accéder à votre espace :"}
          </p>
        </div>

        {/* The 3 Profile Choices (Grid of Minimalist Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Patient / Visiteur */}
          <div
            onClick={() => onSelectRole('patient')}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-sky-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
                <User className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
                  {isRtl ? 'الجمهور والمرضى' : 'Grand Public'}
                </span>
                <span className="text-xs text-slate-400">01</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mb-2">
                {isRtl ? 'مريض أو زائر' : 'Patient / Visiteur'}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {isRtl
                  ? 'البحث عن أطباء الأسنان، حجز المواعيد الفورية، اختيار العلاجات، وتتبع ملفك الصحي.'
                  : 'Trouvez un chirurgien-dentiste qualifié, prenez rendez-vous en ligne et consultez vos soins.'}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isRtl ? 'دليل الأطباء بالمدن المغربية' : 'Annuaire géolocalisé au Maroc'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isRtl ? 'حجز المواعيد بدون انتظار' : 'Réservation 24h/24 sans attente'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:text-sky-700">
              <span>{isRtl ? 'الدخول للمنصة' : 'Accéder à l’espace'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Chirurgien-Dentiste */}
          <div
            onClick={() => onSelectRole('doctor')}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200">
                <Stethoscope className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  {isRtl ? 'العيادات والممارسون' : 'Praticiens'}
                </span>
                <span className="text-xs text-slate-400">02</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mb-2">
                {isRtl ? 'طبيب أسنان' : 'Chirurgien-Dentiste'}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {isRtl
                  ? 'باقات الاشتراك للعيادة، تدبير مواعيد المرضى، وإرسال طلبيات صناعة الأسنان للمختبرات.'
                  : 'Gestion de cabinet, abonnements Pro, gestion des consultations et commandes de prothèses.'}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isRtl ? 'باقات الاشتراك Starter / Pro' : 'Formules Starter, Pro & Clinique'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isRtl ? 'ربط رقمي مباشر مع صناع الأسنان' : 'Liaison directe avec les labos'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
              <span>{isRtl ? 'فضاء الأطباء والاشتراكات' : 'Espace Médecin'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Prothésiste Dentaire */}
          <div
            onClick={() => onSelectRole('prosthetist')}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-purple-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200">
                <Wrench className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                  {isRtl ? 'المختبرات والصناع' : 'Laboratoires'}
                </span>
                <span className="text-xs text-slate-400">03</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mb-2">
                {isRtl ? 'صانع الأسنان / مختبر' : 'Prothésiste Dentaire'}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {isRtl
                  ? 'استقبال طلبيات التعويضات (زيركون، E-max، أطقم)، كتالوج المواد والأسعار، ومتابعة التصنيع.'
                  : 'Réception des commandes de couronnes et bridges, catalogue de matériaux et suivi de fabrication.'}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>{isRtl ? 'متابعة مراحل التصنيع والشحن' : 'Suivi Zircone, E-max & Résine'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>{isRtl ? 'ربط مع عيادات الأسنان المعتمدة' : 'Partenariats cliniques certifiés'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600 group-hover:text-purple-700">
              <span>{isRtl ? 'فضاء المختبر والتصنيع' : 'Espace Laboratoire'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Minimalist Emergency Banner ("الأرجون") */}
        <div className="mt-8 sm:mt-10 bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {isRtl ? 'الأرجون • خدمة الطوارئ والمداومة 24/7' : 'Urgences Dentaires & Garde 24/7'}
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                  {isRtl ? 'مباشر' : 'Direct'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {isRtl
                  ? 'ألم حاد أو نزيف؟ تصفح عيادات الحراسة المفتوحة الآن في مدينتك دون الحاجة لتسجيل مسبق.'
                  : 'Rage de dents, traumatisme ou abcès ? Accédez immédiatement aux cabinets de garde sans compte requis.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenEmergency}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isRtl ? 'تصفح عيادات المداومة' : 'Voir les Urgences'}</span>
            </button>
          </div>
        </div>

        {/* Minimalist Trust & Safety Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{isRtl ? 'أطباء معتمدون ومطابقون لمعايير الهيئة الوطنية' : 'Praticiens et laboratoires certifiés au Maroc'}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Casablanca • Rabat • Marrakech • Tanger • Fès</span>
            <span className="text-slate-300">•</span>
            <span>© {new Date().getFullYear()} Sninat</span>
          </div>
        </div>
      </main>
    </div>
  );
};
