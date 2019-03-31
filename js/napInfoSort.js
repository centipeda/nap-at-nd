$(document).ready(function() {
    loadFile("js/napspots.json", storeNapData);
});

$("#sort-dropdown").change(function(e) {
    console.log("possibly");
    console.log(this.val());
});


function storeNapData() {
    console.log("hello");
    spotData = JSON.parse(this.responseText).spots;
    spotID = localStorage.getItem("spotID");
    fillSpotData(spotData, spotID);
    makeHighChart(spotData[spotID].times);
}

function xhrSuccess() { 
    this.callback.apply(this, this.arguments); 
}

function xhrError() { 
    console.error(this.statusText); 
}

function loadFile(url, callback /*, opt_arg1, opt_arg2, ... */) {
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.arguments = Array.prototype.slice.call(arguments, 2);
    xhr.onload = xhrSuccess;
    xhr.onerror = xhrError;
    xhr.open("GET", url, true);
    xhr.send(null);
}


function fillSpotData(spotData, spotID) {
    console.log(spotID);
    console.log(Math.round(averageComfort(spotData[spotID])));
    $("#location").html(""+spotData[spotID].building+", Floor "+spotData[spotID].floor+"; Near "+spotData[spotID].nearest);
    $("#comfortRating").html("Comfort: <x-alarm-rating value=" + Math.round(averageComfort(spotData[spotID])) + "></x-alarm-rating>");
    $("#privacyRating").html("Privacy: <x-alarm-rating value=" + Math.round(averagePrivacy(spotData[spotID])) + "></x-alarm-rating>");
    $("#noiseRating").html("Noise: <x-alarm-rating value=" + Math.round(averageNoise(spotData[spotID])) + "></x-alarm-rating>");
    $("#spot-image").css("background-image","url(img/" + spotData[spotID].picture);
}

//average privacy level
function averagePrivacy(x){
    var total=0;
    for(var n=0;n<x.privacy_reviews.length;n++){
        total+=x.privacy_reviews[n];
    }
    return total/x.privacy_reviews.length;    
}

//average comfort level
function averageComfort(x){
    var total=0;
    for(var n=0;n<x.comfort_reviews.length;n++){
        total+=x.comfort_reviews[n];
    }
    return total/x.comfort_reviews.length;    
}

//average noise level
function averageNoise(x){
    var total=0;
    for(var n=0;n<x.noiseLevel_reviews.length;n++){
        total+=x.noiseLevel_reviews[n];
    }
    return total/x.noiseLevel_reviews.length;    
}


function makeHighChart(times) {
    (arr = []).length = 15; 
    arr.fill(0);
    console.log(times.length);
    for(i=0;i < times.length; i++) {
        arr[times[i]-8]++;
    }
console.log(arr);
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
            '9a',
            '10a',
            '11a',
            '12p',
            '1p',
            '2p',
            '3p',
            '4p',
            '5p',
            '6p',
            '7p',
            '8p',
            '9p',
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
            '<td style="padding:0"><b>{point.y:.1f} times</b></td></tr>',
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
        name: 'Usage (over last week)',
        data: arr

    }]
});
}