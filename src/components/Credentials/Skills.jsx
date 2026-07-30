import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Cpu, Plus, Sparkles, X } from "lucide-react";
import { addSkills } from "../../core/user";

export default function Skills({ items = [], onSkillAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const handleAddSkill = async () => {
    const trimmed = newSkill.trim();
    if (!trimmed) {
      setError("Skill name is required");
      return;
    }
    const exists = skillList.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setError("Skill already exists");
      return;
    }
    setAdding(true);
    setError("");
    try {
      await addSkills(trimmed);
      setNewSkill("");
      setShowModal(false);
      if (onSkillAdded) onSkillAdded();
    } catch (err) {
      setError(err.message || "Failed to add skill");
    } finally {
      setAdding(false);
    }
  };

  const skillList = items
    .map((item) => {
      if (typeof item === "string") return item;
      return item.skill || item.name || "";
    })
    .filter(Boolean);

  return (
    <div className="w-full bg-white rounded-2xl border border-blue-100 shadow-sm shadow-blue-900/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-6 py-5 bg-gradient-to-r from-[#0B1F3D] to-[#1E3A8A]">
        <div className="flex items-center gap-2">
          <h2 className="text-white font-semibold text-lg tracking-tight">Skills</h2>
          <span className="text-[11px] font-medium text-blue-100 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
            {skillList.length} {skillList.length === 1 ? "Skill" : "Skills"}
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-[#0B1F3D] bg-white hover:bg-blue-50 active:scale-[0.97] transition-all duration-150 px-3.5 py-1.5 rounded-lg shadow-sm"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Skill
        </button>
      </div>

      {/* Body */}
      {skillList.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-14 px-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 mb-4">
            <Cpu size={28} className="text-[#2554C7]" strokeWidth={1.75} />
          </div>
          <h3 className="text-slate-800 font-semibold text-base">No skill details found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-xs">
            Start by adding your first skill record to showcase your expertise.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 mt-5 text-sm font-medium text-white bg-[#2554C7] hover:bg-[#1E3A8A] active:scale-[0.97] transition-all duration-150 px-4 py-2 rounded-lg shadow-sm shadow-blue-900/20"
          >
            <Plus size={16} />
            Add Skill
          </button>
        </div>
      ) : (
        <div className="px-6 py-5">
          {/* Expertise banner */}
          <div className="flex items-start gap-3 mb-5 pb-5 border-b border-blue-100">
            <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2554C7] to-[#5B7FBD] shadow-sm shadow-blue-900/20">
              <Cpu size={20} className="text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-slate-800 font-semibold text-sm">My Expertise</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Core technologies and domains of profile.
              </p>
            </div>
          </div>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2.5">
            {skillList.map((skill, index) => (
              <span
                key={index}
                className="group relative flex items-center gap-1.5 text-sm font-medium text-[#1E3A8A] bg-blue-50 hover:bg-white border border-blue-100 hover:border-[#2554C7]/40 px-3.5 py-1.5 rounded-full transition-all duration-200 hover:shadow-md hover:shadow-blue-900/10 hover:-translate-y-0.5 cursor-default"
              >
                <Sparkles
                  size={12}
                  className="text-[#5B7FBD] group-hover:text-[#2554C7] transition-colors"
                  strokeWidth={2}
                />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {showModal && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-blue-100">
                <h3 className="text-base font-semibold text-slate-800">Add Skill</h3>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setNewSkill(""); setError(""); }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="px-5 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Skill Name</label>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => { setNewSkill(e.target.value); setError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddSkill(); }}
                    placeholder="e.g. React, Python, Data Structures"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors ${error
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    autoFocus
                  />
                  {error && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setNewSkill(""); setError(""); }}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    disabled={adding}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#2554C7] hover:bg-[#1E3A8A] disabled:bg-blue-300 disabled:cursor-not-allowed text-sm font-medium text-white transition-colors cursor-pointer"
                  >
                    {adding ? "Adding..." : "Add Skill"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
        document.body
      )}
        </div>
      );
}