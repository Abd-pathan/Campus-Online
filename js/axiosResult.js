var semester = document.getElementById('semester')
var examCategory = document.getElementById('examCategory')
var searchResult = document.getElementById('searchResult')

function showResult(data)
{
    axios.post('/result', data).then(res => {
        
        let resultTable = document.querySelector('#resultTable')
        const result = res.data
        let totalMaximumMarks = 0
        let totalMarks = 0

        if(data.examCategory === 'final-result'){
          result.forEach(res => {
            totalMarks += res.marks
            totalMaximumMarks += res.maximumMarks
          })
          resultTable.innerHTML = generateFinalResult(totalMarks, totalMaximumMarks, result)
        }
        else{
          resultTable.innerHTML = generateMarkupTable(result)
        }
    })


    function generateFinalResult(totalMarks, totalMaximumMarks, result){
      return `

      <div class="max-w-sm rounded overflow-hidden shadow- bg-purple-200">

      <div class="px-6 pt-4">
        <div class="font-bold text-xl mb-2">Semester: ${ result[0].semester }  Final Result</div>
        <div class="mb-2">
        <div class="flex justify-between">
          <span class="font-bold text-gray-700 text-xl">Total Marks: </span>
          <span class="font-bold text-blue-700 text-xl">${ totalMarks } / ${ totalMaximumMarks }</span>
        </div>
        <div class="flex justify-between mt-2">
          <span class="font-bold text-gray-700 text-xl">In percentage:</span>
          <span class="font-bold text-gray-700 text-2xl">${ ((totalMarks / totalMaximumMarks) * 100).toFixed(2) }%</span>
          </div>
        </div>
        
      </div>
      <div class="px-6 pt-4 pb-2 flex justify-between">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Semester: ${ result[0].semester }</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Status: ${ ((totalMarks / totalMaximumMarks) * 100).toFixed(2) >= 35.00 ? "PASS" : "FAIL" }</span>
        
      </div>
    </div>
         
   `

    }


    function generateMarkupTable(results){
        return results.map(result => {
            return `

            <div class="max-w-sm rounded overflow-hidden shadow- bg-purple-200">
      
            <div class="px-6 pt-4">
              <div class="font-bold text-xl mb-2"> ${ result.subject.subjectName } (${ result.subject.subjectCode })</div>
              <div class="mb-2">
              <div class="flex justify-between">
                <span class="font-bold text-gray-700 text-xl">${ result.examCategory } marks: </span>
                <span class="font-bold text-blue-700 text-xl">${ result.marks } / ${ result.maximumMarks }</span>
              </div>
              <div class="flex justify-between mt-2">
                <span class="font-bold text-gray-700 text-xl">In percentage:</span>
                <span class="font-bold text-gray-700 text-2xl">${ ((result.marks / result.maximumMarks) * 100).toFixed(2) }%</span>
                </div>
              </div>
              
            </div>
            <div class="px-6 pt-4 pb-2 flex justify-between">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${ result.subject.subjectName }</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${ result.subject.type }</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">cradits: ${ result.subject.totalCradits }</span>
            </div>
          </div>
               
         `


        }).join('')

    }
    
}



searchResult.addEventListener('click', (e) => {

    

    let data = {
        examCategory: examCategory.value,
        semester: semester.value
    }

       showResult(data);
})