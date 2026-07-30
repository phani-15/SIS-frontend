import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function ConferencePaper() {
  const navigate = useNavigate();
  const [conferencePaper, setConferencePaper] = useState({
    titleOfThePaper: "",
    nameOfTheConference: "",
    organizedBy: "",
    scope: "",
    fromDate: "",
    toDate: "",
    modeOfConference: "",
    venue: "",
    doYouHaveIsbnNumber: "",
    isbnNumberForProceedings: "",
    conferenceProceedingsTitle: "",
    publisherName: "",
    indexingType: "",
    doYouHaveDoi: "",
    doiIfYes: "",
    pageNumbersFromTo: "",
    noOfAuthors: "",
    authorsList: "",
    affiliationOfAuthors: "",
    bestPaperAwardCertificateIfGot: null,
    conferenceCertificate: null,
    conferencePaperFirstPage: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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

    if (!conferencePaper.doYouHaveIsbnNumber) {
      newErrors.doYouHaveIsbnNumber = "Please specify if you have an ISBN number";
    } else if (conferencePaper.doYouHaveIsbnNumber === "true") {
      if (!conferencePaper.isbnNumberForProceedings.trim()) {
        newErrors.isbnNumberForProceedings = "ISBN number is required";
      } else {
        const isbn = conferencePaper.isbnNumberForProceedings.replace(/[-\s]/g, "");
        if (!(isbn.length === 10 || isbn.length === 13)) {
          newErrors.isbnNumberForProceedings = "ISBN must be 10 or 13 digits";
        }
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

    if (!conferencePaper.doYouHaveDoi) {
      newErrors.doYouHaveDoi = "Please specify if you have a DOI";
    } else if (conferencePaper.doYouHaveDoi === "true") {
      if (!conferencePaper.doiIfYes.trim()) {
        newErrors.doiIfYes = "DOI is required";
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

  const buildPayload = () => ({
    titleOfThePaper: conferencePaper.titleOfThePaper.trim(),
    nameOfTheConference: conferencePaper.nameOfTheConference.trim(),
    organizedBy: conferencePaper.organizedBy.trim(),
    nationalInternational: conferencePaper.scope,
    dateOfConferenceFrom: conferencePaper.fromDate,
    dateOfConferenceTo: conferencePaper.toDate,
    modeOfConference: conferencePaper.modeOfConference,
    venue: conferencePaper.venue.trim(),
    doYouHaveIsbnNumber: conferencePaper.doYouHaveIsbnNumber === "true",
    isbnNumberForProceedings: conferencePaper.doYouHaveIsbnNumber === "true" ? conferencePaper.isbnNumberForProceedings.trim() : "",
    conferenceProceedingsTitle: conferencePaper.conferenceProceedingsTitle.trim(),
    publisherName: conferencePaper.publisherName.trim(),
    indexingType: conferencePaper.indexingType.trim(),
    doYouHaveDoi: conferencePaper.doYouHaveDoi === "true",
    doiIfYes: conferencePaper.doYouHaveDoi === "true" ? conferencePaper.doiIfYes.trim() : "",
    pageNumbersFromTo: conferencePaper.pageNumbersFromTo.trim(),
    authorsList: conferencePaper.authorsList.trim(),
    affiliationOfAuthors: conferencePaper.affiliationOfAuthors.trim(),
    bestPaperAwardCertificateIfGot: conferencePaper.bestPaperAwardCertificateIfGot || "",
    conferenceCertificate: conferencePaper.conferenceCertificate,
    conferencePaperFirstPage: conferencePaper.conferencePaperFirstPage,
  });

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
      doYouHaveIsbnNumber: "",
      isbnNumberForProceedings: "",
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

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const typeKey = "conferencePaper";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "Conference paper details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add conference paper information." });
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = buildPayload();

    if (handleAdd) {
      handleAdd(payload);
    } else {
      console.log("ConferencePaper payload:", payload);
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
          Conference Paper Details
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
            value={conferencePaper.fromDate}
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

          <div className="flex flex-col text-left space-y-2">
            <label className="text-gray-700 font-medium">Do you have ISBN Number?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveIsbnNumber"
                  value="true"
                  checked={conferencePaper.doYouHaveIsbnNumber === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveIsbnNumber"
                  value="false"
                  checked={conferencePaper.doYouHaveIsbnNumber === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
            {errors.doYouHaveIsbnNumber && (
              <small className="text-red-600 text-sm mt-1">{errors.doYouHaveIsbnNumber}</small>
            )}
          </div>

          {conferencePaper.doYouHaveIsbnNumber === "true" && (
            <InputField
              label="ISBN Number (for Proceedings)"
              name="isbnNumberForProceedings"
              value={conferencePaper.isbnNumberForProceedings}
              onChange={handleChange}
              placeholder="Eg: 1234-1234-12345"
              error={errors.isbnNumberForProceedings}
            />
          )}

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

          <div className="flex flex-col text-left space-y-2">
            <label className="text-gray-700 font-medium">Do you have DOI?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveDoi"
                  value="true"
                  checked={conferencePaper.doYouHaveDoi === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveDoi"
                  value="false"
                  checked={conferencePaper.doYouHaveDoi === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
            {errors.doYouHaveDoi && (
              <small className="text-red-600 text-sm mt-1">{errors.doYouHaveDoi}</small>
            )}
          </div>

          {conferencePaper.doYouHaveDoi === "true" && (
            <InputField
              label="DOI"
              name="doiIfYes"
              value={conferencePaper.doiIfYes}
              onChange={handleChange}
              error={errors.doiIfYes}
            />
          )}

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
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium transition-colors w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Conference Paper"}
        </button>
      </form>
    </div>
  );
}
