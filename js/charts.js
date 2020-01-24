google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Robot', 'Usage Ratio'],
          ['ALPHA',     15],
          ['BRAVO',     50],
          ['CHARLIE',  25],
          ['DELTA', 10]
        ]);

        var options = {
          backgroundColor: '#6d6f72',
          legend: {textStyle: {color: '#d8d8d8', bold: true, fontSize:20}},
          chartArea: {top: 10, bottom: 10, left: 20,right:5,width: 300,height:300},
          
          pieSliceTextStyle: {color: '#d8d8d8', fontSize: 13},
          pieSliceBorderColor: '#d8d8d8'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        
        chart.draw(data, options);

        var data = google.visualization.arrayToDataTable([
          ['Robot', 'Usage Ratio'],
          ['Alpha',     15],
          ['Bravo',     20],
          ['Charlie',  25],
          ['Delta', 40]
        ]);

        chart.draw(data, options);

      }