import React from 'react';
import { Award, Calendar, Lightbulb } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function CoCurricularActivities({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Co-Curricular Activities"
      items={items}
      addPath="/student/profile/addcoCurricular"
      badgeText={(item) => item.awardRecieved === 'Yes' ? item.awardName || 'Winner' : 'Participant'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-yellow-600">
              <Lightbulb size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.eventName || "Event Name"}</h3>
              <p className="text-sm font-semibold text-slate-500">
                {item.organizationName || item.organization || "Organizer"} • {item.activityType || "Co-Curricular"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Level of Event</span>
              <span className="text-slate-700 font-semibold">{item.eventLevel || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Event Date</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {formatDate(item.eventDate || item.date)}
              </span>
            </div>
            <div className="text-sm sm:col-span-2">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Award / Placement Details</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Award size={14} className="text-slate-400" />
                {item.awardRecieved === 'Yes' ? `Won: ${item.awardName}` : 'Participant'}
              </span>
            </div>
          </div>
        </>
      )}
    />
  );
}
