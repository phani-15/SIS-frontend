import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";

export default function Placement({ onAdd }) {
  const [placement, setPlacement] = useState({
    jobRole: "",
    companyEmployerName: "",
    package: "",
    dateOfSelectionAppointmentOffer: "",
    appointmentLetterReferenceNumber: "",
    offerLetter: null,
  });

  const [errors, setErrors] = useState({});

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

    if (onAdd) {
      onAdd(payload);
    } else {
      console.log("Placement payload:", payload);
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Placement Details
      </h2>
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
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Placement
        </button>
      </form>
    </div>
  );
}
