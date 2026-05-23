import html2pdf from "html2pdf.js";
import { getResumeHTML } from "../templates/resumeTemplate";

export const generateResume = (student) => {
  const html = getResumeHTML(student);

  const container = document.createElement("div");
  container.innerHTML = html;

  html2pdf()
    .set({
      margin: 10,
      filename: `${student.fullName}_Resume.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    })
    .from(container)
    .save();
};