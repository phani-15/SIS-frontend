import React from 'react';
import { BookOpen, Calendar, Shield } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function Patent({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Patents"
      items={items}
      addPath="/student/profile/addpatent"
      certificateKey="document"
      badgeText={(item) => item.publishedGranted || item.status || 'Published'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-purple-600">
              <Shield size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.titleOfThePatent || item.title || "Patent Title"}</h3>
              <p className="text-sm font-semibold text-slate-500">Patent Number: {item.patentNumber || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Scope</span>
              <span className="text-slate-700 font-semibold">{item.scope || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Year of Publication / Grant</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {item.yearOfPublishedGranted || "N/A"}
              </span>
            </div>
          </div>
        </>
      )}
    />
  );
}
