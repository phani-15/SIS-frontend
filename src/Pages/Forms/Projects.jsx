import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { credentialTypes } from "../AddCreds";

export default function Projects() {
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

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found. Please log in first.");
      }

      const typeKey = "projects";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "projects details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add projects information." });
    } finally {
      setLoading(false);
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

    if (projects.patentFiled === 'Yes') {

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
    } else if (projects.industrySponsored === "yes") {
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
    } else if (projects.awardRecieved === "Yes") {
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
    const payload = new FormData();
    payload.append("project type", projects.projectType === 'others' ? projects.otherType : projects.projectType);
    payload.append("project title", projects.projectTitle.trim());
    payload.append("project domain", projects.projectDomain.trim());
    payload.append("academic year", projects.academicYear.trim());
    payload.append("project status", projects.projectStatus);
    payload.append("team size", projects.teamSize);
    payload.append("faculty guide", projects.facultyGuide.trim());
    payload.append("external mentor", projects.externalMentor.trim());
    payload.append("industry sponsored", projects.industrySponsored);

    if (projects.industrySponsored === "yes") {
      payload.append("industry name", projects.industryName.trim());
      payload.append("funding agency", projects.fundingAgency.trim());
      payload.append("amount sanctioned", projects.amountSanctioned.trim());
    } else {
      payload.append("industry name", "");
      payload.append("funding agency", "");
      payload.append("amount sanctioned", "");
    }

    payload.append("start date", projects.startDate);
    payload.append("end date", projects.endDate);
    payload.append("technologies used", projects.technologiesUsed.trim());
    payload.append("prototype developed ?", projects.prototypeDeveloped);
    payload.append("patent filed ?", projects.patentFiled);
    payload.append("publication generated ?", projects.publicationGenerated);
    payload.append("award recieved ?", projects.awardRecieved);
    payload.append("award name", projects.awardRecieved === "Yes" ? projects.awardName.trim() : "");
    payload.append("certificate", projects.certificate);

    if(projects.patentFiled === 'Yes')
        payload.append("patent",patent)
    return payload;
  };

  const [patent, setPatent] = useState({
    patentNumber: "",
    titleOfThePatent: "",
    publishedGranted: "",
    yearOfPublishedGranted: "",
    scope: "",
    document: null,
  });

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
      handleAdd(payload, projects);
    } else {
      console.log("Projects payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
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
                  value="yes"
                  checked={projects.industrySponsored === "yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="industrySponsored"
                  value="No"
                  checked={projects.industrySponsored === "No"}
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

          {projects.industrySponsored === "yes" && (
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
                  value="Yes"
                  checked={projects.prototypeDeveloped === "Yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="prototypeDeveloped"
                  value="No"
                  checked={projects.prototypeDeveloped === "No"}
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
                  value="Yes"
                  checked={projects.patentFiled === "Yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="patentFiled"
                  value="No"
                  checked={projects.patentFiled === "No"}
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

          {projects.patentFiled === 'Yes' && <>

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
                  value="Yes"
                  checked={projects.publicationGenerated === "Yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="publicationGenerated"
                  value="No"
                  checked={projects.publicationGenerated === "No"}
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
                  value="Yes"
                  checked={projects.awardRecieved === "Yes"}
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
                  checked={projects.awardRecieved === "No"}
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

          {projects.awardRecieved === "Yes" && (
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
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}
