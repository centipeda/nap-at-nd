loadFile("js/napspots.json", storeNapData);


$("#change-preferences").click(function() {
    console.log("changed");
});

$(document).ready(function() {
})

function storeNapData() {
    spotData = JSON.parse(this.responseText);
    sessionStorage.setItem("spotData", spotData);
    sort();
}

function sort() {
    $(".media").each(function(i, element) {
        thisData = spotData["spots"][i];
        i += 1;
        s = "#spot-" + i.toString();
        console.log()
        $(element).find(".spot-name").text(thisData.name);
        $(element).find(".comfort").text("Comfort: " + thisData.comfort);
        $(element).find(".busyness").text("Current Traffic: " + thisData.busyness);
        $(element).find(".nearest").text("Nearest Room: " + thisData.nearest);
    });
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