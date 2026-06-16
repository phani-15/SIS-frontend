import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  Users, TrendingUp, Award, BookOpen, AlertCircle, BarChart3,
  PieChart as PieChartIcon, Calendar, Download, Filter, Building2, Code2
} from 'lucide-react';
import * as XLSX from "xlsx";
import { credsData } from '../assets/Creds';
import { personalFields, personalData, fields as credentialFieldMap, types as credentialTypes } from '../assets/Data';

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,40px)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-30px)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-20px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes badgePulse {
          0%,100%{box-shadow:0 4px 20px rgba(138,46,136,0.4),0 0 0 1px rgba(255,255,255,0.08) inset}
          50%{box-shadow:0 4px 30px rgba(138,46,136,0.65),0 0 0 1px rgba(255,255,255,0.13) inset}
        }
        @keyframes barGrow { from { width: 0; } to { width: 100%; } }

        .orb-1 { animation: orbFloat1 8s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 10s ease-in-out infinite; }
        .orb-3 { animation: orbFloat3 12s ease-in-out infinite; }
        .shimmer-bar { background:linear-gradient(90deg,#8A2E88,#C084C8,#8A2E88); background-size:200% 100%; animation:shimmer 3s linear infinite; }
        .page-in { animation: fadeInUp 0.65s ease forwards; }
        .badge-pulse { animation: badgePulse 3s ease-in-out infinite; }
        .bar-animate { animation: barGrow 0.8s ease-out; }
      `}</style>

      <div className="min-h-screen bg-[#0f0a1a] font-['DM_Sans'] relative overflow-hidden">

        {/* Orbs */}
        <div className="orb-1 absolute w-150 h-150 rounded-full pointer-events-none -top-40 -left-35"
          style={{ background:'radial-gradient(circle,rgba(138,46,136,0.3) 0%,transparent 70%)', filter:'blur(100px)' }} />
        <div className="orb-2 absolute w-125 h-125 rounded-full pointer-events-none bottom-0 -right-25"
          style={{ background:'radial-gradient(circle,rgba(99,40,180,0.22) 0%,transparent 70%)', filter:'blur(100px)' }} />

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(138,46,136,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(138,46,136,0.05) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <Header />

        {/* ── Main content ── */}
        <div className="relative z-10 max-w-400 mx-auto px-6 py-12">

          {/* ── Welcome Header ── */}
          <div className={`relative rounded-3xl overflow-hidden border border-[#8A2E88]/22 mb-8
            shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_32px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(138,46,136,0.1)]
            ${mounted ? 'page-in' : 'opacity-0'}`}
            style={{ background:'rgba(20,10,35,0.72)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)' }}>

            <div className="shimmer-bar h-0.75 w-full" />

            <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h1 className="font-['Comfortaa'] font-bold text-[2rem] text-white tracking-[-0.02em] mb-2">
                  Administrator Dashboard
                </h1>
                <p className="text-[0.95rem] text-[#C8A0D7]/60 max-w-150">
                  {dashboardData.college} • College-wide Student Analytics
                </p>
              </div>
              <div className='flex flex-col gap-2'>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-[#8A2E88]/20 border border-[#8A2E88]/35
                  text-[0.85rem] font-medium text-[#C084C8] hover:bg-[#8A2E88]/30 transition-all">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-linear-to-br from-[#8A2E88] to-[#B060B8]
                  text-[0.85rem] font-semibold text-white hover:shadow-[0_6px_20px_rgba(138,46,136,0.5)] transition-all"
                  onClick={() => setShowExportModal(true)}>
                  <Download size={16} />
                  Export Report
                </button>
              </div>
              
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-linear-to-br from-[#8A2E88] to-[#B060B8]
                  text-[0.85rem] font-semibold text-white hover:shadow-[0_6px_20px_rgba(138,46,136,0.5)] transition-all"
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
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowDownloadModal(false)} />
              <div className="relative z-10 w-full max-w-2xl rounded-lg bg-[#0f0a1a] border border-[#8A2E88]/22 p-6">
                <h2 className="text-white font-semibold text-lg mb-3">Download Student Details</h2>
                <form onSubmit={handlePersonalsDownloadSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-[#C8A0D7]/80">Degree Code</label>
                      <select value={filters.degreeCode} onChange={(e) => setFilters(f => ({ ...f, degreeCode: e.target.value }))}
                        className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                        <option value="">--Optional--</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech">M.Tech</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-[#C8A0D7]/80">Entry Type Code</label>
                      <select value={filters.entryTypeCode} onChange={(e) => setFilters(f => ({ ...f, entryTypeCode: e.target.value }))}
                        className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                        <option value="">--Optional--</option>
                        <option value="Regular">Regular</option>
                        <option value="Lateral">Lateral</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-[#C8A0D7]/80">Gender</label>
                      <select value={filters.gender} onChange={(e) => setFilters(f => ({ ...f, gender: e.target.value }))}
                        className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                        <option value="">--Optional--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-[#C8A0D7]/80">Graduation Status</label>
                      <select value={filters.graduationStatus} onChange={(e) => setFilters(f => ({ ...f, graduationStatus: e.target.value }))}
                        className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                        <option value="">--Optional--</option>
                        <option value="Graduated">Graduated</option>
                        <option value="Pursuing">Pursuing</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-[#C8A0D7]/80 mb-2">Select fields to include</p>
                    <div className="max-h-48 overflow-auto border border-[#8A2E88]/12 rounded p-2 bg-[#0b0812]">
                      {(personalFields || []).map((field) => (
                        <label key={field} className="flex items-center gap-2 text-sm text-white/90 p-1">
                          <input type="checkbox" checked={selectedFields.includes(field)} onChange={() => {
                            setSelectedFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
                          }} />
                          <span className="capitalize">{field}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <button type="button" onClick={() => setShowDownloadModal(false)} className="px-4 py-2 rounded border border-[#8A2E88]/20 text-[#C8A0D7]/80">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded bg-linear-to-br from-[#8A2E88] to-[#B060B8] text-white">Download</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Export Reports Modal */}
          {showExportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowExportModal(false)} />
              <div className="relative z-10 w-full max-w-3xl h-[78vh] rounded-lg bg-[#0f0a1a] border border-[#8A2E88]/22 p-6 overflow-hidden">
                <div className="flex flex-col min-h-0 h-full overflow-y-auto pr-1">
                  <h2 className="text-white font-semibold text-lg mb-3">Export Credential Reports</h2>
                  <p className="text-sm text-[#C8A0D7]/70 mb-4">Choose credential types and fields, then optionally add filters before exporting.</p>
                  <form onSubmit={handleReportsDownload}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm text-[#C8A0D7]/80">Degree Code</label>
                        <select value={exportFilters.degreeCode} onChange={(e) => setExportFilters(f => ({ ...f, degreeCode: e.target.value }))}
                          className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                          <option value="">--Optional--</option>
                          <option value="B.Tech">B.Tech</option>
                          <option value="M.Tech">M.Tech</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-[#C8A0D7]/80">Entry Type Code</label>
                        <select value={exportFilters.entryTypeCode} onChange={(e) => setExportFilters(f => ({ ...f, entryTypeCode: e.target.value }))}
                          className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                          <option value="">--Optional--</option>
                          <option value="Regular">Regular</option>
                          <option value="Lateral">Lateral</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-[#C8A0D7]/80">Graduation Status</label>
                        <select value={exportFilters.graduationStatus} onChange={(e) => setExportFilters(f => ({ ...f, graduationStatus: e.target.value }))}
                          className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                          <option value="">--Optional--</option>
                          <option value="Graduated">Graduated</option>
                          <option value="Pursuing">Pursuing</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-[#C8A0D7]/80">Department</label>
                        <select value={exportFilters.department} onChange={(e) => setExportFilters(f => ({ ...f, department: e.target.value }))}
                          className="w-full mt-1 p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white">
                          <option value="">--All Departments--</option>
                          <option value="Computer Science and Engineering">CSE</option>
                          <option value="Electronics and Communication Engineering">ECE</option>
                          <option value="Mechanical Engineering">MECH</option>
                          <option value="Civil Engineering">CIVIL</option>
                          <option value="Electrical and Electronics Engineering">EEE</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-[#C8A0D7]/80">Date range</label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <input type="date" value={exportFilters.fromDate} onChange={(e) => setExportFilters(f => ({ ...f, fromDate: e.target.value }))}
                            className="w-full p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white" />
                          <input type="date" value={exportFilters.toDate} onChange={(e) => setExportFilters(f => ({ ...f, toDate: e.target.value }))}
                            className="w-full p-2 rounded bg-[#0b0a12] border border-[#8A2E88]/20 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-[#C8A0D7]/80 mb-3">Select credential types</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {credentialTypes.map((type) => (
                          <label key={type} className="flex items-center gap-2 text-sm text-white/90 p-2 rounded border border-[#8A2E88]/20 bg-[#0b0812] cursor-pointer">
                            <input type="checkbox" checked={selectedCredentialTypes.includes(type)} onChange={() => toggleCredentialType(type)} />
                            <span className="capitalize">{type.replace(/_/g, ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {selectedCredentialTypes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-[#C8A0D7]/80 mb-3">Select fields for chosen credential types</p>
                        <div className="space-y-4 max-h-96 overflow-auto p-2 border border-[#8A2E88]/12 rounded bg-[#0b0812]">
                          {selectedCredentialTypes.map((type) => (
                            <div key={type} className="rounded-lg border border-[#8A2E88]/15 p-3 bg-[#120a1f]">
                              <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-semibold text-white">{type.replace(/_/g, ' ')}</p>
                                <span className="text-xs text-[#C8A0D7]/70">{selectedCredentialFields[type]?.length || 0} selected</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {(credentialFieldMap[type] || []).map((field) => (
                                  <label key={field} className="flex items-center gap-2 text-sm text-white/90 p-2 rounded border border-[#8A2E88]/15 bg-[#0e0a15] cursor-pointer">
                                    <input type="checkbox" checked={(selectedCredentialFields[type] || []).includes(field)} onChange={() => toggleCredentialField(type, field)} />
                                    <span>{field}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-end gap-3">
                      <button type="button" onClick={() => setShowExportModal(false)} className="px-4 py-2 rounded border border-[#8A2E88]/20 text-[#C8A0D7]/80">Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded bg-linear-to-br from-[#8A2E88] to-[#B060B8] text-white">Export</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ── Key Metrics Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total Students', value: dashboardData.totalStudents, icon: <Users size={20} />, color: '#C084C8' },
              { label: 'Active Students', value: dashboardData.activeStudents, icon: <TrendingUp size={20} />, color: '#8A2E88' },
              { label: 'Departments', value: dashboardData.totalDepartments, icon: <Building2 size={20} />, color: '#D8A8E0' },
              { label: 'Avg CGPA', value: dashboardData.avgCGPA.toFixed(2), icon: <Award size={20} />, color: '#B060B8' },
              { label: 'Placements (2020)', value: '287/312', icon: <TrendingUp size={20} />, color: '#C084C8' },
            ].map((metric, i) => (
              <div
                key={i}
                className={`relative rounded-[18px] overflow-hidden p-5 border border-[#8A2E88]/18
                  transition-all duration-300 hover:-translate-y-1 hover:border-[#C084C8]/35
                  hover:shadow-[0_12px_40px_rgba(138,46,136,0.2)]
                  ${mounted ? 'page-in' : 'opacity-0'}`}
                style={{
                  background:'rgba(20,10,35,0.65)',
                  backdropFilter:'blur(20px)',
                  WebkitBackdropFilter:'blur(20px)',
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0
                }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="badge-pulse w-10 h-10 flex items-center justify-center
                    rounded-[11px] bg-linear-to-br from-[#8A2E88] to-[#C084C8] text-white"
                    style={{ boxShadow:'0 4px 14px rgba(138,46,136,0.35)' }}>
                    {metric.icon}
                  </div>
                </div>
                <p className="text-[0.75rem] font-semibold text-[#967AA5]/60 uppercase tracking-[0.06em] mb-1">
                  {metric.label}
                </p>
                <p className="text-[1.6rem] font-bold text-white">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* ── Department-wise Distribution ── */}
          <div className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18 mb-8
            shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            style={{ background:'rgba(20,10,35,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
            <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
              <h3 className="font-['DM_Sans'] font-semibold text-white text-[1.05rem] flex items-center gap-2">
                <Building2 size={18} className="text-[#C084C8]" />
                Department-wise Student Distribution
              </h3>
            </div>
            <div className="p-6 space-y-5">
              {dashboardData.departmentData.map((dept, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[0.9rem] font-semibold text-white">{dept.dept}</span>
                      <p className="text-[0.75rem] text-[#C8A0D7]/50">{dept.shortName}</p>
                    </div>
                    <span className="text-[0.8rem] text-[#C8A0D7]/60">{dept.students} students • {dept.placement}% placed</span>
                  </div>
                  <div className="h-8 rounded-[10px] overflow-hidden bg-white/4 border border-white/6 flex">
                    <div
                      className="bar-animate bg-linear-to-r from-[#8A2E88] to-[#C084C8] h-full flex items-center justify-center relative"
                      style={{ width: `${(dept.students / 300) * 100}%` }}>
                      <span className="text-[0.65rem] font-bold text-white/80">CGPA: {dept.avgCGPA}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Main Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* Batch-wise distribution */}
            <div className="lg:col-span-2 rounded-[20px] overflow-hidden border border-[#8A2E88]/18
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ background:'rgba(20,10,35,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
              <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                <h3 className="font-['DM_Sans'] font-semibold text-white text-[1.05rem] flex items-center gap-2">
                  <BarChart3 size={18} className="text-[#C084C8]" />
                  College Batch-wise Distribution
                </h3>
              </div>
              <div className="p-6 space-y-5">
                {dashboardData.batchData.map((batch, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[0.9rem] font-semibold text-white">Batch {batch.batch}</span>
                      <span className="text-[0.8rem] text-[#C8A0D7]/60">{batch.total} students</span>
                    </div>
                    <div className="h-8 rounded-[10px] overflow-hidden bg-white/4 border border-white/6 flex">
                      <div
                        className="bar-animate bg-linear-to-r from-[#8A2E88] to-[#C084C8] h-full flex items-center justify-center relative"
                        style={{ width: `${(batch.pursuing / batch.total) * 100}%` }}>
                        {batch.pursuing > 0 && (
                          <span className="text-[0.65rem] font-bold text-white/80">Pursuing</span>
                        )}
                      </div>
                      {batch.graduated > 0 && (
                        <div
                          className="h-full flex items-center justify-center bg-[#4ade80]/40"
                          style={{ width: `${(batch.graduated / batch.total) * 100}%` }}>
                          <span className="text-[0.65rem] font-bold text-white/70">Graduated</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-2 text-[0.75rem] text-[#967AA5]/60">
                      <span>Pursuing: {batch.pursuing} | Graduated: {batch.graduated}</span>
                      <span>Placed: {batch.onPlacement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ background:'rgba(20,10,35,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
              <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                <h3 className="font-['DM_Sans'] font-semibold text-white text-[1.05rem] flex items-center gap-2">
                  <PieChartIcon size={18} className="text-[#C084C8]" />
                  Performance Distribution
                </h3>
              </div>
              <div className="p-6 space-y-3">
                {Object.entries(dashboardData.performanceGrades).map(([grade, count], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[10px] flex items-center justify-center
                      bg-linear-to-br from-[#8A2E88] to-[#C084C8] text-white font-bold text-[0.9rem]">
                      {grade}
                    </div>
                    <div className="flex-1">
                      <div className="h-6 rounded-lg bg-white/4 overflow-hidden">
                        <div
                          className="bar-animate h-full bg-linear-to-r from-[#8A2E88]/60 to-[#C084C8]/60"
                          style={{ width: `${(count / totalGradeCount) * 100}%` }} />
                      </div>
                    </div>
                    <span className="text-[0.85rem] font-semibold text-[#C8A0D7]/70 min-w-10 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Skills Proficiency ── */}
          <div className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18 mb-8
            shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            style={{ background:'rgba(20,10,35,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
            <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
              <h3 className="font-['DM_Sans'] font-semibold text-white text-[1.05rem] flex items-center gap-2">
                <Code2 size={18} className="text-[#C084C8]" />
                College-wide Skill-wise Proficiency
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {dashboardData.skillMetrics.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[0.9rem] font-medium text-white">{skill.skill}</span>
                      <span className="text-[0.8rem] font-semibold text-[#C084C8]">
                        {skill.count} ({skill.percentage}%)
                      </span>
                    </div>
                    <div className="h-6 rounded-[10px] bg-white/4 border border-white/6 overflow-hidden">
                      <div
                        className="bar-animate h-full bg-linear-to-r from-[#8A2E88] via-[#B060B8] to-[#C084C8]"
                        style={{ width: `${skill.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Grid: Certifications & Metrics ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Certifications */}
            <div className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ background:'rgba(20,10,35,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
              <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                <h3 className="font-['DM_Sans'] font-semibold text-white text-[1.05rem] flex items-center gap-2">
                  <Award size={18} className="text-[#C084C8]" />
                  Industry Certifications (College-wide)
                </h3>
              </div>
              <div className="p-6 space-y-3">
                {dashboardData.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl
                    bg-[#8A2E88]/10 border border-[#8A2E88]/20 hover:bg-[#8A2E88]/15 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-[1.4rem]">{cert.icon}</span>
                      <div>
                        <p className="font-semibold text-white text-[0.9rem]">{cert.name}</p>
                        <p className="text-[0.75rem] text-[#C8A0D7]/50">{cert.depts}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[1.1rem] font-bold text-[#C084C8]">{cert.count}</span>
                      <span className="text-[0.7rem] text-[#967AA5]/60">
                        {((cert.count / dashboardData.totalStudents) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* College Metrics */}
            <div className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ background:'rgba(20,10,35,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
              <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
                <h3 className="font-['DM_Sans'] font-semibold text-white text-[1.05rem] flex items-center gap-2">
                  <Building2 size={18} className="text-[#C084C8]" />
                  College Infrastructure Metrics
                </h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                {dashboardData.collegeMetrics.map((metric, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#8A2E88]/10 border border-[#8A2E88]/20">
                    <p className="text-[0.75rem] text-[#C8A0D7]/60 uppercase tracking-[0.04em] mb-1">
                      {metric.label}
                    </p>
                    <p className="text-[1.4rem] font-bold text-white">{metric.value}</p>
                    <p className="text-[0.7rem] text-[#967AA5]/60 mt-1">{metric.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Alerts & Updates ── */}
          {/* <div className="rounded-[20px] overflow-hidden border border-[#8A2E88]/18 mt-6
            shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            style={{ background:'rgba(20,10,35,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
            <div className="px-6 py-4 border-b border-[#8A2E88]/15 bg-[#8A2E88]/08">
              <h3 className="font-['DM_Sans'] font-semibold text-white text-[1.05rem] flex items-center gap-2">
                <AlertCircle size={18} className="text-[#C084C8]" />
                College Alerts & Updates
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {dashboardData.recentAlerts.map((alert, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border
                  ${alert.type === 'warning'
                    ? 'bg-red-500/10 border-red-500/25'
                    : alert.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/25'
                    : 'bg-blue-500/10 border-blue-500/25'
                  }`}>
                  <span className={`mt-0.5 flex-shrink-0
                    ${alert.type === 'warning'
                      ? 'text-red-400'
                      : alert.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-blue-400'
                    }`}>
                    {alert.icon}
                  </span>
                  <p className="text-[0.9rem] text-[#C8A0D7]/70">{alert.message}</p>
                </div>
              ))}
            </div>
          </div> */}
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
};

export default AdminDashboard;