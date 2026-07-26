import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";

export default function ProfessionalBodies() {
  const [professionalBodies, setProfessionalBodies] = useState({
    nameOfProfessionalBody: "",
    otherName:"",
    membershipId: "",
    validTill: "",
    membershipCertificate: null,
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

      const typeKey = "professionalBodies";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "professionalBodies details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add professionalBodies information." });
    } finally {
      setLoading(false);
    }
  };

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

  const validate = () => {
    const newErrors = {};

    if (!professionalBodies.nameOfProfessionalBody) {
      newErrors.nameOfProfessionalBody = "Professional body name is required";
    }else{
      if(professionalBodies.nameOfProfessionalBody==='others' && !professionalBodies.otherName.trim()){
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

  const buildPayload = () => {
    const payload = new FormData();
    payload.append("Name of professional body", professionalBodies.nameOfProfessionalBody === 'others' ? professionalBodies.otherName : professionalBodies.nameOfProfessionalBody);
    payload.append("membership id", professionalBodies.membershipId.trim());
    payload.append("valid till", professionalBodies.validTill);
    payload.append("membership certificate", professionalBodies.membershipCertificate);
    return payload;
  };

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
      handleAdd(payload, professionalBodies);
    } else {
      console.log("ProfessionalBodies payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Professional Bodies Membership
      </h2>
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
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Professional Body
        </button>
      </form>
    </div>
  );
}
