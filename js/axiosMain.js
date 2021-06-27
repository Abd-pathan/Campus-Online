let department = document.querySelector('#department')
let semester = document.querySelector('#semester')
let searchStudents = document.querySelector('#searchStudents');



function showStudents(data) {

    


    axios.post('/markAttendanceData', data).then(res => {
        let studentTable = document.querySelector('#studentTable')
        let subjectOption = document.querySelector('#subjectOption')
        const students = res.data.student;
        const subjects = res.data.subject;
        const markupTable = generateMarkupTable(students)
        const markupOption = generateMarkupOption(subjects)
        subjectOption.innerHTML = markupOption
        studentTable.innerHTML = markupTable

        const allStudents = document.querySelector('#allStudents');
        const checkers = document.querySelectorAll('.studentStatus');
        const mydate = document.querySelector('#myDate');
        var totalStudent = []


        checkers.forEach(checker => {
                    totalStudent.push(checker.value)
                })
                    
                allStudents.value = JSON.stringify({
                    totalStudent: totalStudent,
                    subject: subjectOption.value,
                    date: mydate.value,
                    semester: students[0].semester
                });
                totalStudent = []
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
                <div class="px-6 py-3">
                    <label class="inline-flex items-center">
                        <input type="checkbox" name="studentStatusPresent" value="${ student._id }" class="studentStatus form-checkbox" >
                    </label>
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
