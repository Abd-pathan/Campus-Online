let department = document.querySelector('#department')
let searchStudents = document.querySelector('#searchStudents');




function showFaculties(data) {

    let studentTable = document.querySelector('#studentTable')
    


    axios.post('/viewUsersFaculty', data).then(res => {
        const faculties = res.data.faculty;
        
        const markupTable = generateMarkupTable(faculties)
        
        studentTable.innerHTML = markupTable
                        
        const allFaculties = document.querySelector('#allFaculties');
        const checkers = document.querySelectorAll('.studentStatus');
        
    })
    function generateMarkupTable(faculties){
        return faculties.map(faculty => {
            return `
            <tr>
            <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="ml-0">
                <div class="text-sm font-medium text-gray-900">
                 ${ faculty.name }
                </div>
                </div>
            </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${ faculty.registrationNumber }</div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${ faculty.email }</div>
            </td>

            </tr>  
            `
        }).join('')

    }
    
}



searchStudents.addEventListener('click', (e) => {
    let data = {
        department: department.value        
    }
    showFaculties(data);
})
