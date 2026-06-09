import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { generateResume } from "../utils/generateResume";
import ResumeGenerator from '../components/ResumeGenerator';
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
  User,
  GraduationCap,
  ExternalLink,
  Code,
  Cpu,
  Briefcase,
  Milestone,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkillValue, setNewSkillValue] = useState("");

  const [studentData, setStudentData] = useState({
    fullName: "Srinivas",
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
    disabilityType: '',
    profiles: { Linkedin: "linkedin.com/in/srinivas", Github: "github.com/srinivas" },
    phoneNumber: '9876543210',
    email: 'srinivas@jntugvcev.in',
    apaaId: 'APAA12345',
    photoUrl: '/images/profile.jpg',
    aadharNumber: '1234-5678-9012',
    batchYear: 2023,
    cgpa: 8.5,
    cgpaTarget: 10.0,
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
      "Python", "Java", "Web Development", "Data Structures",
      "Database Design", "Cloud Computing", "React.js", "Tailwind CSS"
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
        description: "Centralized platform for managing student data with modern UI and secure access.",
        year: 2024,
        type: "Full Stack"
      },
      {
        title: "E-Commerce Platform",
        description: "Full-stack web application with payment integration and optimized performance.",
        year: 2023,
        type: "Web Application"
      },
    ],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillValue.trim()) return;
    const payload = {
      type : "skill",
      skill: newSkillValue.trim(),
    };
    console.log(payload);
    setStudentData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkillValue.trim()],
    }));
    setNewSkillValue("");
    setShowSkillModal(false);
  };

  const tabs = [
    { key: "overview", label: "Overview", icon: <User size={18} /> },
    { key: "academic", label: "Academic", icon: <GraduationCap size={18} /> },
    { key: "skills", label: "Skills & Certs", icon: <Award size={18} /> },
  ];
  
  const navigate = useNavigate()

  const cgpaPct = Math.round((studentData.cgpa / (studentData.cgpaTarget || 10.0)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 font-['DM_Sans'] text-slate-800">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
                
                .font-comfortaa { font-family: 'Comfortaa', cursive; }
                
                .illustration-bg {
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: right bottom;
                    opacity: 0.1;
                    pointer-events: none;
                }
            `}</style>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* Header / Profile Summary Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="h-22 sm:h-28 bg-gradient-to-r from-[#1a365d] to-[#002045] relative overflow-hidden">
            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)' }}></div>
            {/* Hero Illustration - Student/Learning */}
            {/* <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/online-learning-2769745-2302770.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-4 sm:right-10 h-[90%] sm:h-[115%] object-contain object-bottom select-none pointer-events-none drop-shadow-2xl"
              style={{ maxWidth: '220px' }}
            /> */}
            {/* Decorative dots pattern */}
            <div className="absolute top-4 left-6 opacity-20" style={{ width: 80, height: 60, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
          </div>
          <div className="px-8 pb-8 flex flex-col md:flex-row items-center md:items-end -mt-16 gap-6 relative z-10">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-white p-1.5 shadow-lg overflow-hidden">
                <img
                  src={studentData.photoUrl}
                  alt={studentData.fullName}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-[#1a365d] text-white rounded-xl shadow-md hover:bg-[#002045] transition-all active:scale-90 opacity-0 group-hover:opacity-100">
                <Edit2 size={16} />
              </button>
            </div>

            {/* Name & Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-comfortaa text-3xl font-bold text-slate-900 mb-1 leading-tight">
                {studentData.fullName}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <GraduationCap size={16} className="text-[#1a365d]" />
                  {studentData.department} • {studentData.batchYear} Batch
                </span>
                <span className="flex items-center gap-1">
                  <Target size={16} className="text-[#1a365d]" />
                  {studentData.rollNumber}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowResumeModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1a365d] hover:bg-[#002045] text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#1a365d]/20 active:scale-95"
              >
                <FileText size={18} />
                Generate Resume
              </button>
              <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all active:scale-95">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar: Left Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* Quick Stats Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
              {/* Stats Illustration - visible, anchored top-right */}
              <img
                src="/images/stats.jpeg"
                alt=""
                aria-hidden="true"
                className="absolute -top-2 -right-2 w-28 sm:w-32 object-contain select-none pointer-events-none m-3 rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(26,54,93,0.12))' }}
              />
              <h3 className="font-comfortaa text-lg font-bold mb-6 flex items-center gap-2 text-[#1a365d]">
                <Target size={20} />
                Academic Stats
              </h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">CGPA</span>
                    <span className="text-3xl font-bold text-[#1a365d]">{studentData.cgpa}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1a365d] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${cgpaPct}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                    <span>Target: {studentData.cgpaTarget}</span>
                    <span>{cgpaPct}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#1a365d]/20 transition-colors">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Projects</p>
                    <p className="text-xl font-bold text-slate-800">{studentData.projects.length}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#1a365d]/20 transition-colors">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Certs</p>
                    <p className="text-xl font-bold text-slate-800">{studentData.certifications.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Socials */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="font-comfortaa text-lg font-bold mb-6 text-[#1a365d]">Connect</h3>
              <div className="space-y-4">
                <a href={`mailto:${studentData.email}`} className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a365d]/5 text-[#1a365d] border border-[#1a365d]/10 hover:bg-[#1a365d]/10 transition-all group">
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium truncate">{studentData.email}</span>
                </a>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 text-slate-600 border border-slate-100">
                  <Phone size={18} />
                  <span className="text-sm font-medium">{studentData.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <a href={`https://${studentData.profiles.Linkedin}`} target="_blank" rel="noreferrer" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#1a365d] hover:bg-[#1a365d]/5 transition-all">
                    <Phone size={20} />
                  </a>
                  <a href={`https://${studentData.profiles.Github}`} target="_blank" rel="noreferrer" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                    <Phone size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Content: Right Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Tab Switcher */}
            <div className="flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-fit self-center md:self-start">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key
                    ? "bg-[#1a365d] text-white shadow-md shadow-[#1a365d]/20"
                    : "text-slate-500 hover:text-[#1a365d] hover:bg-[#1a365d]/5"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex-grow relative overflow-hidden">

              {activeTab === "overview" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="absolute top-8 right-8 illustration-bg w-48 h-48" style={{ backgroundImage: `url('https://cdni.iconscout.com/illustration/premium/thumb/personal-data-security-4488057-3738541.png')`, opacity: 0.15 }}></div>

                  <div className="flex items-center gap-4 sm:h-38 rounded-2xl bg-gradient-to-r from-[#1a365d]/5 to-blue-50 border border-[#1a365d]/10 -mt-2 mb-4">
                    <img
                      src="/images/overview.webp"
                      alt="Web development illustration"
                      className="w-full h-full sm:w-full sm:h-full object-cover rounded-2xl shrink-0 select-none"
                    />
                  </div>

                  <section>
                    <h4 className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                      <Briefcase size={14} className="text-[#1a365d]" />
                      Personal Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                      {[
                        { label: "Father's Name", value: studentData.fatherName },
                        { label: "Mother's Name", value: studentData.motherName },
                        { label: "Date of Birth", value: new Date(studentData.dateOfBirth).toLocaleDateString(undefined, { dateStyle: 'long' }) },
                        { label: "Gender", value: studentData.gender },
                        { label: "Religion", value: studentData.religion },
                        { label: "Blood Group", value: studentData.bloodGroup },
                        { label: "Nationality", value: studentData.nationality },
                        { label: "Region", value: studentData.region },
                      ].map((item, i) => (
                        <div key={i}>
                          <p className="text-xs font-bold text-slate-400 mb-1">{item.label}</p>
                          <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="pt-8 border-t border-slate-100">
                    <h4 className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                      <MapPin size={14} className="text-[#1a365d]" />
                      Registration Info
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Aadhar Number</span>
                        <span className="text-sm font-bold text-slate-800 font-mono">{studentData.aadharNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Admission Type</span>
                        <span className="text-sm font-bold text-slate-800">{studentData.entryTypeCode}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Joining Date</span>
                        <span className="text-sm font-bold text-slate-800">{new Date(studentData.joiningDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Graduation Date</span>
                        <span className="text-sm font-bold text-slate-800">{new Date(studentData.graduationDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "academic" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="absolute top-8 right-8 illustration-bg w-48 h-48" style={{ backgroundImage: `url('https://cdni.iconscout.com/illustration/premium/thumb/education-3406180-2840742.png')`, opacity: 0.15 }}></div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#1a365d]/5 to-blue-50 border border-[#1a365d]/10 -mt-2 mb-2">
                    <img
                      src="/images/academics.jpg"
                      alt="Web development illustration"
                      className="w-20 h-20 sm:w-28 sm:h-28 object-contain flex-shrink-0 select-none"
                      style={{ filter: 'drop-shadow(0 2px 8px rgba(26,54,93,0.15))' }}
                    />
                    <div>
                      <p className="font-comfortaa font-bold text-[#1a365d] text-base sm:text-lg leading-tight">Academic History</p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{studentData.academicHistory.length} educational achievements</p>
                    </div>
                  </div>
                  <div className="relative z-10 space-y-6">
                    {studentData.academicHistory.map((record, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <BookOpen size={20} />
                          </div>
                          {i !== studentData.academicHistory.length - 1 && (
                            <div className="w-0.5 flex-grow bg-slate-100 my-2"></div>
                          )}
                        </div>
                        <div className="pb-6 w-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-bold text-slate-900">{record.degree}</h5>
                              <p className="text-sm text-slate-500">{record.institution}</p>
                            </div>
                            <div className="text-right">
                              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                {record.yearOfCompletion}
                              </span>
                              <p className="text-sm font-bold text-[#1a365d]">Grade: {record.grade}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Projects Sub-section */}
                  <section className="pt-8 border-t border-slate-100 relative z-10">
                    <h4 className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                      <Cpu size={14} className="text-[#1a365d]" />
                      Featured Projects
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {studentData.projects.map((project, i) => (
                        <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h5>
                            <ExternalLink size={14} className="text-slate-300" />
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {project.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 uppercase">{project.type}</span>
                            <span className="text-[10px] font-bold text-slate-400">{project.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  {/* Skills Illustration Banner */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#1a365d]/5 to-blue-50 border border-[#1a365d]/10 -mt-2 mb-2">
                    <img
                      src="/images/skills.jpg"
                      alt="Web development illustration"
                      className="w-20 h-20 sm:w-28 sm:h-28 object-contain flex-shrink-0 select-none"
                      style={{ filter: 'drop-shadow(0 2px 8px rgba(26,54,93,0.15))' }}
                    />
                    <div>
                      <p className="font-comfortaa font-bold text-[#1a365d] text-base sm:text-lg leading-tight">Skills & Certifications</p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{studentData.skills.length} technologies · {studentData.certifications.length} certifications earned</p>
                    </div>
                  </div>

                  <section className="relative z-10">
                    <h4 className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                      <Milestone size={14} className="text-[#1a365d]" />
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {studentData.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-default shadow-sm active:scale-95">
                          {skill}
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() => setShowSkillModal(true)}
                        className="px-4 py-2 rounded-xl bg-white border border-dashed border-slate-500 text-sm font-bold text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95"
                      >
                        Add +
                      </button>
                    </div>
                  </section>

                  <section className="relative z-10">
                    <div className="flex justify-between items-center">
                      <h4 className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Award size={14} className="text-blue-600" />
                        Professional Certifications
                      </h4>

                      <button
                        type="button"
                        onClick={()=>navigate('/add',{ state: { type : "certification" } })}
                        className="px-4 py-0.5 rounded-xl bg-white border border-dashed border-slate-500 text-sm font-bold text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95"
                      >
                        Add +
                      </button>
                    </div>
                    <div className="space-y-4">
                      {studentData.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 group hover:bg-white hover:shadow-md transition-all">
                          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                            <Award size={24} />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold text-slate-900 text-sm">{cert.name}</h5>
                            <p className="text-xs text-slate-500 font-medium">{cert.issuer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase">{new Date(cert.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Update Skill</h3>
                <p className="text-sm text-slate-500 mt-1">Enter a skill name to send the backend payload.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSkillModal(false)}
                className="text-slate-400 hover:text-slate-700 transition"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSkillSubmit} className="p-6 space-y-4">
              <label htmlFor="skillInput" className="block text-sm font-medium text-slate-700">Skill</label>
              <input
                id="skillInput"
                type="text"
                value={newSkillValue}
                onChange={(e) => setNewSkillValue(e.target.value)}
                placeholder="e.g. TypeScript"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 outline-none"
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-[#1a365d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#002045] transition"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap size={18} />
            </div>
            <span className="font-comfortaa font-bold text-xl text-slate-900 tracking-tight">SIS Dashboard</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            © 2026 JNTU-GV Vizianagaram. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Resume Generator Modal */}
      {showResumeModal && (
        <ResumeGenerator
          studentData={studentData}
          onClose={() => setShowResumeModal(false)}
        />
      )}
    </div>
  );
}
