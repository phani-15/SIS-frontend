import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function coCurricular() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [coCurricular, setcoCurricular] = useState({
    activityType: "",
    otherType: "",
    eventName: "",
    eventLevel: "",
    eventDate: "",
    organizationName: "",
    awardRecieved: "",
    awardName: "",
    certificate: null,
  });

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const typeKey = "coCurricular";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "coCurricularActivities details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add coCurricularActivities information." });
    } finally {
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setcoCurricular((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!coCurricular.activityType) {
      newErrors.activityType = "Activity type is required";
    } else {
      if (coCurricular.activityType==="others" && !coCurricular.otherType.trim())
        newErrors.otherType = "Activity type is required"
    }

    if (!coCurricular.eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    if (!coCurricular.eventLevel) {
      newErrors.eventLevel = "Event level is required";
    }

    if (!coCurricular.eventDate) {
      newErrors.eventDate = "Event date is required";
    }else {
      const eventate = new Date(coCurricular.eventDate);
      const today = new Date();

      // Ignore the current time
      today.setHours(0, 0, 0, 0);

      if (eventate > today) {
        newErrors.eventDate = "Date cannot be in the future";
      }
    }

    if (!coCurricular.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    if (!coCurricular.awardRecieved) {
      newErrors.awardRecieved = "Please specify if an award was received";
    } else if (coCurricular.awardRecieved === "true") {
      if (!coCurricular.awardName.trim()) {
        newErrors.awardName = "Award name is required";
      }
    }

    if (!coCurricular.certificate) {
      newErrors.certificate = "Certificate file is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(coCurricular.certificate.type)) {
        newErrors.certificate = "Only PDF, JPG, or PNG files are allowed";
      } else if (coCurricular.certificate.size > maxSizeMB * 1024 * 1024) {
        newErrors.certificate = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    activityType: coCurricular.activityType === 'others' ? coCurricular.otherType : coCurricular.activityType,
    eventName: coCurricular.eventName.trim(),
    eventLevel: coCurricular.eventLevel,
    eventDate: coCurricular.eventDate,
    organizationName: coCurricular.organizationName.trim(),
    awardReceived: coCurricular.awardRecieved === "true",
    awardName: coCurricular.awardRecieved === "true" ? coCurricular.awardName.trim() : "",
    certificate: coCurricular.certificate,
  });

  const resetForm = () => {
    setcoCurricular({
      activityType: "",
      eventName: "",
      eventLevel: "",
      eventDate: "",
      organizationName: "",
      awardRecieved: "",
      awardName: "",
      certificate: null,
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
      console.log("coCurricular payload:", payload);
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
          Co-Curricular Activities Details
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
            label="Activity Type"
            name="activityType"
            value={coCurricular.activityType}
            onChange={handleChange}
            options={["Workshop", "FDP Participation", "Seminar", "Conferences", "Hackathons", "Coding competitions", "Webinars", "others"]}
            error={errors.activityType}
          />

          {coCurricular.activityType === 'others' &&
            <InputField
              label="Event Type(others)"
              name="otherType"
              value={coCurricular.otherType}
              onChange={handleChange}
              error={errors.otherType}
            />
          }

          <InputField
            label="Event Name"
            name="eventName"
            value={coCurricular.eventName}
            onChange={handleChange}
            error={errors.eventName}
          />

          <SelectField
            label="Event Level"
            name="eventLevel"
            value={coCurricular.eventLevel}
            onChange={handleChange}
            options={["Institutional", "State", "National", "International"]}
            error={errors.eventLevel}
          />

          <InputField
            label="Event Date"
            name="eventDate"
            type="date"
            value={coCurricular.eventDate}
            onChange={handleChange}
            error={errors.eventDate}
          />

          <InputField
            label="Organization Name"
            name="organizationName"
            value={coCurricular.organizationName}
            onChange={handleChange}
            error={errors.organizationName}
          />

          <div>
            <div className="flex flex-col text-left space-y-2 mt-4">
              <label className="text-gray-700 font-medium">Award Received?</label>
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="awardRecieved"
                    value="true"
                    checked={coCurricular.awardRecieved === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="awardRecieved"
                    value="false"
                    checked={coCurricular.awardRecieved === "false"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.awardRecieved && (
                <small className="text-red-600 text-sm mt-1">{errors.awardRecieved}</small>
              )}
            </div>
            {coCurricular.awardRecieved === "true" && (
              <div className="">
                <InputField
                  label="Award Name"
                  name="awardName"
                  value={coCurricular.awardName}
                  onChange={handleChange}
                  error={errors.awardName}
                />
              </div>
            )}</div>

          <div className="md:col-span-2">
            <FileField
              label="Certificate"
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
          {loading ? "Adding..." : "Add Activity"}
        </button>
      </form>
    </div>
  );
}
