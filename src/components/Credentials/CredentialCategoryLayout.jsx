import React from 'react';
import { FileText } from 'lucide-react';

export default function CredentialCategoryLayout({
  title,
  items = [],
  badgeText,
  renderCardContent,
  certificateKey = 'certificate'
}) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500 font-medium shadow-sm">
        No {title.toLowerCase()} details found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 font-comfortaa">{title}</h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
          {items.length} {items.length === 1 ? 'Entry' : 'Entries'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item, index) => {
          const certVal = item[certificateKey] || item.certificate || item.document || item.membershipCertificate || item.offerLetter || item.conferenceCertificate || item.firstPageOfJournal;
          return (
            <div key={index} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-full w-1.5 bg-[#1a365d] transition-all group-hover:w-2"></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  {renderCardContent(item, index)}
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  {badgeText && badgeText(item) && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold border bg-blue-50 text-blue-700 border-blue-200">
                      {badgeText(item)}
                    </span>
                  )}
                  {certVal && (
                    <a
                      href={typeof certVal === 'string' ? certVal : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#1a365d] hover:text-[#002045] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-all active:scale-95"
                    >
                      <FileText size={14} />
                      View Document
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
