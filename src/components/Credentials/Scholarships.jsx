import React from 'react';
import { Award, Calendar, DollarSign } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function Scholarships({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Scholarships"
      items={items}
      badgeText={(item) => item.academicYear || item.year || 'N/A'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-yellow-600">
              <Award size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {item.nameOfScholarship === 'others' ? item.otherName : item.nameOfScholarship || item.name || "Scholarship"}
              </h3>
              <p className="text-sm font-semibold text-slate-500">Academic Year: {item.academicYear || item.year || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Amount Sanctioned</span>
              <span className="text-slate-700 font-semibold text-green-700 flex items-center gap-0.5">
                <DollarSign size={14} className="text-green-600" />
                ₹{item.amountSanctioned || item.amount || "N/A"}
              </span>
            </div>
          </div>
        </>
      )}
    />
  );
}
