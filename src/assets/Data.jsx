export const depts = {
    ucev: [
        "BS & HSS",
        "Computer Science and Engineering",
        "Electrical and Electronics Engineering",
        "Electronics and Communication Engineering",
        "Civil Engineering",
        "Information Technology",
        "Metallurgical Engineering",
        "Mechanical Engineering",
        "Master's in Business Administration",
    ],
    pharma: ["Pharmaceutical Sciences"],
};

export const Administrators = ["Principal", "Vice Principal"]

export const fields = {
    internship: ["title", "organization/ company name", "industry mentor", "faculty mentor", "start date", "end date", "is stipend based", "amount", "certificate "],
    placement: ["job role", "company/ employer name", "package", "date of selection/ appointment/ offer", "appointment letter reference number", "offer letter"],
    certification: ["Type of certification", "domain/ skill/ area", "score obtained", "grade obtained", "duration", "date of completion", "certificate"],
    professional_bodies: ["Name of professional body", "membership id", "valid till", "membership certificate"],
    skills: ["skill"],
    extra_curricular_activities: ["event type", "event name", "event level", "date of event", "organization name", "prize recieved", "prize name", "certificate"],
    scholarships: ["name of scholarship", "Amount sanctioned", "academic year"],
    co_curricular_activities: ["activity type", "event name", "event date", "organization name", "award recieved", "award name", "certificate"],
    journal: ['Title Of The Paper',
        'Name Of The Journal',
        'Page Numbers(from-to)',
        'Year Of Publication',
        'Volume Number',
        'Issue Number',
        'Impact Factor',
        'Is Thomson Reuters',
        'National/international',
        'Do you have Issn Number',
        'Issn Number',
        'Do you have e-Issn Number',
        'e-Issn Number',
        'No. Of Authors',
        'Author',
        'Indexing Platform',
        'H Index Of Journal',
        'Do you have Doi',
        'Doi',
        'First Page Of Journal',
        'Remarks'],
    conference_paper: [
        'Title Of The Paper',
        'Name Of The Conference',
        'Organized By',
        'National/international',
        'Date Of Conference(from)',
        'Date Of Conference(to)',
        'Mode Of Conference',
        'Location',
        'Do you have Isbn Number',
        'Isbn Number(for Proceedings)',
        'Conference Proceedings Title',
        'Publisher Name',
        'Indexing Type',
        'Do you have Doi',
        'Doi',
        'Page Numbers(from-to)',
        'Authors List',
        'Affiliation Of Authors',
        'Best Paper Award',
        'Best Paper Award Certificate',
        "Conference Certificate",
        'Conference Paper First Page'
    ],
    patent: ['Patent Number', 'Title Of The Patent', 'Published/granted', 'Year Of Published/granted', 'Scope', 'Document'],
}

export const subtypes = ["journal", "conference_paper", "patent"]

export const types = ["internship", "placement", "certification","extra_curricular_activities","co_curricular_activities", "professional_bodies", "skills", "journal", "conference_paper", "patent"]

export const personalFields = [
    "name", "email", "department", "degreeCode", "entryTypeCode", "courseCode", "gender",
    "fatherName", "dateOfBirth", "motherName", "region", "nationality", "bloodGroup", "religion", "hasdisability",
    "disabilityType", "phoneNumber", "apaaId", "aadharNumber", "batchYear", "cgpa", "graduationStatus", "joiningDate", "address"
];