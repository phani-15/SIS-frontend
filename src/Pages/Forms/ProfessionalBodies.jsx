import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function ProfessionalBodies() {
  const navigate = useNavigate();
  const [professionalBodies, setProfessionalBodies] = useState({
    nameOfProfessionalBody: "",
    otherName: "",
    membershipId: "",
    validTill: "",
    membershipCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setProfessionalBodies((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const typeKey = "professionalBodies";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "Professional body details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add professional body information." });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!professionalBodies.nameOfProfessionalBody) {
      newErrors.nameOfProfessionalBody = "Professional body name is required";
    } else {
      if (professionalBodies.nameOfProfessionalBody === 'others' && !professionalBodies.otherName.trim()) {
        newErrors.otherName = " Name of the Professional Body is required"
      }
    }

    if (!professionalBodies.membershipId.trim()) {
      newErrors.membershipId = "Membership ID is required";
    }

    if (!professionalBodies.validTill) {
      newErrors.validTill = "Validity date is required";
    }

    if (!professionalBodies.membershipCertificate) {
      newErrors.membershipCertificate = "Membership certificate file is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(professionalBodies.membershipCertificate.type)) {
        newErrors.membershipCertificate = "Only PDF, JPG, or PNG files are allowed";
      } else if (professionalBodies.membershipCertificate.size > maxSizeMB * 1024 * 1024) {
        newErrors.membershipCertificate = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    nameOfProfessionalBody: professionalBodies.nameOfProfessionalBody === 'others' ? professionalBodies.otherName : professionalBodies.nameOfProfessionalBody,
    membershipId: professionalBodies.membershipId.trim(),
    validTill: professionalBodies.validTill,
    membershipCertificate: professionalBodies.membershipCertificate,
  });

  const resetForm = () => {
    setProfessionalBodies({
      nameOfProfessionalBody: "",
      membershipId: "",
      validTill: "",
      membershipCertificate: null,
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
      console.log("ProfessionalBodies payload:", payload);
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
          Professional Bodies Membership
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
            label="Name of Professional Body"
            name="nameOfProfessionalBody"
            value={professionalBodies.nameOfProfessionalBody}
            onChange={handleChange}
            options={["IEEE", "ACM", "CSI", "ISTE", "IE", "IEM", "IEI", "others"]}
            error={errors.nameOfProfessionalBody}
          />

          {professionalBodies.nameOfProfessionalBody === 'others' &&

            <InputField
              label="Name of the Professional Body(others)"
              name="otherName"
              value={professionalBodies.otherName}
              onChange={handleChange}
              error={errors.otherName}
            />
          }

          <InputField
            label="Membership ID"
            name="membershipId"
            value={professionalBodies.membershipId}
            onChange={handleChange}
            error={errors.membershipId}
          />

          <InputField
            label="Valid Till"
            name="validTill"
            type="date"
            value={professionalBodies.validTill}
            onChange={handleChange}
            error={errors.validTill}
          />

          <div className="md:col-span-2">
            <FileField
              label="Membership Certificate"
              name="membershipCertificate"
              type="file"
              onChange={handleChange}
              error={errors.membershipCertificate}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium transition-colors w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Professional Body"}
        </button>
      </form>
    </div>
  );
}
