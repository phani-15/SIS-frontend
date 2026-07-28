import React from 'react';
import { Cpu, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Skills({ items = [] }) {
  const navigate = useNavigate();

  // Support either plain strings or objects
  const skillList = items ? items.map(item => {
    if (typeof item === 'string') return item;
    return item.skill || item.name || "";
  }).filter(Boolean) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 font-comfortaa">Skills</h2>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
            {skillList.length} {skillList.length === 1 ? 'Skill' : 'Skills'}
          </span>
          <button 
            onClick={() => navigate('/student/profile/addskills')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] hover:bg-[#002045] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Plus size={14} />
            Add Skill
          </button>
        </div>
      </div>

      {skillList.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center shadow-xs flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400">
            <Cpu size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No skill details found</h3>
            <p className="text-sm text-slate-500 mt-1">Start by adding your first skill record.</p>
          </div>
          <button
            onClick={() => navigate('/student/profile/addskills')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] hover:bg-[#002045] text-white text-sm font-bold rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            Add Skill
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2.5 bg-slate-50 rounded-xl text-blue-900">
              <Cpu size={24} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">My Expertise</h3>
              <p className="text-sm text-slate-500">Core technologies and domains added to profile.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {skillList.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 rounded-2xl hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all duration-300 shadow-3xs cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
