import React, { useState } from "react";
import InputField from "../FormComponents/InputField";

export default function Skills({ onAdd }) {
  const [skills, setSkills] = useState({
    skill: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSkills((prev) => ({
      ...prev,
      [name]: value,
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

    if (onAdd) {
      onAdd(payload);
    } else {
      console.log("Skills payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Skill Details
      </h2>
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
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
}
