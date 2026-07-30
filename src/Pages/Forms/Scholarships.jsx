import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import SelectField from "../FormComponents/SelectField";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function Scholarships() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [scholarships, setScholarships] = useState({
    nameOfScholarship: "",
    otherName: "",
    amountSanctioned: "",
    academicYear: "",
  });

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const typeKey = "scholarships";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "Scholarship details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add scholarship information." });
    } finally {
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setScholarships((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!scholarships.nameOfScholarship) {
      newErrors.nameOfScholarship = "Scholarship name is required";
    } else {
      if (scholarships.nameOfScholarship === 'others' && !scholarships.otherName) {
        newErrors.otherName = "Scholarship name is required"
      }
    }

    if (!scholarships.amountSanctioned.trim()) {
      newErrors.amountSanctioned = "Amount sanctioned is required";
    } else {
      const amt = Number(scholarships.amountSanctioned);
      if (isNaN(amt) || amt <= 0) {
        newErrors.amountSanctioned = "Amount must be a positive number";
      }
    }

    const academicYear = String(scholarships.academicYear).trim();

    if (!academicYear) {
      newErrors.academicYear = "Academic year is required";
    } else if (!/^\d{4}(-\d{4})?$/.test(academicYear)) {
      newErrors.academicYear =
        "Use format YYYY or YYYY-YYYY (e.g. 2023-2024)";
    } else {
      const currentYear = new Date().getFullYear();
      const currentAcademicStart =
        new Date().getMonth() >= 6 ? currentYear : currentYear - 1;

      if (academicYear.includes("-")) {
        const [start, end] = academicYear.split("-").map(Number);

        if (end !== start + 1) {
          newErrors.academicYear =
            "Academic year should be consecutive.";
        } else if (start > currentAcademicStart) {
          newErrors.academicYear =
            "Academic year cannot be in the future.";
        }
      } else {
        const year = Number(academicYear);

        if (year > currentAcademicStart) {
          newErrors.academicYear =
            "Academic year cannot be in the future.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    nameOfScholarship: scholarships.nameOfScholarship === 'others' ? scholarships.otherName : scholarships.nameOfScholarship,
    amountSanctioned: scholarships.amountSanctioned.trim(),
    academicYear: scholarships.academicYear.trim(),
  });

  const resetForm = () => {
    setScholarships({
      nameOfScholarship: "",
      otherName: "",
      amountSanctioned: "",
      academicYear: "",
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
      console.log("Scholarships payload:", payload);
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
          Scholarship Details
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <SelectField
            label="Name of Scholarship"
            name="nameOfScholarship"
            value={scholarships.nameOfScholarship}
            onChange={handleChange}
            options={["Govt. Scholarship", "NSP", "AICTE ", "Merit", "PM Scholarship", "others"]}
            error={errors.nameOfScholarship}
          />

          {scholarships.nameOfScholarship === "others" &&
            <InputField
              label="Name of Scholarship(others)"
              name="otherName"
              value={scholarships.otherName}
              onChange={handleChange}
              error={errors.otherName}
            />
          }

          <InputField
            label="Amount Sanctioned"
            name="amountSanctioned"
            value={scholarships.amountSanctioned}
            onChange={handleChange}
            error={errors.amountSanctioned}
            placeholder="e.g. 50000"
          />

          <InputField
            label="Academic Year"
            name="academicYear"
            value={scholarships.academicYear}
            onChange={handleChange}
            error={errors.academicYear}
            placeholder="e.g. 2023-2024"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium transition-colors w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Scholarship"}
        </button>
      </form>
    </div>
  );
}
