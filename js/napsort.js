$(document).ready(function() {
    loadFile("js/napspots.json", main);
});

function main() {
    fullSpotData = JSON.parse(this.responseText).spots;
    buildFilter = localStorage.getItem("build-filter");
    console.log(fullSpotData);
    console.log(buildFilter);
    if(buildFilter != "none") {
        var spotData = fullSpotData.filter(function(v, i, a) {
            return v.building.toLowerCase() == buildFilter;
        });
        loc = {
            "hesburgh": "Hesburgh Library",
            "duncan": "Duncan Student Center",
            "jordan": "Jordan Hall of Science"
        };
        $("#building-dropdown").html(loc[buildFilter] + " <span class='caret'></span>");
    } else {
        var spotData = fullSpotData.slice();
    }
    displayData(spotData);
    $("#sort-button").click(function(e) {
        console.log(fullSpotData);
        spotData = fullSpotData;
        buildFilter = $("#building-dropdown").val();
        if(buildFilter != "none" && buildFilter != "") {
            spotData = fullSpotData.filter(function(v, i, a) {
                return v.building.toLowerCase() == buildFilter;
            });
        } else {
            spotData = fullSpotData.slice();
        }
        var drop = $("#sort-dropdown").val();
        if(drop == "comfort") {
            spotData.sort(SortByComfort);
        } else if(drop == "privacy") {
            spotData.sort(SortByPrivacy);
        } else if(drop == "noise") {
            spotData.sort(SortByNoise);
        }
        displayData(spotData);
    });
}
    


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
    return ((averagePrivacy(x) == averagePrivacy(   y)) ? 0 : ((averagePrivacy(x) > averagePrivacy(y)) ? -1 : 1 ));
  }

  function SortByComfort(x,y) {
    return ((averageComfort(x) == averageComfort(y)) ? 0 : ((averageComfort(x) > averageComfort(y)) ? -1 : 1 ));
  }

  function SortByNoise(x,y) {
    return ((averageNoise(x) == averageNoise(y)) ? 0 : ((averageNoise(x) > averageNoise(y)) ? 1 : -1 ));
  }

function displayData(spotData) {
    var mediaContainer = $("#media-holder");
    mediaContainer.empty();
    for(var i=0;i<spotData.length;i++){
        before = '<div style="width: 1000px" class="media"'; //id='
        // id = spotData[i].building+"-floor-" +spotData[i].floor+ "-near-"+spotData[i].nearest; 
         id=spotData[i].index; 
        // before+=id;
        before+= '><div class="media-left"> <a href=""> <img id="' + id +  '" class="picture media-object" src=img/';
        before+=spotData[i].picture;
        before+= ' alt=""> <p class="text-center"> <a role="button" class="nap-button btn btn-sm btn-default" data-toggle="modal" data-target="#my-modal"> Start a Nap</a> </p> </a> </div> <div class="media-body"> <h4 class="media-heading spot-name">';
        //name = "<a spotData[i].building+"+ spotData[i].floor +" +spotData[i].floor+ "+ spotData[i].near +"+spotData[i].nearest </a>";
        name = ''+spotData[i].building + ', Floor '+spotData[i].floor+'; Near '+spotData[i].nearest;
        before+=name;
        before+='</h4> <p class="comfort">Comfort: ';
        comfort=Math.round(averageComfort(spotData[i]));
        privacy=Math.round(averagePrivacy(spotData[i]));
        noise=Math.round(averageNoise(spotData[i]));
        xAlarmComfort= xalarm(comfort);
        xAlarmPrivacy= xalarm(privacy);
        xAlarmNoise= xalarm(noise);
        before+=xAlarmComfort;
        before+='</p> <p class="privacy">Privacy: ';
        before+=xAlarmPrivacy;
        before+='</p> <p class="noise">Noise: ';
        before+=xAlarmNoise;
        before+='</p>';
        //before+='<p> ' + spotData[i].building + ' </p>';
        before+='</div> </div>';

        mediaContainer.append(before);
        $(".picture").click(function () {
            var contentPanelId = jQuery(this).attr("id");
            // var contentPanelClass = jQuery(this).attr("class");
            //if(contentPanelClass != 'nap-button'){
            console.log(contentPanelId);
            localStorage.setItem("spotID", contentPanelId);
            window.open('napinfo.html');
            //}
        }); 
        
        // mediaContainer.find(".comfort").find("x-star-rating")[i];
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