import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addEntry, addSkills } from '../core/user';
import { NotebookPen, ShieldCheck, Sparkles } from 'lucide-react';

import Internship from './Forms/Internship';
import Competitions from './Forms/Competitions';
import Placement from './Forms/Placement';
import Certification from './Forms/Certification';
import ExtraCurricularActivities from './Forms/ExtraCurricularActivities';
import CoCurricularActivities from './Forms/CoCurricularActivities';
import ProfessionalBodies from './Forms/ProfessionalBodies';
import Skills from './Forms/Skills';
import JournalPublication from './Forms/JournalPublication';
import ConferencePaper from './Forms/ConferencePaper';
import Patent from './Forms/Patent';
import Scholarships from './Forms/Scholarships';
import EntranceExaminations from './Forms/EntranceExaminations';
import Projects from './Forms/Projects';

export const credentialTypes = {
  "Internship" : "internship",
  "Competitions":"competition",
  "Placement":"placement",
  "Projects":"project",
  "Certification":"certification",
  "Extra Curricular Activities" :"extraCurricular",
  "Co-Curricular Activities":"coCurricular",
  "Professional Bodies" :"professionalBody",
  "Skills" :"skills",
  "Journal Publication":"journalPublication",
  "Conference Paper":"conferencePaper",
  "Patent":"patent",
  "Scholarships":"scholarship",
  "Entrance Examinations":"entranceExam"
};

export default function AddCreds() {
  const location = useLocation();

  const types = [
    "Internship", "Competitions", "Placement", "Projects", "Certification",
    "Extra Curricular Activities", "Co-Curricular Activities", "Professional Bodies",
    "Skills", "Journal Publication", "Conference Paper", "Patent", "Scholarships",
    "Entrance Examinations"
  ];

  const [type, setType] = useState(location.state?.type || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  return (
    <div className="sis-page-shell flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-4xl sis-panel">
        <div className="p-8 lg:p-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-sm">
              <NotebookPen size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[var(--primary)]">Add credentials</h1>
              <p className="text-sm text-[var(--on-surface-variant)]">Capture new academic, skill, or achievement details with confidence.</p>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="sis-accent-pill"><Sparkles size={15} /> Guided entry</span>
            <span className="sis-accent-pill"><ShieldCheck size={15} /> Secure submission</span>
          </div>

          <div className="rounded-2xl border border-[var(--outline-variant)]/60 bg-[var(--surface-container-low)] p-5 shadow-sm">
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-[var(--on-surface)]" htmlFor="type">
                Select Credential type
              </label>
              <div className="flex flex-wrap gap-3">
                {types.map((t) => (
                  <p
                    key={t}
                    onClick={() => {
                      setType(t);
                      setMessage(null);
                    }}
                    className={`px-4 py-2 border text-sm font-medium transition-all hover:scale-[1.02] hover:shadow-sm ${
                      type === t
                        ? "bg-blue-950 text-white border-blue-950"
                        : "bg-white text-gray-700 border-gray-300 border-dashed"
                    } hover:cursor-pointer rounded-3xl`}
                  >
                    {t}
                  </p>
                ))}
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium border ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}>
                {message.text}
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-8 text-blue-950 font-medium">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-950 mr-3"></div>
                Saving credentials details...
              </div>
            )}

            {!loading && (
              <>
                {type === "Internship" && <Internship   />}
                {type === "Competitions" && <Competitions   />}
                {type === "Placement" && <Placement   />}
                {type === "Certification" && <Certification   />}
                {type === "Extra Curricular Activities" && <ExtraCurricularActivities   />}
                {type === "Co-Curricular Activities" && <CoCurricularActivities   />}
                {type === "Professional Bodies" && <ProfessionalBodies   />}
                {type === "Skills" && <Skills   />}
                {type === "Journal Publication" && <JournalPublication   />}
                {type === "Conference Paper" && <ConferencePaper   />}
                {type === "Patent" && <Patent   />}
                {type === "Scholarships" && <Scholarships   />}
                {type === "Entrance Examinations" && <EntranceExaminations   />}
                {type === "Projects" && <Projects   />}

                {!type && (
                  <div className="text-center py-10 text-gray-500 font-medium bg-white border border-dashed border-gray-200 rounded-2xl">
                    Please select a credential type above to display the corresponding form.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
