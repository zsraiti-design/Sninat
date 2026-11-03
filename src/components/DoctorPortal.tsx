import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Calendar, Wrench, ShieldCheck, Sparkles, Send, Clock, PhoneCall } from 'lucide-react';
import { Language, Appointment, ProsthesisOrder } from '../types';
import { doctorSubscriptionPlans, initialProsthesisOrders, mockDentalLabs } from '../data/mockData';
import { Logo } from './Logo';

interface DoctorPortalProps {
  currentLang: Language;
  onReturnToGateway: () => void;
  appointments: Appointment[];
}

export const DoctorPortal: React.FC<DoctorPortalProps> = ({
  currentLang,
  onReturnToGateway,
  appointments,
}) => {
  const isRtl = currentLang === 'ar';
  const [activeTab, setActiveTab] = useState<'subscription' | 'appointments' | 'prosthesis'>('subscription');

  // Subscription state
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');
  const [doctorName, setDoctorName] = useState('Dr. Amine El Alami');
  const [doctorPhone, setDoctorPhone] = useState('+212 6 61 88 99 00');
  const [clinicCity, setClinicCity] = useState('Casablanca');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  // Prosthesis order form state
  const [prosthesisOrders, setProsthesisOrders] = useState<ProsthesisOrder[]>(initialProsthesisOrders);
  const [newPatientRef, setNewPatientRef] = useState('Patient #P520');
  const [newWorkType, setNewWorkType] = useState('Couronne Zircone Full Contour');
  const [newShade, setNewShade] = useState('A2');
  const [newToothNumber, setNewToothNumber] = useState('24');
  const [newLabName, setNewLabName] = useState(mockDentalLabs[0].name);
  const [newDueDate, setNewDueDate] = useState('04 Nov 2026');
  const [orderSentSuccess, setOrderSentSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribedSuccess(true);
    setTimeout(() => {
      setSubscribedSuccess(false);
    }, 4500);
  };

  const handleCreateProsthesisOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: ProsthesisOrder = {
      id: `PR-2026-0${prosthesisOrders.length + 84}`,
      doctorName: doctorName,
      clinicName: `Cabinet Dentaire ${clinicCity}`,
      city: clinicCity,
      patientRef: newPatientRef,
      workType: newWorkType,
      shade: newShade,
      toothNumber: newToothNumber,
      laboratoryName: newLabName,
      orderDate: '29 Oct 2026',
      dueDate: newDueDate,
      status: 'pending',
      priceMad: 950,
      notes: 'Commande transmise numériquement au prothésiste.',
    };
    setProsthesisOrders([newOrder, ...prosthesisOrders]);
    setOrderSentSuccess(true);
    setTimeout(() => {
      setOrderSentSuccess(false);
    }, 4000);
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#172B68] font-sans pb-16"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Professional Portal Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onReturnToGateway}
              className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{isRtl ? 'الرجوع لاختيار الصفة' : 'Changer de profil'}</span>
            </button>

            <Logo
              size="md"
              subtitleText={isRtl ? 'فضاء طبيب الأسنان' : 'Espace Chirurgien-Dentiste'}
              showArabicName={isRtl}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isRtl ? 'حساب طبيب معتمد' : 'Compte Praticien Vérifié'}</span>
            </span>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="border-t border-gray-100 bg-gray-50/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
            <button
              type="button"
              onClick={() => setActiveTab('subscription')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'subscription'
                  ? 'bg-[#172B68] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-white hover:text-[#172B68]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isRtl ? 'الاشتراك وباقات العيادة' : 'Abonnement & Formules'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'appointments'
                  ? 'bg-[#172B68] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-white hover:text-[#172B68]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{isRtl ? 'مواعيد العيادة والمرضى' : 'Agenda des Rendez-vous'}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-[#0066CC]">
                {appointments.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prosthesis')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'prosthesis'
                  ? 'bg-[#172B68] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-white hover:text-[#172B68]'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{isRtl ? 'طلبات التركيبات لصانع الأسنان' : 'Commandes Prothésiste'}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700">
                {prosthesisOrders.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Tab 1: Subscription Plans */}
        {activeTab === 'subscription' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC] bg-blue-50 px-3 py-1 rounded-full">
                {isRtl ? 'انضم لشبكة أطباء الأسنان بالمغرب' : 'Réseau Praticiens Sninat'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#172B68] mt-2 mb-2">
                {isRtl ? 'اختر باقة الاشتراك المناسبة لعيادتك' : 'Formules d’Abonnement Cabinet Dentaire'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {isRtl
                  ? 'استقبل مرضى جدد يومياً، قلل من المواعيد الفائتة عبر التذكير التلقائي، واطلب تركيباتك مباشرة من المختبرات المعتمدة.'
                  : 'Optimisez l’activité de votre cabinet dentaire, réduisez les rendez-vous manqués et digitalisez la relation avec vos prothésistes.'}
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {doctorSubscriptionPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0066CC] bg-white shadow-xl ring-2 ring-[#0066CC]/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-xs ${
                          plan.recommended ? 'bg-[#0066CC] text-white' : 'bg-gray-800 text-white'
                        }`}>
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-black text-[#172B68]">
                          {isRtl ? plan.nameAr : plan.name}
                        </h3>
                        <input
                          type="radio"
                          name="subscriptionPlan"
                          checked={isSelected}
                          onChange={() => setSelectedPlanId(plan.id)}
                          className="w-4 h-4 text-[#0066CC] cursor-pointer"
                        />
                      </div>

                      <div className="mb-4">
                        <span className="text-3xl font-black text-[#172B68]">
                          {plan.priceMad}
                        </span>
                        <span className="text-xs font-bold text-gray-500 ml-1">MAD {plan.period}</span>
                      </div>

                      <p className="text-xs text-gray-600 mb-5">
                        {isRtl ? plan.descriptionAr : plan.description}
                      </p>

                      <ul className="space-y-2.5 mb-6 text-xs text-gray-600">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                        isSelected
                          ? 'bg-[#0066CC] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected
                        ? (isRtl ? 'الباقة المختارة' : 'Formule Sélectionnée')
                        : (isRtl ? 'اختيار هذه الباقة' : 'Sélectionner')}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Subscription Form */}
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-black text-[#172B68] mb-1">
                {isRtl ? 'تأكيد اشتراك العيادة' : 'Finaliser la souscription du cabinet'}
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                {isRtl ? 'سيتم تفعيل حساب العيادة وإرسال شارة الاعتماد فور التأكيد.' : 'Votre fiche praticien sera activée avec badge vérifié sous 24h.'}
              </p>

              {subscribedSuccess && (
                <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{isRtl ? 'تم تفعيل طلب اشتراك العيادة بنجاح! سيتصل بكم فريقنا للمطابقة.' : 'Félicitations ! Votre souscription cabinet a été enregistrée avec succès.'}</span>
                </div>
              )}

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'اسم الدكتور الكامل' : 'Nom du praticien'}
                    </label>
                    <input
                      type="text"
                      required
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0066CC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'رقم الهاتف المباشر للعيادة' : 'Téléphone direct du cabinet'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={doctorPhone}
                      onChange={(e) => setDoctorPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0066CC]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'المدينة' : 'Ville du cabinet'}
                    </label>
                    <select
                      value={clinicCity}
                      onChange={(e) => setClinicCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0066CC]"
                    >
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Fès">Fès</option>
                      <option value="Agadir">Agadir</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'رقم القيد في هيئة الأطباء' : 'N° d’inscription Ordre National'}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: ONMD-4819"
                      defaultValue="ONMD-7821"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0066CC]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#172B68] hover:bg-[#101F4C] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isRtl ? 'تأكيد الاشتراك وتفعيل العيادة' : 'Souscrire et Activer le Cabinet'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments Management */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <div>
                <h3 className="text-lg font-black text-[#172B68]">
                  {isRtl ? 'قائمة المرضى والمواعيد المحجوزة' : 'Consultations & Rendez-vous des Patients'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isRtl ? 'تحديث تلقائي في الوقت الفعلي لكل مريض يحجز عبر سنينات.' : 'Synchronisé en temps réel avec la plateforme de réservation en ligne.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-blue-50 text-[#0066CC] font-bold text-xs">
                  {appointments.length} {isRtl ? 'مواعيد مسجلة' : 'RDV prévus'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8F5FD] text-[#0066CC] flex items-center justify-center shrink-0 font-bold text-sm">
                      {appt.time}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#172B68]">{appt.patientName}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          {appt.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{appt.careType} · {appt.date}</p>
                      <p className="text-xs text-[#0066CC] font-mono mt-0.5">{appt.patientPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={`tel:${appt.patientPhone}`}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'اتصال' : 'Appeler'}</span>
                    </a>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-[#0066CC] text-white text-xs font-bold shadow-xs hover:bg-[#0052A3]"
                    >
                      {isRtl ? 'فتح الملف الطبي' : 'Dossier Patient'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Prosthesis Orders to Labs */}
        {activeTab === 'prosthesis' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* New Order Form Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-5 h-5 text-[#0D9488]" />
                  <h3 className="text-lg font-black text-[#172B68]">
                    {isRtl ? 'إرسال طلب تركيبات جديد إلى صانع الأسنان' : 'Nouveau Bon de Fabrication Prothétique'}
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#0D9488] bg-teal-50 px-2.5 py-1 rounded-full">
                  Liaison Directe Labo
                </span>
              </div>

              {orderSentSuccess && (
                <div className="mb-4 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>{isRtl ? 'تم إرسال الطلبية بنجاح إلى مختبر صناعة الأسنان!' : 'Bon de commande envoyé avec succès au laboratoire de prothèse !'}</span>
                </div>
              )}

              <form onSubmit={handleCreateProsthesisOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'مرجع المريض / الملف' : 'Réf. Patient / Dossier'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newPatientRef}
                      onChange={(e) => setNewPatientRef(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0D9488]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'نوع العمل والتركيبة' : 'Type de Prothèse'}
                    </label>
                    <select
                      value={newWorkType}
                      onChange={(e) => setNewWorkType(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0D9488]"
                    >
                      <option value="Couronne Zircone Full Contour">Couronne Zircone Full Contour</option>
                      <option value="Bridge Céramique E-max 3 éléments">Bridge Céramique E-max 3 éléments</option>
                      <option value="Facette Céramique Feldspathique">Facette Céramique Feldspathique</option>
                      <option value="Appareil Amovible Résine">Appareil Amovible Résine</option>
                      <option value="Châssis Métallique Stellite">Châssis Métallique Stellite</option>
                      <option value="Gouttière d’Aligneurs Orthodontiques">Gouttière d’Aligneurs Orthodontiques</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'اللون والدرجة (Teinte Vita)' : 'Teinte (Guide Vita)'}
                    </label>
                    <select
                      value={newShade}
                      onChange={(e) => setNewShade(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0D9488]"
                    >
                      <option value="BL1">BL1 (Bleach Ultra-Blanc)</option>
                      <option value="BL2">BL2 (Bleach Naturel)</option>
                      <option value="A1">A1</option>
                      <option value="A2">A2 (Standard)</option>
                      <option value="A3">A3</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'رقم السن (FDI)' : 'N° de Dent (Notation FDI)'}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 16, 21, 36..."
                      value={newToothNumber}
                      onChange={(e) => setNewToothNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0D9488]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'اختيار صانع الأسنان / المختبر' : 'Laboratoire Partenaire'}
                    </label>
                    <select
                      value={newLabName}
                      onChange={(e) => setNewLabName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0D9488]"
                    >
                      {mockDentalLabs.map((lab) => (
                        <option key={lab.id} value={lab.name}>
                          {lab.name} ({lab.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isRtl ? 'تاريخ التسليم المطلوب بالعيادة' : 'Date de livraison souhaitée'}
                    </label>
                    <input
                      type="text"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-[#0D9488]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isRtl ? 'إرسال أمر التصنيع لصانع الأسنان' : 'Transmettre l’ordre de fabrication au labo'}</span>
                </button>
              </form>
            </div>

            {/* List of Orders in Progress */}
            <div className="max-w-4xl mx-auto space-y-4">
              <h3 className="text-base font-black text-[#172B68] flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{isRtl ? 'طلبات التركيبات قيد الإنجاز والتسليم' : 'Commandes de Prothèses en Cours'}</span>
              </h3>

              <div className="space-y-3">
                {prosthesisOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-xs font-mono font-bold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded-md">
                          {order.id}
                        </span>
                        <h4 className="text-sm font-bold text-[#172B68]">
                          {order.workType} (Dent {order.toothNumber})
                        </h4>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          Teinte {order.shade}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {order.laboratoryName} · Livrable le : <span className="font-semibold text-gray-700">{order.dueDate}</span>
                      </p>
                      {order.notes && (
                        <p className="text-[11px] text-gray-400 mt-1 italic">{order.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        order.status === 'in_production'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : order.status === 'quality_check'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {order.status === 'in_production'
                          ? (isRtl ? 'قيد التصنيع' : 'En fabrication')
                          : order.status === 'quality_check'
                          ? (isRtl ? 'مراقبة الجودة' : 'Contrôle qualité')
                          : (isRtl ? 'تم التسليم' : 'Prêt à livrer')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
