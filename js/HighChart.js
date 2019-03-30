
Highcharts.chart('container-graph', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Hourly Average Traffic'
    },
    /*subtitle: {
        text: 'Source: WorldClimate.com'
    },
    */
    xAxis: {
        categories: [
            '8a',
            '',
            '10a',
            '',
            '12p',
            '',
            '2p',
            '',
            '4p',
            '',
            '6p',
            '',
            '8p',
            '',
            '10p'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} /10</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Foot Traffic',
        data: [1, 6, 3, 8, 0, 4, 7, 3, 8, 2, 2, 5, 4, 7, 3]

    }, {
        name: 'Usage',
        data: [6, 9, 4, 6, 2, 7, 9, 5, 7, 4, 3, 6, 7, 3, 5]
			}]
});