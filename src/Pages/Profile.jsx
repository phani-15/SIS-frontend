import React from 'react'

export default function Profile() {
    const [studentData, setStudentData] = React.useState({
        name: 'Srinivas',
        rollNumber: '23VV1A0548',
        department: 'CSE',
        course: 'B.Tech',
        
    });
  return (
    <div>
      <h1>{studentData.name}</h1>
      <p>Roll Number: {studentData.rollNumber}</p>
      <p>Department: {studentData.department}</p>
      <p>Course: {studentData.course}</p>2
    </div>
  )
}
