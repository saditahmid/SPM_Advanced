function barChart(ctx,
                  labelName,
                  labelList,
                  dataList,
                  bdcolor = '#094480',
                  bgcolor = '#d9e2ec') {
    //Chart.defaults.global.defaultFontFamily = "Oxygen";
    Chart.defaults.global.defaultFontColor = "black";

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: labelList,
            datasets: [{
                label: labelName,
                backgroundColor: bgcolor,
                borderColor: bdcolor,
                data: dataList
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function pieChart(ctx,
                  labelName,
                  labelList,
                  dataList,
                  bdcolor = '#094480',
                  bgcolor = '#d9e2ec') {
    Chart.defaults.global.defaultFontColor = "black";
    var chart = new chart(ctx, {
        type: 'pie',
        data: {
            labels: labelList,
            datasets: [{
                label: labelName,
                backgroundColor: bgcolor,
                borderColor: bdcolor,
                data: dataList,
                borderWidth: [1, 1, 1, 1, 1],
                hoverOffset: 4
            }],

        },
        options: {
            responsive: true,
            title: {
                display: true,
                position: "top",
                text: "Pie Chart",
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            }
        }
    })

}

function lineChart(ctx,
                   labelName,
                   labelList,
                   dataList,
                   bdcolor = '#094480',

                   bgcolor = '#d9e2ec') {
    Chart.defaults.global.defaultFontFamily = "Oxygen";
    Chart.defaults.global.defaultFontColor = "black";

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labelList,
            datasets: [{
                label: labelName,
                backgroundColor: bgcolor,
                borderColor: bdcolor,
                data: dataList
            }]
        },

        // Configuration options go here
        options: {}
    });
}

function lineChartObject(ctx,
                         labelList,
                         chartObjects) {
    Chart.defaults.global.defaultFontFamily = "Oxygen";
    Chart.defaults.global.defaultFontColor = "black";

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labelList,
            datasets: chartObjects
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


function stackedChart(ctx, labelName, datasetlist, isTrue) {

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelName, // responsible for how many bars are gonna show on the chart
            // create 12 datasets, since we have 12 items
            // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
            // put 0, if there is no data for the particular bar
            datasets: datasetlist
        },
        options: {
            responsive: false,
            legend: {
                position: 'right' // place legend on the right side of chart
            },
            scales: {
                xAxes: [{
                    stacked: isTrue // this should be set to make the bars stacked
                }],
                yAxes: [{
                    stacked: isTrue // this also..
                }]
            }
        }
    });
}
``