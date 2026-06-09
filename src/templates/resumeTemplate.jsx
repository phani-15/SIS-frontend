export const getResumeHTML = (student) => {
  return `
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <div style="
    width: 100%;
    max-width: 800px;
    min-height: 1000px;
    background: white;
    font-family: 'Raleway', Arial, sans-serif;
    color: #333;
    box-sizing: border-box;
    overflow: hidden;
  ">

    <!-- HEADER BAND -->
    <div style="
      background: #6d6d6d;
      padding: 18px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      box-sizing: border-box;
    ">
      <h1 style="
        margin: 0;
        color: white;
        font-size: 32px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
        word-break: break-word;
        flex: 1;
      ">
        ${student.fullName || ""}
      </h1>

      ${
        student.photoUrl
          ? `<img
              src="${student.photoUrl}"
              style="
                width: 80px;
                height: 80px;
                border-radius: 6px;
                object-fit: cover;
                border: 3px solid rgba(255,255,255,0.4);
                flex-shrink: 0;
              "
            />`
          : ""
      }
    </div>

    <!-- BODY -->
    <div style="padding: 20px 30px; box-sizing: border-box;">

      <!-- META SECTION -->
      <div style="margin-bottom: 14px;">
        ${metaRow("Status", `${student.degreeCode || ""} in ${student.department || ""} | CGPA: ${student.cgpa || "-"}`)}
        ${metaRow("Email", student.email || "-")}
        ${metaRow("Contact", `${student.phoneNumber || ""}${student.address ? " | " + student.address : ""}`)}
      </div>

      <!-- SUMMARY -->
      ${sectionTitle("Summary")}
      <p style="
        font-size: 13px;
        line-height: 1.65;
        color: #444;
        margin: 6px 0 14px 0;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
      ">
        ${student.degreeCode || ""} student in ${student.department || ""} with a strong foundation in software development, cloud computing, and web technologies. CGPA: ${student.cgpa || "-"}. Passionate about problem-solving and building scalable applications.
      </p>

      <!-- EDUCATION -->
      ${
        student.academicHistory?.length
          ? `
        ${sectionTitle("Education")}
        ${student.academicHistory.map((edu) => educationBlock(
          edu.degree || "",
          edu.institution || "",
          edu.yearOfCompletion || "",
          `Grade: ${edu.grade || "-"}`
        )).join("")}
      `
          : ""
      }

      <!-- SKILLS -->
      ${
        student.skills?.length
          ? `
        ${sectionTitle("Skills")}
        <div style="
          display: flex;
          flex-wrap: wrap;
          gap: 4px 24px;
          margin-bottom: 10px;
          padding-left: 8px;
        ">
          ${student.skills.map((skill) => `
            <div style="
              font-size: 13px;
              color: #444;
              line-height: 1.8;
              display: flex;
              align-items: center;
              gap: 6px;
              min-width: 160px;
            ">
              <span style="
                color: #5a5a78;
                font-size: 10px;
                flex-shrink: 0;
              ">●</span>
              ${skill}
            </div>
          `).join("")}
        </div>
      `
          : ""
      }

      <!-- PROJECTS -->
      ${
        student.projects?.length
          ? `
        ${sectionTitle("Projects")}
        ${student.projects.map((project) => eventBlock(
          project.year || "",
          project.title || "",
          "Academic / Personal Project",
          project.description || ""
        )).join("")}
      `
          : ""
      }

      <!-- CERTIFICATIONS -->
      ${
        student.certifications?.length
          ? `
        ${sectionTitle("Certifications")}
        ${student.certifications.map((cert) => certificationBlock(
          cert.name || "",
          cert.issuer || "",
          cert.date ? new Date(cert.date).getFullYear() : ""
        )).join("")}
      `
          : ""
      }

    </div>

    <!-- FOOTER BAND -->
    <div style="
      background: #6d6d6d;
      padding: 10px 30px;
      text-align: center;
      box-sizing: border-box;
    ">
      <span style="
        color: white;
        font-size: 12px;
        font-weight: 500;
        word-break: break-all;
      ">
        ${student.email || ""}${student.phoneNumber ? ` • ${student.phoneNumber}` : ""}
      </span>
    </div>

  </div>
  `;
};

/* ===========================
   SECTION TITLE
=========================== */
const sectionTitle = (title) => `
  <div style="
    background: #5a5a78;
    color: white;
    padding: 6px 12px;
    margin-top: 12px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    box-sizing: border-box;
  ">
    ${title}
  </div>
`;

/* ===========================
   META ROW
=========================== */
const metaRow = (label, value) => `
  <div style="
    display: flex;
    margin-bottom: 4px;
    align-items: flex-start;
    gap: 8px;
  ">
    <div style="
      min-width: 75px;
      font-weight: 700;
      color: #5a5a78;
      font-size: 12px;
      flex-shrink: 0;
      padding-top: 1px;
    ">
      ▶ ${label}:
    </div>
    <div style="
      flex: 1;
      font-size: 12px;
      color: #444;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
      min-width: 0;
    ">
      ${value}
    </div>
  </div>
`;

/* ===========================
   EDUCATION BLOCK
=========================== */
const educationBlock = (degree, institution, year, grade) => `
  <div style="
    margin-bottom: 10px;
    page-break-inside: avoid;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
  ">
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    ">
      <div style="flex: 1; min-width: 0;">
        <div style="
          font-size: 13px;
          font-weight: 700;
          color: #333;
          word-wrap: break-word;
          overflow-wrap: break-word;
        ">
          ${degree}
        </div>
        <div style="
          font-size: 12px;
          color: #666;
          margin-top: 2px;
          font-weight: 600;
          word-wrap: break-word;
          overflow-wrap: break-word;
        ">
          ${institution}
        </div>
      </div>

      <div style="
        text-align: right;
        flex-shrink: 0;
        font-size: 12px;
        color: #6d6d6d;
        font-weight: 700;
        min-width: 90px;
        max-width: 130px;
      ">
        <div>${year}</div>
        <div style="font-size: 11px; font-weight: 600; margin-top: 2px; white-space: nowrap;">${grade}</div>
      </div>
    </div>
  </div>
`;

/* ===========================
   EVENT BLOCK (Projects)
=========================== */
const eventBlock = (year, title, subtitle, description) => `
  <div style="
    margin-bottom: 10px;
    page-break-inside: avoid;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
  ">
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 4px;
    ">
      <div style="flex: 1; min-width: 0;">
        <div style="
          font-size: 13px;
          font-weight: 700;
          color: #333;
          word-wrap: break-word;
          overflow-wrap: break-word;
        ">
          ${title}
        </div>
        <div style="
          font-size: 12px;
          color: #666;
          margin-top: 2px;
          font-weight: 600;
        ">
          ${subtitle}
        </div>
      </div>

      <div style="
        color: #6d6d6d;
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;
        white-space: nowrap;
        min-width: 40px;
        text-align: right;
      ">
        ${year}
      </div>
    </div>

    <div style="
      font-size: 12px;
      color: #444;
      line-height: 1.5;
      padding-left: 10px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    ">
      ▶ ${description}
    </div>
  </div>
`;

/* ===========================
   CERTIFICATION BLOCK
=========================== */
const certificationBlock = (name, issuer, year) => `
  <div style="
    margin-bottom: 8px;
    page-break-inside: avoid;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 6px;
  ">
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    ">
      <div style="flex: 1; min-width: 0;">
        <div style="
          font-size: 13px;
          font-weight: 700;
          color: #333;
          word-wrap: break-word;
          overflow-wrap: break-word;
        ">
          ${name}
        </div>
        <div style="
          font-size: 12px;
          color: #666;
          margin-top: 2px;
          font-weight: 500;
          word-wrap: break-word;
          overflow-wrap: break-word;
        ">
          ${issuer}
        </div>
      </div>

      <div style="
        color: #6d6d6d;
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;
        white-space: nowrap;
        min-width: 40px;
        text-align: right;
      ">
        ${year}
      </div>
    </div>
  </div>
`;