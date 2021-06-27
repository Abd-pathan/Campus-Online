let department = document.querySelector('#department')
let semester = document.querySelector('#semester')
let searchStudents = document.querySelector('#searchStudents');




function showStudents(data) {

    let studentTable = document.querySelector('#studentTable')
    


    axios.post('/viewUsersStudent', data).then(res => {
        const students = res.data.student;
        
        const markupTable = generateMarkupTable(students)
        
        studentTable.innerHTML = markupTable
                        
        const allStudents = document.querySelector('#allStudents');
        const checkers = document.querySelectorAll('.studentStatus');
        
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

            <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${ student.email }</div>
            </td>

            </tr>  
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
