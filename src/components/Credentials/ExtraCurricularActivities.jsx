import React from 'react';
import { Award, Calendar, Flag } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function ExtraCurricularActivities({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Extra Curricular Activities"
      items={items}
      addPath="/student/profile/addextraCurricular"
      badgeText={(item) => item.prizeRecieved === 'Yes' ? item.prizeNameIfYes || 'Winner' : 'Participant'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-rose-500">
              <Flag size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.eventName || "Event Name"}</h3>
              <p className="text-sm font-semibold text-slate-500">
                {item.organizationName || item.organization || "Organizing Committee"} • {item.eventType || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Event Level</span>
              <span className="text-slate-700 font-semibold">{item.eventLevel || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Event Date</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {formatDate(item.dateOfEvent || item.date)}
              </span>
            </div>
            <div className="text-sm sm:col-span-2">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Outcome / Award</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Award size={14} className="text-slate-400" />
                {item.prizeRecieved === 'Yes' ? `Won: ${item.prizeNameIfYes}` : 'Successfully Participated'}
              </span>
            </div>
          </div>
        </>
      )}
    />
  );
}
