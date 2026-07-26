import React from 'react';
import { Award, ShieldAlert, Calendar } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function ProfessionalBodies({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Professional Bodies"
      items={items}
      certificateKey="membershipCertificate"
      badgeText={(item) => item.membershipId ? `ID: ${item.membershipId}` : 'Member'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-teal-600">
              <Award size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {item.nameOfProfessionalBody === 'others' ? item.otherName : item.nameOfProfessionalBody || item.name || "Professional Body"}
              </h3>
              <p className="text-sm font-semibold text-slate-500">Membership Id: {item.membershipId || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Valid Till</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {item.validTill || item.valid_till || "N/A"}
              </span>
            </div>
          </div>
        </>
      )}
    />
  );
}
