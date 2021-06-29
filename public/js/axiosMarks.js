let department = document.querySelector('#department')
let semester = document.querySelector('#semester')
let searchStudents = document.querySelector('#searchStudents');



function showStudents(data) {

    let studentTable = document.querySelector('#studentTable')
    let subjectOption = document.querySelector('#subjectOption')


    axios.post('/markAttendanceData', data).then(res => {
        const students = res.data.student;
        const subjects = res.data.subject;
        const markupTable = generateMarkupTable(students)
        const markupOption = generateMarkupOption(subjects)
        subjectOption.innerHTML = markupOption
        studentTable.innerHTML = markupTable

        const allStudents = document.querySelector('#allStudents');
        //const checkers = document.querySelectorAll('.studentStatus');
        var totalStudent = []
        var studentName = []

        students.forEach((student) => {
            totalStudent.push(student._id)
            studentName.push(student.name)
        })
                    
                allStudents.value = JSON.stringify({
                    totalStudent: totalStudent,
                    studentName: studentName,
                    department: department.value,
                    semester: semester.value
                });
                totalStudent = []
                studentName = []
    })
    function generateMarkupTable(students){
        return students.map(student => {
            return `
            <tr>
            <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="ml-0">
                <div class="text-sm font-medium text-gray-900">
                 ${ student.name }
                </div>
                </div>
            </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${ student.registrationNumber }</div>
            </td> 
            <td>
		        <div class="mb-3 pt-0">
 				 <input type="number" placeholder="Enter Marks Here" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" name="marks"/>
			    </div>
 		    </td>
             <td>
        		<div class="mb-3 pt-0">
  				 <input type="number" placeholder="Maximum Marks" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" name="maximumMarks"/>
 	    		</div>
     		</td> 
            </tr>  



            `
        }).join('')

    }
    function generateMarkupOption(subjects) {
        return subjects.map(subject => {
            return `
                    <option value="${ subject._id }">${ subject.subjectName }</option>
            `
        }).join('')
    }
}





searchStudents.addEventListener('click', (e) => {
    let data = {
        department: department.value,
        semester: semester.value
    }
    showStudents(data);
})