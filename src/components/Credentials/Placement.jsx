import React from 'react';
import { Briefcase, Calendar, Award } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function Placement({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Placements"
      items={items}
      addPath="/student/profile/addplacement"
      certificateKey="offerLetter"
      badgeText={(item) => item.package ? `${item.package}` : 'Selected'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-green-600">
              <Briefcase size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.jobRole || "Job Role"}</h3>
              <p className="text-sm font-semibold text-slate-500">{item.companyEmployerName || item.company || "Company"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">CTC Package</span>
              <span className="text-slate-700 font-semibold text-green-700">{item.package || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Date of Selection</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {formatDate(item.dateOfSelectionAppointmentOffer || item.dateOfSelection)}
              </span>
            </div>
            <div className="text-sm sm:col-span-2">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Appointment Reference Number</span>
              <span className="text-slate-700 font-semibold">{item.appointmentLetterReferenceNumber || "N/A"}</span>
            </div>
          </div>
        </>
      )}
    />
  );
}
