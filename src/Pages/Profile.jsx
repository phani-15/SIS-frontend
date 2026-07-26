import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { generateResume } from "../utils/generateResume";
import ResumeGenerator from '../components/ResumeGenerator';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
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
import { fetchUserData, updateUserProfile } from "../core/user";
import { credentialTypes } from "./AddCreds";
import CredDataJson from "../assets/CredData.json";

// Import Credentials Display Components
import Internship from "../components/Credentials/Internship";
import Competitions from "../components/Credentials/Competitions";
import Placement from "../components/Credentials/Placement";
import ProjectsDisplay from "../components/Credentials/Projects";
import Certification from "../components/Credentials/Certification";
import ExtraCurricularActivities from "../components/Credentials/ExtraCurricularActivities";
import CoCurricularActivities from "../components/Credentials/CoCurricularActivities";
import ProfessionalBodies from "../components/Credentials/ProfessionalBodies";
import SkillsDisplay from "../components/Credentials/Skills";
import JournalPublication from "../components/Credentials/JournalPublication";
import ConferencePaper from "../components/Credentials/ConferencePaper";
import Patent from "../components/Credentials/Patent";
import Scholarships from "../components/Credentials/Scholarships";
import EntranceExaminations from "../components/Credentials/EntranceExaminations";

export default function Profile() {
  const [mounted, setMounted] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkillValue, setNewSkillValue] = useState("");

  const CredData = CredDataJson;
  const credentialMap = Object.fromEntries(
    (CredData || []).map((item) => [item.type, item.items || []])
  );

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
    skills: credentialMap.skills || [],
    certifications: credentialMap.certification || [],
    projects: credentialMap.projects || [],
    internship: credentialMap.internship || [],
    competitions: credentialMap.competitions || [],
    placement: credentialMap.placement || [],
    certification: credentialMap.certification || [],
    extraCurricular: credentialMap.extra_curricular_activities || [],
    coCurricular: credentialMap.co_curricular_activities || [],
    professionalBodies: credentialMap.professional_bodies || [],
    journalPublication: credentialMap.journal_publication || [],
    conferencePaper: credentialMap.conference_paper || [],
    patent: credentialMap.patent || [],
    scholarships: credentialMap.scholarships || [],
    entranceExaminations: credentialMap.entrance_examinations || [],
  });

  useEffect(() => {
    setMounted(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData().then((res) => {
        if (res.data) {
          setStudentData((prev) => ({ ...prev, ...res.data }));
        }
      }).catch(() => {});
    }
  }, []);

  const getItemsForType = (typeKey) => {
    const snakeCaseKey = typeKey.replace(/([A-Z])/g, "_$1").toLowerCase();
    let altKeys = [typeKey, snakeCaseKey];
    if (typeKey === 'extraCurricular') altKeys.push('extra_curricular_activities');
    if (typeKey === 'coCurricular') altKeys.push('co_curricular_activities');
    if (typeKey === 'professionalBodies') altKeys.push('professional_bodies');
    if (typeKey === 'journalPublication') altKeys.push('journal_publication');
    if (typeKey === 'conferencePaper') altKeys.push('conference_paper');
    if (typeKey === 'entranceExaminations') altKeys.push('entrance_examinations');
    
    for (const key of altKeys) {
      if (studentData[key] && Array.isArray(studentData[key])) {
        return studentData[key];
      }
    }
    return [];
  };

  const navigate = useNavigate();
  const location = useLocation();

  const activeSegment = location.pathname.split('/').filter(Boolean).pop() || "";
  const activeView = activeSegment === 'profile' ? 'Overview' : activeSegment;

  const cgpaPct = Math.round((studentData.cgpa / (studentData.cgpaTarget || 10.0)) * 100);

  function Overview() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Card */}
          
        </div>

        {/* Academic History Timeline */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <h3 className="font-comfortaa text-lg font-bold text-[#1a365d] mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
            <BookOpen size={18} />
            Academic Timeline
          </h3>
          <div className="relative border-l-2 border-slate-100 ml-4 pl-6 space-y-6 py-2">
            {studentData.academicHistory.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-[#1a365d] rounded-full h-4 w-4 border-2 border-white shadow-3xs"></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {item.yearOfCompletion} • Grade: {item.grade}
                  </span>
                  <h4 className="text-base font-bold text-slate-800 mt-1">{item.degree}</h4>
                  <p className="text-sm font-semibold text-slate-500">{item.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['DM_Sans'] text-slate-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-comfortaa { font-family: 'Comfortaa', cursive; }
      `}</style>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* Header / Profile Summary Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="h-22 sm:h-28 bg-linear-to-r from-[#1a365d] to-[#002045] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)' }}></div>
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
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-comfortaa text-lg font-bold mb-4 text-[#1a365d]">Profile Navigation</h3>
              
              <button
                onClick={() => navigate('/student/profile')}
                className={`w-full text-left rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeView === 'Overview' ? 'bg-[#1a365d] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-[#1a365d]/5 hover:text-[#1a365d]'}`}
              >
                Overview
              </button>

              {Object.entries(credentialTypes).map(([label, pathValue]) => (
                <button
                  key={label}
                  onClick={() => navigate(`/student/profile/${pathValue}`)}
                  className={`w-full text-left rounded-2xl px-4 py-3 text-sm font-semibold transition flex items-center justify-between ${activeView === pathValue ? 'bg-[#1a365d] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-[#1a365d]/5 hover:text-[#1a365d]'}`}
                >
                  <span>{label}</span>
                  <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-bold ${activeView === pathValue ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {getItemsForType(pathValue).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Content Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Explorer-style Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-3xs mb-6 select-none">
              <span className="material-symbols-outlined text-[20px] text-slate-400">folder_open</span>
              <span className="hover:text-[#1a365d] cursor-pointer" onClick={() => navigate('/student/profile')}>student</span>
              <span className="text-slate-300">/</span>
              <span className="hover:text-[#1a365d] cursor-pointer" onClick={() => navigate('/student/profile')}>profile</span>
              {activeView !== 'Overview' && (
                <>
                  <span className="text-slate-300">/</span>
                  <span className="text-[#1a365d] bg-blue-50/50 border border-blue-100/50 px-2 py-0.5 rounded-md font-bold">
                    {Object.keys(credentialTypes).find(key => credentialTypes[key] === activeView) || activeView}
                  </span>
                </>
              )}
            </div>

            {/* Routes for sub-components */}
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/internship" element={<Internship items={getItemsForType('internship')} />} />
              <Route path="/competitions" element={<Competitions items={getItemsForType('competitions')} />} />
              <Route path="/placement" element={<Placement items={getItemsForType('placement')} />} />
              <Route path="/projects" element={<ProjectsDisplay items={getItemsForType('projects')} />} />
              <Route path="/certification" element={<Certification items={getItemsForType('certification')} />} />
              <Route path="/extraCurricular" element={<ExtraCurricularActivities items={getItemsForType('extraCurricular')} />} />
              <Route path="/coCurricular" element={<CoCurricularActivities items={getItemsForType('coCurricular')} />} />
              <Route path="/professionalBodies" element={<ProfessionalBodies items={getItemsForType('professionalBodies')} />} />
              <Route path="/skills" element={<SkillsDisplay items={getItemsForType('skills')} />} />
              <Route path="/journalPublication" element={<JournalPublication items={getItemsForType('journalPublication')} />} />
              <Route path="/conferencePaper" element={<ConferencePaper items={getItemsForType('conferencePaper')} />} />
              <Route path="/patent" element={<Patent items={getItemsForType('patent')} />} />
              <Route path="/scholarships" element={<Scholarships items={getItemsForType('scholarships')} />} />
              <Route path="/entranceExaminations" element={<EntranceExaminations items={getItemsForType('entranceExaminations')} />} />
            </Routes>
          </div>

        </div>
      </main>

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
