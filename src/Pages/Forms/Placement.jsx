import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function Placement() {
  const navigate = useNavigate();
  const [placement, setPlacement] = useState({
    jobRole: "",
    companyEmployerName: "",
    package: "",
    dateOfSelectionAppointmentOffer: "",
    appointmentLetterReferenceNumber: "",
    offerLetter: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setPlacement((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!placement.jobRole.trim()) {
      newErrors.jobRole = "Job role is required";
    }

    if (!placement.companyEmployerName.trim()) {
      newErrors.companyEmployerName = "Company/employer name is required";
    }

    if (!placement.package.trim()) {
      newErrors.package = "Package (salary package) is required";
    } else {
      const pkg = Number(placement.package);
      if (isNaN(pkg) || pkg <= 0) {
        newErrors.package = "Package must be a positive number";
      }
    }

    if (!placement.dateOfSelectionAppointmentOffer) {
      newErrors.dateOfSelectionAppointmentOffer = "Date of selection/appointment/offer is required";
    }

    if (!placement.offerLetter) {
      newErrors.offerLetter = "Offer letter is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(placement.offerLetter.type)) {
        newErrors.offerLetter = "Only PDF, JPG, or PNG files are allowed";
      } else if (placement.offerLetter.size > maxSizeMB * 1024 * 1024) {
        newErrors.offerLetter = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    jobRole: placement.jobRole.trim(),
    companyEmployerName: placement.companyEmployerName.trim(),
    package: placement.package.trim(),
    dateOfSelectionAppointmentOffer: placement.dateOfSelectionAppointmentOffer,
    appointmentLetterReferenceNumber: placement.appointmentLetterReferenceNumber.trim(),
    offerLetter: placement.offerLetter,
  });

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const typeKey = "placement";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "Placement details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add Placement information." });
    } finally {
      setLoading(false);
    }
  };  

  const resetForm = () => {
    setPlacement({
      jobRole: "",
      companyEmployerName: "",
      package: "",
      dateOfSelectionAppointmentOffer: "",
      appointmentLetterReferenceNumber: "",
      offerLetter: null,
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
      console.log("Placement payload:", payload);
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
          Placement Details
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
          <InputField
            label="Job Role"
            name="jobRole"
            value={placement.jobRole}
            onChange={handleChange}
            error={errors.jobRole}
          />

          <InputField
            label="Company/Employer Name"
            name="companyEmployerName"
            value={placement.companyEmployerName}
            onChange={handleChange}
            error={errors.companyEmployerName}
          />

          <InputField
            label="Package (LPA)"
            name="package"
            type="number"
            onWheel={(e) => e.target.blur()}
            value={placement.package}
            onChange={handleChange}
            error={errors.package}
          />

          <InputField
            label="Date of Selection/Appointment/Offer"
            name="dateOfSelectionAppointmentOffer"
            type="date"
            value={placement.dateOfSelectionAppointmentOffer}
            onChange={handleChange}
            error={errors.dateOfSelectionAppointmentOffer}
          />

          <div className="md:col-span-2">
            <InputField
              label="Appointment Letter Reference Number"
              name="appointmentLetterReferenceNumber"
              value={placement.appointmentLetterReferenceNumber}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <FileField
              label="Offer Letter"
              name="offerLetter"
              type="file"
              onChange={handleChange}
              error={errors.offerLetter}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium transition-colors w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Placement"}
        </button>
      </form>
    </div>
  );
}
