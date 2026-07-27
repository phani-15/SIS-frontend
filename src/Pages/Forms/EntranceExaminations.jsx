import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import SelectField from "../FormComponents/SelectField";

export default function EntranceExaminations({ onAdd }) {
  const [entranceExaminations, setEntranceExaminations] = useState({
    examName: "",
    otherName:"",
    registarationHallTicketNumber: "",
    score: "",
    rank: "",
    percentile: "",
    yearOfExamination: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEntranceExaminations((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const validate = () => {
    const newErrors = {};

    if (!entranceExaminations.examName) {
      newErrors.examName = "Exam name is required";
    }

    if (!entranceExaminations.registarationHallTicketNumber.trim()) {
      newErrors.registarationHallTicketNumber = "Registration / hall ticket number is required";
    }

    if (!entranceExaminations.score.trim()) {
      newErrors.score = "Score is required";
    } else {
      const scoreVal = Number(entranceExaminations.score);
      if (isNaN(scoreVal) || scoreVal < 0) {
        newErrors.score = "Score must be a non-negative number";
      }
    }

    if (!entranceExaminations.rank.trim()) {
      newErrors.rank = "Rank is required";
    } else {
      const rankVal = Number(entranceExaminations.rank);
      if (isNaN(rankVal) || rankVal <= 0 || !Number.isInteger(rankVal)) {
        newErrors.rank = "Rank must be a positive integer";
      }
    }

    if (entranceExaminations.percentile.trim()) {
      const pct = Number(entranceExaminations.percentile);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        newErrors.percentile = "Percentile must be a number between 0 and 100";
      }
    }

    if (!entranceExaminations.yearOfExamination.trim()) {
      newErrors.yearOfExamination = "Year of examination is required";
    } else {
      const year = Number(entranceExaminations.yearOfExamination);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 2) {
        newErrors.yearOfExamination = "Please enter a valid 4-digit year";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    examName: entranceExaminations.examName === 'others' ? entranceExaminations.otherName : entranceExaminations.examName,
    registrationHallTicketNumber: entranceExaminations.registarationHallTicketNumber.trim(),
    score: entranceExaminations.score.trim(),
    rank: entranceExaminations.rank.trim(),
    percentile: entranceExaminations.percentile.trim(),
    yearOfExamination: entranceExaminations.yearOfExamination.trim(),
  });

  const resetForm = () => {
    setEntranceExaminations({
      examName: "",
      registarationHallTicketNumber: "",
      score: "",
      rank: "",
      percentile: "",
      yearOfExamination: "",
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
      console.log("EntranceExaminations payload:", payload);
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Entrance Examination Details
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <SelectField
            label="Exam Name"
            name="examName"
            value={entranceExaminations.examName}
            onChange={handleChange}
            options={["GATE", "GRE", "GMAT", "CAT", "TOEFL", "IELTS", "UGC-NET", "CSIR-NET", 'others']}
            error={errors.examName}
          />

          {entranceExaminations.examName === 'others' &&
            <InputField
              label="Name of Entrance Exam"
              name="otherName"
              value={entranceExaminations.otherName}
              onChange={handleChange}
              error={errors.otherName}
            />
          }

          <InputField
            label="Registration / Hall Ticket Number"
            name="registarationHallTicketNumber"
            value={entranceExaminations.registarationHallTicketNumber}
            onChange={handleChange}
            error={errors.registarationHallTicketNumber}
          />
          <InputField
            label="Score"
            name="score"
            value={entranceExaminations.score}
            onChange={handleChange}
            error={errors.score}
          />

          <InputField
            label="Rank secured"
            name="rank"
            value={entranceExaminations.rank}
            onChange={handleChange}
            error={errors.rank}
          />

          <InputField
            label="Percentile"
            name="percentile"
            value={entranceExaminations.percentile}
            onChange={handleChange}
            error={errors.percentile}
          />

          <InputField
            label="Year of Examination"
            name="yearOfExamination"
            value={entranceExaminations.yearOfExamination}
            onChange={handleChange}
            error={errors.yearOfExamination}
            placeholder="e.g. 2024"
          />
        </div>

        <button
          type="submit"
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Examination
        </button>
      </form>
    </div>
  );
}
