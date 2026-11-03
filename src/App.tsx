/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Doctor, CareCategory, Appointment, UserRole } from './types';
import { doctorsData, careCategoriesData, initialAppointmentsData } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CareSelector } from './components/CareSelector';
import { DoctorList } from './components/DoctorList';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { DentalAdviceSection } from './components/DentalAdviceSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { RoleGateway } from './components/RoleGateway';
import { DoctorPortal } from './components/DoctorPortal';
import { ProsthetistPortal } from './components/ProsthetistPortal';
import { EmergencyModal } from './components/EmergencyModal';
import { DevicePreviewBar, ExpoModal, DeviceMode } from './components/DevicePreviewBar';

export default function App() {
  // Mobile / Desktop Preview Mode (Desktop / Apple iOS / Android)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isExpoModalOpen, setIsExpoModalOpen] = useState(false);

  // Default language is French/Arabic based on user choice
  const [currentLang, setCurrentLang] = useState<Language>('fr');

  // Role Gateway state: starts at 'gateway' as requested ("الصفحة الأولى ملي كيدخل الزائر كيلقى ثلاثة ديال الاختيارات")
  const [activeRole, setActiveRole] = useState<UserRole>('gateway');

  // Emergency Modal state ("يقدر يلقى الأرجون يدخل يتفقدها")
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Search & Filter state
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCareId, setSelectedCareId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointmentsData);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialDoctor, setBookingInitialDoctor] = useState<Doctor | null>(null);
  const [bookingInitialCare, setBookingInitialCare] = useState<CareCategory | null>(null);

  const [profileDoctor, setProfileDoctor] = useState<Doctor | null>(null);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);

  // Notification toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync RTL / LTR based on language
  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Handlers
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenGeneralBooking = () => {
    setActiveRole('patient');
    setBookingInitialDoctor(null);
    setBookingInitialCare(null);
    setIsBookingOpen(true);
  };

  const handleBookWithDoctor = (doctor: Doctor) => {
    setBookingInitialDoctor(doctor);
    setBookingInitialCare(null);
    setIsBookingOpen(true);
  };

  const handleQuickBookWithCare = (care: CareCategory) => {
    setBookingInitialCare(care);
    setBookingInitialDoctor(null);
    setIsBookingOpen(true);
  };

  const handleConfirmAppointment = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
    showToast(
      currentLang === 'ar'
        ? `تم تأكيد موعدك بنجاح برقم ${newAppt.id}`
        : `Votre RDV (${newAppt.id}) avec ${newAppt.doctorName} est confirmé !`
    );
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    showToast(
      currentLang === 'ar'
        ? 'تم إلغاء الموعد'
        : 'Le rendez-vous a bien été annulé.'
    );
  };

  const handleSearchSubmit = () => {
    handleNavigateSection('dentistes');
  };

  const renderAppContent = () => (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#172B68] text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-2xl shadow-xl border border-white/20 animate-in fade-in slide-in-from-top-3 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#0066CC]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Emergency Modal: Accessible from anywhere to inspect on-call care */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        currentLang={currentLang}
        onBookImmediateSlot={() => {
          setActiveRole('patient');
          handleOpenGeneralBooking();
        }}
      />

      {/* VIEW 1: Initial First Page - Role Gateway with 3 choices, official Logo & Urgences */}
      {activeRole === 'gateway' && (
        <RoleGateway
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onSelectRole={(role) => setActiveRole(role)}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />
      )}

      {/* VIEW 2: Médecin-Dentiste Portal (Abonnement, Rendez-vous, Commandes Prothésistes) */}
      {activeRole === 'doctor' && (
        <DoctorPortal
          currentLang={currentLang}
          onReturnToGateway={() => setActiveRole('gateway')}
          appointments={appointments}
        />
      )}

      {/* VIEW 3: Prothésiste Dentaire Portal (Commandes labo, Catalogue matériaux, Partenariat) */}
      {activeRole === 'prosthetist' && (
        <ProsthetistPortal
          currentLang={currentLang}
          onReturnToGateway={() => setActiveRole('gateway')}
        />
      )}

      {/* VIEW 4: Patient / Visiteur Portal (Dossier, Choisir le soin, Dentistes, Réservation) */}
      {activeRole === 'patient' && (
        <div
          dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
          className="min-h-screen bg-[#F9F9F7] text-[#243330] flex flex-col font-sans pb-16 lg:pb-0"
        >
          {/* Top Bar Header with profile switch and emergency shortcut */}
          <Header
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            onOpenBooking={handleOpenGeneralBooking}
            onOpenAppointments={() => setIsAppointmentsOpen(true)}
            onNavigateSection={handleNavigateSection}
            activeSection={activeSection}
            appointmentsCount={appointments.length}
            onReturnToGateway={() => setActiveRole('gateway')}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />

          {/* Hero Section with Search Console */}
          <main className="flex-1">
            <HeroSection
              currentLang={currentLang}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              selectedCare={selectedCareId}
              onCareChange={setSelectedCareId}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              onOpenBooking={handleOpenGeneralBooking}
            />

            {/* Choisir le soin: Treatment Category Grid */}
            <CareSelector
              currentLang={currentLang}
              selectedCareId={selectedCareId}
              onSelectCare={(careId) => {
                setSelectedCareId(careId);
                handleNavigateSection('dentistes');
              }}
              onQuickBookWithCare={handleQuickBookWithCare}
            />

            {/* Dentistes: Directory of verified doctors with cards & filters */}
            <DoctorList
              doctors={doctorsData}
              currentLang={currentLang}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              selectedCareId={selectedCareId}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onViewProfile={(doc) => setProfileDoctor(doc)}
              onBookAppointment={handleBookWithDoctor}
            />

            {/* Dental Emergency & Prevention Guidance */}
            <DentalAdviceSection
              currentLang={currentLang}
              onOpenBookingForEmergency={handleOpenGeneralBooking}
            />
          </main>

          {/* Footer */}
          <Footer
            currentLang={currentLang}
            onSelectCity={(cityId) => {
              setSelectedCity(cityId);
              handleNavigateSection('dentistes');
            }}
            onOpenBooking={handleOpenGeneralBooking}
          />

          {/* Mobile Bottom Navigation Bar (for small screens) */}
          <MobileBottomNav
            currentLang={currentLang}
            activeSection={activeSection}
            onNavigateSection={handleNavigateSection}
            onOpenAppointments={() => setIsAppointmentsOpen(true)}
            appointmentsCount={appointments.length}
          />

          {/* Doctor Profile Modal ("Voir le profil") */}
          <DoctorProfileModal
            doctor={profileDoctor}
            currentLang={currentLang}
            onClose={() => setProfileDoctor(null)}
            onBookAppointment={(doc) => {
              setProfileDoctor(null);
              handleBookWithDoctor(doc);
            }}
          />

          {/* Booking Modal ("Réserver un rendez-vous") */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            initialDoctor={bookingInitialDoctor}
            initialCare={bookingInitialCare}
            currentLang={currentLang}
            onConfirmBooking={handleConfirmAppointment}
          />

          {/* My Appointments Modal ("Mes Rendez-vous") */}
          <MyAppointmentsModal
            isOpen={isAppointmentsOpen}
            onClose={() => setIsAppointmentsOpen(false)}
            appointments={appointments}
            currentLang={currentLang}
            onCancelAppointment={handleCancelAppointment}
            onOpenBooking={() => {
              setIsAppointmentsOpen(false);
              handleOpenGeneralBooking();
            }}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      {/* Device Mode Switcher Bar with Expo Go Modal Launcher */}
      <DevicePreviewBar
        deviceMode={deviceMode}
        onDeviceModeChange={setDeviceMode}
        onOpenExpoModal={() => setIsExpoModalOpen(true)}
      />

      {/* Expo Go React Native Info Modal */}
      <ExpoModal
        isOpen={isExpoModalOpen}
        onClose={() => setIsExpoModalOpen(false)}
      />

      {/* Active Viewport Frame */}
      {deviceMode === 'desktop' ? (
        <div className="flex-1 w-full bg-[#F9F9F7]">
          {renderAppContent()}
        </div>
      ) : deviceMode === 'ios' ? (
        <div className="flex-1 py-6 px-3 flex items-center justify-center bg-slate-950 overflow-y-auto">
          {/* Apple iPhone 16 Pro Frame with Dynamic Island */}
          <div className="relative w-[393px] h-[844px] bg-black rounded-[52px] p-2.5 shadow-2xl ring-1 ring-white/20 border-4 border-slate-800 flex flex-col shrink-0 select-none">
            {/* iOS Status Bar with Dynamic Island */}
            <div className="relative h-11 bg-white text-slate-900 rounded-t-[42px] flex items-center justify-between px-7 shrink-0 z-20 border-b border-slate-100">
              <span className="text-xs font-bold font-mono">9:41</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full flex items-center justify-end pr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[10px] font-bold">5G</span>
                <div className="w-5 h-2.5 rounded-xs border border-slate-900 p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-900 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Inner iOS App Viewport */}
            <div className="flex-1 bg-[#F9F9F7] overflow-y-auto overflow-x-hidden relative">
              {renderAppContent()}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="h-6 bg-white rounded-b-[42px] flex items-center justify-center shrink-0 border-t border-slate-100">
              <div className="w-32 h-1 bg-slate-400 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 py-6 px-3 flex items-center justify-center bg-slate-950 overflow-y-auto">
          {/* Android Pixel 9 Frame with Punch Hole Camera */}
          <div className="relative w-[392px] h-[830px] bg-slate-900 rounded-[44px] p-2 shadow-2xl ring-1 ring-white/10 border-4 border-slate-800 flex flex-col shrink-0 select-none">
            {/* Android Status Bar */}
            <div className="relative h-9 bg-white text-slate-800 rounded-t-[36px] flex items-center justify-between px-6 shrink-0 z-20 border-b border-slate-100 text-xs font-medium">
              <span>12:00</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-3.5 h-3.5 bg-black rounded-full" />
              <div className="flex items-center gap-1 text-[11px]">
                <span>LTE</span>
                <span>100%</span>
              </div>
            </div>

            {/* Inner Android App Viewport */}
            <div className="flex-1 bg-[#F9F9F7] overflow-y-auto overflow-x-hidden relative">
              {renderAppContent()}
            </div>

            {/* Android Gesture Bar */}
            <div className="h-5 bg-white rounded-b-[36px] flex items-center justify-center shrink-0">
              <div className="w-20 h-1 bg-slate-500 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
