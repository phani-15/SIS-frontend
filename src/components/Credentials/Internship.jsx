import React from 'react';
import { Briefcase, Calendar, MapPin, DollarSign, FileText } from 'lucide-react';

export default function Internship({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500 font-medium shadow-sm">
        No internship details found.
      </div>
    );
  }

  const internships = [
  {
    title: "Java Developer Intern",
    organizationCompanyName: "Infosys Ltd.",
    industryMentor: "Rakesh Sharma",
    facultyMentor: "Dr. P. Kumar",
    status: "Completed",
    startDate: "2025-01-10",
    endDate: "2025-03-10",
    isStipendBased: "yes",
    amount: "15000",
    certificate: null,
  },
  {
    title: "Web Development Intern",
    organizationCompanyName: "Tata Consultancy Services",
    industryMentor: "Sneha Rao",
    facultyMentor: "Dr. S. Lakshmi",
    status: "Completed",
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    isStipendBased: "yes",
    amount: "18000",
    certificate: null,
  },
  {
    title: "Frontend Developer Intern",
    organizationCompanyName: "Wipro Technologies",
    industryMentor: "Amit Verma",
    facultyMentor: "Dr. R. Prasad",
    status: "Completed",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    isStipendBased: "no",
    amount: "",
    certificate: null,
  },
  {
    title: "Backend Developer Intern",
    organizationCompanyName: "Tech Mahindra",
    industryMentor: "Neha Singh",
    facultyMentor: "Dr. K. Reddy",
    status: "Completed",
    startDate: "2024-05-15",
    endDate: "2024-07-15",
    isStipendBased: "yes",
    amount: "20000",
    certificate: null,
  },
  {
    title: "Data Science Intern",
    organizationCompanyName: "Accenture",
    industryMentor: "Vivek Nair",
    facultyMentor: "Dr. M. Rao",
    status: "Completed",
    startDate: "2024-01-08",
    endDate: "2024-03-31",
    isStipendBased: "yes",
    amount: "22000",
    certificate: null,
  },
  {
    title: "Machine Learning Intern",
    organizationCompanyName: "Cognizant",
    industryMentor: "Rahul Mehta",
    facultyMentor: "Dr. A. Devi",
    status: "Completed",
    startDate: "2024-09-01",
    endDate: "2024-11-30",
    isStipendBased: "yes",
    amount: "25000",
    certificate: null,
  },
  {
    title: "Android Developer Intern",
    organizationCompanyName: "Zoho Corporation",
    industryMentor: "Arun Raj",
    facultyMentor: "Dr. V. Suresh",
    status: "Completed",
    startDate: "2023-12-01",
    endDate: "2024-02-29",
    isStipendBased: "no",
    amount: "",
    certificate: null,
  },
  {
    title: "Cloud Computing Intern",
    organizationCompanyName: "IBM India",
    industryMentor: "Priya Kapoor",
    facultyMentor: "Dr. N. Anitha",
    status: "Completed",
    startDate: "2023-07-03",
    endDate: "2023-09-30",
    isStipendBased: "yes",
    amount: "24000",
    certificate: null,
  },
  {
    title: "Cyber Security Intern",
    organizationCompanyName: "HCL Technologies",
    industryMentor: "Sandeep Joshi",
    facultyMentor: "Dr. G. Srinivas",
    status: "Completed",
    startDate: "2023-10-02",
    endDate: "2023-12-29",
    isStipendBased: "yes",
    amount: "17000",
    certificate: null,
  },
  {
    title: "DevOps Intern",
    organizationCompanyName: "Capgemini",
    industryMentor: "Deepak Gupta",
    facultyMentor: "Dr. B. Ramesh",
    status: "Completed",
    startDate: "2025-05-01",
    endDate: "2025-07-31",
    isStipendBased: "yes",
    amount: "23000",
    certificate: null,
  },
  {
    title: "UI/UX Design Intern",
    organizationCompanyName: "LTIMindtree",
    industryMentor: "Anjali Iyer",
    facultyMentor: "Dr. Hema Priya",
    status: "Completed",
    startDate: "2023-03-15",
    endDate: "2023-06-15",
    isStipendBased: "no",
    amount: "",
    certificate: null,
  },
  {
    title: "Software Engineer Intern",
    organizationCompanyName: "Oracle India",
    industryMentor: "Kiran Desai",
    facultyMentor: "Dr. T. Narayana",
    status: "Ongoing",
    startDate: "2026-06-01",
    endDate: "",
    isStipendBased: "yes",
    amount: "30000",
    certificate: null,
  },
];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 font-comfortaa">Internships</h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
          {items.length} {items.length === 1 ? 'Entry' : 'Entries'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-[#1a365d] transition-all group-hover:w-2"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-slate-50 rounded-xl text-[#1a365d]">
                    <Briefcase size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{item.title || "Internship"}</h3>
                    <p className="text-sm font-semibold text-slate-500">{item.organizationCompanyName || item.organization || "N/A"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
                  <div className="text-sm">
                    <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Industry Mentor</span>
                    <span className="text-slate-700 font-semibold">{item.industryMentor || "N/A"}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Faculty Mentor</span>
                    <span className="text-slate-700 font-semibold">{item.facultyMentor || "N/A"}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Duration</span>
                    <span className="text-slate-700 font-semibold flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      {item.startDate} {item.endDate ? `to ${item.endDate}` : '(Ongoing)'}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Stipend Details</span>
                    <span className="text-slate-700 font-semibold flex items-center gap-0.5">
                      {item.isStipendBased === 'yes' || item.stipend === 'Yes' || (item.amount && Number(item.amount) > 0) ? (
                        <>
                          <DollarSign size={14} className="text-green-600" />
                          <span className="text-green-700">Stipend: ₹{item.amount || 'N/A'}</span>
                        </>
                      ) : (
                        <span className="text-slate-500">Unpaid / No Stipend</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  item.status === 'Completed' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {item.status || "Completed"}
                </span>

                {(item.certificate || item.certificateFile) && (
                  <a
                    href={typeof item.certificate === 'string' ? item.certificate : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#1a365d] hover:text-[#002045] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-all active:scale-95"
                  >
                    <FileText size={14} />
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
