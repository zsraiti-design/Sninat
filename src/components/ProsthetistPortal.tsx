import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Wrench, ShieldCheck, CheckCircle2, Package, Layers, Award, Truck } from 'lucide-react';
import { Language, ProsthesisOrder } from '../types';
import { initialProsthesisOrders } from '../data/mockData';
import { Logo } from './Logo';

interface ProsthetistPortalProps {
  currentLang: Language;
  onReturnToGateway: () => void;
}

export const ProsthetistPortal: React.FC<ProsthetistPortalProps> = ({
  currentLang,
  onReturnToGateway,
}) => {
  const isRtl = currentLang === 'ar';
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'registration'>('orders');

  const [orders, setOrders] = useState<ProsthesisOrder[]>(initialProsthesisOrders);

  // Lab registration form
  const [labName, setLabName] = useState('Laboratoire Elite Prothèse');
  const [labCity, setLabCity] = useState('Casablanca');
  const [labPhone, setLabPhone] = useState('+212 5 22 45 67 89');
  const [labArtisanName, setLabArtisanName] = useState('Rachid Bennani');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleUpdateOrderStatus = (orderId: string, newStatus: ProsthesisOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleRegisterLab = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
    }, 4500);
  };

  const prosthesisCatalog = [
    {
      name: 'Couronne Zircone Full Contour (Multicouche)',
      nameAr: 'تاج زيركون كامل (متعدد الطبقات)',
      material: 'Zircone 3D Pro 1200 MPa',
      priceMad: '850 - 1 100 MAD',
      delay: '48h à 72h',
      tag: 'Le plus demandé',
    },
    {
      name: 'Facette & Onlay E-Max (Disilicate de Lithium)',
      nameAr: 'عدسة وفينير إيماكس تجميلي',
      material: 'Ivoclar IPS e.max Press',
      priceMad: '900 - 1 250 MAD',
      delay: '72h',
      tag: 'Esthétique Premium',
    },
    {
      name: 'Bridge Céramo-Métallique sur Implants',
      nameAr: 'جسر خزفي معدني فوق الزرعات',
      material: 'Chrome-Cobalt biocompatible + Céramique Noritake',
      priceMad: '1 600 - 2 400 MAD',
      delay: '4 à 5 jours',
      tag: 'Haute résistance',
    },
    {
      name: 'Châssis Métallique Stellite (Prothèse Adjointe)',
      nameAr: 'هيكل معدني ستليت للتركيبة المتحركة',
      material: 'Alliage stellite allégé avec crochets esthétiques',
      priceMad: '1 400 - 1 900 MAD',
      delay: '5 jours',
      tag: 'Ajustement précis',
    },
    {
      name: 'Gouttière d’Aligneurs Orthodontiques & Bruxisme',
      nameAr: 'مصففات شفافة وحارس ليلي للأسنان',
      material: 'Polyuréthane thermoplastique médical thermoformé',
      priceMad: '400 - 750 MAD',
      delay: '24h à 48h',
      tag: 'Livraison express',
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#172B68] font-sans pb-16"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Prosthetist Portal Header */}
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
              subtitleText={isRtl ? 'فضاء صانع ومختبر الأسنان' : 'Espace Prothésiste Dentaire'}
              showArabicName={isRtl}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
              <Award className="w-3.5 h-3.5" />
              <span>{isRtl ? 'مختبر معتمد ومسجل' : 'Laboratoire Certifié'}</span>
            </span>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="border-t border-gray-100 bg-gray-50/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-[#0D9488] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-white hover:text-[#0D9488]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>{isRtl ? 'الطلبيات الواردة من العيادات' : 'Commandes Reçues des Cabinets'}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white text-teal-800">
                {orders.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-[#0D9488] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-white hover:text-[#0D9488]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isRtl ? 'كتالوج أسعار وتصنيع التركيبات' : 'Grille Tarifaire & Matériaux'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('registration')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'registration'
                  ? 'bg-[#0D9488] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-white hover:text-[#0D9488]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isRtl ? 'تسجيل وشراكة المختبر' : 'Partenariat & Référencement'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Tab 1: Orders Management for Prosthetists */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#172B68]">
                  {isRtl ? 'طلبات التركيبات الواردة من جراحي الأسنان' : 'Bons de Commande Reçus des Dentistes'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isRtl
                    ? 'تابع مراحل التصنيع (نحت ثلاثي الأبعاد، حرق الخزف، مطابقة اللون) وحدد جاهزية التسليم للعيادة.'
                    : 'Gérez l’usinage CFAO 3D, la cuisson céramique, le contrôle de teinte et notifiez le coursier.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs">
                  {orders.length} {isRtl ? 'طلبيات نشطة' : 'travaux actifs'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-gray-100 hover:border-teal-200 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                          {order.id}
                        </span>
                        <h4 className="text-base font-black text-[#172B68]">
                          {order.workType}
                        </h4>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          Dent {order.toothNumber}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600">
                        Prescrit par : <span className="font-bold text-[#172B68]">{order.doctorName}</span> · {order.clinicName} ({order.city})
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Patient réf : <span className="font-semibold text-gray-700">{order.patientRef}</span> · Date d’échéance : <span className="font-bold text-red-600">{order.dueDate}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right sm:text-left">
                        <p className="text-xs text-gray-400">{isRtl ? 'اللون المحدد' : 'Guide Vita'}</p>
                        <p className="text-sm font-black text-[#172B68]">{order.shade}</p>
                      </div>
                      <div className="text-right sm:text-left pl-3 border-l border-gray-200">
                        <p className="text-xs text-gray-400">{isRtl ? 'التعريفة' : 'Montant Labo'}</p>
                        <p className="text-sm font-black text-emerald-600">{order.priceMad} MAD</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Stage Selector Bar */}
                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-gray-600">{isRtl ? 'حالة الطلب الآن :' : 'Étape de fabrication :'}</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, 'pending')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            order.status === 'pending'
                              ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {isRtl ? 'تم الاستلام' : 'Reçu'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, 'in_production')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            order.status === 'in_production'
                              ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-400'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {isRtl ? 'قيد التصنيع CFAO' : 'Usinage CFAO'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, 'quality_check')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            order.status === 'quality_check'
                              ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-400'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {isRtl ? 'مراقبة الجودة واللون' : 'Contrôle Teinte'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            order.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {isRtl ? 'جاهز للتسليم' : 'Prêt pour coursier'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        className="px-3 py-1 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'إشعار العيادة' : 'Notifier le Cabinet'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Prosthesis Catalog & Materials */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h3 className="text-2xl font-black text-[#172B68] mb-1">
                {isRtl ? 'كتالوج صناعة الأسنان والمواد المعتمدة' : 'Catalogue de Fabrication & Tarifs Laboratoire'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {isRtl
                  ? 'أعلى معايير الدقة الميكانيكية والجمالية لتركيبات الزيركون، الإيماكس، والأطقم المتحركة.'
                  : 'Finition artisanale et CFAO haute précision certifiée CE. Tarifs indicatifs professionnels.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prosthesisCatalog.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border-2 border-gray-100 hover:border-teal-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                      {item.tag}
                    </span>
                    <h4 className="text-base font-bold text-[#172B68] mb-1">
                      {isRtl ? item.nameAr : item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">{item.material}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400">{isRtl ? 'التعريفة للمختبر' : 'Tarif indicatif'}</p>
                      <p className="text-sm font-black text-teal-700">{item.priceMad}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                      {item.delay}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Laboratory Registration */}
        {activeTab === 'registration' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#172B68]">
                  {isRtl ? 'تسجيل مختبر صناعة الأسنان في شبكة سنينات' : 'Référencement du Laboratoire de Prothèse'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isRtl ? 'اربط مختبرك بعشرات عيادات طب الأسنان الشريكة في مدينتك.' : 'Recevez des bons de commande numériques réguliers des cabinets partenaires.'}
                </p>
              </div>
            </div>

            {registeredSuccess && (
              <div className="my-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{isRtl ? 'تم تسجيل المختبر بنجاح! سيتم ربطكم بأطباء الأسنان في منطقتكم.' : 'Demande d’adhésion enregistrée avec succès. Notre équipe vous contactera pour valider vos agréments.'}</span>
              </div>
            )}

            <form onSubmit={handleRegisterLab} className="space-y-4 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isRtl ? 'اسم المختبر' : 'Nom du Laboratoire'}
                  </label>
                  <input
                    type="text"
                    required
                    value={labName}
                    onChange={(e) => setLabName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isRtl ? 'المدينة' : 'Ville'}
                  </label>
                  <select
                    value={labCity}
                    onChange={(e) => setLabCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-teal-500"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Fès">Fès</option>
                    <option value="Agadir">Agadir</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isRtl ? 'اسم الصانع المسؤول' : 'Nom du Prothésiste / Gérant'}
                  </label>
                  <input
                    type="text"
                    required
                    value={labArtisanName}
                    onChange={(e) => setLabArtisanName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isRtl ? 'رقم الهاتف المباشر' : 'Téléphone direct'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={labPhone}
                    onChange={(e) => setLabPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Award className="w-4 h-4" />
                <span>{isRtl ? 'تأكيد تسجيل المختبر وتفعيل الشراكة' : 'Valider l’Inscription du Laboratoire'}</span>
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
