import React from 'react';
import { X, Calendar, Clock, MapPin, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Appointment, Language } from '../types';
import { getTranslation } from '../data/translations';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  currentLang: Language;
  onCancelAppointment: (id: string) => void;
  onOpenBooking: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  currentLang,
  onCancelAppointment,
  onOpenBooking,
}) => {
  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#E3ECE8] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#E3ECE8] bg-[#F9F9F7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E8F5F0] text-[#4A7C6F] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#243330]">{t.navAppointments}</h3>
              <p className="text-xs text-[#5A6A6A]">
                {appointments.length} consultation{appointments.length > 1 ? 's' : ''} enregistrée{appointments.length > 1 ? 's' : ''}
              </p>
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

        {/* List of Appointments */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-[#F9F9F7] rounded-2xl p-4 border border-[#E3ECE8] space-y-3 hover:border-[#C5DDD3] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#4A7C6F] font-semibold mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
                      <span>{appt.careType}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#243330]">{appt.doctorName}</h4>
                    <p className="text-xs text-[#5A6A6A]">{appt.clinicName}</p>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-[#8A9A9A] bg-white px-2 py-0.5 rounded-md border border-[#E3ECE8]">
                    {appt.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#E3ECE8]/70">
                  <div className="flex items-center gap-1.5 text-[#243330] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#4A7C6F]" />
                    <span>{appt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#243330] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#4A7C6F]" />
                    <span>{appt.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-[#4A7C6F] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statut : {appt.status === 'confirmed' ? 'Confirmé' : appt.status}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onCancelAppointment(appt.id)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{t.cancelBooking}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F5F0] flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-[#4A7C6F]" />
              </div>
              <h4 className="text-sm font-bold text-[#243330] mb-1">{t.noAppointmentsYet}</h4>
              <p className="text-xs text-[#5A6A6A] mb-5">
                Prenez rendez-vous en quelques clics avec un chirurgien-dentiste proche de vous.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-4 py-2.5 text-xs font-semibold rounded-xl text-white transition-all shadow-xs border border-[#B89558]"
                style={{ backgroundColor: '#C9A86C' }}
              >
                {t.bookFirstAppointment}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E3ECE8] bg-[#F9F9F7] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#4A7C6F] hover:bg-[#E8F5F0] rounded-xl transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
