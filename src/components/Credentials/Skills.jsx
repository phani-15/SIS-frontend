import React from 'react';
import { Cpu } from 'lucide-react';

export default function Skills({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500 font-medium shadow-sm">
        No skill details found.
      </div>
    );
  }

  // Support either plain strings or objects
  const skillList = items.map(item => {
    if (typeof item === 'string') return item;
    return item.skill || item.name || "";
  }).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 font-comfortaa">Skills</h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
          {skillList.length} {skillList.length === 1 ? 'Skill' : 'Skills'}
        </span>
      </div>

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
    </div>
  );
}
