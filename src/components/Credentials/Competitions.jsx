import React from 'react';
import { Trophy, Calendar, MapPin, Users } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function Competitions({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Competitions"
      items={items}
      addPath="/student/profile/addcompetition"
      badgeText={(item) => item.awardRecieved === 'Yes' ? item.awardName || 'Winner' : 'Participant'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-amber-600">
              <Trophy size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.competitionName || "Competition"}</h3>
              <p className="text-sm font-semibold text-slate-500">
                {item.organizingInstitutionCompany || "Organizing Institution"} • {item.competitionCategory || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Level & Mode</span>
              <span className="text-slate-700 font-semibold">{item.eventLevel || "N/A"} • {item.mode || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Project Idea / Title</span>
              <span className="text-slate-700 font-semibold">{item.presentedProjectIdeaTitle || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Theme / Domain</span>
              <span className="text-slate-700 font-semibold">{item.themeDomain || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Duration / Date</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {item.startDate} {item.endDate ? `to ${item.endDate}` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Team Details</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Users size={14} className="text-slate-400" />
                {item.typeOfParticipation || "N/A"} {item.teamName ? `(${item.teamName}, Size: ${item.teamSize})` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Prizes & Rank</span>
              <span className="text-slate-700 font-semibold">
                {item.rankSecured ? `Rank: ${item.rankSecured}` : 'Participant'} 
                {item.prizeMoney ? ` (Prize: ₹${item.prizeMoney})` : ''}
              </span>
            </div>
          </div>
        </>
      )}
    />
  );
}
