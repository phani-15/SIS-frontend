import React from 'react';
import { Code, Calendar, Users, Award, ShieldCheck } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function Projects({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Projects"
      items={items}
      addPath="/student/profile/addproject"
      badgeText={(item) => item.projectStatus || item.status || 'Completed'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-indigo-600">
              <Code size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.projectTitle || item.title || "Project Title"}</h3>
              <p className="text-sm font-semibold text-slate-500">
                {item.projectType || item.type || "Mini Project"} • {item.projectDomain || item.domain || "General"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Academic Year</span>
              <span className="text-slate-700 font-semibold">{item.academicYear || item.year || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Faculty Guide</span>
              <span className="text-slate-700 font-semibold">{item.facultyGuide || "N/A"}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Team Size & Mentor</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Users size={14} className="text-slate-400" />
                {item.teamSize ? `${item.teamSize} members` : 'Individual'} {item.externalMentor ? `(Ext: ${item.externalMentor})` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Duration</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {item.startDate || 'N/A'} {item.endDate ? `to ${item.endDate}` : ''}
              </span>
            </div>
            <div className="text-sm sm:col-span-2">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Technologies Used</span>
              <span className="text-slate-700 font-semibold bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 text-xs inline-block mt-0.5">
                {item.technologiesUsed || "N/A"}
              </span>
            </div>
            {item.description && (
              <div className="text-sm sm:col-span-2">
                <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Description</span>
                <span className="text-slate-600 font-medium">{item.description}</span>
              </div>
            )}
            <div className="text-sm sm:col-span-2 flex flex-wrap gap-3 mt-1">
              {item.industrySponsored === 'yes' && (
                <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold rounded-md">
                  Industry Sponsored ({item.industryName || 'N/A'} • ₹{item.amountSanctioned || '0'})
                </span>
              )}
              {item.prototypeDeveloped === 'Yes' && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-md">
                  Prototype Developed
                </span>
              )}
              {item.patentFiled === 'Yes' && (
                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold rounded-md">
                  Patent Filed
                </span>
              )}
              {item.publicationGenerated === 'Yes' && (
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded-md">
                  Publication Generated
                </span>
              )}
              {item.awardRecieved === 'Yes' && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded-md flex items-center gap-0.5">
                  <Award size={10} />
                  Award: {item.awardName || 'Winner'}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    />
  );
}
