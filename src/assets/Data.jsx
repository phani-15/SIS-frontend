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
	internship: ["title", "organization/ company name", "industry mentor", "faculty mentor", "start date", "end date", "is stipend based", "amount", "certificate"],
	placement: ["job role", "company/ employer name", "package", "date of selection/ appointment/ offer", "appointment letter reference number", "offer letter"],
	certification: ["type of certification", "domain/ skill/ area", "score obtained", "grade obtained", "duration", "date of completion", "certificate"],
	professional_bodies: ["Name of professional body", "membership id", "valid till", "membership certificate"],
	skills: ["skill"],
	extra_curricular_activities: ["event type", "event name", "event level", "date of event", "organization name", "prize recieved", "prize name", "certificate"],
	scholarships: ["name of scholarship", "Amount sanctioned", "academic year"],
	co_curricular_activities: ["activity type", "event name", "event level", "event date", "organization name", "award recieved", "award name", "certificate"],
	journal_publication: ['Title Of The Paper',
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
	competitions: ['competition category', "competition name", 'theme/ domain', "event level", "organizing institution/ company", "organizer type", "start date", "end date",
		"mode", "venue", "type of participation", "team name", "team size", "faculty mentor", "presented project/ idea title", "abstract summary", "participation status", "award recieved",
		"award name", "prize money", "rank secured", "outcome achieved", "certificate"],
	projects: ["project type", "project title", "project domain", "academic year", "project status", "team size", "faculty guide", "external mentor", "industry sponsored", "industry name",
		"funding agency", "amount sanctioned", "start date", "end date", "technologies used", "prototype developed ?", "patent filed ?", "publication generated ?", "award recieved ?", "award name", "certificate"],
	entrance_examinations: ["exam name", "registaration/ hall ticket number", "score", "rank", "percentile", "year of examination"]
}

export const radioOptions = {
	internship: {
		"is stipend based": ["yes", "no"]
	},
	co_curricular_activities: {
		"award recieved": ["Yes", "No"]
	},
	extra_curricular_activities: {
		"prize recieved": ["Yes", "No"]
	},
	competitions: {
		"type of participation": ["Individual", "Team"],
		"award recieved": ["Yes", "No"]
	},
	projects :{
		"industry sponsored" : ["yes","No"],
		"prototype developed ?" :["Yes","No"],
		"patent filed ?" :["Yes","No"],
		"publication generated ?" :["Yes","No"],
		"project status":["ongoing","completed"],
		"award recieved ?" :["Yes","No"]
	}
}

export const textFields = {
	competitions: ["abstract summary"]
}

export const selectOptions = {
	certification: {
		"type of certification": ["NPTEL", "SWAYAM", "Coursera", "AWS", "Cisco", "Microsoft", "Google", "Others"]
	},
	projects: {
		"project type": ["Mini Project","Major Project","Capstone Project","others"]
	},
	professional_bodies: {
		"Name of professional body": ["IEEE", "ACM", "CSI", "ISTE", "IE", "IEM", "IEI", "Others"]
	},
	co_curricular_activities: {
		"activity type": ["Workshop", "FDP Participation", "Seminar", "Conferences", "Hackathons", "Coding competitions", "Webinars", "Others"],
		"event level": ["Institutional", "State", "National", "International"]
	},
	extra_curricular_activities: {
		"event type": ["Sports", "Cultural Activities", "NSS", "NCC", "others"],
		"event level": ["Institutional", "State", "National", "International"]
	},
	scholarships: {
		"name of scholarship": ["Govt. Scholarship", "NSP", "AICTE ", "Merit", "PM Scholarship", "others"]
	},
	entrance_examinations: {
		"exam name": ["GATE", "GRE", "GMAT", "CAT", "TOEFL", "IELTS", "UGC-NET", "CSIR-NET"]
	},
	competitions: {
		"competition category": ["Hackathon", "Coding contest", "Ideathon", "Project Expo", "Design challenge", "Innovation Contest", "others"],
		"event level": ["Institutional", "State", "National", "International"],
		"organizer type": ["College", "University", "Industry", "Government"],
		"mode": ["Online", "Offline", "Hybrid"],
		"participation status": ["Participated", "Qualified", "Shortlisted", "Finalist", "Winner"]
	}
}

export const DocFields = {
	internship: ["certificate"],
	placement: ["offer letter"],
	certification: ["certificate"],
	professional_bodies: ["membership certificate"],
	co_curricular_activities: ["certificate"],
	extra_curricular_activities: ["certificate"],
	competitions: ["certificate"],
	projects : ["certificate"]
}

export const dateFields = {
	internship: ["start date", "end date"],
	placement: ["date of selection/ appointment/ offer"],
	certification: ["date of completion"],
	professional_bodies: ["valid till"],
	co_curricular_activities: ["event date"],
	extra_curricular_activities: ["date of event"],
	competitions: ["start date", "end date"],
	projects :["start date","end date"]
}

export const subtypes = ["journal_publication", "conference_paper", "patent"]

export const types = ["internship", "competitions", "placement", "certification",
	"extra_curricular_activities", "co_curricular_activities", "professional_bodies",
	"skills", "journal_publication", "conference_paper", "patent", "scholarships",
	"entrance_examinations", "projects"]

export const personalFields = [
	"name", "email", "department", "degreeCode", "entryTypeCode", "courseCode", "gender",
	"fatherName", "dateOfBirth", "motherName", "region", "nationality", "bloodGroup", "religion", "hasdisability",
	"disabilityType", "phoneNumber", "apaaId", "aadharNumber", "batchYear", "cgpa", "graduationStatus", "joiningDate", "address"
];