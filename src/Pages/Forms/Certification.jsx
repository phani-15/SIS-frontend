import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { useNavigate } from "react-router-dom";

export default function Certification() {
  const [certification, setCertification] = useState({
    typeOfCertification: "",
    domain: "",
    otherType: "",
    certificationId: "",
    scoreObtained: "",
    gradeObtained: "",
    duration: "",
    dateOfCompletion: "",
    certificate: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setCertification((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    // Clear the field's error as soon as the user edits it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!certification.typeOfCertification)
      newErrors.typeOfCertification = "Type of certification is required";
    if (certification.typeOfCertification === "others" && !certification.otherType.trim())
      newErrors.otherType = "Type of certification is required"

    if (!certification.domain.trim())
      newErrors.domain = "Domain / skill / area is required";

    if (!certification.certificationId.trim())
      newErrors.certificationId = "Certification ID / number is required";

    if (certification.scoreObtained !== "") {
      const score = Number(certification.scoreObtained);
      if (isNaN(score) || score < 0 || score > 100) {
        newErrors.scoreObtained = "Score must be a number between 0 and 100";
      }
    }

    if (certification.duration !== "") {
      const duration = Number(certification.duration);
      if (isNaN(duration) || duration <= 0) {
        newErrors.duration = "Duration must be a positive number";
      }
    }

    if (!certification.dateOfCompletion) {
      newErrors.dateOfCompletion = "Date of completion is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const completionDate = new Date(certification.dateOfCompletion);
      if (completionDate > today) {
        newErrors.dateOfCompletion = "Date of completion cannot be in the future";
      }
    }

    if (!certification.certificate) {
      newErrors.certificate = "Certificate file is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(certification.certificate.type)) {
        newErrors.certificate = "Only PDF, JPG, or PNG files are allowed";
      } else if (certification.certificate.size > maxSizeMB * 1024 * 1024) {
        newErrors.certificate = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const[loading,setLoading] = useState(true)
  const [message,setMessage] = useState(null)

   const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found. Please log in first.");
      }

      const typeKey = "certification";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "Certification details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate('/profile/navigate/certification')
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add Certification information." });
    } finally {
      setLoading(false);
    }
  };

  const buildPayload = () => ({
    typeOfCertification: certification.typeOfCertification === 'others' ? certification.otherType : certification.typeOfCertification,
    domainSkillArea: certification.domain.trim(),
    certificationIdNumber: certification.certificationId.trim(),
    scoreObtained: certification.scoreObtained,
    gradeObtained: certification.gradeObtained.trim(),
    duration: certification.duration,
    dateOfCompletion: certification.dateOfCompletion,
    certificate: certification.certificate,
  });

  const navigate = useNavigate()

  const resetForm = () => {
    setCertification({
      typeOfCertification: "",
      domain: "",
      certificationId: "",
      scoreObtained: "",
      gradeObtained: "",
      duration: "",
      dateOfCompletion: "",
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
      console.log("Certification payload:", payload);
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Certification Details
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <SelectField
            label="Type of Certification"
            name="typeOfCertification"
            value={certification.typeOfCertification}
            onChange={handleChange}
            options={["NPTEL", "SWAYAM", "Coursera", "AWS", "Cisco", "Microsoft", "Google", "others"]}
            error={errors.typeOfCertification}
          />

          {certification.typeOfCertification === 'others' &&

            <InputField
              label="Type of Certiification(others)"
              name="otherType"
              value={certification.otherType}
              onChange={handleChange}
              error={errors.otherType}
            />
          }

          <InputField
            label="Domain/Skill/Area"
            name="domain"
            value={certification.domain}
            onChange={handleChange}
            error={errors.domain}
          />

          <InputField
            label="Certification ID/Number"
            name="certificationId"
            value={certification.certificationId}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            error={errors.certificationId}
          />

          <InputField
            label="Score Obtained"
            name="scoreObtained"
            value={certification.scoreObtained}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            error={errors.scoreObtained}
          />

          <InputField
            label="Grade Obtained"
            name="gradeObtained"
            value={certification.gradeObtained}
            onChange={handleChange}
          />

          <InputField
            label="Duration in weeks"
            name="duration"
            value={certification.duration}
            onChange={handleChange}
            error={errors.duration}
          />

          <div className="md:col-span-2">
            <InputField
              label="Date of Completion"
              name="dateOfCompletion"
              type="date"
              value={certification.dateOfCompletion}
              onChange={handleChange}
              error={errors.dateOfCompletion}
            />
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
          Add Certification
        </button>
      </form>
    </div>
  );
}