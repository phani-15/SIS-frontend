import React from 'react';
import { Landmark, Calendar, Award } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function EntranceExaminations({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Entrance Examinations"
      items={items}
      addPath="/student/profile/addentranceExam"
      badgeText={(item) => item.yearOfExamination || item.year || 'N/A'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-blue-900">
              <Landmark size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {item.examName === 'others' ? item.otherName : item.examName || "Entrance Exam"}
              </h3>
              <p className="text-sm font-semibold text-slate-500">Hall Ticket No: {item.registarationHallTicketNumber || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Score / Percentile</span>
              <span className="text-slate-700 font-semibold">
                Score: {item.score || "N/A"} {item.percentile ? `(Percentile: ${item.percentile}%)` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">All India Rank (AIR)</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Award size={14} className="text-amber-600" />
                {item.rank || "N/A"}
              </span>
            </div>
          </div>
        </>
      )}
    />
  );
}
