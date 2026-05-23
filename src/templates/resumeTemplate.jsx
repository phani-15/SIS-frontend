export const getResumeHTML = (student) => {
  return `
  <div style="
    max-width:800px;
    margin:auto;
    padding:40px;
    font-family:Arial,sans-serif;
    color:#111;
    background:white;
  ">

    <!-- Header -->
    <div style="
      text-align:center;
      margin-bottom:20px;
      page-break-inside:avoid;
      break-inside:avoid;
    ">
      <h1 style="margin:0;font-size:32px;">
        ${student.fullName || ""}
      </h1>

      <p style="margin-top:10px;font-size:14px;">
        ${student.phoneNumber || ""}
        ${student.email ? ` | ${student.email}` : ""}
        ${student.address ? ` | ${student.address}` : ""}
      </p>
    </div>

    <!-- Summary -->
    <div style="
      page-break-inside:avoid;
      break-inside:avoid;
    ">
      <h2 style="border-bottom:2px solid #ddd;padding-bottom:5px;">
        SUMMARY
      </h2>

      <p>
        Computer Science student pursuing
        ${student.degreeCode || ""} in
        ${student.department || ""}.
        Current CGPA: ${student.cgpa || "-"}.
      </p>
    </div>

    ${
      student.academicHistory?.length
        ? `
        <div style="
          page-break-inside:avoid;
          break-inside:avoid;
          margin-top:25px;
        ">
          <h2 style="border-bottom:2px solid #ddd;padding-bottom:5px;">
            EDUCATION
          </h2>

          ${student.academicHistory
            .map(
              (edu) => `
              <div style="margin-bottom:12px;">
                <b>${edu.degree}</b>
                <span style="float:right;">
                  ${edu.yearOfCompletion || ""}
                </span>
                <br/>
                ${edu.institution || ""}
                <br/>
                Grade: ${edu.grade || ""}
              </div>
            `
            )
            .join("")}
        </div>
      `
        : ""
    }

    ${
      student.projects?.length
        ? `
        <div style="
          page-break-inside:avoid;
          break-inside:avoid;
          margin-top:25px;
        ">
          <h2 style="border-bottom:2px solid #ddd;padding-bottom:5px;">
            PROJECTS
          </h2>

          ${student.projects
            .map(
              (project) => `
              <div style="margin-bottom:15px;">
                <b>${project.title}</b>
                <span style="float:right;">
                  ${project.year || ""}
                </span>

                <ul>
                  <li>${project.description}</li>
                </ul>
              </div>
            `
            )
            .join("")}
        </div>
      `
        : ""
    }

    ${
      student.skills?.length
        ? `
        <div style="
          page-break-inside:avoid;
          break-inside:avoid;
          margin-top:25px;
        ">
          <h2 style="border-bottom:2px solid #ddd;padding-bottom:5px;">
            SKILLS
          </h2>

          <p>
            ${student.skills.join(" • ")}
          </p>
        </div>
      `
        : ""
    }

    ${
      student.certifications?.length
        ? `
        <div style="
          page-break-inside:avoid;
          break-inside:avoid;
          margin-top:25px;
        ">
          <h2 style="border-bottom:2px solid #ddd;padding-bottom:5px;">
            CERTIFICATIONS
          </h2>

          ${student.certifications
            .map(
              (cert) => `
              <div style="margin-bottom:10px;">
                <b>${cert.name}</b><br/>
                ${cert.issuer}
              </div>
            `
            )
            .join("")}
        </div>
      `
        : ""
    }

    ${
      student.gender ||
      student.dateOfBirth ||
      student.nationality ||
      student.bloodGroup
        ? `
        <div style="
          page-break-inside:avoid;
          break-inside:avoid;
          margin-top:25px;
        ">
          <h2 style="
            border-bottom:2px solid #ddd;
            padding-bottom:5px;
          ">
            PERSONAL DETAILS
          </h2>

          ${
            student.gender
              ? `<p><strong>Gender:</strong> ${student.gender}</p>`
              : ""
          }

          ${
            student.dateOfBirth
              ? `<p><strong>Date of Birth:</strong> ${student.dateOfBirth}</p>`
              : ""
          }

          ${
            student.nationality
              ? `<p><strong>Nationality:</strong> ${student.nationality}</p>`
              : ""
          }

          ${
            student.bloodGroup
              ? `<p><strong>Blood Group:</strong> ${student.bloodGroup}</p>`
              : ""
          }
        </div>
      `
        : ""
    }

  </div>
  `;
};