import React, { useState } from "react";
import InputField from "../FormComponents/InputField";
import FileField from "../FormComponents/FileField";
import SelectField from "../FormComponents/SelectField";

export default function JournalPublication() {
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

  const handleAdd = async (payload) => {
    setLoading(true);
    setMessage(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found. Please log in first.");
      }

      const typeKey = "journalPublication";

      await addCredential(userId, typeKey, payload);
      setMessage({ type: "success", text: "journalPublication details added successfully!" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to add journalPublication information." });
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

    if (journalPublication.doYouHaveIssnNumber === "Yes") {
      if (!journalPublication.issnNumberIfYes.trim()) {
        newErrors.issnNumberIfYes = "ISSN number is required";
      }
    }

    if (journalPublication.doYouHaveEIssnNumber === "Yes") {
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

    if (journalPublication.doYouHaveDoi === "Yes") {
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

  const buildPayload = () => {
    const payload = new FormData();
    payload.append("Title Of The Paper", journalPublication.titleOfThePaper.trim());
    payload.append("Name Of The Journal", journalPublication.nameOfTheJournal.trim());
    payload.append("Page Numbers(from-to)", journalPublication.pageNumbersFromTo.trim());
    payload.append("Year Of Publication", journalPublication.yearOfPublication.trim());
    payload.append("Volume Number", journalPublication.volumeNumber.trim());
    payload.append("Issue Number", journalPublication.issueNumber.trim());
    payload.append("Impact Factor", journalPublication.impactFactor.trim());
    payload.append("Is Thomson Reuters", journalPublication.isThomsonReuters);
    payload.append("scope", journalPublication.scope);
    payload.append("Do you have Issn Number", journalPublication.doYouHaveIssnNumber);
    payload.append("Issn Number (if yes)", journalPublication.doYouHaveIssnNumber === "Yes" ? journalPublication.issnNumberIfYes.trim() : "");
    payload.append("Do you have e-Issn Number", journalPublication.doYouHaveEIssnNumber);
    payload.append("e-Issn Number (if)", journalPublication.doYouHaveEIssnNumber === "Yes" ? journalPublication.eIssnNumberIf.trim() : "");
    payload.append("No. Of Authors", journalPublication.noOfAuthors.trim());
    payload.append("Author", journalPublication.author.trim());
    payload.append("Indexing Platform", journalPublication.indexingPlatform.trim());
    payload.append("H Index Of Journal", journalPublication.hIndexOfJournal.trim());
    payload.append("Do you have Doi", journalPublication.doYouHaveDoi);
    payload.append("Doi (if)", journalPublication.doYouHaveDoi === "Yes" ? journalPublication.doiIf.trim() : "");
    payload.append("First Page Of Journal", journalPublication.firstPageOfJournal);
    payload.append("Remarks", journalPublication.remarks.trim());
    return payload;
  };

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
      handleAdd(payload, journalPublication);
    } else {
      console.log("JournalPublication payload:", Object.fromEntries(payload.entries()));
    }

    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100">
        Journal Publication Details
      </h2>
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
                  value="Yes"
                  checked={journalPublication.isThomsonReuters === "Yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="isThomsonReuters"
                  value="No"
                  checked={journalPublication.isThomsonReuters === "No"}
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
                  value="Yes"
                  checked={journalPublication.doYouHaveIssnNumber === "Yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveIssnNumber"
                  value="No"
                  checked={journalPublication.doYouHaveIssnNumber === "No"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {journalPublication.doYouHaveIssnNumber === "Yes" && (
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
                  value="Yes"
                  checked={journalPublication.doYouHaveEIssnNumber === "Yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveEIssnNumber"
                  value="No"
                  checked={journalPublication.doYouHaveEIssnNumber === "No"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {journalPublication.doYouHaveEIssnNumber === "Yes" && (
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
                  value="Yes"
                  checked={journalPublication.doYouHaveDoi === "Yes"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="doYouHaveDoi"
                  value="No"
                  checked={journalPublication.doYouHaveDoi === "No"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {journalPublication.doYouHaveDoi === "Yes" && (
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
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-medium transition-colors w-full md:w-auto"
        >
          Add Publication
        </button>
      </form>
    </div>
  );
}
