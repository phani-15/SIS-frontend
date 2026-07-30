import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import {  addSkills } from "../../core/user";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Skills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState({
    skill: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAdd = async (payload) => {
      setLoading(true);
      setMessage(null);
      try {
        const typeKey = "skills";
  
        await addSkills([payload]);
        setMessage({ type: "success", text: "Skill details added successfully!" });
  
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(-1)
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: err.message || "Failed to add skill." });
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setSkills((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!skills.skill.trim()) {
      newErrors.skill = "Skill name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({ skill: skills.skill.trim() });

  const resetForm = () => {
    setSkills({
      skill: "",
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = buildPayload();

    if (handleAdd) {
      handleAdd(payload);
    } else {
      console.log("Skills payload:", payload);
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-950 transition-colors mb-4 cursor-pointer"
        >
          <ChevronLeft size={18} />
          Back
        </button>
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Skill Details
      </h2>
      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium transition-all ${message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
            }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <InputField
          label="Skill Name"
          name="skill"
          value={skills.skill}
          onChange={handleChange}
          error={errors.skill}
          placeholder="e.g. React, Python, Data Structures"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium transition-colors w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Skill"}
        </button>
      </form>
    </div>
  );
}
