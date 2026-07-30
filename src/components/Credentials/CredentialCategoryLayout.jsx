import React from 'react';
import { ChevronLeft, FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fileUrl } from '../../utils/helpers';

export default function CredentialCategoryLayout({
  title,
  items = [],
  badgeText,
  renderCardContent,
  certificateKey = 'certificate',
  addPath
}) {
  const navigate = useNavigate();

  const getButtonLabel = () => {
    if (title === 'Competitions') return 'Competition';
    if (title === 'Extra Curricular Activities') return 'Extra Curricular Activity';
    if (title === 'Co-Curricular Activities') return 'Co-Curricular Activity';
    if (title === 'Professional Bodies') return 'Professional Body';
    if (title === 'Entrance Examinations') return 'Entrance Examination';
    if (title === 'Scholarships') return 'Scholarship';
    if (title === 'Journal Publication') return 'Journal Publication';
    if (title === 'Conference Paper') return 'Conference Paper';
    if (title === 'Patent') return 'Patent';
    if (title === 'Projects') return 'Project';
    if (title === 'Certifications') return 'Certification';
    return title.endsWith('s') ? title.slice(0, -1) : title;
  };

  const buttonLabel = getButtonLabel();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 font-comfortaa">{title}</h2>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
            {items.length} {items.length === 1 ? 'Entry' : 'Entries'}
          </span>
          {addPath && (
            <button 
              onClick={() => navigate(addPath)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] hover:bg-[#002045] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Plus size={14} />
              Add {buttonLabel}
            </button>
          )}
        </div>
      </div>

      {!items || items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center shadow-xs flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400">
            <Plus size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No {title.toLowerCase()} details found</h3>
            <p className="text-sm text-slate-500 mt-1">Start by adding your first {title.toLowerCase()} record.</p>
          </div>
          {addPath && (
            <button
              onClick={() => navigate(addPath)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] hover:bg-[#002045] text-white text-sm font-bold rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              Add {buttonLabel}
            </button>
          )}
        </div>
      ) : (
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
                    {(() => {
                      const href = certVal ? fileUrl(certVal) : null;
                      return href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#1a365d] hover:text-[#002045] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-all active:scale-95"
                        >
                          <FileText size={14} />
                          View Document
                        </a>
                      ) : null
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
