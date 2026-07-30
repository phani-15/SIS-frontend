import React from 'react';
import { Briefcase, Calendar, DollarSign, FileText, Plus } from 'lucide-react';
import { fileUrl, formatDate } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function Internship({ items = [] }) {

  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 font-comfortaa">Internships</h2>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
            {items.length} {items.length === 1 ? 'Entry' : 'Entries'}
          </span>
          <button 
            onClick={() => navigate('/student/profile/addinternship')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] hover:bg-[#002045] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Plus size={14} />
            Add Internship
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center shadow-xs flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400">
            <Briefcase size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No internship details found</h3>
            <p className="text-sm text-slate-500 mt-1">Start by adding your first internship record.</p>
          </div>
          <button
            onClick={() => navigate('/student/profile/addinternship')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] hover:bg-[#002045] text-white text-sm font-bold rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            Add Internship
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-full w-1.5 bg-[#1a365d] transition-all group-hover:w-2"></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-slate-50 rounded-xl text-[#1a365d]">
                      <Briefcase size={20} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{item.title || "Internship"}</h3>
                      <p className="text-sm font-semibold text-slate-500">{item.organizationCompanyName || item.organization || "N/A"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
                    <div className="text-sm">
                      <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Industry Mentor</span>
                      <span className="text-slate-700 font-semibold">{item.industryMentor || "N/A"}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Faculty Mentor</span>
                      <span className="text-slate-700 font-semibold">{item.facultyMentor || "N/A"}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Duration</span>
                      <span className="text-slate-700 font-semibold flex items-center gap-1">
                        <Calendar size={14} className="text-slate-400" />
                        {formatDate(item.startDate)} {item.endDate ? `to ${formatDate(item.endDate)}` : '(Ongoing)'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-400 font-medium block block text-xs uppercase tracking-wider">Stipend Details</span>
                      <span className="text-slate-700 font-semibold flex items-center gap-0.5">
                        {item.isStipendBased === 'yes' || item.stipend === 'Yes' || (item.amount && Number(item.amount) > 0) ? (
                          <>
                            <DollarSign size={14} className="text-green-600" />
                            <span className="text-green-700">Stipend: ₹{item.amount || 'N/A'}</span>
                          </>
                        ) : (
                          <span className="text-slate-500">Unpaid / No Stipend</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    item.status === 'Completed' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {item.status || "Completed"}
                  </span>

                  {(() => {
                    const certVal = item.certificate || item.certificateFile || item.document;
                    const href = certVal ? fileUrl(certVal) : null;
                    return href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#1a365d] hover:text-[#002045] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-all active:scale-95"
                      >
                        <FileText size={14} />
                        View Certificate
                      </a>
                    ) : null
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
