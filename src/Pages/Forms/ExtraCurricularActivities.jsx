import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function extraCurricular() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [extraCurricular, setextraCurricular] = useState({
    eventType: "",
    otherType: "",
    eventName: "",
    eventLevel: "",
    dateOfEvent: "",
    organizationName: "",
    prizeRecieved: "",
    prizeNameIfYes: "",
    certificate: null,
  });

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const typeKey = "extraCurricular";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "Extra-curricular activity details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add extra-curricular activity information." });
    } finally {
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setextraCurricular((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!extraCurricular.eventType) {
      newErrors.eventType = "Event type is required";
    }

    if (extraCurricular.eventType === 'others' && !extraCurricular.otherType)
      newErrors.otherType = "Event Type is required"

    if (!extraCurricular.eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    if (!extraCurricular.eventLevel) {
      newErrors.eventLevel = "Event level is required";
    }

    if (!extraCurricular.dateOfEvent) {
      newErrors.dateOfEvent = "Date of event is required";
    } else {
      const eventDate = new Date(extraCurricular.dateOfEvent);
      const today = new Date();

      // Ignore the current time
      today.setHours(0, 0, 0, 0);

      if (eventDate > today) {
        newErrors.dateOfEvent = "Date cannot be in the future";
      }
    }

    if (!extraCurricular.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    if (!extraCurricular.prizeRecieved) {
      newErrors.prizeRecieved = "Please specify if a prize was received";
    } else if (extraCurricular.prizeRecieved === "Yes") {
      if (!extraCurricular.prizeNameIfYes.trim()) {
        newErrors.prizeNameIfYes = "Prize name is required";
      }
    }

    if (!extraCurricular.certificate) {
      newErrors.certificate = "Certificate file is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(extraCurricular.certificate.type)) {
        newErrors.certificate = "Only PDF, JPG, or PNG files are allowed";
      } else if (extraCurricular.certificate.size > maxSizeMB * 1024 * 1024) {
        newErrors.certificate = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    eventType: extraCurricular.eventType === 'others' ? extraCurricular.otherType : extraCurricular.eventType,
    eventName: extraCurricular.eventName.trim(),
    eventLevel: extraCurricular.eventLevel,
    dateOfEvent: extraCurricular.dateOfEvent,
    organizationName: extraCurricular.organizationName.trim(),
    prizeReceived: extraCurricular.prizeRecieved,
    prizeNameIfYes: extraCurricular.prizeRecieved === "Yes" ? extraCurricular.prizeNameIfYes.trim() : "",
    certificate: extraCurricular.certificate,
  });

  const resetForm = () => {
    setextraCurricular({
      eventType: "",
      otherType: "",
      eventName: "",
      eventLevel: "",
      dateOfEvent: "",
      organizationName: "",
      prizeRecieved: "",
      prizeNameIfYes: "",
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
      console.log("extraCurricular payload:", payload);
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
          Extra Curricular Activities Details
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
            label="Event Type"
            name="eventType"
            value={extraCurricular.eventType}
            onChange={handleChange}
            options={["Sports", "Cultural Activities", "NSS", "NCC", "others"]}
            error={errors.eventType}
          />

          {
            extraCurricular.eventType === 'others' &&

            <InputField
              label="Event Type(others)"
              name="otherType"
              value={extraCurricular.otherType}
              onChange={handleChange}
              error={errors.otherType}
            />
          }
          <InputField
            label="Event Name"
            name="eventName"
            value={extraCurricular.eventName}
            onChange={handleChange}
            error={errors.eventName}
          />

          <SelectField
            label="Event Level"
            name="eventLevel"
            value={extraCurricular.eventLevel}
            onChange={handleChange}
            options={["Institutional", "State", "National", "International"]}
            error={errors.eventLevel}
          />

          <InputField
            label="Date of Event"
            name="dateOfEvent"
            type="date"
            value={extraCurricular.dateOfEvent}
            onChange={handleChange}
            error={errors.dateOfEvent}
          />

          <InputField
            label="Organization Name"
            name="organizationName"
            value={extraCurricular.organizationName}
            onChange={handleChange}
            error={errors.organizationName}
          />

            <div className="flex flex-col text-left space-y-2 mt-4">
              <label className="text-gray-700 font-medium">Prize Received?</label>
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="prizeRecieved"
                    value="Yes"
                    checked={extraCurricular.prizeRecieved === "Yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="prizeRecieved"
                    value="No"
                    checked={extraCurricular.prizeRecieved === "No"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.prizeRecieved && (
                <small className="text-red-600 text-sm mt-1">{errors.prizeRecieved}</small>
              )}

            {extraCurricular.prizeRecieved === "Yes" && (
              <div className="">
                <InputField
                  label="Prize Name"
                  name="prizeNameIfYes"
                  value={extraCurricular.prizeNameIfYes}
                  onChange={handleChange}
                  error={errors.prizeNameIfYes}
                />
              </div>
            )}
          </div>

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
