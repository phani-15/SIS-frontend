import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";

export default function ConferencePaper() {
  const [conferencePaper, setConferencePaper] = useState({
    titleOfThePaper: "",
    nameOfTheConference: "",
    organizedBy: "",
    scope: "",
    fromDate: "",
    toDate: "",
    modeOfConference: "",
    venue: "",
    isbnNumber: "",
    conferenceProceedingsTitle: "",
    publisherName: "",
    indexingType: "",
    doi: "",
    pageNumbersFromTo: "",
    noOfAuthors: "",
    authorsList: "",
    affiliationOfAuthors: "",
    bestPaperAwardCertificateIfGot: null,
    conferenceCertificate: null,
    conferencePaperFirstPage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setConferencePaper((prev) => ({
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

      const typeKey = "conferencePaper";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "conferencePaper details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add conferencePaper information." });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!conferencePaper.titleOfThePaper.trim()) {
      newErrors.titleOfThePaper = "Title of the paper is required";
    }

    if (!conferencePaper.nameOfTheConference.trim()) {
      newErrors.nameOfTheConference = "Name of the conference is required";
    }

    if (!conferencePaper.noOfAuthors.trim()) {
      newErrors.noOfAuthors = "Count of Authors is required"
    } else {
      const num = Number(conferencePaper.noOfAuthors)

      if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
        newErrors.noOfAuthors =
          "Number of authors must be a positive integer";
      } else {

        if (!conferencePaper.authorsList.trim()) {
          newErrors.authorsList = "Author name is required";
        } else {
          const authors = conferencePaper.authorsList
            .split(",")
            .map((author) => author.trim())
            .filter((author) => author.length > 0);

          if (authors.length !== num) {
            newErrors.authorsList = `Expected ${num} author${num > 1 ? "s" : ""}, but found ${authors.length}. Separate author names with commas.`;
          }
        }
      }

    }

    if (!conferencePaper.organizedBy.trim()) {
      newErrors.organizedBy = "Organized by is required";
    }

    if (!conferencePaper.scope) {
      newErrors.scope = "Please select scope";
    }

    if (!conferencePaper.fromDate) {
      newErrors.fromDate = "Date of conference (from) is required";
    } else {
      const eventDate = new Date(conferencePaper.fromDate);
      const today = new Date();

      // Ignore the current time
      today.setHours(0, 0, 0, 0);

      if (eventDate > today) {
        newErrors.fromDate = "Date cannot be in the future";
      }
    }

    if (!conferencePaper.toDate) {
      newErrors.toDate = "Date of conference (to) is required";
    } else if (conferencePaper.fromDate && new Date(conferencePaper.toDate) < new Date(conferencePaper.fromDate)) {
      newErrors.toDate = "End date cannot be before start date";
    } else {
      const eventDate = new Date(conferencePaper.toDate);
      const today = new Date();

      // Ignore the current time
      today.setHours(0, 0, 0, 0);

      if (eventDate > today) {
        newErrors.toDate = "Date cannot be in the future";
      }
    }

    if(!conferencePaper.conferenceProceedingsTitle){
      newErrors.conferenceProceedingsTitle ="Proceedings Title is required" 
    }

    if(!conferencePaper.indexingType){
      newErrors.indexingType ="Indexing Type is required" 
    }

    if(!conferencePaper.publisherName){
      newErrors.publisherName = "Publisher Name is required"
    }

    if (conferencePaper.isbnNumber) {
      const isbn = conferencePaper.isbnNumber.replace(/[-\s]/g, ""); // Remove hyphens/spaces if allowed

      if (!(isbn.length === 10 || isbn.length === 13)) {
        newErrors.isbnNumber = "ISBN must be 10 or 13 digits";
      }
    }

    if (!conferencePaper.pageNumbersFromTo.trim()) {
      newErrors.pageNumbersFromTo = "Page numbers are required";
    } else {
      const pages = conferencePaper.pageNumbersFromTo.trim();

      const match = pages.match(/^(\d+)\s*-\s*(\d+)$/);

      if (!match) {
        newErrors.pageNumbersFromTo =
          "Use format StartPage-EndPage (e.g. 123-130)";
      } else {
        const startPage = Number(match[1]);
        const endPage = Number(match[2]);

        if (startPage <= 0 || endPage <= 0) {
          newErrors.pageNumbersFromTo =
            "Page numbers must be positive";
        } else if (endPage < startPage) {
          newErrors.pageNumbersFromTo =
            "End page cannot be less than the start page";
        }
      }
    }

    if (!conferencePaper.modeOfConference) {
      newErrors.modeOfConference = "Mode of conference is required";
    }

    if (conferencePaper.modeOfConference !== 'Online' && !conferencePaper.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    // Document validations helper
    const validateFile = (file, key, required = true) => {
      if (!file) {
        if (required) newErrors[key] = "This file is required";
        return;
      }
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(file.type)) {
        newErrors[key] = "Only PDF, JPG, or PNG files are allowed";
      } else if (file.size > maxSizeMB * 1024 * 1024) {
        newErrors[key] = `File must be smaller than ${maxSizeMB}MB`;
      }
    };

    validateFile(conferencePaper.conferenceCertificate, "conferenceCertificate", true);
    validateFile(conferencePaper.conferencePaperFirstPage, "conferencePaperFirstPage", true);
    validateFile(conferencePaper.bestPaperAwardCertificateIfGot, "bestPaperAwardCertificateIfGot", false);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const payload = new FormData();
    payload.append("titleOfThePaper", conferencePaper.titleOfThePaper.trim());
    payload.append("nameOfTheConference", conferencePaper.nameOfTheConference.trim());
    payload.append("organizedBy", conferencePaper.organizedBy.trim());
    payload.append("scope", conferencePaper.scope);
    payload.append("fromDate", conferencePaper.fromDate);
    payload.append("toDate", conferencePaper.toDate);
    payload.append("modeOfConference", conferencePaper.modeOfConference);
    payload.append("venue", conferencePaper.venue.trim());
    payload.append("isbnNumber", conferencePaper.isbnNumber.trim())
    payload.append("Conference Proceedings Title", conferencePaper.conferenceProceedingsTitle.trim());
    payload.append("Publisher Name", conferencePaper.publisherName.trim());
    payload.append("Indexing Type", conferencePaper.indexingType.trim());
    payload.append("doi", conferencePaper.doYouHaveDoi);
    payload.append("Page Numbers(from-to)", conferencePaper.pageNumbersFromTo.trim());
    payload.append("Authors List", conferencePaper.authorsList.trim());
    payload.append("Affiliation Of Authors", conferencePaper.affiliationOfAuthors.trim());
    payload.append("Best Paper Award Certificate (if got)", conferencePaper.bestPaperAwardCertificateIfGot || "");
    payload.append("Conference Certificate", conferencePaper.conferenceCertificate);
    payload.append("Conference Paper First Page", conferencePaper.conferencePaperFirstPage);
    return payload;
  };

  const resetForm = () => {
    setConferencePaper({
      titleOfThePaper: "",
      nameOfTheConference: "",
      organizedBy: "",
      scope: "",
      fromDate: "",
      toDate: "",
      modeOfConference: "",
      venue: "",
      isbnNumber: "",
      conferenceProceedingsTitle: "",
      publisherName: "",
      indexingType: "",
      doYouHaveDoi: "",
      doiIfYes: "",
      pageNumbersFromTo: "",
      authorsList: "",
      affiliationOfAuthors: "",
      bestPaperAwardCertificateIfGot: null,
      conferenceCertificate: null,
      conferencePaperFirstPage: null,
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
      console.log("ConferencePaper payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Conference Paper Details
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="md:col-span-2">
            <InputField
              label="Title Of The Paper"
              name="titleOfThePaper"
              value={conferencePaper.titleOfThePaper}
              onChange={handleChange}
              error={errors.titleOfThePaper}
            />
          </div>

          <InputField
            label="Name Of The Conference"
            name="nameOfTheConference"
            value={conferencePaper.nameOfTheConference}
            onChange={handleChange}
            error={errors.nameOfTheConference}
          />

          <InputField
            label="Organized By"
            name="organizedBy"
            value={conferencePaper.organizedBy}
            onChange={handleChange}
            error={errors.organizedBy}
          />

          <SelectField
            label="Scope"
            name="scope"
            value={conferencePaper.scope}
            onChange={handleChange}
            options={["National", "International"]}
            error={errors.scope}
          />

          <InputField
            label="Date Of Conference (from)"
            name="fromDate"
            type="date"
            value={conferencePaper.dateOfConfromDateferenceFrom}
            onChange={handleChange}
            error={errors.fromDate}
          />

          <InputField
            label="Date Of Conference (to)"
            name="toDate"
            type="date"
            value={conferencePaper.toDate}
            onChange={handleChange}
            error={errors.toDate}
          />

          <SelectField
            label="Mode Of Conference"
            name="modeOfConference"
            value={conferencePaper.modeOfConference}
            onChange={handleChange}
            options={["Online", "Offline", "Hybrid"]}
            error={errors.modeOfConference}
          />

          <InputField
            label="Venue"
            name="venue"
            value={conferencePaper.venue}
            onChange={handleChange}
            error={errors.venue}
          />

          <InputField
            label="ISBN Number (for Proceedings)"
            name="isbnNumber"
            value={conferencePaper.isbnNumber}
            onChange={handleChange}
            placeholder="Eg: 1234-1234-12345"
            error={errors.isbnNumber}
          />

          <InputField
            label="Conference Proceedings Title"
            name="conferenceProceedingsTitle"
            value={conferencePaper.conferenceProceedingsTitle}
            onChange={handleChange}
            error={errors.conferenceProceedingsTitle}
          />

          <InputField
            label="Publisher Name"
            name="publisherName"
            value={conferencePaper.publisherName}
            onChange={handleChange}
            error= {errors.publisherName}
          />

          <InputField
            label="Indexing Type"
            name="indexingType"
            value={conferencePaper.indexingType}
            onChange={handleChange}
            placeholder="e.g. Scopus, WOS"
            error = {errors.indexingType}
          />

          <InputField
            label="DOI"
            name="doi"
            value={conferencePaper.doi}
            onChange={handleChange}
            error={errors.doi}
          />

          <InputField
            label="Page Numbers (from-to)"
            name="pageNumbersFromTo"
            value={conferencePaper.pageNumbersFromTo}
            onChange={handleChange}
            error = {errors.pageNumbersFromTo}
          />

          <InputField
            label="Number of Authors"
            name="noOfAuthors"
            value={conferencePaper.noOfAuthors}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            error = {errors.noOfAuthors}
          />

          <InputField
            label="Authors List"
            name="authorsList"
            value={conferencePaper.authorsList}
            onChange={handleChange}
            placeholder="e.g. Author A, Author B"
            error = {errors.authorsList}
          />

          <InputField
            label="Affiliation Of Authors"
            name="affiliationOfAuthors"
            value={conferencePaper.affiliationOfAuthors}
            onChange={handleChange}
            error={errors.affiliationOfAuthors}
          />

          <div className="md:col-span-2 space-y-4">
            <FileField
              label="Conference Certificate"
              name="conferenceCertificate"
              type="file"
              onChange={handleChange}
              error={errors.conferenceCertificate}
            />

            <FileField
              label="Conference Paper First Page"
              name="conferencePaperFirstPage"
              type="file"
              onChange={handleChange}
              error={errors.conferencePaperFirstPage}
            />

            <FileField
              label="Best Paper Award Certificate (If Obtained)"
              name="bestPaperAwardCertificateIfGot"
              type="file"
              onChange={handleChange}
              error={errors.bestPaperAwardCertificateIfGot}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Conference Paper
        </button>
      </form>
    </div>
  );
}
