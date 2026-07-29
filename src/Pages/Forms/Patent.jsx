import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";

export default function Patent() {
  const [patent, setPatent] = useState({
    patentNumber: "",
    titleOfThePatent: "",
    publishedGranted: "",
    yearOfPublishedGranted: "",
    scope: "",
    document: null,
  });

  const [errors, setErrors] = useState({});

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found. Please log in first.");
      }

      const typeKey = "patent";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "patent details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add patent information." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setPatent((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!patent.patentNumber.trim()) {
      newErrors.patentNumber = "Patent number is required";
    }

    if (!patent.titleOfThePatent.trim()) {
      newErrors.titleOfThePatent = "Title of the patent is required";
    }

    if (!patent.publishedGranted) {
      newErrors.publishedGranted = "Please select publication/grant status";
    }

    if (!patent.yearOfPublishedGranted.trim()) {
      newErrors.yearOfPublishedGranted = "Year of publication/grant is required";
    } else {
      const year = Number(patent.yearOfPublishedGranted);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 10) {
        newErrors.yearOfPublishedGranted = "Please enter a valid 4-digit year";
      }
    }

    if (!patent.scope) {
      newErrors.scope = "Please select scope";
    }

    if (!patent.document) {
      newErrors.document = "Patent document is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(patent.document.type)) {
        newErrors.document = "Only PDF, JPG, or PNG files are allowed";
      } else if (patent.document.size > maxSizeMB * 1024 * 1024) {
        newErrors.document = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    patentNumber: patent.patentNumber.trim(),
    titleOfThePatent: patent.titleOfThePatent.trim(),
    publishedGranted: patent.publishedGranted,
    yearOfPublishedGranted: patent.yearOfPublishedGranted.trim(),
    scope: patent.scope,
    document: patent.document,
  });

  const resetForm = () => {
    setPatent({
      patentNumber: "",
      titleOfThePatent: "",
      publishedGranted: "",
      yearOfPublishedGranted: "",
      scope: "",
      document: null,
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
      console.log("Patent payload:", payload);
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Patent Details
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <InputField
            label="Patent Number"
            name="patentNumber"
            value={patent.patentNumber}
            onChange={handleChange}
            error={errors.patentNumber}
          />

          <InputField
            label="Title Of The Patent"
            name="titleOfThePatent"
            value={patent.titleOfThePatent}
            onChange={handleChange}
            error={errors.titleOfThePatent}
          />

          <SelectField
            label="Published/Granted"
            name="publishedGranted"
            value={patent.publishedGranted}
            onChange={handleChange}
            options={["Published", "Granted"]}
            error={errors.publishedGranted}
          />

          <InputField
            label="Year of Publication/Grant"
            name="yearOfPublishedGranted"
            value={patent.yearOfPublishedGranted}
            onChange={handleChange}
            error={errors.yearOfPublishedGranted}
            placeholder="e.g. 2024"
          />

          <SelectField
            label="Scope"
            name="scope"
            value={patent.scope}
            onChange={handleChange}
            options={["National", "International"]}
            error={errors.scope}
          />

          <div className="md:col-span-2">
            <FileField
              label="Patent Document"
              name="document"
              type="file"
              onChange={handleChange}
              error={errors.document}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Patent
        </button>
      </form>
    </div>
  );
}
