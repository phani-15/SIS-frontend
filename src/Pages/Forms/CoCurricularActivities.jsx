import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";

export default function coCurricular() {
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
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found. Please log in first.");
      }

      const typeKey = "coCurricular";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "coCurricularActivities details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
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
    } else if (coCurricular.awardRecieved === "Yes") {
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
    awardReceived: coCurricular.awardRecieved,
    awardName: coCurricular.awardRecieved === "Yes" ? coCurricular.awardName.trim() : "",
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
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Co-Curricular Activities Details
      </h2>
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
                    value="Yes"
                    checked={coCurricular.awardRecieved === "Yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="awardRecieved"
                    value="No"
                    checked={coCurricular.awardRecieved === "No"}
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
            {coCurricular.awardRecieved === "Yes" && (
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
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Activity
        </button>
      </form>
    </div>
  );
}
