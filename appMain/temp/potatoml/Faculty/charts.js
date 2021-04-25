function chartContainer1() {
    var chart = new CanvasJS.Chart("chartContainer1",
        {
            animationEnabled: true,
            title: {
                text: "Spline Area Chart"
            },
            axisX: {
                interval: 10,
            },
            data: [
                {
                    type: "splineArea",
                    color: "rgba(255,12,32,.3)",
                    dataPoints: [
                        { x: new Date(1992, 0), y: 2506000 },
                        { x: new Date(1993, 0), y: 2798000 },
                        { x: new Date(1994, 0), y: 3386000 },
                        { x: new Date(1995, 0), y: 6944000 },
                        { x: new Date(1996, 0), y: 6026000 },
                        { x: new Date(1997, 0), y: 2394000 },
                        { x: new Date(1998, 0), y: 1872000 },
                        { x: new Date(1999, 0), y: 2140000 },
                        { x: new Date(2000, 0), y: 7289000 },
                        { x: new Date(2001, 0), y: 4830000 },
                        { x: new Date(2002, 0), y: 2009000 },
                        { x: new Date(2003, 0), y: 2840000 },
                        { x: new Date(2004, 0), y: 2396000 },
                        { x: new Date(2005, 0), y: 1613000 },
                        { x: new Date(2006, 0), y: 2821000 }
                    ]
                },
            ]
        });
    chart.render();
}
function chartcontainer2() {
    var chart = new CanvasJS.Chart("chartContainer4",
        {
            animationEnabled: true,
            title: {
                text: "Column Chart"
            },
            axisX: {
                interval: 10,
            },
            data: [
                {
                    type: "column",
                    legendMarkerType: "triangle",
                    legendMarkerColor: "green",
                    color: "rgba(255,12,32,.3)",
                    showInLegend: true,
                    legendText: "Country wise population",
                    dataPoints: [
                        { x: 10, y: 297571, label: "India" },
                        { x: 20, y: 267017, label: "Saudi" },
                        { x: 30, y: 175200, label: "Canada" },
                        { x: 40, y: 154580, label: "Iran" },
                        { x: 50, y: 116000, label: "Russia" },
                        { x: 60, y: 97800, label: "UAE" },
                        { x: 70, y: 20682, label: "US" },
                        { x: 80, y: 20350, label: "China" }
                    ]
                },
            ]
        });
    chart.render();
}