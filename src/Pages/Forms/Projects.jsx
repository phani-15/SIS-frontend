import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { credentialTypes } from "../AddCreds";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState({
    projectType: "",
    otherType: "",
    projectTitle: "",
    projectDomain: "",
    academicYear: "",
    projectStatus: "",
    teamSize: "",
    facultyGuide: "",
    externalMentor: "",
    industrySponsored: "",
    industryName: "",
    fundingAgency: "",
    amountSanctioned: "",
    startDate: "",
    endDate: "",
    technologiesUsed: "",
    prototypeDeveloped: "",
    patentFiled: "",
    publicationGenerated: "",
    awardRecieved: "",
    awardName: "",
    certificate: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [patent, setPatent] = useState({
    patentNumber: "",
    titleOfThePatent: "",
    publishedGranted: "",
    yearOfPublishedGranted: "",
    scope: "",
    document: null,
  });

  const handlePatentChange = (e) => {
    const { name, value, files, type } = e.target;

    setPatent((prev) => ({
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
      const typeKey = "project";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "Project details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add project information." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setProjects((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!projects.projectType) {
      newErrors.projectType = "Project type is required";
    }

    if (projects.projectType === 'others' && !projects.otherType) {
      newErrors.otherType = "Project Type is required"
    }
    if (!projects.projectTitle.trim()) {
      newErrors.projectTitle = "Project title is required";
    }

    const academicYear = String(projects.academicYear).trim();

    if (!academicYear) {
      newErrors.academicYear = "Academic year is required";
    } else if (!/^\d{4}(-\d{4})?$/.test(academicYear)) {
      newErrors.academicYear =
        "Use format YYYY or YYYY-YYYY (e.g. 2025-2026)";
    } else {
      const currentYear = new Date().getFullYear();
      const currentAcademicStart =
        new Date().getMonth() >= 6 ? currentYear : currentYear - 1;

      if (academicYear.includes("-")) {
        const [start, end] = academicYear.split("-").map(Number);

        if (end !== start + 1) {
          newErrors.academicYear =
            "Academic year should be consecutive.";
        } else if (start > currentAcademicStart) {
          newErrors.academicYear =
            "Academic year cannot be in the future.";
        }
      } else {
        const year = Number(academicYear);

        if (year > currentAcademicStart) {
          newErrors.academicYear =
            "Academic year cannot be in the future.";
        }
      }
    }

    if (projects.patentFiled === "true") {

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

    }

    if (!projects.projectStatus) {
      newErrors.projectStatus = "Project status is required";
    }

    if (!projects.teamSize.trim()) {
      newErrors.teamSize = "Team size is required";
    } else {
      const size = Number(projects.teamSize);
      if (isNaN(size) || size <= 0 || !Number.isInteger(size)) {
        newErrors.teamSize = "Team size must be a positive integer";
      }
    }

    if (!projects.facultyGuide.trim()) {
      newErrors.facultyGuide = "Faculty guide name is required";
    }

    if (!projects.industrySponsored) {
      newErrors.industrySponsored = "Please specify if the project is industry sponsored";
    } else if (projects.industrySponsored === "true") {
      if (!projects.industryName.trim()) {
        newErrors.industryName = "Industry name is required";
      }
      if (projects.amountSanctioned.trim()) {
        const amt = Number(projects.amountSanctioned);
        if (isNaN(amt) || amt < 0) {
          newErrors.amountSanctioned = "Amount must be a non-negative number";
        }
      }
    }

    if (projects.startDate && projects.endDate && new Date(projects.endDate) < new Date(projects.startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (!projects.prototypeDeveloped) {
      newErrors.prototypeDeveloped = "Please specify if a prototype was developed";
    }

    if (!projects.patentFiled) {
      newErrors.patentFiled = "Please specify if a patent was filed";
    }

    if (!projects.publicationGenerated) {
      newErrors.publicationGenerated = "Please specify if a publication was generated";
    }

    if (!projects.awardRecieved) {
      newErrors.awardRecieved = "Please specify if an award was received";
    } else if (projects.awardRecieved === "true") {
      if (!projects.awardName.trim()) {
        newErrors.awardName = "Award name is required";
      }
    }

    if (!projects.certificate) {
      newErrors.certificate = "Certificate file is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(projects.certificate.type)) {
        newErrors.certificate = "Only PDF, JPG, or PNG files are allowed";
      } else if (projects.certificate.size > maxSizeMB * 1024 * 1024) {
        newErrors.certificate = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const obj = {
      projectType: projects.projectType === 'others' ? projects.otherType : projects.projectType,
      projectTitle: projects.projectTitle.trim(),
      projectDomain: projects.projectDomain.trim(),
      academicYear: projects.academicYear.trim(),
      projectStatus: projects.projectStatus,
      teamSize: projects.teamSize,
      facultyGuide: projects.facultyGuide.trim(),
      externalMentor: projects.externalMentor.trim(),
      industrySponsored: projects.industrySponsored === "true",
      industryName: projects.industrySponsored === "true" ? projects.industryName.trim() : "",
      fundingAgency: projects.industrySponsored === "true" ? projects.fundingAgency.trim() : "",
      amountSanctioned: projects.industrySponsored === "true" ? projects.amountSanctioned.trim() : "",
      startDate: projects.startDate,
      endDate: projects.endDate,
      technologiesUsed: projects.technologiesUsed.trim(),
      prototypeDeveloped: projects.prototypeDeveloped === "true",
      patentFiled: projects.patentFiled === "true",
      publicationGenerated: projects.publicationGenerated === "true",
      awardReceived: projects.awardRecieved === "true",
      awardName: projects.awardRecieved === "true" ? projects.awardName.trim() : "",
      certificate: projects.certificate,
    };
    if (projects.patentFiled === "true") {
      obj.patent = {
        patentNumber: patent.patentNumber.trim(),
        titleOfThePatent: patent.titleOfThePatent.trim(),
        publishedGranted: patent.publishedGranted,
        yearOfPublishedGranted: patent.yearOfPublishedGranted.trim(),
        scope: patent.scope,
        document: patent.document,
      };
    }
    return obj;
  };

  const resetForm = () => {
    setProjects({
      projectType: "",
      otherType: "",
      projectTitle: "",
      projectDomain: "",
      academicYear: "",
      projectStatus: "",
      teamSize: "",
      facultyGuide: "",
      externalMentor: "",
      industrySponsored: "",
      industryName: "",
      fundingAgency: "",
      amountSanctioned: "",
      startDate: "",
      endDate: "",
      technologiesUsed: "",
      prototypeDeveloped: "",
      patentFiled: "",
      publicationGenerated: "",
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
      console.log("Projects payload:", payload);
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
          Project Details
        </h2>
      <div className="mb-6 p-4 bg-blue-50/50 border border-blue-100/80 rounded-xl">
        <span className="text-xs font-semibold text-blue-900/70 uppercase tracking-wider block mb-2">Available Credential Types</span>
        <div className="flex flex-wrap gap-2">
          {Object.keys(credentialTypes).map((key) => (
            <span key={key} className="px-3 py-1 bg-white border border-blue-100 text-xs font-medium text-blue-950 rounded-full shadow-xs">
              {key}
            </span>
          ))}
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

          <SelectField
            label="Project Type"
            name="projectType"
            value={projects.projectType}
            onChange={handleChange}
            options={["Mini Project", "Major Project", "Capstone Project", "others"]}
            error={errors.projectType}
          />

          {projects.projectType === 'others' &&
            <InputField
              label="Type of Project(others) "
              name="otherType"
              value={projects.otherType}
              onChange={handleChange}
              error={errors.otherType}
            />
          }

          <InputField
            label="Project Title"
            name="projectTitle"
            value={projects.projectTitle}
            onChange={handleChange}
            error={errors.projectTitle}
          />

          <InputField
            label="Project Domain"
            name="projectDomain"
            value={projects.projectDomain}
            onChange={handleChange}
          />

          <InputField
            label="Academic Year"
            name="academicYear"
            value={projects.academicYear}
            onChange={handleChange}
            type="text"
            error={errors.academicYear}
            placeholder="e.g. 2023-2024"
          />

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Project Status</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="projectStatus"
                  value="ongoing"
                  checked={projects.projectStatus === "ongoing"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Ongoing</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="projectStatus"
                  value="completed"
                  checked={projects.projectStatus === "completed"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Completed</span>
              </label>
            </div>
            {errors.projectStatus && (
              <small className="text-red-600 text-sm mt-1">{errors.projectStatus}</small>
            )}
          </div>

          <InputField
            label="Team Size"
            name="teamSize"
            value={projects.teamSize}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            error={errors.teamSize}
          />

          <InputField
            label="Faculty Guide/Mentor"
            name="facultyGuide"
            value={projects.facultyGuide}
            onChange={handleChange}
            error={errors.facultyGuide}
          />

          <InputField
            label="External Mentor"
            name="externalMentor"
            value={projects.externalMentor}
            onChange={handleChange}
          />

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Industry Sponsored?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="industrySponsored"
                  value="true"
                  checked={projects.industrySponsored === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="industrySponsored"
                  value="false"
                  checked={projects.industrySponsored === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
            {errors.industrySponsored && (
              <small className="text-red-600 text-sm mt-1">{errors.industrySponsored}</small>
            )}
          </div>

          {projects.industrySponsored === "true" && (
            <>
              <InputField
                label="Industry Name"
                name="industryName"
                value={projects.industryName}
                onChange={handleChange}
                error={errors.industryName}
              />
              {/* <InputField
                label="Funding Agency"
                name="fundingAgency"
                value={projects.fundingAgency}
                onChange={handleChange}
              /> */}
              <InputField
                label="Amount Sanctioned"
                name="amountSanctioned"
                value={projects.amountSanctioned}
                onChange={handleChange}
                type="number"
                onWheel={(e) => e.target.blur()}
                error={errors.amountSanctioned}
              />
            </>
          )}

          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={projects.startDate}
            onChange={handleChange}
          />

          <InputField
            label="End Date"
            name="endDate"
            type="date"
            value={projects.endDate}
            onChange={handleChange}
            error={errors.endDate}
          />

          <div className="md:col-span-2">
            <InputField
              label="Technologies Used"
              name="technologiesUsed"
              value={projects.technologiesUsed}
              onChange={handleChange}
              placeholder="e.g. Node.js, React, MongoDB"
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Prototype Developed?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="prototypeDeveloped"
                  value="true"
                  checked={projects.prototypeDeveloped === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="prototypeDeveloped"
                  value="false"
                  checked={projects.prototypeDeveloped === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
            {errors.prototypeDeveloped && (
              <small className="text-red-600 text-sm mt-1">{errors.prototypeDeveloped}</small>
            )}
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Patent Filed?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="patentFiled"
                  value="true"
                  checked={projects.patentFiled === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="patentFiled"
                  value="false"
                  checked={projects.patentFiled === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
            {errors.patentFiled && (
              <small className="text-red-600 text-sm mt-1">{errors.patentFiled}</small>
            )}
          </div>

          {projects.patentFiled === "true" && <>

              <InputField
                label="Patent Number"
                name="patentNumber"
                value={patent.patentNumber}
                onChange={handlePatentChange}
                error={errors.patentNumber}
              />

              <InputField
                label="Title Of The Patent"
                name="titleOfThePatent"
                value={patent.titleOfThePatent}
                onChange={handlePatentChange}
                error={errors.titleOfThePatent}
              />

              <SelectField
                label="Published/Granted"
                name="publishedGranted"
                value={patent.publishedGranted}
                onChange={handlePatentChange}
                options={["Published", "Granted"]}
                error={errors.publishedGranted}
              />

              <InputField
                label="Year of Publication/Grant"
                name="yearOfPublishedGranted"
                value={patent.yearOfPublishedGranted}
                onChange={handlePatentChange}
                error={errors.yearOfPublishedGranted}
                placeholder="e.g. 2024"
              />

              <SelectField
                label="Scope"
                name="scope"
                value={patent.scope}
                onChange={handlePatentChange}
                options={["National", "International"]}
                error={errors.scope}
              />

              <div className="md:col-span-2">
                <FileField
                  label="Patent Document"
                  name="document"
                  type="file"
                  onChange={handlePatentChange}
                  error={errors.document}
                />
              </div>

          </>}

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Publication Generated?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="publicationGenerated"
                  value="true"
                  checked={projects.publicationGenerated === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="publicationGenerated"
                  value="false"
                  checked={projects.publicationGenerated === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
            {errors.publicationGenerated && (
              <small className="text-red-600 text-sm mt-1">{errors.publicationGenerated}</small>
            )}
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Award Received?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="awardRecieved"
                  value="true"
                  checked={projects.awardRecieved === "true"}
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
                  checked={projects.awardRecieved === "false"}
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

          {projects.awardRecieved === "true" && (
            <div className="md:col-span-2">
              <InputField
                label="Award Name"
                name="awardName"
                value={projects.awardName}
                onChange={handleChange}
                error={errors.awardName}
              />
            </div>
          )}

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
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
