import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function StudentTranscript({ studentTranscriptData }) {

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add student information to the PDF
    doc.text('Student Transcript', 10, 10);
    doc.text(`Name: ${studentTranscriptData.studentInfo.name}`, 10, 20);
    doc.text(`ID: ${studentTranscriptData.studentInfo.id}`, 10, 30);
    doc.text(`GPA: ${studentTranscriptData.studentInfo.gpa}`, 10, 40);
    doc.text(`Appreciation: ${studentTranscriptData.studentInfo.appreciation}`, 10, 50);

    // Define the columns for the PDF table
    const columns = ['Academic Year', 'Course Name', 'Degree'];

    // Create an array to store the data
    const courseData = [];

    // Iterate through academic years and courses
    studentTranscriptData.data.forEach((yearData) => {
      yearData.courses.forEach((course, courseIndex) => {
        // if (courseIndex === Math.round((yearData.courses.length-1)/2)) {
          // Add Academic Year for the first course in the year
          courseData.push([
            yearData.year,
            course.courseName,
            course.degree,
          ]);
        // } 
        // else {
        //   courseData.push([
        //     '',
        //     course.courseName,
        //     course.degree,
        //   ]);
        // }
      });
      courseData.push([
        "",
        "",
        ""
      ]);
    });

    // Add academic year and courses to the PDF as a table
    doc.autoTable({
      head: [columns],
      body: courseData,
      startY: 60,
      theme: 'striped',
      styles: {
        columnWidth: 'auto', // Automatically adjust column width based on content
        fontSize: 12,
        cellPadding: 4,
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Set width for Academic Year column
      },
    });

    // Save the PDF with a specific name
    doc.save('student_transcript.pdf');
  };

  return (
    <div>
      <div className='row justify-content-center'>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <button className="primary-default-btn mb-2 w-100" onClick={generatePDF}>
            Download My Transcript
          </button>
        </div>
      </div>
      
      <div className="table-responsive border">
        <table className="table">
          <thead>
            <tr>
              <th style={{"fontSize":"1.3rem"}} colSpan="2" className="table-info text-center">Student Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Name: </strong>{studentTranscriptData.studentInfo.name}</td>
              <td><strong>ID: </strong>{studentTranscriptData.studentInfo.id}</td>
            </tr>
            <tr>
              <td><strong>GPA: </strong>{studentTranscriptData.studentInfo.gpa}</td>
              <td><strong>Appreciation: </strong>{studentTranscriptData.studentInfo.appreciation}</td>
            </tr>
          </tbody>
          {studentTranscriptData.data.map((yearData, index) => (
            <tbody key={index}>
              <tr>
                <th style={{"fontSize":"1.2rem"}} colSpan="2" className="table-info text-center">{yearData.year}</th>
              </tr>
              {yearData.courses.map((course, courseIndex) => {
                if (course.status === 1) {
                  return(
                    <tr className="table-warning text-center" key={courseIndex}>
                      <td>{course.courseName}</td>
                      <td>Pending</td>
                    </tr>
                  )
                }else if(course.status === 2){
                  return(
                    <tr className="table-bg-danger text-center" key={courseIndex}>
                      <td className="text-white">{course.courseName}</td>
                      <td className="text-white">{course.score} (Failed)</td>
                    </tr>
                  )
                }else{
                  return (
                    <tr className="table-bg-success text-center" key={courseIndex}>
                      <td className="text-white">{course.courseName}</td>
                      <td className="text-white">{course.score}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          ))}
        </table>
      </div>
    </div>
    
  );
}