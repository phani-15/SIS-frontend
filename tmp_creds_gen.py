import json
import re
from pathlib import Path

fields = {
    "internship": ["title", "organization/ company name", "industry mentor", "faculty mentor", "start date", "end date", "is stipend based", "amount (if yes)", "certificate"],
    "placement": ["job role", "company/ employer name", "package", "date of selection/ appointment/ offer", "appointment letter reference number", "offer letter"],
    "certification": ["type of certification", "domain/ skill/ area", "certification id/ number", "score obtained", "grade obtained", "duration", "date of completion", "certificate"],
    "professional_bodies": ["Name of professional body", "membership id", "valid till", "membership certificate"],
    "skills": ["skill"],
    "extra_curricular_activities": ["event type", "event name", "event level", "date of event", "organization name", "prize recieved", "prize name(if yes)", "certificate"],
    "scholarships": ["name of scholarship", "Amount sanctioned", "academic year"],
    "co_curricular_activities": ["activity type", "event name", "event level", "event date", "organization name", "award recieved", "award name(if yes)", "certificate"],
    "journal_publication": ["Title Of The Paper", "Name Of The Journal", "Page Numbers(from-to)", "Year Of Publication", "Volume Number", "Issue Number", "Impact Factor", "Is Thomson Reuters", "National/international", "Do you have Issn Number", "Issn Number (if yes)", "Do you have e-Issn Number", "e-Issn Number (if)", "No. Of Authors", "Author", "Indexing Platform", "H Index Of Journal", "Do you have Doi", "Doi (if)", "First Page Of Journal", "Remarks"],
    "conference_paper": ["Title Of The Paper", "Name Of The Conference", "Organized By", "National/international", "Date Of Conference(from)", "Date Of Conference(to)", "Mode Of Conference", "Venue", "Do you have Isbn Number", "Isbn Number(for Proceedings)", "Conference Proceedings Title", "Publisher Name", "Indexing Type", "Do you have Doi", "Doi (if yes)", "Page Numbers(from-to)", "Authors List", "Affiliation Of Authors", "Best Paper Award Certificate (if got)", "Conference Certificate", "Conference Paper First Page"],
    "patent": ["Patent Number", "Title Of The Patent", "Published/granted", "Year Of Published/granted", "Scope", "Document"],
    "competitions": ["competition category", "competition name", "theme/ domain", "event level", "organizing institution/ company", "organizer type", "start date", "end date", "mode", "venue", "type of participation", "team name", "team size", "faculty mentor", "presented project/ idea title", "abstract summary", "participation status", "award recieved", "award name", "prize money", "rank secured", "outcome achieved", "certificate"],
    "projects": ["project type", "project title", "project domain", "academic year", "project status", "team size", "faculty guide", "external mentor", "industry sponsored", "industry name", "funding agency", "amount sanctioned", "start date", "end date", "technologies used", "prototype developed ?", "patent filed ?", "publication generated ?", "award recieved ?", "award name", "certificate"],
    "entrance_examinations": ["exam name", "registaration/ hall ticket number", "score", "rank", "percentile", "year of examination"],
}

def make_value(student, field, index):
    base = f"{field} for {student.split()[0]}"
    low = field.lower()
    if "date" in low or "year" in low:
        return f"202{index % 4 + 1}-0{index % 9 + 1}-1{index % 9}"
    if low.startswith("do you") or low.startswith("is ") or low.startswith("award recieved") or low.startswith("industry sponsored") or low.startswith("patent filed") or low.startswith("publication generated"):
        return "Yes" if index % 2 == 0 else "No"
    if any(x in low for x in ["amount", "score", "rank", "percentile", "package", "volume", "issue", "h index", "impact"]):
        return str(50 + index)
    if any(x in low for x in ["certificate", "letter", "document", "id", "number", "doi", "issn", "isbn", "reference"]):
        return f"{low.replace(' ', '_').replace('/', '_').replace('?', '').replace('(', '').replace(')', '')}_{index + 1}"
    return base


def make_credential(student, type_name, index):
    return {field: make_value(student, field, index) for field in fields[type_name]}


def make_student(i, student):
    departments = [
        "Computer Science and Engineering",
        "Information Technology",
        "Electrical and Electronics Engineering",
        "Civil Engineering",
        "Mechanical Engineering",
        "Electronics and Communication Engineering",
        "Metallurgical Engineering",
        "BS & HSS",
        "Master's in Business Administration",
    ]
    student_obj = {
        "name": student,
        "email": student.lower().replace(' ', '.') + "@university.edu",
        "department": departments[i % len(departments)],
    }
    for type_name in fields:
        student_obj[type_name] = [make_credential(student, type_name, i)]
    return student_obj

names = [
    "Rajesh Kumar Singh","Priya Sharma","Arjun Patel","Ananya Gupta","Vikram Reddy",
    "Divya Nair","Aditya Verma","Shreya Banerjee","Siddharth Kumar","Neha Singh",
    "Amit Joshi","Sneha Rao","Kavya Menon","Rohan Deshpande","Meera Iyer",
    "Sameer Khan","Pooja Chawla","Kunal Kapoor","Priyanka Das","Nikhil Jain",
    "Alisha Sen","Ritu Gupta","Manish Sharma","Rhea Nair","Sourav Bose",
    "Tanvi Kulkarni","Deepak Yadav","Simran Kaur","Harish Patil","Anjali Mehta",
    "Suresh Reddy","Nina Thomas","Arnav Singh","Chitra Rao","Aniket Shah",
    "Ritika Sinha","Madhav Joshi","Kiran Nair","Pallavi Desai","Ayesha Khan",
    "Vishal Gupta","Priya Deshpande","Karan Malhotra","Shalini Agarwal","Rahul Kapoor",
    "Neha Joshi","Sana Sheikh","Ananya Jain","Rohan Mehra","Isha Nair",
]

creds = {f"student{i + 1}": make_student(i, student) for i, student in enumerate(names)}
export_text = 'export const credsData = ' + json.dumps(creds, indent=2) + ';\n'

file_path = Path("src/assets/Data.jsx")
content = file_path.read_text(encoding="utf-8")
new_content, count = re.subn(r"export const credsData = \{\s*\};?", export_text, content)
if count != 1:
    raise SystemExit(f"Expected to replace exactly one credsData block, found {count}")
file_path.write_text(new_content, encoding="utf-8")
print("Updated src/assets/Data.jsx with credsData")
