import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import { addCredential } from "../../core/user";

export default function Internship() {
  const [internship, setInternship] = useState({
    title: "",
    organizationCompanyName: "",
    industryMentor: "",
    facultyMentor: "",
    status: "Completed",
    startDate: "",
    endDate: "",
    isStipendBased: "",
    amount: "",
    certificate: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found. Please log in first.");
      }

      const typeKey = "internship";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "Internship details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add credential information." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setInternship((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleStatusToggle = (newStatus) => {
    setInternship((prev) => ({ ...prev, status: newStatus }));
  };

  const validate = () => {
    const newErrors = {};

    if (!internship.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!internship.organizationCompanyName.trim()) {
      newErrors.organizationCompanyName = "Organization/company name is required";
    }

    if (!internship.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (internship.status === "Completed") {
      if (!internship.endDate) {
        newErrors.endDate = "End date is required";
      } else if (internship.startDate && new Date(internship.endDate) < new Date(internship.startDate)) {
        newErrors.endDate = "End date cannot be before start date";
      }
    } else if (internship.endDate && internship.startDate && new Date(internship.endDate) < new Date(internship.startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (!internship.isStipendBased) {
      newErrors.isStipendBased = "Please select if the internship is stipend based";
    } else if (internship.isStipendBased === "yes") {
      if (!internship.amount.trim()) {
        newErrors.amount = "Stipend amount is required";
      } else {
        const amount = Number(internship.amount);
        if (isNaN(amount) || amount <= 0) {
          newErrors.amount = "Amount must be a positive number";
        }
      }
    }

    if (!internship.certificate) {
      newErrors.certificate = "Certificate file is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(internship.certificate.type)) {
        newErrors.certificate = "Only PDF, JPG, or PNG files are allowed";
      } else if (internship.certificate.size > maxSizeMB * 1024 * 1024) {
        newErrors.certificate = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const payload = new FormData();
    payload.append("title", internship.title.trim());
    payload.append("organizationCompanyName", internship.organizationCompanyName.trim());
    payload.append("industryMentor", internship.industryMentor.trim());
    payload.append("facultyMentor", internship.facultyMentor.trim());
    payload.append("status", internship.status);
    payload.append("startDate", internship.startDate);
    payload.append("endDate", internship.endDate);
    payload.append("amount", internship.isStipendBased === "yes" ? internship.amount.trim() : "");
    payload.append("certificate", internship.certificate);
    return payload;
  };

  const resetForm = () => {
    setInternship({
      title: "",
      organizationCompanyName: "",
      industryMentor: "",
      facultyMentor: "",
      status: "Completed",
      startDate: "",
      endDate: "",
      isStipendBased: "",
      amount: "",
      certificate: null,
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = buildPayload();

    if (handleAdd) {
      console.log(Object.fromEntries(payload.entries()));
      handleAdd(payload);
    } else {
      console.log("Internship payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <h2 className="text-xl font-bold text-blue-950">
          Internship Information
        </h2>

        {/* Status toggle */}
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium transition-colors ${internship.status === "Ongoing" ? "text-blue-950" : "text-gray-400"
              }`}
          >
            Ongoing
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={internship.status === "Completed"}
            onClick={() =>
              handleStatusToggle(internship.status === "Completed" ? "Ongoing" : "Completed")
            }
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${internship.status === "Completed" ? "bg-blue-950" : "bg-gray-300"
              }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${internship.status === "Completed" ? "translate-x-8" : "translate-x-1"
                }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${internship.status === "Completed" ? "text-blue-950" : "text-gray-400"
              }`}
          >
            Completed
          </span>
        </div>
      </div>

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
            label="Title"
            name="title"
            value={internship.title}
            onChange={handleChange}
            placeholder="Eg : Java Developer"
            error={errors.title}
          />

          <InputField
            label="Organization / Company Name"
            name="organizationCompanyName"
            value={internship.organizationCompanyName}
            onChange={handleChange}
            placeholder="Eg : Pennant Pvt. Ltd"
            error={errors.organizationCompanyName}
          />

          <InputField
            label="Industry Mentor"
            name="industryMentor"
            value={internship.industryMentor}
            onChange={handleChange}
          />

          <InputField
            label="Faculty Mentor"
            name="facultyMentor"
            value={internship.facultyMentor}
            onChange={handleChange}
          />

          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={internship.startDate}
            onChange={handleChange}
            error={errors.startDate}
          />

          <div
            className={`transition-opacity duration-300 ${internship.status === "Ongoing" ? "opacity-60" : "opacity-100"
              }`}
          >
            <InputField
              label="End Date"
              name="endDate"
              type="date"
              value={internship.endDate}
              onChange={handleChange}
              error={errors.endDate}
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Is stipend based?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="isStipendBased"
                  value="yes"
                  checked={internship.isStipendBased === "yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="isStipendBased"
                  value="no"
                  checked={internship.isStipendBased === "no"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
            {errors.isStipendBased && (
              <small className="text-red-600 text-sm mt-1">{errors.isStipendBased}</small>
            )}
          </div>

          <div
            className={`grid transition-all duration-300 ease-in-out ${internship.isStipendBased === "yes"
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <InputField
                label="Stipend Amount"
                name="amount"
                type="number"
                value={internship.amount}
                onWheel={(e) => e.target.blur()}
                onChange={handleChange}
                error={errors.amount}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <FileField
              label={internship.status === "Completed" ? "Internship Certificate" : "Offer Letter"}
              name="certificate"
              type="file"
              onChange={handleChange}
              error={errors.certificate}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium transition-colors w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Internship"}
        </button>
      </form>
    </div>
  );
}