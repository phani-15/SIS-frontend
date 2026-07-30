import React from 'react';
import { Award, Calendar, BarChart } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function Certification({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Certifications"
      items={items}
      addPath="/student/profile/addcertification"
      badgeText={(item) => item.typeOfCertification || 'Professional'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-amber-500">
              <Award size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.name || item.typeOfCertification || "Certification"}</h3>
              <p className="text-sm font-semibold text-slate-500">{item.issuer || item.domain || "Issuer / Domain"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Certification ID</span>
              <span className="text-slate-700 font-semibold">{item.certificationId || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Completion Date</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {formatDate(item.dateOfCompletion || item.date)}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Grade & Score</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <BarChart size={14} className="text-slate-400" />
                {item.gradeObtained ? `Grade: ${item.gradeObtained}` : ''} {item.scoreObtained ? `(Score: ${item.scoreObtained})` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Duration</span>
              <span className="text-slate-700 font-semibold">{item.duration || "N/A"}</span>
            </div>
          </div>
        </>
      )}
    />
  );
}
