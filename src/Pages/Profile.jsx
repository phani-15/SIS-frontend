import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { generateResume } from "../utils/generateResume";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  FileText,
  Edit2,
  Download,
  Share2,
  LogOut,
  ChevronRight,
  User,
  GraduationCap,
} from "lucide-react";

export default function Profile() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const [studentData, setStudentData] = useState({
    fullName: "Polavarapu phani durga mani Srinivas Rao",
    rollNumber: "23VV1A0548",
    department: "CSE",
    degreeCode: "BTECH",
    entryTypeCode: "REGULAR",
    programId: "CSE",
    courseCode: "CS",
    gender: "Male",
    fatherName: "Surya",
    dateOfBirth: "2003-01-01",
    motherName: "Srilatha",
    region: "Amalapuram",
    nationality: "Indian",
    bloodGroup: "O+",
    religion: "Hindu",
    hasDisability: false,
    disabilityType: "",
    phoneNumber: "9876543210",
    email: "srinivas@jntugvcev.in",
    apaaId: "APAA12345",
    photoUrl: "/images/profile.jpg",
    aadharNumber: "1234-5678-9012",
    batchYear: 2023,
    cgpa: 8.5,
    graduationStatus: "Pursuing",
    graduationDate: "2027-06-30",
    joiningDate: "2023-08-01",
    address: "Amalapuram, Andhra Pradesh, India",
    academicHistory: [
      {
        institution: "JNTU-GV Vizianagaram",
        degree: "Bachelor of Technology",
        yearOfCompletion: 2027,
        grade: "Pursuing",
      },
      {
        institution: "Sri Chaitanya School",
        degree: "Intermediate (12th)",
        yearOfCompletion: 2021,
        grade: "A+",
      },
      {
        institution: "Sri Chaitanya School",
        degree: "SSC (10th)",
        yearOfCompletion: 2019,
        grade: "A+",
      },
    ],
    skills: [
      "Python",
      "Java",
      "Web Development",
      "Data Structures",
      "Database Design",
      "Cloud Computing",
    ],
    certifications: [
      {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2024-03-15",
      },
      {
        name: "Google Cloud Associate Cloud Engineer",
        issuer: "Google Cloud",
        date: "2024-01-20",
      },
    ],
    projects: [
      {
        title: "Student Information System",
        description: "Centralized platform for managing student data",
        year: 2024,
      },
      {
        title: "E-Commerce Platform",
        description: "Full-stack web application with payment integration",
        year: 2023,
      },
    ],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "academic", label: "Academic" },
    { key: "skills", label: "Skills & Certs" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,40px)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-30px)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-20px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInRight { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes iconPulse {
          0%,100%{box-shadow:0 4px 20px rgba(138,46,136,0.4),0 0 0 1px rgba(255,255,255,0.08) inset}
          50%{box-shadow:0 4px 30px rgba(138,46,136,0.65),0 0 0 1px rgba(255,255,255,0.13) inset}
        }

        .orb-1 { animation: orbFloat1 8s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 10s ease-in-out infinite; }
        .orb-3 { animation: orbFloat3 12s ease-in-out infinite; }
        .shimmer-bar { background:linear-gradient(90deg,#8A2E88,#C084C8,#8A2E88); background-size:200% 100%; animation:shimmer 3s linear infinite; }
        .page-in { animation: fadeInUp 0.65s ease forwards; }
        .icon-pulse { animation: iconPulse 3s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-[#0f0a1a] font-['DM_Sans'] relative overflow-hidden">
        {/* Orbs */}
        <div
          className="orb-1 absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[160px] -left-[140px]"
          style={{
            background:
              "radial-gradient(circle,rgba(138,46,136,0.3) 0%,transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="orb-2 absolute w-[500px] h-[500px] rounded-full pointer-events-none bottom-0 -right-[100px]"
          style={{
            background:
              "radial-gradient(circle,rgba(99,40,180,0.22) 0%,transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* Grid */}

        {/* ── Main content ── */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12">
          {/* ── Header card with avatar ── */}
          <div
            className={`relative rounded-[24px] overflow-hidden border border-[#8A2E88]/22 mb-8
            shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_32px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(138,46,136,0.1)]
            ${mounted ? "page-in" : "opacity-0"}`}
            style={{
              background: "rgba(20,10,35,0.72)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="shimmer-bar h-[3px] w-full" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 lg:p-10">
              {/* Avatar section */}
              <div className="flex flex-col items-center gap-4 md:w-1/4">
                <div
                  className="icon-pulse w-[120px] h-[120px] rounded-[20px] flex-shrink-0
                  bg-gradient-to-br from-[#8A2E88] to-[#C084C8]
                  flex items-center justify-center"
                  style={{ boxShadow: "0 8px 32px rgba(138,46,136,0.5)" }}
                >
                  {studentData.photoUrl ? (
                    <img
                      src={studentData.photoUrl}
                      alt={studentData.fullName}
                      className="w-full h-full rounded-[18px] object-cover"
                    />
                  ) : (
                    <User size={48} color="#fff" />
                  )}
                </div>
                <button
                  className="px-4 py-2 rounded-[10px] bg-[#8A2E88]/20 border border-[#8A2E88]/35
                  text-[0.8rem] font-medium text-[#C084C8] hover:bg-[#8A2E88]/35 transition-all"
                >
                  <Edit2 size={14} className="inline mr-1.5" />
                  Upload Photo
                </button>
              </div>

              {/* Info section */}
              <div className="flex-1">
                <div className="mb-4">
                  <h1 className="font-['Comfortaa'] font-bold text-[2rem] text-white tracking-[-0.02em]">
                    {studentData.fullName}
                  </h1>
                  <p className="text-[0.9rem] text-[#C8A0D7]/60 mt-1">
                    {studentData.courseCode} • Batch {studentData.batchYear}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: "Roll Number", value: studentData.rollNumber },
                    { label: "Department", value: studentData.department },
                    { label: "CGPA", value: studentData.cgpa },
                    { label: "Status", value: studentData.graduationStatus },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[0.68rem] font-semibold text-[#967AA5]/50 tracking-[0.06em] uppercase mb-1">
                        {item.label}
                      </span>
                      <span className="text-[0.95rem] font-semibold text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { icon: <Download size={16} />, label: "Resume" },
                    { icon: <FileText size={16} />, label: "Transcript" },
                    { icon: <Share2 size={16} />, label: "Share" },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (btn.label === "Resume") {
                          generateResume(studentData);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-[10px]
    bg-[#8A2E88]/15 border border-[#8A2E88]/30
    text-[0.8rem] font-medium text-[#C8A0D7]/80
    hover:bg-[#8A2E88]/25 hover:border-[#C084C8]/45 transition-all"
                    >
                      {btn.icon}
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-2 mb-6 border-b border-[#8A2E88]/20">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 font-medium text-[0.9rem] transition-all border-b-2
                  ${
                    activeTab === tab.key
                      ? "text-white border-[#C084C8]"
                      : "text-[#C8A0D7]/60 border-transparent hover:text-[#C8A0D7]/80"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab content ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Overview tab */}
              {activeTab === "overview" && (
                <>
                  {/* Personal Info */}
                  <div
                    className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    style={{
                      background: "rgba(20,10,35,0.65)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                      <h3 className="font-['DM_Sans'] font-semibold text-white text-[1rem]">
                        Personal Information
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {[
                        {
                          icon: <User size={16} />,
                          label: "Father",
                          value: studentData.fatherName,
                        },
                        {
                          icon: <User size={16} />,
                          label: "Mother",
                          value: studentData.motherName,
                        },
                        {
                          icon: <Calendar size={16} />,
                          label: "Date of Birth",
                          value: new Date(
                            studentData.dateOfBirth,
                          ).toLocaleDateString(),
                        },
                        {
                          icon: <MapPin size={16} />,
                          label: "Region",
                          value: studentData.region,
                        },
                        {
                          icon: <Mail size={16} />,
                          label: "Email",
                          value: studentData.email,
                        },
                        {
                          icon: <Phone size={16} />,
                          label: "Phone",
                          value: studentData.phoneNumber,
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-[#C084C8]/70 mt-0.5">
                            {item.icon}
                          </span>
                          <div className="flex-1">
                            <p className="text-[0.75rem] font-semibold text-[#967AA5]/60 uppercase tracking-[0.04em] mb-0.5">
                              {item.label}
                            </p>
                            <p className="text-[0.9rem] text-white">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div
                    className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    style={{
                      background: "rgba(20,10,35,0.65)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                      <h3 className="font-['DM_Sans'] font-semibold text-white text-[1rem]">
                        Additional Details
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {[
                        { label: "Blood Group", value: studentData.bloodGroup },
                        { label: "Religion", value: studentData.religion },
                        {
                          label: "Nationality",
                          value: studentData.nationality,
                        },
                        {
                          label: "Aadhar Number",
                          value: studentData.aadharNumber,
                        },
                        {
                          label: "Joining Date",
                          value: new Date(
                            studentData.joiningDate,
                          ).toLocaleDateString(),
                        },
                        {
                          label: "Graduation Date",
                          value: new Date(
                            studentData.graduationDate,
                          ).toLocaleDateString(),
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center pb-3 border-b border-white/[0.06] last:border-0"
                        >
                          <span className="text-[0.85rem] text-[#C8A0D7]/60">
                            {item.label}
                          </span>
                          <span className="text-[0.9rem] font-medium text-white">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Academic tab */}
              {activeTab === "academic" && (
                <div
                  className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
                  shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  style={{
                    background: "rgba(20,10,35,0.65)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                    <h3 className="font-['DM_Sans'] font-semibold text-white text-[1rem]">
                      Academic History
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {studentData.academicHistory.map((record, i) => (
                      <div
                        key={i}
                        className="flex gap-4 pb-4 border-b border-white/[0.06] last:border-0"
                      >
                        <div
                          className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#8A2E88] to-[#C084C8]
                          flex items-center justify-center text-white flex-shrink-0"
                        >
                          <BookOpen size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white mb-1">
                            {record.degree}
                          </p>
                          <p className="text-[0.85rem] text-[#C8A0D7]/60">
                            {record.institution}
                          </p>
                          <div className="flex justify-between mt-2 text-[0.8rem]">
                            <span className="text-[#967AA5]/60">
                              Completed: {record.yearOfCompletion}
                            </span>
                            <span className="text-[#C084C8]">
                              Grade: {record.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills tab */}
              {activeTab === "skills" && (
                <>
                  {/* Skills */}
                  <div
                    className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    style={{
                      background: "rgba(20,10,35,0.65)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                      <h3 className="font-['DM_Sans'] font-semibold text-white text-[1rem]">
                        Skills
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {studentData.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full bg-[#8A2E88]/25
                            border border-[#8A2E88]/40 text-[0.8rem] font-medium text-[#C084C8]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div
                    className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    style={{
                      background: "rgba(20,10,35,0.65)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                      <h3 className="font-['DM_Sans'] font-semibold text-white text-[1rem]">
                        Certifications
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {studentData.certifications.map((cert, i) => (
                        <div
                          key={i}
                          className="flex gap-4 pb-4 border-b border-white/[0.06] last:border-0"
                        >
                          <div
                            className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#8A2E88] to-[#C084C8]
                            flex items-center justify-center text-white flex-shrink-0"
                          >
                            <Award size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-white mb-1">
                              {cert.name}
                            </p>
                            <p className="text-[0.85rem] text-[#C8A0D7]/60">
                              {cert.issuer}
                            </p>
                            <p className="text-[0.8rem] text-[#967AA5]/60 mt-1">
                              {new Date(cert.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Quick Stats */}
              <div
                className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
                shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                style={{
                  background: "rgba(20,10,35,0.65)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                  <h3 className="font-['DM_Sans'] font-semibold text-white text-[1rem]">
                    Quick Stats
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    {
                      label: "Certificates",
                      value: studentData.certifications.length,
                    },
                    { label: "Projects", value: studentData.projects.length },
                    { label: "Skills", value: studentData.skills.length },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-[#C8A0D7]/60 text-[0.9rem]">
                        {stat.label}
                      </span>
                      <span className="font-bold text-[1.2rem] text-[#C084C8]">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div
                className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
                shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                style={{
                  background: "rgba(20,10,35,0.65)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                  <h3 className="font-['DM_Sans'] font-semibold text-white text-[1rem]">
                    Featured Projects
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  {studentData.projects.map((project, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-[12px] bg-[#8A2E88]/10 border border-[#8A2E88]/20
                      hover:bg-[#8A2E88]/15 transition-all cursor-pointer"
                    >
                      <p className="font-medium text-[0.9rem] text-white mb-1">
                        {project.title}
                      </p>
                      <p className="text-[0.75rem] text-[#C8A0D7]/50 line-clamp-2">
                        {project.description}
                      </p>
                      <p className="text-[0.75rem] text-[#967AA5]/60 mt-2">
                        {project.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-[#8A2E88]/15 py-5 mt-12">
          <p className="text-center text-[0.72rem] text-[#967AA5]/35">
            © 2026 JNTU-GV Vizianagaram. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
