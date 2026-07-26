import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";

export default function extraCurricular() {
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

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found. Please log in first.");
      }

      const typeKey = "extraCurricular";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "extraCurricularActivities details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add extraCurricularActivities information." });
    } finally {
      setLoading(false);
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

  const buildPayload = () => {
    const payload = new FormData();
    payload.append("event type", extraCurricular.eventType === 'others' ? extraCurricular.otherType : extraCurricular.eventType);
    payload.append("event name", extraCurricular.eventName.trim());
    payload.append("event level", extraCurricular.eventLevel);
    payload.append("date of event", extraCurricular.dateOfEvent);
    payload.append("organization name", extraCurricular.organizationName.trim());
    payload.append("prize recieved", extraCurricular.prizeRecieved);
    payload.append("prize name(if yes)", extraCurricular.prizeRecieved === "Yes" ? extraCurricular.prizeNameIfYes.trim() : "");
    payload.append("certificate", extraCurricular.certificate);
    return payload;
  };

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
      handleAdd(payload, extraCurricular);
    } else {
      console.log("extraCurricular payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Extra Curricular Activities Details
      </h2>
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
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Activity
        </button>
      </form>
    </div>
  );
}
