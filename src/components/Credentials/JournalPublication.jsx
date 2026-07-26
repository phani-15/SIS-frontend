import React from 'react';
import { BookOpen, Calendar, AlignLeft, Info } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function JournalPublication({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Journal Publications"
      items={items}
      certificateKey="firstPageOfJournal"
      badgeText={(item) => item.scope || 'International'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-emerald-600">
              <BookOpen size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.titleOfThePaper || item.title || "Paper Title"}</h3>
              <p className="text-sm font-semibold text-slate-500">{item.nameOfTheJournal || item.journal || "Journal Name"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Publication Details</span>
              <span className="text-slate-700 font-semibold">
                Vol: {item.volumeNumber || "N/A"}, Issue: {item.issueNumber || "N/A"}, Pages: {item.pageNumbersFromTo || "N/A"}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Year of Publication</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {item.yearOfPublication || "N/A"}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Impact Factor & Platform</span>
              <span className="text-slate-700 font-semibold">
                IF: {item.impactFactor || "N/A"} • Indexing: {item.indexingPlatform || "N/A"}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">ISSN / DOI</span>
              <span className="text-slate-700 font-semibold">
                ISSN: {item.issnNumberIfYes || "N/A"} {item.doiIf ? `• DOI: ${item.doiIf}` : ''}
              </span>
            </div>
            <div className="text-sm sm:col-span-2">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Authors</span>
              <span className="text-slate-700 font-semibold">
                No. of Authors: {item.noOfAuthors || "N/A"} {item.author ? `(${item.author})` : ''}
              </span>
            </div>
            {item.remarks && (
              <div className="text-sm sm:col-span-2 flex items-start gap-1 text-slate-500 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                <Info size={14} className="mt-0.5 shrink-0" />
                <span>{item.remarks}</span>
              </div>
            )}
          </div>
        </>
      )}
    />
  );
}
