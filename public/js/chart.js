var ctx = document.getElementById('myChart').getContext('2d');
var arrayData = document.getElementById('arrayData')

var chartData = JSON.parse(arrayData.value)
console.log(chartData);
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: chartData.arrayMonth,
        datasets: [{
            label: 'Attendance by month',
            data: chartData.arrayDate,
            backgroundColor: [ 
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [ 
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            barThickness: 70,
            maxBarThickness: 100
        }]
    },
    options: {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    stepSize: 1
                }
            }]
        }
    }
});




