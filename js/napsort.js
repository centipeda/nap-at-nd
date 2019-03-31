$(document).ready(function() {
    loadFile("js/napspots.json", storeNapData);
});

function storeNapData() {
    spotData = JSON.parse(this.responseText);
    displayData(spotData);
}

// From sortBy
$("#comfort").click(function(e) {
    console.log("click");
    //storeNapData();
    spotData = JSON.parse(this.responseText);
    spotData.sort(SortByComfort);
    displayData(spotData);
});

function displayPrivacy() {
    alert("ALERT");
    spotData = JSON.parse(this.responseText);
    spotData.sort(SortByPrivacy);
    displayData(spotData);
}

$("#privacy").click(function(e) {
    spotData = JSON.parse(this.responseText);
    spotData.sort(SortByPrivacy);
    displayData(spotData);
    e.preventDefault();
})

$("#noise").click(function(e) {
    spotData = JSON.parse(this.responseText);
    spotData.sort(SortByNoise);
    displayData(sortData);
    e.preventDefault();
})

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

  function SortByPrivacy(x,y) {
    return ((averagePrivacy(x) == averagePrivacy(y)) ? 0 : ((averagePrivacy(x) > averagePrivacy(y)) ? 1 : -1 ));
  }

  function SortByComfort(x,y) {
    return ((averageComfort(x) == averageComfort(y)) ? 0 : ((averageComfort(x) > averageComfort(y)) ? 1 : -1 ));
  }

  function SortByNoise(x,y) {
    return ((averageNoise(x) == averageNoise(y)) ? 0 : ((averageNoise(x) > averageNoise(y)) ? 1 : -1 ));
  }

function displayData(spotData) {
    var mediaContainer = $("#media-holder");
    for(var i=0;i<spotData.length;i++){
        before = '<div class="media" id='
        id = spotData[i].building+"-floor-" +spotData[i].floor+ "-near-"+spotData[i].nearest;
        before+=id;
        before+= '<div class="media-left"> <a href=""> <img class="media-object" src=';
        before+=spotData[i].picture;
        before+= 'alt=""> <p class="text-center"> <a role="button" class="nap-button btn btn-sm btn-default" data-toggle="modal" data-target="#my-modal"> Start a Nap</a> </p> </a> </div> <div class="media-body"> <h4 class="media-heading spot-name">';
        name = spotData[i].building+", floor " +spotData[i].floor+ "; near "+spotData[i].nearest;
        before+=name;
        before+='</h4> <p class="comfort">Comfort ';
        xAlarmComfort='';
        xAlarmPrivacy='';
        xAlarmNoise='';
        before+=xAlarmComfort;
        before+='</p> <p class="privacy">Privacy: ';
        before+=xAlarmPrivacy;
        before+='</p> <p class="noise">Noise: ';
        before+=xAlarmNoise;
        before+='</p> </div> </div>';

        mediaContainer.append(before);
}
    /*
    $(".media").each(function(i, element) {
        thisData = spotData["spots"][i];
        i += 1;
        s = "#spot-" + i.toString();
        console.log();
        ss = '<x-alarm-rating value="4"></x-alarm-rating>';
        $(element).find(".spot-name").text(thisData.name);
        $(element).find(".comfort").html("Comfort: " + xalarm(thisData.comfort));
        $(element).find(".busyness").html("Traffic: " + xalarm(thisData.busyness));
        $(element).find(".nearest").text("Nearest Room: " + thisData.nearest);
    });
    */
}

$("#change-preferences").click(function() {
    console.log("changed");
});

$(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  });

function xalarm(value) {
    return "<x-alarm-rating value=" + String(value) + "></x-alarm-rating>";
}


// function to load files
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