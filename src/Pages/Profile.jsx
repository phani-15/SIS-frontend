import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { generateResume } from "../utils/generateResume";
import ResumeGenerator from '../components/ResumeGenerator';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Calendar, Award, BookOpen, FileText, Edit2, Download, ChevronRight,
  Share2, User, GraduationCap, ExternalLink, Code, Cpu, Briefcase, Milestone, Target, Users, Scroll,
  Clipboard, Star, Trophy
} from "lucide-react";
import { fetchMyProfile, fetchPortfolioCounts, getEntries } from "../core/user";
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

import AddInternship from "./Forms/Internship";
import AddCompetitions from "./Forms/Competitions";
import AddPlacement from "./Forms/Placement";
import AddProjects from "./Forms/Projects";
import AddCertification from "./Forms/Certification";
import AddExtraCurricularActivities from "./Forms/ExtraCurricularActivities";
import AddCoCurricularActivities from "./Forms/CoCurricularActivities";
import AddProfessionalBodies from "./Forms/ProfessionalBodies";
import AddSkills from "./Forms/Skills";
import AddJournalPublication from "./Forms/JournalPublication";
import AddConferencePaper from "./Forms/ConferencePaper";
import AddPatent from "./Forms/Patent";
import AddScholarships from "./Forms/Scholarships";
import AddEntranceExaminations from "./Forms/EntranceExaminations";

const FALLBACK_SECTION_DATA = {
  internship: [
    {
      title: "Software Development Intern",
      organizationCompanyName: "TCS Digital",
      industryMentor: "Ravi Kumar",
      facultyMentor: "Dr. Priya Rao",
      startDate: "2024-05-01",
      endDate: "2024-07-31",
      amount: "15000",
      isStipendBased: "yes",
      status: "Completed",
      certificate: "demo-certificate-1"
    },
    {
      title: "Frontend Developer Intern",
      organizationCompanyName: "Infosys Springboard",
      industryMentor: "Nikhil Reddy",
      facultyMentor: "Dr. Suresh Babu",
      startDate: "2023-12-01",
      endDate: "2024-02-15",
      amount: "12000",
      isStipendBased: "yes",
      status: "Completed",
      certificate: "demo-certificate-2"
    }
  ],
  competition: [
    {
      competitionName: "Smart India Hackathon",
      organizingInstitutionCompany: "AICTE",
      competitionCategory: "Innovation",
      eventLevel: "National",
      mode: "Hybrid",
      presentedProjectIdeaTitle: "AI based attendance analytics",
      themeDomain: "Machine Learning",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      typeOfParticipation: "Team",
      teamName: "ByteForce",
      teamSize: 4,
      rankSecured: "2nd Runner Up",
      prizeMoney: "25000",
      awardRecieved: "Yes",
      awardName: "Runner Up"
    },
    {
      competitionName: "CodeSprint Challenge",
      organizingInstitutionCompany: "JNTU-GV",
      competitionCategory: "Coding",
      eventLevel: "College",
      mode: "Online",
      presentedProjectIdeaTitle: "Campus resource planner",
      themeDomain: "Web Development",
      startDate: "2023-10-05",
      endDate: "2023-10-06",
      typeOfParticipation: "Individual",
      teamName: "",
      teamSize: 1,
      rankSecured: "1st",
      prizeMoney: "5000",
      awardRecieved: "Yes",
      awardName: "Winner"
    }
  ]
};

export default function Profile() {
  const [mounted, setMounted] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkillValue, setNewSkillValue] = useState("");
  const [counts, setCounts] = useState({
    "internship": 4,
    "placement": 5,
    "certification": 3,
    "extraCurricular": 4,
    "coCurricular": 4,
    "scholarships": 3,
    "competitions": 2,
    "projects": 4,
    "entranceExaminations": 2,
    "professionalBodies": 5,
    "journalPublication": 1,
    "conferencePaper": 5,
    "patent": 4
  });

  const [sectionData, setSectionData] = useState({
    internship: FALLBACK_SECTION_DATA.internship,
    competition: FALLBACK_SECTION_DATA.competition,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const sectionIcon = {
    Overview: User,
    Internship: Briefcase,
    Competitions: Trophy,
    Placement: Target,
    Projects: Code,
    Certification: FileText,
    'Extra Curricular Activities': Star,
    'Co-Curricular Activities': BookOpen,
    'Professional Bodies': Users,
    Skills: Cpu,
    'Journal Publication': Scroll,
    'Conference Paper': Clipboard,
    Patent: Award,
    Scholarships: Award,
    'Entrance Examinations': BookOpen,
  };

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

    fetchPortfolioCounts().then((res) => {
      if (res.data) {
        console.log(res.data)
        setCounts(res.data);
      }
    }).catch(() => { });
  }, []);

  useEffect(() => {
    const segment = location.pathname.split('/').filter(Boolean).pop() || "";
    const view = segment === 'profile' ? '' : segment;

    if (!view) return;
    if (view.substring(0, 3).toLocaleLowerCase().includes("add"))
      return

    getEntries(view)
      .then((res) => {
        const nextItems = Array.isArray(res?.data) && res.data.length > 0
          ? res.data
          : (FALLBACK_SECTION_DATA[view] || []);

        console.log(res.data)

        setSectionData((prev) => ({ ...prev, [view]: nextItems }));
      })
      .catch(() => {
        setSectionData((prev) => ({ ...prev, [view]: FALLBACK_SECTION_DATA[view] || [] }));
      });
  }, [location.pathname]);

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

  const fetchdata = async () => {
    try {
      const [profileRes, skillsRes] = await Promise.all([
        fetchMyProfile(),
        getEntries('skills').catch(() => ({ data: [] })),
      ]);
      if (profileRes.data) {
        const portfolio = profileRes.data.portfolio || {};
        const skills = Array.isArray(skillsRes.data) ? skillsRes.data : [];
        setStudentData((prev) => ({
          ...prev,
          rollNumber: profileRes.data.rollNumber || prev.rollNumber,
          ...portfolio,
          projects: (portfolio.projects || []).map((p) => ({
            title: p.projectTitle || p.title || '',
            year: p.academicYear || p.year || '',
            description: p.projectDomain || p.technologiesUsed || '',
          })),
          certifications: (portfolio.certification || []).map((c) => ({
            name: c.typeOfCertification || c.name || '',
            issuer: c.domainSkillArea || c.issuer || '',
          })),
          achievements: (portfolio.competitions || []).map((c) =>
            c.awardReceived
              ? `${c.competitionName} — ${c.awardReceived}`
              : c.competitionName || '',
          ),
          skills,
        }));
      }
    } catch (e) { }
  }

  const handleAddEntry = async (typeKey, payload) => {
    try {
      if (typeKey === "skills") {
        await addSkills([payload.skill]);
      } else {
        await addEntry(typeKey, [payload]);
      }

      // Fetch updated profile counts
      fetchPortfolioCounts().then((res) => {
        if (res.data) setCounts(res.data);
      }).catch(() => { });

      // Fetch updated section data
      getEntries(typeKey)
        .then((res) => {
          const nextItems = Array.isArray(res?.data) && res.data.length > 0
            ? res.data
            : (FALLBACK_SECTION_DATA[typeKey] || []);
          setSectionData((prev) => ({ ...prev, [typeKey]: nextItems }));
        })
        .catch(() => { });

      // Navigate back to the specific category display page
      navigate(`/student/profile/${typeKey}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add entry. Please try again.");
    }
  };

  const activeSegment = location.pathname.split('/').filter(Boolean).pop() || "";
  const activeView = activeSegment === 'profile' ? 'Overview' : activeSegment;

  const cgpaPct = Math.round((studentData.cgpa / (studentData.cgpaTarget || 10.0)) * 100);

  const colorRamp = [
    { bg: "bg-blue-50", text: "text-blue-600", ring: "group-hover:border-blue-300" },
    { bg: "bg-violet-50", text: "text-violet-600", ring: "group-hover:border-violet-300" },
    { bg: "bg-amber-50", text: "text-amber-600", ring: "group-hover:border-amber-300" },
    { bg: "bg-emerald-50", text: "text-emerald-600", ring: "group-hover:border-emerald-300" },
    { bg: "bg-rose-50", text: "text-rose-600", ring: "group-hover:border-rose-300" },
  ];

  const hasDefinedContent = location === "/student/profile";

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
                onClick={() => { setShowResumeModal(true), fetchdata() }}
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

        {/* Explorer-style Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-3xs mb-6 select-none">
          <span className="material-symbols-outlined text-[20px] text-slate-400">folder_open</span>
          <span className="hover:text-[#1a365d] " >student</span>
          <span className="text-slate-300"><ChevronRight /></span>
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

        {location.pathname === '/student/profile' &&
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {Object.entries(credentialTypes).map(([label, pathValue], i) => {
                const IconComp = sectionIcon[label] || User;
                const count = counts[pathValue] ?? 0;
                const isActive = activeView === pathValue;
                const isLocked = hasDefinedContent;
                const color = colorRamp[i % colorRamp.length];

                return (
                  <button
                    key={label}
                    type="button"
                    disabled={isLocked}
                    onClick={() => !isLocked && navigate(`/student/profile/${pathValue}`)}
                    title={isLocked ? "Open the profile page to browse credential types" : undefined}
                    className={`group relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border p-4 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a365d] focus-visible:ring-offset-2 ${isActive
                      ? "border-[#1a365d] bg-[#1a365d] shadow-lg shadow-[#1a365d]/20"
                      : isLocked
                        ? "cursor-not-allowed border-slate-200 bg-slate-50"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                      }`}
                  >
                    {/* count badge */}
                    <span
                      className={`absolute top-2 right-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${isActive
                        ? "bg-white/20 text-white"
                        : isLocked
                          ? "bg-slate-200 text-slate-500"
                          : "bg-slate-100 text-slate-600"
                        }`}
                    >
                      {count}
                    </span>

                    {/* locked indicator, replaces generic dimming */}
                    {isLocked && (
                      <Lock size={11} className="absolute top-2 left-2 text-slate-400" />
                    )}

                    {/* icon tile */}
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-transparent transition-colors ${isActive
                        ? "bg-white/15 text-white"
                        : isLocked
                          ? "bg-slate-100 text-slate-400"
                          : `${color.bg} ${color.text} border-transparent ${color.ring}`
                        }`}
                    >
                      <IconComp size={20} strokeWidth={2} />
                    </div>

                    <span
                      className={`text-xs font-semibold leading-tight ${isActive ? "text-white" : isLocked ? "text-slate-400" : "text-slate-700"
                        }`}
                    >
                      {label}
                    </span>

                  </button>
                );
              })}
            </div>
        }

        {/* Routes for sub-components */}
        <Routes>
          <Route path="/internship" element={<Internship items={sectionData.internship || []} />} />
          <Route path="/competition" element={<Competitions items={sectionData.competition || []} />} />
          <Route path="/placement" element={<Placement items={sectionData.placement || []} />} />
          <Route path="/project" element={<ProjectsDisplay items={sectionData.project || []} />} />
          <Route path="/certification" element={<Certification items={sectionData.certification || []} />} />
          <Route path="/extraCurricular" element={<ExtraCurricularActivities items={sectionData.extraCurricular || []} />} />
          <Route path="/coCurricular" element={<CoCurricularActivities items={sectionData.coCurricular || []} />} />
          <Route path="/professionalBody" element={<ProfessionalBodies items={sectionData.professionalBody || []} />} />
          <Route path="/skills" element={
            <SkillsDisplay
              items={sectionData.skills || []}
              onSkillAdded={() => {
                getEntries('skills').then((res) => {
                  const skills = Array.isArray(res?.data) ? res.data : [];
                  setSectionData((prev) => ({ ...prev, skills }));
                }).catch(() => {});
              }}
            />
          } />
          <Route path="/journalPublication" element={<JournalPublication items={sectionData.journalPublication || []} />} />
          <Route path="/conferencePaper" element={<ConferencePaper items={sectionData.conferencePaper || []} />} />
          <Route path="/patent" element={<Patent items={sectionData.patent || []} />} />
          <Route path="/scholarship" element={<Scholarships items={sectionData.scholarship || []} />} />
          <Route path="/entranceExam" element={<EntranceExaminations items={sectionData.entranceExam || []} />} />

          {/* Add Routes */}
          <Route path="/addinternship" element={<AddInternship />} />
          <Route path="/addcompetition" element={<AddCompetitions />} />
          <Route path="/addplacement" element={<AddPlacement />} />
          <Route path="/addproject" element={<AddProjects />} />
          <Route path="/addcertification" element={<AddCertification />} />
          <Route path="/addextraCurricular" element={<AddExtraCurricularActivities />} />
          <Route path="/addcoCurricular" element={<AddCoCurricularActivities />} />
          <Route path="/addprofessionalBody" element={<AddProfessionalBodies />} />
          <Route path="/addskills" element={<AddSkills />} />
          <Route path="/addjournalPublication" element={<AddJournalPublication />} />
          <Route path="/addconferencePaper" element={<AddConferencePaper />} />
          <Route path="/addpatent" element={<AddPatent />} />
          <Route path="/addscholarship" element={<AddScholarships />} />
          <Route path="/addentranceExam" element={<AddEntranceExaminations />} />
        </Routes>
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
