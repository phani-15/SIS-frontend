import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addEntry } from "../../core/user";

export default function JournalPublication() {
  const navigate = useNavigate();
  const [journalPublication, setJournalPublication] = useState({
    titleOfThePaper: "",
    nameOfTheJournal: "",
    pageNumbersFromTo: "",
    yearOfPublication: "",
    volumeNumber: "",
    issueNumber: "",
    impactFactor: "",
    isThomsonReuters: "",
    scope: "",
    doYouHaveIssnNumber: "",
    issnNumberIfYes: "",
    doYouHaveEIssnNumber: "",
    eIssnNumberIf: "",
    noOfAuthors: "",
    author: "",
    indexingPlatform: "",
    hIndexOfJournal: "",
    doYouHaveDoi: "",
    doiIf: "",
    firstPageOfJournal: null,
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const typeKey = "journalPublication";

      await addEntry(typeKey, [payload]);
      setMessage({ type: "success", text: "Journal publication details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(-1)
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add journal publication information." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setJournalPublication((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!journalPublication.titleOfThePaper.trim()) {
      newErrors.titleOfThePaper = "Title of the paper is required";
    }

    if (!journalPublication.nameOfTheJournal.trim()) {
      newErrors.nameOfTheJournal = "Name of the journal is required";
    }

    if (!journalPublication.yearOfPublication.trim()) {
      newErrors.yearOfPublication = "Year of publication is required";
    } else {
      const year = Number(journalPublication.yearOfPublication);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 2) {
        newErrors.yearOfPublication = "Please enter a valid publication year";
      }
    }

    if (journalPublication.volumeNumber.trim()) {
      const vol = Number(journalPublication.volumeNumber);
      if (isNaN(vol) || vol <= 0 || !Number.isInteger(vol)) {
        newErrors.volumeNumber = "Volume number must be a positive integer";
      }
    }

    if (journalPublication.issueNumber.trim()) {
      const issue = Number(journalPublication.issueNumber);
      if (isNaN(issue) || issue <= 0 || !Number.isInteger(issue)) {
        newErrors.issueNumber = "Issue number must be a positive integer";
      }
    }

    if (journalPublication.impactFactor.trim()) {
      const impact = Number(journalPublication.impactFactor);
      if (isNaN(impact) || impact < 0) {
        newErrors.impactFactor = "Impact factor must be a non-negative number";
      }
    }

    if (!journalPublication.scope) {
      newErrors.scope = "Please select scope";
    }

    if (journalPublication.doYouHaveIssnNumber === "true") {
      if (!journalPublication.issnNumberIfYes.trim()) {
        newErrors.issnNumberIfYes = "ISSN number is required";
      }
    }

    if (journalPublication.doYouHaveEIssnNumber === "true") {
      if (!journalPublication.eIssnNumberIf.trim()) {
        newErrors.eIssnNumberIf = "e-ISSN number is required";
      }
    }

    if (!journalPublication.noOfAuthors.trim()) {
      newErrors.noOfAuthors = "Number of authors is required";
    } else {
      const num = Number(journalPublication.noOfAuthors);

      if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
        newErrors.noOfAuthors =
          "Number of authors must be a positive integer";
      } else {
        if (!journalPublication.author.trim()) {
          newErrors.author = "Author name is required";
        } else {
          const authors = journalPublication.author
            .split(",")
            .map((author) => author.trim())
            .filter((author) => author.length > 0);

          if (authors.length !== num) {
            newErrors.author = `Expected ${num} author${num > 1 ? "s" : ""}, but found ${authors.length}. Separate author names with commas.`;
          }
        }
      }
    }

    if (journalPublication.hIndexOfJournal.trim()) {
      const hIndex = Number(journalPublication.hIndexOfJournal);
      if (isNaN(hIndex) || hIndex < 0 || !Number.isInteger(hIndex)) {
        newErrors.hIndexOfJournal = "H-Index must be a non-negative integer";
      }
    }

    if (journalPublication.doYouHaveDoi === "true") {
      if (!journalPublication.doiIf.trim()) {
        newErrors.doiIf = "DOI string is required";
      }
    }

    if (!journalPublication.firstPageOfJournal) {
      newErrors.firstPageOfJournal = "First page document is required";
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(journalPublication.firstPageOfJournal.type)) {
        newErrors.firstPageOfJournal = "Only PDF, JPG, or PNG files are allowed";
      } else if (journalPublication.firstPageOfJournal.size > maxSizeMB * 1024 * 1024) {
        newErrors.firstPageOfJournal = `File must be smaller than ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    titleOfThePaper: journalPublication.titleOfThePaper.trim(),
    nameOfTheJournal: journalPublication.nameOfTheJournal.trim(),
    pageNumbersFromTo: journalPublication.pageNumbersFromTo.trim(),
    yearOfPublication: journalPublication.yearOfPublication.trim(),
    volumeNumber: journalPublication.volumeNumber.trim(),
    issueNumber: journalPublication.issueNumber.trim(),
    impactFactor: journalPublication.impactFactor.trim(),
    isThomsonReuters: journalPublication.isThomsonReuters === "true",
    nationalInternational: journalPublication.scope,
    doYouHaveIssnNumber: journalPublication.doYouHaveIssnNumber === "true",
    issnNumberIfYes: journalPublication.doYouHaveIssnNumber === "true" ? journalPublication.issnNumberIfYes.trim() : "",
    doYouHaveEIssnNumber: journalPublication.doYouHaveEIssnNumber === "true",
    eIssnNumberIf: journalPublication.doYouHaveEIssnNumber === "true" ? journalPublication.eIssnNumberIf.trim() : "",
    noOfAuthors: journalPublication.noOfAuthors.trim(),
    author: journalPublication.author.trim(),
    indexingPlatform: journalPublication.indexingPlatform.trim(),
    hIndexOfJournal: journalPublication.hIndexOfJournal.trim(),
    doYouHaveDoi: journalPublication.doYouHaveDoi === "true",
    doiIf: journalPublication.doYouHaveDoi === "true" ? journalPublication.doiIf.trim() : "",
    firstPageOfJournal: journalPublication.firstPageOfJournal,
    remarks: journalPublication.remarks.trim(),
  });

  const resetForm = () => {
    setJournalPublication({
      titleOfThePaper: "",
      nameOfTheJournal: "",
      pageNumbersFromTo: "",
      yearOfPublication: "",
      volumeNumber: "",
      issueNumber: "",
      impactFactor: "",
      isThomsonReuters: "",
      scope: "",
      doYouHaveIssnNumber: "",
      issnNumberIfYes: "",
      doYouHaveEIssnNumber: "",
      eIssnNumberIf: "",
      noOfAuthors: "",
      author: "",
      indexingPlatform: "",
      hIndexOfJournal: "",
      doYouHaveDoi: "",
      doiIf: "",
      firstPageOfJournal: null,
      remarks: "",
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
      console.log("JournalPublication payload:", payload);
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
          Journal Publication Details
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
              value={journalPublication.titleOfThePaper}
              onChange={handleChange}
              error={errors.titleOfThePaper}
            />
          </div>

          <InputField
            label="Name Of The Journal"
            name="nameOfTheJournal"
            value={journalPublication.nameOfTheJournal}
            onChange={handleChange}
            error={errors.nameOfTheJournal}
          />

          <InputField
            label="Year Of Publication"
            name="yearOfPublication"
            value={journalPublication.yearOfPublication}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            error={errors.yearOfPublication}
            placeholder="e.g. 2024"
          />

          <InputField
            label="Page Numbers (e.g. 120-135)"
            name="pageNumbersFromTo"
            value={journalPublication.pageNumbersFromTo}
            onChange={handleChange}
          />

          <InputField
            label="Volume Number"
            name="volumeNumber"
            value={journalPublication.volumeNumber}
            onChange={handleChange}
            error={errors.volumeNumber}
          />

          <InputField
            label="Issue Number"
            name="issueNumber"
            value={journalPublication.issueNumber}
            onChange={handleChange}
            error={errors.issueNumber}
          />

          <SelectField
            label="Scope"
            name="scope"
            value={journalPublication.scope}
            onChange={handleChange}
            options={["National", "International"]}
            error={errors.scope}
          />
          
          <InputField
            label="Impact Factor"
            name="impactFactor"
            value={journalPublication.impactFactor}
            onChange={handleChange}
            error={errors.impactFactor}
          />

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Is Thomson Reuters?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="isThomsonReuters"
                  value="true"
                  checked={journalPublication.isThomsonReuters === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="isThomsonReuters"
                  value="false"
                  checked={journalPublication.isThomsonReuters === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Do you have ISSN Number?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveIssnNumber"
                  value="true"
                  checked={journalPublication.doYouHaveIssnNumber === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveIssnNumber"
                  value="false"
                  checked={journalPublication.doYouHaveIssnNumber === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {journalPublication.doYouHaveIssnNumber === "true" && (
            <InputField
              label="ISSN Number"
              name="issnNumberIfYes"
              value={journalPublication.issnNumberIfYes}
              onChange={handleChange}
              error={errors.issnNumberIfYes}
            />
          )}

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Do you have e-ISSN Number?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveEIssnNumber"
                  value="true"
                  checked={journalPublication.doYouHaveEIssnNumber === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveEIssnNumber"
                  value="false"
                  checked={journalPublication.doYouHaveEIssnNumber === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {journalPublication.doYouHaveEIssnNumber === "true" && (
            <InputField
              label="e-ISSN Number"
              name="eIssnNumberIf"
              value={journalPublication.eIssnNumberIf}
              onChange={handleChange}
              error={errors.eIssnNumberIf}
            />
          )}

          <InputField
            label="No. Of Authors"
            name="noOfAuthors"
            value={journalPublication.noOfAuthors}
            onChange={handleChange}
            error={errors.noOfAuthors}
          />

          <InputField
            label="Author(s)"
            name="author"
            value={journalPublication.author}
            onChange={handleChange}
            error={errors.author}
            placeholder="e.g. Author 1, Author 2"
          />

          <InputField
            label="Indexing Platform"
            name="indexingPlatform"
            value={journalPublication.indexingPlatform}
            onChange={handleChange}
            placeholder="e.g. Scopus, Web of Science"
          />

          <InputField
            label="H-Index Of Journal"
            name="hIndexOfJournal"
            value={journalPublication.hIndexOfJournal}
            onChange={handleChange}
            error={errors.hIndexOfJournal}
          />

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label className="text-gray-700 font-medium">Do you have DOI?</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveDoi"
                  value="true"
                  checked={journalPublication.doYouHaveDoi === "true"}
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
                  checked={journalPublication.doYouHaveDoi === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {journalPublication.doYouHaveDoi === "true" && (
            <InputField
              label="DOI"
              name="doiIf"
              value={journalPublication.doiIf}
              onChange={handleChange}
              error={errors.doiIf}
            />
          )}

          <div className="md:col-span-2">
            <InputField
              label="Remarks"
              name="remarks"
              value={journalPublication.remarks}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <FileField
              label="First Page Of Journal Paper"
              name="firstPageOfJournal"
              type="file"
              onChange={handleChange}
              error={errors.firstPageOfJournal}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium transition-colors w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Publication"}
        </button>
      </form>
    </div>
  );
}
