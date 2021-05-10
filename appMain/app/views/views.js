let ctx= document.getElementById('PLO').getContext('2d');

// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

let PLO = new Chart(ctx, {
    type:'bar', // bar, horizon talBar, pie, line, doughnut, radar, polarArea
    data:{
        datasets:[{
            data: [80,70,85,50,64,49,50,66,65,43,52,46,75],
            //backgroundColor:'green',
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(233, 144, 126, 1)',
                'rgba(67, 11, 41, 0.88)',
                'rgba(233, 6, 126, 1)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(55, 164, 236, 1)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
        }],
        labels: [
            'PLO1', 'PLO2', 'PLO3', 'PLO4', 'PLO5', 'PLO6', 'PLO7', 'PLO8', 'PLO9', 'PLO10', 'PLO11', 'PLO12', 'PLO13'
        ]
    },
    options:{
        title:{
            display:true,
            text:'Average PLO of CSC201',
            fontSize:25
        },
        legend:{
            display:true,
            position:'right',
            labels:{
                fontColor:'#000'
            }
        },
        scales: {
            ticks: {
                min: 0
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]

        },
        layout:{
            padding:{
                left:0,
                right:0,
                bottom:0,
                top:0
            }
        },
        tooltips:{
            enabled:true
        }
    }
});