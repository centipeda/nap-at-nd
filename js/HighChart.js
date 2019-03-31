
Highcharts.chart('container-graph', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Hourly Traffic'
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
        name: 'Noise Level (average)',
        data: [1, 0, 0, 2, 2, 3, 2, 2, 4, 3, 3, 2, 0, 1, 0]

    }]
});