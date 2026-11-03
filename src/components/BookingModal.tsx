import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import { Doctor, CareCategory, Appointment, Language } from '../types';
import { getTranslation } from '../data/translations';
import { careCategoriesData, doctorsData } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctor?: Doctor | null;
  initialCare?: CareCategory | null;
  currentLang: Language;
  onConfirmBooking: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDoctor,
  initialCare,
  currentLang,
  onConfirmBooking,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctor ? initialDoctor.id : doctorsData[0].id
  );
  const [selectedCareId, setSelectedCareId] = useState<string>(
    initialCare ? initialCare.id : careCategoriesData[0].id
  );

  // Date selection (next 7 days)
  const availableDates = [
    { label: "Aujourd'hui", labelAr: 'اليوم', dateStr: '30 Oct 2026', dayNum: '30', dayName: 'Ven' },
    { label: 'Demain', labelAr: 'غداً', dateStr: '31 Oct 2026', dayNum: '31', dayName: 'Sam' },
    { label: 'Lundi', labelAr: 'الإثنين', dateStr: '02 Nov 2026', dayNum: '02', dayName: 'Lun' },
    { label: 'Mardi', labelAr: 'الثلاثاء', dateStr: '03 Nov 2026', dayNum: '03', dayName: 'Mar' },
    { label: 'Mercredi', labelAr: 'الأربعاء', dateStr: '04 Nov 2026', dayNum: '04', dayName: 'Mer' },
    { label: 'Jeudi', labelAr: 'الخميس', dateStr: '05 Nov 2026', dayNum: '05', dayName: 'Jeu' },
  ];

  const [selectedDate, setSelectedDate] = useState(availableDates[1]);

  const morningSlots = ['09:15', '10:00', '10:45', '11:30'];
  const afternoonSlots = ['14:30', '15:15', '16:00', '16:45', '17:30'];
  const [selectedTime, setSelectedTime] = useState('15:15');

  // Form State
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('+212 6 ');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  const currentDoctor = doctorsData.find((d) => d.id === selectedDoctorId) || doctorsData[0];
  const currentCare = careCategoriesData.find((c) => c.id === selectedCareId) || careCategoriesData[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const newAppt: Appointment = {
      id: `SN-${Math.floor(1000 + Math.random() * 9000)}`,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      clinicName: currentDoctor.clinicName,
      careType: currentCare.name,
      date: selectedDate.dateStr,
      time: selectedTime,
      patientName,
      patientPhone,
      patientEmail,
      notes: patientNotes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedAppt(newAppt);
    onConfirmBooking(newAppt);
    setStep(4);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedAppt) return;
    const title = `RDV Dentiste - ${confirmedAppt.doctorName} (${confirmedAppt.careType})`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sninat Dental//FR',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:Cabinet ${confirmedAppt.clinicName} - Contact: ${currentDoctor.phone}`,
      `LOCATION:${currentDoctor.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RDV-Sninat-${confirmedAppt.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-xl border border-[#E3ECE8] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#E3ECE8] bg-[#F9F9F7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && step < 4 && (
              <button
                type="button"
                onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                className="w-8 h-8 rounded-lg bg-white border border-[#E3ECE8] flex items-center justify-center text-[#5A6A6A] hover:text-[#243330]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <p className="text-[11px] font-semibold text-[#4A7C6F] uppercase tracking-wider">
                Étape {step} sur 3 · {t.bookAppointment}
              </p>
              <h3 className="text-base sm:text-lg font-bold text-[#243330]">
                {step === 1 && t.step1Title}
                {step === 2 && t.step2Title}
                {step === 3 && t.step3Title}
                {step === 4 && t.step4Title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#E8F5F0] text-[#5A6A6A] flex items-center justify-center border border-[#E3ECE8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* STEP 1: Care & Doctor Selection */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-2">
                  1. Motif de consultation dentaire
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {careCategoriesData.map((care) => (
                    <button
                      key={care.id}
                      type="button"
                      onClick={() => setSelectedCareId(care.id)}
                      className={`p-3 rounded-xl text-left border text-xs transition-colors flex items-center justify-between ${
                        selectedCareId === care.id
                          ? 'bg-[#E8F5F0] border-[#4A7C6F] font-semibold text-[#243330]'
                          : 'border-[#E3ECE8] bg-white hover:bg-[#F9F9F7] text-[#5A6A6A]'
                      }`}
                    >
                      <span className="truncate">{isRtl ? care.nameAr : care.name}</span>
                      <span className="text-[11px] text-[#4A7C6F] font-bold shrink-0 ml-2">
                        {care.estimatedPrice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-2">
                  2. Choisissez votre chirurgien-dentiste
                </label>
                <div className="space-y-2.5">
                  {doctorsData.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                        selectedDoctorId === doc.id
                          ? 'bg-[#E8F5F0] border-[#4A7C6F] shadow-xs'
                          : 'bg-white border-[#E3ECE8] hover:bg-[#F9F9F7]'
                      }`}
                    >
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E3ECE8]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#243330] truncate">{doc.name}</h4>
                          <span className="text-[11px] font-semibold text-[#4A7C6F]">
                            {doc.city}
                          </span>
                        </div>
                        <p className="text-xs text-[#5A6A6A] truncate">{doc.title}</p>
                        <p className="text-[11px] text-[#4A7C6F] font-medium mt-0.5">
                          {t.nextSlot} {doc.nextAvailableSlot}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl bg-[#4A7C6F] hover:bg-[#3D685D] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Continuer vers le créneau</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Date & Slot Picker */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-2.5">
                  Sélectionnez le jour de consultation
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate.dayNum === item.dayNum;
                    return (
                      <button
                        key={item.dayNum}
                        type="button"
                        onClick={() => setSelectedDate(item)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#4A7C6F] text-white border-[#4A7C6F] shadow-xs'
                            : 'bg-white hover:bg-[#E8F5F0] border-[#E3ECE8] text-[#5A6A6A]'
                        }`}
                      >
                        <span className="block text-[11px] opacity-80 uppercase">{item.dayName}</span>
                        <span className="block text-lg font-bold tabular-nums my-0.5">{item.dayNum}</span>
                        <span className="block text-[10px] truncate">
                          {isRtl ? item.labelAr : item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-2">
                  Matinée
                </label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {morningSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors tabular-nums ${
                        selectedTime === time
                          ? 'bg-[#E8F5F0] border-[#4A7C6F] text-[#4A7C6F] ring-1 ring-[#4A7C6F]'
                          : 'bg-white hover:bg-[#F9F9F7] border-[#E3ECE8] text-[#5A6A6A]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-2">
                  Après-midi
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {afternoonSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors tabular-nums ${
                        selectedTime === time
                          ? 'bg-[#E8F5F0] border-[#4A7C6F] text-[#4A7C6F] ring-1 ring-[#4A7C6F]'
                          : 'bg-white hover:bg-[#F9F9F7] border-[#E3ECE8] text-[#5A6A6A]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Recap Card */}
              <div className="p-3.5 bg-[#F9F9F7] rounded-xl border border-[#E3ECE8] text-xs space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-[#5A6A6A]">Praticien :</span>
                  <span className="text-[#243330] font-bold">{currentDoctor.name}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-[#5A6A6A]">Créneau choisi :</span>
                  <span className="text-[#4A7C6F] font-bold">
                    {selectedDate.dateStr} à {selectedTime}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl bg-[#4A7C6F] hover:bg-[#3D685D] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Continuer vers vos coordonnées</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-1.5">
                  {t.fullName} *
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-[#8A9A9A] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ex: Yasmine Berrada"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F9F9F7] border border-[#E3ECE8] rounded-xl focus:border-[#4A7C6F] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-1.5">
                    {t.phone} *
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-[#8A9A9A] absolute left-3 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+212 6 XX XX XX XX"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F9F9F7] border border-[#E3ECE8] rounded-xl focus:border-[#4A7C6F] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-1.5">
                    {t.email}
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-[#8A9A9A] absolute left-3 pointer-events-none" />
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="nom@exemple.ma"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F9F9F7] border border-[#E3ECE8] rounded-xl focus:border-[#4A7C6F] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243330] uppercase tracking-wider mb-1.5">
                  {t.symptomsNotes}
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="Ex: Douleur au froid sur molaire supérieure depuis 3 jours..."
                    className="w-full p-3 text-xs bg-[#F9F9F7] border border-[#E3ECE8] rounded-xl focus:border-[#4A7C6F] focus:outline-hidden resize-none"
                  />
                </div>
              </div>

              <div className="bg-[#E8F5F0] p-3 rounded-xl border border-[#D5EAE2] text-[11px] text-[#4A7C6F] leading-relaxed">
                ✓ Prise de rendez-vous gratuite sans paiement préalable. Vos coordonnées sont exclusivement transmises au praticien traitant pour la confirmation.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-sm font-semibold rounded-xl text-white transition-all shadow-md hover:brightness-105 active:scale-[0.98] border border-[#B89558]"
                style={{ backgroundColor: '#C9A86C' }}
              >
                {t.confirmBookingBtn}
              </button>
            </form>
          )}

          {/* STEP 4: Success & Confirmation Ticket */}
          {step === 4 && confirmedAppt && (
            <div className="text-center py-2 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#E8F5F0] text-[#4A7C6F] flex items-center justify-center mx-auto border-2 border-[#CDE5DC] shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#243330] mb-1">
                  {t.bookingSuccess}
                </h3>
                <p className="text-xs text-[#5A6A6A] max-w-md mx-auto leading-relaxed">
                  {t.bookingSuccessSubtitle}
                </p>
              </div>

              {/* Consultation Voucher Card */}
              <div className="bg-[#F9F9F7] p-5 rounded-2xl border border-[#E3ECE8] text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#E3ECE8]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A9A9A] tracking-wider">
                      {t.appointmentRef}
                    </span>
                    <p className="text-base font-bold text-[#4A7C6F] font-mono tabular-nums">
                      {confirmedAppt.id}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-semibold text-[#4A7C6F] bg-[#E8F5F0] rounded-lg">
                    Confirmé
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#8A9A9A] block">Chirurgien-Dentiste</span>
                    <span className="font-bold text-[#243330]">{confirmedAppt.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-[#8A9A9A] block">Date & Heure</span>
                    <span className="font-bold text-[#243330]">
                      {confirmedAppt.date} · {confirmedAppt.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8A9A9A] block">Motif de soin</span>
                    <span className="font-bold text-[#243330]">{confirmedAppt.careType}</span>
                  </div>
                  <div>
                    <span className="text-[#8A9A9A] block">Patient</span>
                    <span className="font-bold text-[#243330]">{confirmedAppt.patientName}</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#5A6A6A] pt-2 border-t border-[#E3ECE8]">
                  <span className="font-medium text-[#243330]">Cabinet : </span>
                  {currentDoctor.address} ({currentDoctor.phone})
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="w-full sm:w-1/2 py-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-[#F9F9F7] text-[#4A7C6F] border border-[#D5EAE2] transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.addToCalendar}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/2 py-2.5 text-xs font-semibold rounded-xl bg-[#4A7C6F] text-white hover:bg-[#3D685D] transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
