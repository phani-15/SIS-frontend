import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  Users, TrendingUp, Award, BookOpen, AlertCircle, BarChart3,
  PieChart as PieChartIcon, Calendar, Download, Filter, Building2, Code2,
  Cloud, Globe, Cpu, Database
} from 'lucide-react';
import * as XLSX from "xlsx";
import { credsData } from '../assets/Creds';
import { personalFields, personalData, fields as credentialFieldMap, types as credentialTypes } from '../assets/Data';

const getCertIcon = (name) => {
  if (name.includes('AWS')) return <Cloud size={20} className="text-[#13696a]" />;
  if (name.includes('Google') || name.includes('Cloud')) return <Globe size={20} className="text-[#13696a]" />;
  if (name.includes('Azure')) return <Cpu size={20} className="text-[#13696a]" />;
  if (name.includes('Oracle') || name.includes('Database')) return <Database size={20} className="text-[#13696a]" />;
  return <Award size={20} className="text-[#13696a]" />;
};

const AdminDashboard = () => {
  const [mounted, setMounted] = useState(false);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [filters, setFilters] = useState({ degreeCode: '', entryTypeCode: '', gender: '', graduationStatus: '' });
  const [selectedFields, setSelectedFields] = useState(personalFields || []);

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFilters, setExportFilters] = useState({ degreeCode: '', entryTypeCode: '', graduationStatus: '', fromDate: '', toDate: '', department: '' });
  const [selectedCredentialTypes, setSelectedCredentialTypes] = useState([]);
  const [selectedCredentialFields, setSelectedCredentialFields] = useState({});
  const [data, setData] = useState(personalData);

  const toggleCredentialType = (type) => {
    setSelectedCredentialTypes(prev => {
      if (prev.includes(type)) {
        setSelectedCredentialFields(fields => {
          const next = { ...fields };
          delete next[type];
          return next;
        });
        return prev.filter((value) => value !== type);
      }
      setSelectedCredentialFields(fields => ({ ...fields, [type]: credentialFieldMap[type] || [] }));
      return [...prev, type];
    });
  };

  const toggleCredentialField = (type, field) => {
    setSelectedCredentialFields(prev => {
      const existing = prev[type] || [];
      const nextFields = existing.includes(field)
        ? existing.filter((value) => value !== field)
        : [...existing, field];
      return { ...prev, [type]: nextFields };
    });
  };

  const handlePersonalsDownloadSubmit = (e) => {
    e.preventDefault();

    if (!data || !data.length) {
      alert("No data to export");
      return;
    }

    const selected = selectedFields.length ? selectedFields : personalFields;
    const headers = [
      "S.NO",
      ...selected.map((field) =>
        field
          .replace(/([A-Z])/g, ' $1')
          .replace(/\b([a-z])/g, (m) => m.toUpperCase())
          .replace(/([A-Z])/g, ' $1')
          .trim()
      ),
    ];

    const rows = data
      .filter((student) => {
        if (filters.degreeCode && student.degreeCode !== filters.degreeCode) return false;
        if (filters.entryTypeCode && student.entryTypeCode !== filters.entryTypeCode) return false;
        if (filters.gender && student.gender !== filters.gender) return false;
        if (filters.graduationStatus && student.graduationStatus !== filters.graduationStatus) return false;
        return true;
      })
      .map((student, index) => [
        index + 1,
        ...selected.map((field) => student[field] ?? ""),
      ]);

    if (!rows.length) {
      alert("No matching data for selected filters");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws["!cols"] = headers.map((h) => ({ wch: Math.max(h.length, 18) }));
    XLSX.utils.book_append_sheet(wb, ws, "Personal Data");

    const filename = `Student_Details_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
    setShowDownloadModal(false);
  };

  const handleReportsDownload = (e) => {
    e.preventDefault();

    const filteredStudents = Object.values(credsData).filter((student) => {
      if (exportFilters.degreeCode && student.degreeCode && student.degreeCode !== exportFilters.degreeCode) return false;
      if (exportFilters.entryTypeCode && student.entryTypeCode && student.entryTypeCode !== exportFilters.entryTypeCode) return false;
      if (exportFilters.graduationStatus && student.graduationStatus && student.graduationStatus !== exportFilters.graduationStatus) return false;
      if (exportFilters.department && student.department && student.department !== exportFilters.department) return false;
      return true;
    });

    if (!selectedCredentialTypes.length) {
      alert('Please select at least one credential type to export.');
      return;
    }

    const wb = XLSX.utils.book_new();
    let sheetCount = 0;

    selectedCredentialTypes.forEach((type) => {
      const fields = (selectedCredentialFields[type] && selectedCredentialFields[type].length)
        ? selectedCredentialFields[type]
        : credentialFieldMap[type] || [];

      const headers = [
        'S.NO',
        'Name',
        'Email',
        'Department',
        ...fields.map((field) =>
          field
            .replace(/([A-Z])/g, ' $1')
            .replace(/\b([a-z])/g, (m) => m.toUpperCase())
            .replace(/([A-Z])/g, ' $1')
            .trim()
        ),
      ];

      const rows = filteredStudents.flatMap((student, studentIndex) => {
        const creds = student[type] || [];
        return creds.map((credential) => [
          studentIndex + 1,
          student.name || '',
          student.email || '',
          student.department || '',
          ...fields.map((field) => credential[field] ?? ''),
        ]);
      });

      if (rows.length > 0) {
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        ws['!cols'] = headers.map((h) => ({ wch: Math.max(h.length, 18) }));
        XLSX.utils.book_append_sheet(wb, ws, type.replace(/_/g, ' ').slice(0, 31));
        sheetCount += 1;
      }
    });

    if (!sheetCount) {
      alert('No credential records found for the selected filters and types.');
      return;
    }

    const filename = `Student_Credentials_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
    setShowExportModal(false);
  };

  const dashboardData = {
    college: 'JNTU-GV Vizianagaram',
    totalStudents: 1250,
    activeStudents: 1198,
    graduatedStudents: 52,
    avgCGPA: 7.65,
    totalDepartments: 5,

    departmentData: [
      { dept: 'CSE', shortName: 'Computer Science & Engineering', students: 285, avgCGPA: 7.82, placement: 92 },
      { dept: 'ECE', shortName: 'Electronics & Communication Engineering', students: 268, avgCGPA: 7.45, placement: 88 },
      { dept: 'MECH', shortName: 'Mechanical Engineering', students: 252, avgCGPA: 7.28, placement: 85 },
      { dept: 'CIVIL', shortName: 'Civil Engineering', students: 245, avgCGPA: 7.12, placement: 78 },
      { dept: 'EEE', shortName: 'Electrical & Electronics Engineering', students: 200, avgCGPA: 7.55, placement: 82 },
    ],

    batchData: [
      { batch: 2020, total: 312, graduated: 312, pursuing: 0, onPlacement: 287 },
      { batch: 2021, total: 318, graduated: 0, pursuing: 318, onPlacement: 198 },
      { batch: 2022, total: 305, graduated: 0, pursuing: 305, onPlacement: 92 },
      { batch: 2023, total: 315, graduated: 0, pursuing: 315, onPlacement: 28 },
    ],

    skillMetrics: [
      { skill: 'Python', count: 945, percentage: 76 },
      { skill: 'Java', count: 824, percentage: 66 },
      { skill: 'Web Development', count: 758, percentage: 61 },
      { skill: 'Data Structures', count: 875, percentage: 70 },
      { skill: 'Database Design', count: 658, percentage: 53 },
      { skill: 'Cloud Computing', count: 542, percentage: 43 },
      { skill: 'Machine Learning', count: 438, percentage: 35 },
      { skill: 'Android Development', count: 315, percentage: 25 },
    ],

    performanceGrades: {
      'A+': 145,
      'A': 387,
      'B+': 428,
      'B': 218,
      'C+': 58,
      'C': 14,
    },

    certifications: [
      { name: 'AWS Certified', count: 267, icon: '☁️', depts: 'All' },
      { name: 'Google Cloud', count: 198, icon: '🌐', depts: 'CSE, ECE' },
      { name: 'Azure Certified', count: 154, icon: '⚙️', depts: 'CSE, MECH' },
      { name: 'Oracle Certified', count: 112, icon: '📊', depts: 'CSE, EEE' },
    ],

    collegeMetrics: [
      { label: 'Total Faculty', value: 98, change: '+5 this year' },
      { label: 'Academic Blocks', value: 12, change: 'All operational' },
      { label: 'Research Papers', value: 156, change: '+42 this year' },
      { label: 'Active Research Labs', value: 18, change: '+2 inaugurated' },
    ],

    recentAlerts: [
      { type: 'success', message: '87% overall college placement achieved', icon: <TrendingUp size={16} /> },
      { type: 'warning', message: '23 students flagged for academic probation', icon: <AlertCircle size={16} /> },
      { type: 'info', message: 'Campus recruitment drive scheduled next month', icon: <Calendar size={16} /> },
      { type: 'success', message: 'CSE Dept achieves highest placement rate: 92%', icon: <Award size={16} /> },
      { type: 'warning', message: 'Admission deadline for 2024-25 batch: 3 days remaining', icon: <AlertCircle size={16} /> },
      { type: 'success', message: '8 students selected for international scholarships', icon: <Award size={16} /> },
    ],
  };

  useEffect(() => { setMounted(true); }, []);

  const totalGradeCount = Object.values(dashboardData.performanceGrades).reduce((a, b) => a + b, 0);

  const METRICS = [
    { label: 'Total Students', value: dashboardData.totalStudents, icon: <Users size={20} />, bg: 'var(--primary-container)', color: 'var(--on-primary)' },
    { label: 'Active Students', value: dashboardData.activeStudents, icon: <TrendingUp size={20} />, bg: 'var(--secondary-container)', color: 'var(--on-secondary-container)' },
    { label: 'Departments', value: dashboardData.totalDepartments, icon: <Building2 size={20} />, bg: 'var(--tertiary-container)', color: 'var(--on-tertiary-container)' },
    { label: 'Avg CGPA', value: dashboardData.avgCGPA.toFixed(2), icon: <Award size={20} />, bg: 'var(--primary-fixed)', color: 'var(--primary)' },
    { label: 'Placements (2020)', value: '287/312', icon: <TrendingUp size={20} />, bg: 'var(--secondary-fixed)', color: 'var(--on-secondary-container)' },
  ];

  const getAlertStyles = (type) => {
    if (type === 'warning') return 'bg-amber-50/70 border-amber-200/50 text-amber-900';
    if (type === 'success') return 'bg-emerald-50/70 border-emerald-200/50 text-emerald-950';
    return 'bg-sky-50/70 border-sky-200/50 text-sky-950';
  };

  const getAlertIconStyles = (type) => {
    if (type === 'warning') return 'text-amber-600';
    if (type === 'success') return 'text-emerald-600';
    return 'text-sky-600';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes barGrow { from { width: 0; } to { width: 100%; } }

        .page-in { animation: fadeInUp 0.65s ease forwards; }
        .bar-animate { animation: barGrow 0.8s ease-out; }
      `}</style>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-['DM_Sans'] relative overflow-hidden">

        {/* Decorative soft background blobs */}
        <div className="absolute pointer-events-none -z-10 rounded-full"
          style={{
            top: '-10%', left: '-10%',
            width: '45%', height: '45%',
            backgroundColor: 'rgba(214, 227, 255, 0.4)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute pointer-events-none -z-10 rounded-full"
          style={{
            bottom: '-10%', right: '-10%',
            width: '45%', height: '45%',
            backgroundColor: 'rgba(165, 239, 240, 0.35)',
            filter: 'blur(80px)',
          }}
        />

        <Header />

        {/* ── Main content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

          {/* ── Welcome Header Card ── */}
          <div className={`relative rounded-3xl overflow-hidden mb-8 text-white shadow-md ${mounted ? 'page-in' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(135deg, var(--primary-container) 0%, var(--primary) 100%)' }}>
            
            {/* Dot grid decoration */}
            <div className="absolute top-4 left-6 opacity-20" style={{ width: 80, height: 60, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
            
            {/* Campus photo overlay
            <img
              src="/images/college.png"
              alt="College Campus Overlay"
              className="absolute bottom-0 right-4 sm:right-10 h-[90%] sm:h-[110%] object-contain object-bottom select-none pointer-events-none opacity-85 hidden md:block"
              style={{ maxWidth: '280px', mixBlendMode: 'luminosity' }}
            /> */}

            <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 pr-6 md:pr-80">
              <div>
                <h1 className="font-['Comfortaa'] font-bold text-3xl text-white tracking-tight mb-2">
                  Administrator Dashboard
                </h1>
                <p className="text-base text-slate-300 max-w-xl">
                  {dashboardData.college} • College-wide Student Analytics
                </p>
              </div>

              <div className='flex flex-col gap-2.5 sm:flex-row lg:flex-col w-full sm:w-auto shrink-0'>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                    bg-white/10 border border-white/25 text-sm font-medium text-white hover:bg-white/20 transition-all cursor-pointer">
                    <Filter size={16} />
                    Filter
                  </button>
                  <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                    bg-white text-[var(--primary)] text-sm font-semibold hover:bg-slate-100 transition-all shadow-xs cursor-pointer"
                    onClick={() => setShowExportModal(true)}>
                    <Download size={16} />
                    Export Report
                  </button>
                </div>
                
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                  bg-[var(--secondary)] text-sm font-semibold text-white hover:bg-[var(--secondary)]/90 hover:shadow-[0_6px_20px_rgba(19,105,106,0.3)] transition-all cursor-pointer"
                  onClick={() => setShowDownloadModal(true)}>
                  <Download size={16} />
                  Download Student Details
                </button>
              </div>
            </div>
          </div>

          {/* Download Student Details Modal */}
          {showDownloadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowDownloadModal(false)} />
              <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 shadow-xl">
                <h2 className="text-slate-900 font-bold text-xl mb-4">Download Student Details</h2>
                <form onSubmit={handlePersonalsDownloadSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-1">Degree Code</label>
                      <select value={filters.degreeCode} onChange={(e) => setFilters(f => ({ ...f, degreeCode: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                        <option value="">--Optional--</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech">M.Tech</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-1">Entry Type Code</label>
                      <select value={filters.entryTypeCode} onChange={(e) => setFilters(f => ({ ...f, entryTypeCode: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                        <option value="">--Optional--</option>
                        <option value="Regular">Regular</option>
                        <option value="Lateral">Lateral</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-1">Gender</label>
                      <select value={filters.gender} onChange={(e) => setFilters(f => ({ ...f, gender: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                        <option value="">--Optional--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-1">Graduation Status</label>
                      <select value={filters.graduationStatus} onChange={(e) => setFilters(f => ({ ...f, graduationStatus: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                        <option value="">--Optional--</option>
                        <option value="Graduated">Graduated</option>
                        <option value="Pursuing">Pursuing</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-slate-600 mb-2">Select fields to include</p>
                    <div className="max-h-48 overflow-auto border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                      {(personalFields || []).map((field) => (
                        <label key={field} className="flex items-center gap-2.5 text-sm text-slate-700 p-1 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
                          <input type="checkbox" checked={selectedFields.includes(field)} onChange={() => {
                            setSelectedFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
                          }} className="rounded border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)]/20" />
                          <span className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button type="button" onClick={() => setShowDownloadModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer">Cancel</button>
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer">Download</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Export Reports Modal */}
          {showExportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowExportModal(false)} />
              <div className="relative z-10 w-full max-w-3xl h-[82vh] rounded-2xl bg-white border border-slate-200 p-6 shadow-xl overflow-hidden flex flex-col">
                <div className="flex flex-col min-h-0 h-full overflow-y-auto pr-1">
                  <h2 className="text-slate-900 font-bold text-xl mb-1">Export Credential Reports</h2>
                  <p className="text-sm text-slate-500 mb-5">Choose credential types and fields, then optionally add filters before exporting.</p>
                  <form onSubmit={handleReportsDownload}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-1">Degree Code</label>
                        <select value={exportFilters.degreeCode} onChange={(e) => setExportFilters(f => ({ ...f, degreeCode: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                          <option value="">--Optional--</option>
                          <option value="B.Tech">B.Tech</option>
                          <option value="M.Tech">M.Tech</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-1">Entry Type Code</label>
                        <select value={exportFilters.entryTypeCode} onChange={(e) => setExportFilters(f => ({ ...f, entryTypeCode: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                          <option value="">--Optional--</option>
                          <option value="Regular">Regular</option>
                          <option value="Lateral">Lateral</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-1">Graduation Status</label>
                        <select value={exportFilters.graduationStatus} onChange={(e) => setExportFilters(f => ({ ...f, graduationStatus: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                          <option value="">--Optional--</option>
                          <option value="Graduated">Graduated</option>
                          <option value="Pursuing">Pursuing</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-1">Department</label>
                        <select value={exportFilters.department} onChange={(e) => setExportFilters(f => ({ ...f, department: e.target.value }))}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm">
                          <option value="">--All Departments--</option>
                          <option value="Computer Science and Engineering">CSE</option>
                          <option value="Electronics and Communication Engineering">ECE</option>
                          <option value="Mechanical Engineering">MECH</option>
                          <option value="Civil Engineering">CIVIL</option>
                          <option value="Electrical and Electronics Engineering">EEE</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-1">Date range</label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <input type="date" value={exportFilters.fromDate} onChange={(e) => setExportFilters(f => ({ ...f, fromDate: e.target.value }))}
                            className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm" />
                          <input type="date" value={exportFilters.toDate} onChange={(e) => setExportFilters(f => ({ ...f, toDate: e.target.value }))}
                            className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-slate-600 mb-3">Select Credential Types</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {credentialTypes.map((type) => (
                          <label key={type} className="flex items-center gap-2.5 text-sm text-slate-700 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                            <input type="checkbox" checked={selectedCredentialTypes.includes(type)} onChange={() => toggleCredentialType(type)} className="rounded border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)]/20" />
                            <span className="capitalize">{type.replace(/_/g, ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {selectedCredentialTypes.length > 0 && (
                      <div className="mb-5">
                        <p className="text-sm font-semibold text-slate-600 mb-3">Select fields for chosen credential types</p>
                        <div className="space-y-4 max-h-96 overflow-auto p-3 border border-slate-200 rounded-xl bg-slate-50">
                          {selectedCredentialTypes.map((type) => (
                            <div key={type} className="rounded-xl border border-slate-200/80 p-4 bg-white shadow-xs">
                              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                                <p className="text-sm font-bold text-slate-800 capitalize">{type.replace(/_/g, ' ')}</p>
                                <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary-fixed)] px-2 py-0.5 rounded-full">{selectedCredentialFields[type]?.length || 0} selected</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {(credentialFieldMap[type] || []).map((field) => (
                                  <label key={field} className="flex items-center gap-2.5 text-sm text-slate-600 p-2 rounded-lg border border-slate-100 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <input type="checkbox" checked={(selectedCredentialFields[type] || []).includes(field)} onChange={() => toggleCredentialField(type, field)} className="rounded border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)]/20" />
                                    <span className="truncate">{field}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                      <button type="button" onClick={() => setShowExportModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer">Cancel</button>
                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer">Export</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ── Key Metrics Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4.5 mb-8">
            {METRICS.map((metric, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border border-slate-200/80 bg-white
                  shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5
                  ${mounted ? 'page-in' : 'opacity-0'}`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: metric.bg, color: metric.color }}>
                    {metric.icon}
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {metric.label}
                </p>
                <p className="text-xl font-bold text-slate-800">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* ── Department-wise Student Distribution ── */}
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs mb-8">
            <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
                <Building2 size={18} className="text-[var(--primary)]" />
                Department-wise Student Distribution
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {dashboardData.departmentData.map((dept, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-slate-800">{dept.dept}</span>
                      <p className="text-xs text-slate-400 font-medium">{dept.shortName}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{dept.students} students • {dept.placement}% placed</span>
                  </div>
                  <div className="h-8 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 p-0.5 flex">
                    <div
                      className="bar-animate bg-linear-to-r from-[var(--primary)] to-[var(--secondary)] h-full flex items-center justify-center relative rounded-lg text-white text-[10px] font-bold"
                      style={{ width: `${(dept.students / 300) * 100}%` }}>
                      Avg CGPA: {dept.avgCGPA}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Main Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* Batch-wise distribution */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs">
              <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
                  <BarChart3 size={18} className="text-[var(--primary)]" />
                  College Batch-wise Distribution
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {dashboardData.batchData.map((batch, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-800">Batch {batch.batch}</span>
                      <span className="text-xs font-medium text-slate-500">{batch.total} students</span>
                    </div>
                    <div className="h-8 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 p-0.5 flex">
                      <div
                        className="bar-animate bg-[var(--primary)] h-full flex items-center justify-center relative rounded-lg text-white text-[10px] font-bold"
                        style={{ width: `${(batch.pursuing / batch.total) * 100}%` }}>
                        {batch.pursuing > 0 && "Pursuing"}
                      </div>
                      {batch.graduated > 0 && (
                        <div
                          className="h-full flex items-center justify-center bg-[var(--secondary-container)] text-[var(--on-secondary-container)] text-[10px] font-bold rounded-lg ml-0.5"
                          style={{ width: `${(batch.graduated / batch.total) * 100}%` }}>
                          Graduated
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
                      <span>Pursuing: {batch.pursuing} | Graduated: {batch.graduated}</span>
                      <span className="text-slate-600 font-semibold">Placed: {batch.onPlacement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs">
              <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
                  <PieChartIcon size={18} className="text-[var(--primary)]" />
                  Performance Distribution
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(dashboardData.performanceGrades).map(([grade, count], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] text-white font-bold text-sm flex items-center justify-center">
                      {grade}
                    </div>
                    <div className="flex-1">
                      <div className="h-5 bg-slate-100 rounded-lg overflow-hidden p-0.5">
                        <div
                          className="bar-animate h-full bg-[var(--primary)] rounded-md"
                          style={{ width: `${(count / totalGradeCount) * 100}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 min-w-10 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Skills Proficiency ── */}
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs mb-8">
            <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
                <Code2 size={18} className="text-[var(--primary)]" />
                College-wide Skill-wise Proficiency
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboardData.skillMetrics.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">{skill.skill}</span>
                      <span className="text-xs font-bold text-[var(--secondary)] bg-[var(--secondary-container)] px-2.5 py-0.5 rounded-full">
                        {skill.count} ({skill.percentage}%)
                      </span>
                    </div>
                    <div className="h-5 rounded-lg bg-slate-100 overflow-hidden p-0.5 border border-slate-200/30">
                      <div
                        className="bar-animate h-full bg-linear-to-r from-[var(--primary)] to-[var(--secondary)] rounded-md"
                        style={{ width: `${skill.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Grid: Certifications & Infrastructure Metrics ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Certifications */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs">
              <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
                  <Award size={18} className="text-[var(--primary)]" />
                  Industry Certifications (College-wide)
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {dashboardData.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl
                    bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-center gap-4.5">
                      <div className="w-10 h-10 rounded-xl bg-[var(--secondary-container)] flex items-center justify-center">
                        {getCertIcon(cert.name)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{cert.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{cert.depts}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-[var(--secondary)]">{cert.count}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {((cert.count / dashboardData.totalStudents) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* College Metrics */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs">
              <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
                  <Building2 size={18} className="text-[var(--primary)]" />
                  College Infrastructure Metrics
                </h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {dashboardData.collegeMetrics.map((metric, i) => (
                  <div key={i} className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      {metric.label}
                    </p>
                    <p className="text-xl font-bold text-slate-800">{metric.value}</p>
                    <p className="text-xs text-[var(--secondary)] font-semibold mt-1">{metric.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Alerts & Updates ── */}
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xs mt-8">
            <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
                <AlertCircle size={18} className="text-[var(--primary)]" />
                College Alerts & Updates
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData.recentAlerts.map((alert, i) => (
                <div key={i} className={`flex items-start gap-4 p-4.5 rounded-2xl border text-sm font-medium transition-shadow hover:shadow-xs
                  ${getAlertStyles(alert.type)}`}>
                  <span className={`mt-0.5 shrink-0 ${getAlertIconStyles(alert.type)}`}>
                    {alert.icon}
                  </span>
                  <p className="m-0 leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-slate-200 py-6 mt-12">
          <p className="text-center text-xs text-slate-400 font-medium">
            © 2026 JNTU-GV Vizianagaram. All rights reserved.
          </p>
        </div>

      </div>
    </>
  );
};

export default AdminDashboard;  
