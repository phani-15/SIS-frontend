import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";

export default function Competitions() {
  const [competitions, setCompetitions] = useState({
    competitionCategory: "",
    competitionName: "",
    otherCategory:"",
    themeDomain: "",
    eventLevel: "",
    organizingInstitutionCompany: "",
    organizerType: "",
    startDate: "",
    endDate: "",
    mode: "",
    venue: "",
    typeOfParticipation: "",
    teamName: "",
    teamSize: "",
    facultyMentor: "",
    presentedProjectIdeaTitle: "",
    abstractSummary: "",
    participationStatus: "",
    awardRecieved: "",
    awardName: "",
    prizeMoney: "",
    rankSecured: "",
    outcomeAchieved: "",
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

      const typeKey = "competitions";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "competition details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add competition information." });
    } finally {
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setCompetitions((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!competitions.competitionCategory) newErrors.competitionCategory = "Competition category is required";
    if (!competitions.competitionName.trim()) newErrors.competitionName = "Competition name is required";
    if (!competitions.eventLevel) newErrors.eventLevel = "Event level is required";
    if (!competitions.organizingInstitutionCompany.trim()) newErrors.organizingInstitutionCompany = "Organizing institution/company is required";
    if (!competitions.organizerType) newErrors.organizerType = "Organizer type is required";
    if (!competitions.startDate) newErrors.startDate = "Start date is required";
    if (!competitions.endDate) newErrors.endDate = "End date is required";
    else if (competitions.startDate && new Date(competitions.endDate) < new Date(competitions.startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }
    if (!competitions.mode) newErrors.mode = "Mode of competition is required";
    if (!competitions.venue.trim() && !competitions.mode === "online") newErrors.venue = "Venue is required";
    if (!competitions.typeOfParticipation) newErrors.typeOfParticipation = "Type of participation is required";
    if (!competitions.participationStatus) newErrors.participationStatus = "Participation status is required";
    if (!competitions.awardRecieved) newErrors.awardRecieved = "Please specify if an award was received";

    // Conditional validations
    if (competitions.typeOfParticipation === "Team") {
      if (!competitions.teamName.trim()) newErrors.teamName = "Team name is required for team participation";
      if (!competitions.teamSize.trim()) {
        newErrors.teamSize = "Team size is required";
      } else {
        const size = Number(competitions.teamSize);
        if (isNaN(size) || size <= 1 || !Number.isInteger(size)) {
          newErrors.teamSize = "Team size must be a positive integer greater than 1";
        }
      }
    }

    if (competitions.competitionCategory === "others") {
      if (!competitions.otherCategory.trim())
        newErrors.otherCategory = "Other Category is required"
    }

    if (competitions.awardRecieved === "Yes") {
      if (!competitions.awardName.trim()) newErrors.awardName = "Award name is required";
      if (!competitions.rankSecured.trim()) newErrors.rankSecured = "Rank secured is required";
    }

    if (competitions.prizeMoney.trim()) {
      const prize = Number(competitions.prizeMoney);
      if (isNaN(prize) || prize < 0) {
        newErrors.prizeMoney = "Prize money must be a non-negative number";
      }
    }

    // Document validation
    if (!competitions.certificate) {
      newErrors.certificate = "Certificate file is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(competitions.certificate.type)) {
        newErrors.certificate = "Only PDF, JPG, or PNG files are allowed";
      } else if (competitions.certificate.size > maxSizeMB * 1024 * 1024) {
        newErrors.certificate = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const payload = new FormData();
    payload.append("competitionCategory", competitions.competitionCategory === 'others' ? competitions.otherCategory : competitions.competitionCategory);
    payload.append("competitionName", competitions.competitionName.trim());
    payload.append("themeDomain", competitions.themeDomain.trim());
    payload.append("eventLevel", competitions.eventLevel);
    payload.append("organizingInstitutionCompany", competitions.organizingInstitutionCompany.trim());
    payload.append("organizerType", competitions.organizerType);
    payload.append("startDate", competitions.startDate);
    payload.append("endDate", competitions.endDate);
    payload.append("mode", competitions.mode);
    payload.append("venue", competitions.venue.trim());
    payload.append("typeOfParticipation", competitions.typeOfParticipation);

    if (competitions.typeOfParticipation === "Team") {
      payload.append("team name", competitions.teamName.trim());
      payload.append("team size", competitions.teamSize);
    } else {
      payload.append("team name", "");
      payload.append("team size", "");
    }

    payload.append("faculty mentor", competitions.facultyMentor.trim());
    payload.append("presented project/ idea title", competitions.presentedProjectIdeaTitle.trim());
    payload.append("abstract summary", competitions.abstractSummary.trim());
    payload.append("participation status", competitions.participationStatus);
    payload.append("award recieved", competitions.awardRecieved);

    if (competitions.awardRecieved === "Yes") {
      payload.append("award name", competitions.awardName.trim());
      payload.append("prize money", competitions.prizeMoney.trim());
      payload.append("rank secured", competitions.rankSecured.trim());
    } else {
      payload.append("award name", "");
      payload.append("prize money", "");
      payload.append("rank secured", "");
    }

    payload.append("outcome achieved", competitions.outcomeAchieved.trim());
    payload.append("certificate", competitions.certificate);
    return payload;
  };

  const resetForm = () => {
    setCompetitions({
      competitionCategory: "",
      otherCategory: "",
      competitionName: "",
      themeDomain: "",
      eventLevel: "",
      organizingInstitutionCompany: "",
      organizerType: "",
      startDate: "",
      endDate: "",
      mode: "",
      venue: "",
      typeOfParticipation: "",
      teamName: "",
      teamSize: "",
      facultyMentor: "",
      presentedProjectIdeaTitle: "",
      abstractSummary: "",
      participationStatus: "",
      awardRecieved: "",
      awardName: "",
      prizeMoney: "",
      rankSecured: "",
      outcomeAchieved: "",
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
      console.log("Competitions payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Competition Details
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <SelectField
            label="Competition Category"
            name="competitionCategory"
            value={competitions.competitionCategory}
            onChange={handleChange}
            options={["Hackathon", "Coding contest", "Ideathon", "Project Expo", "Design challenge", "Innovation Contest", "others"]}
            error={errors.competitionCategory}
          />

          {
            competitions.competitionCategory === "others" &&
            <InputField
              label="Name of Competition Category"
              name="otherCategory"
              value={competitions.otherCategory}
              onChange={handleChange}
              error={errors.otherCategory}
            />
          }

          <InputField
            label="Competition Name"
            name="competitionName"
            value={competitions.competitionName}
            onChange={handleChange}
            error={errors.competitionName}
          />

          <InputField
            label="Theme / Domain"
            name="themeDomain"
            value={competitions.themeDomain}
            onChange={handleChange}
          />

          <SelectField
            label="Event Level"
            name="eventLevel"
            value={competitions.eventLevel}
            onChange={handleChange}
            options={["Institutional", "State", "National", "International"]}
            error={errors.eventLevel}
          />

          <InputField
            label="Organizing Institution / Company"
            name="organizingInstitutionCompany"
            value={competitions.organizingInstitutionCompany}
            onChange={handleChange}
            error={errors.organizingInstitutionCompany}
          />

          <SelectField
            label="Organizer Type"
            name="organizerType"
            value={competitions.organizerType}
            onChange={handleChange}
            options={["College", "University", "Industry", "Government"]}
            error={errors.organizerType}
          />

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Type of Participation</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="typeOfParticipation"
                  value="Individual"
                  checked={competitions.typeOfParticipation === "Individual"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Individual</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="typeOfParticipation"
                  value="Team"
                  checked={competitions.typeOfParticipation === "Team"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Team</span>
              </label>
            </div>
            {errors.typeOfParticipation && (
              <small className="text-red-600 text-sm mt-1">{errors.typeOfParticipation}</small>
            )}
          </div>

          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={competitions.startDate}
            onChange={handleChange}
            error={errors.startDate}
          />

          <InputField
            label="End Date"
            name="endDate"
            type="date"
            value={competitions.endDate}
            onChange={handleChange}
            error={errors.endDate}
          />

          <SelectField
            label="Mode"
            name="mode"
            value={competitions.mode}
            onChange={handleChange}
            options={["Online", "Offline", "Hybrid"]}
            error={errors.mode}
          />

          <InputField
            label="Venue"
            name="venue"
            value={competitions.venue}
            onChange={handleChange}
            error={errors.venue}
          />

          {competitions.typeOfParticipation === "Team" && (
            <>
              <InputField
                label="Team Name"
                name="teamName"
                value={competitions.teamName}
                onChange={handleChange}
                error={errors.teamName}
              />
              <InputField
                label="Team Size"
                name="teamSize"
                value={competitions.teamSize}
                onChange={handleChange}
                error={errors.teamSize}
              />
            </>
          )}

          <InputField
            label="Faculty Mentor"
            name="facultyMentor"
            value={competitions.facultyMentor}
            onChange={handleChange}
          />

          <InputField
            label="Presented Project/Idea Title"
            name="presentedProjectIdeaTitle"
            value={competitions.presentedProjectIdeaTitle}
            onChange={handleChange}
          />

          <div className="flex flex-col text-left space-y-2 mt-4 md:col-span-2">
            <label htmlFor="abstractSummary" className="text-gray-700 font-medium">Abstract Summary</label>
            <textarea
              id="abstractSummary"
              name="abstractSummary"
              rows={3}
              value={competitions.abstractSummary}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-1 focus:border-blue-900 focus:ring-blue-900"
            />
          </div>

          <SelectField
            label="Participation Status"
            name="participationStatus"
            value={competitions.participationStatus}
            onChange={handleChange}
            options={["Participated", "Qualified", "Shortlisted", "Finalist", "Winner"]}
            error={errors.participationStatus}
          />

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Award Received?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="awardRecieved"
                  value="Yes"
                  checked={competitions.awardRecieved === "Yes"}
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
                  checked={competitions.awardRecieved === "No"}
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

          {competitions.awardRecieved === "Yes" && (
            <>
              <InputField
                label="Award Name"
                name="awardName"
                value={competitions.awardName}
                onChange={handleChange}
                error={errors.awardName}
              />
              <InputField
                label="Rank Secured"
                name="rankSecured"
                type="number"
                onWheel={(e) => e.target.blur()}
                value={competitions.rankSecured}
                onChange={handleChange}
                error={errors.rankSecured}
              />
              <InputField
                label="Prize Money"
                name="prizeMoney"
                value={competitions.prizeMoney}
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={handleChange}
                error={errors.prizeMoney}
              />
            </>
          )}

          <div className="md:col-span-2">
            <InputField
              label="Outcome Achieved"
              name="outcomeAchieved"
              value={competitions.outcomeAchieved}
              onChange={handleChange}
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
          Add Competition
        </button>
      </form>
    </div>
  );
}
