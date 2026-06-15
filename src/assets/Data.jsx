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
	internship: ["title", "organization/ company name", "industry mentor", "faculty mentor", "start date", "end date", "is stipend based", "amount (if yes)", "certificate"],
	placement: ["job role", "company/ employer name", "package", "date of selection/ appointment/ offer", "appointment letter reference number", "offer letter"],
	certification: ["type of certification", "domain/ skill/ area","certification id/ number", "score obtained", "grade obtained", "duration", "date of completion", "certificate"],
	professional_bodies: ["Name of professional body", "membership id", "valid till", "membership certificate"],
	skills: ["skill"],
	extra_curricular_activities: ["event type", "event name", "event level", "date of event", "organization name", "prize recieved", "prize name(if yes)", "certificate"],
	scholarships: ["name of scholarship", "Amount sanctioned", "academic year"],
	co_curricular_activities: ["activity type", "event name", "event level", "event date", "organization name", "award recieved", "award name(if yes)", "certificate"],
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
		'Issn Number (if yes)',
		'Do you have e-Issn Number',
		'e-Issn Number (if)',
		'No. Of Authors',
		'Author',
		'Indexing Platform',
		'H Index Of Journal',
		'Do you have Doi',
		'Doi (if)',
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
		'Venue',
		'Do you have Isbn Number',
		'Isbn Number(for Proceedings)',
		'Conference Proceedings Title',
		'Publisher Name',
		'Indexing Type',
		'Do you have Doi',
		'Doi (if yes)',
		'Page Numbers(from-to)',
		'Authors List',
		'Affiliation Of Authors',
		'Best Paper Award Certificate (if got)',
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

export const personalData = [
	{
		name: "Rajesh Kumar Singh",
		email: "rajesh.singh@university.edu",
		department: "Computer Science and Engineering",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "CSE001",
		gender: "Male",
		fatherName: "Vikram Singh",
		dateOfBirth: "2003-05-15",
		motherName: "Priya Singh",
		region: "North",
		nationality: "Indian",
		bloodGroup: "O+",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543210",
		apaaId: "AP2021001",
		aadharNumber: "1234567890123456",
		batchYear: 2021,
		cgpa: 8.5,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "123, Main Street, Delhi, 110001"
	},
	{
		name: "Priya Sharma",
		email: "priya.sharma@university.edu",
		department: "Information Technology",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "IT001",
		gender: "Female",
		fatherName: "Amit Sharma",
		dateOfBirth: "2003-08-22",
		motherName: "Neha Sharma",
		region: "East",
		nationality: "Indian",
		bloodGroup: "B+",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543211",
		apaaId: "AP2021002",
		aadharNumber: "2234567890123457",
		batchYear: 2021,
		cgpa: 8.9,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "456, Park Avenue, Mumbai, 400001"
	},
	{
		name: "Arjun Patel",
		email: "arjun.patel@university.edu",
		department: "Mechanical Engineering",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "ME001",
		gender: "Male",
		fatherName: "Rajesh Patel",
		dateOfBirth: "2003-03-10",
		motherName: "Sunita Patel",
		region: "West",
		nationality: "Indian",
		bloodGroup: "A+",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543212",
		apaaId: "AP2021003",
		aadharNumber: "3234567890123458",
		batchYear: 2021,
		cgpa: 7.8,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "789, Tech Park, Bangalore, 560001"
	},
	{
		name: "Ananya Gupta",
		email: "ananya.gupta@university.edu",
		department: "Electronics and Communication Engineering",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "ECE001",
		gender: "Female",
		fatherName: "Rajeev Gupta",
		dateOfBirth: "2003-06-18",
		motherName: "Kavya Gupta",
		region: "North",
		nationality: "Indian",
		bloodGroup: "AB+",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543213",
		apaaId: "AP2021004",
		aadharNumber: "4234567890123459",
		batchYear: 2021,
		cgpa: 8.2,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "321, Electronics Lane, Hyderabad, 500001"
	},
	{
		name: "Vikram Reddy",
		email: "vikram.reddy@university.edu",
		department: "Civil Engineering",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "CE001",
		gender: "Male",
		fatherName: "Suresh Reddy",
		dateOfBirth: "2004-01-25",
		motherName: "Lakshmi Reddy",
		region: "South",
		nationality: "Indian",
		bloodGroup: "O-",
		religion: "Hindu",
		hasdisability: true,
		disabilityType: "Dyslexia",
		phoneNumber: "9876543214",
		apaaId: "AP2021005",
		aadharNumber: "5234567890123460",
		batchYear: 2021,
		cgpa: 7.5,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "654, Construction Ave, Chennai, 600001"
	},
	{
		name: "Divya Nair",
		email: "divya.nair@university.edu",
		department: "Master's in Business Administration",
		degreeCode: "MBA",
		entryTypeCode: "MERIT",
		courseCode: "MBA001",
		gender: "Female",
		fatherName: "Mohanan Nair",
		dateOfBirth: "2002-09-12",
		motherName: "Anjali Nair",
		region: "South",
		nationality: "Indian",
		bloodGroup: "B-",
		religion: "Christian",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543215",
		apaaId: "AP2020006",
		aadharNumber: "6234567890123461",
		batchYear: 2020,
		cgpa: 8.7,
		graduationStatus: "Graduated",
		joiningDate: "2020-08-15",
		address: "987, Business Hub, Kochi, 682001"
	},
	{
		name: "Aditya Verma",
		email: "aditya.verma@university.edu",
		department: "Electrical and Electronics Engineering",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "EEE001",
		gender: "Male",
		fatherName: "Sanjay Verma",
		dateOfBirth: "2003-11-30",
		motherName: "Anjali Verma",
		region: "Central",
		nationality: "Indian",
		bloodGroup: "O+",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543216",
		apaaId: "AP2021007",
		aadharNumber: "7234567890123462",
		batchYear: 2021,
		cgpa: 8.1,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "147, Power Station, Pune, 411001"
	},
	{
		name: "Shreya Banerjee",
		email: "shreya.banerjee@university.edu",
		department: "Computer Science and Engineering",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "CSE002",
		gender: "Female",
		fatherName: "Subrata Banerjee",
		dateOfBirth: "2003-07-14",
		motherName: "Gitika Banerjee",
		region: "East",
		nationality: "Indian",
		bloodGroup: "A-",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543217",
		apaaId: "AP2021008",
		aadharNumber: "8234567890123463",
		batchYear: 2021,
		cgpa: 9.0,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "258, Silicon Valley, Kolkata, 700001"
	},
	{
		name: "Siddharth Kumar",
		email: "siddharth.kumar@university.edu",
		department: "Metallurgical Engineering",
		degreeCode: "B.TECH",
		entryTypeCode: "JEE",
		courseCode: "MET001",
		gender: "Male",
		fatherName: "Harendra Kumar",
		dateOfBirth: "2003-04-05",
		motherName: "Geeta Kumar",
		region: "North",
		nationality: "Indian",
		bloodGroup: "AB-",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543218",
		apaaId: "AP2021009",
		aadharNumber: "9234567890123464",
		batchYear: 2021,
		cgpa: 7.9,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "369, Metal Works, Jamshedpur, 831001"
	},
	{
		name: "Neha Singh",
		email: "neha.singh@university.edu",
		department: "BS & HSS",
		degreeCode: "B.A",
		entryTypeCode: "MERIT",
		courseCode: "BA001",
		gender: "Female",
		fatherName: "Manoj Singh",
		dateOfBirth: "2003-12-08",
		motherName: "Saroj Singh",
		region: "West",
		nationality: "Indian",
		bloodGroup: "B+",
		religion: "Hindu",
		hasdisability: false,
		disabilityType: "",
		phoneNumber: "9876543219",
		apaaId: "AP2021010",
		aadharNumber: "0234567890123465",
		batchYear: 2021,
		cgpa: 8.3,
		graduationStatus: "Graduated",
		joiningDate: "2021-07-20",
		address: "741, Arts Campus, Ahmedabad, 380001"
	}
]
