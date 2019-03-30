$(".nap-button").click(function(e) {
    $("#myModal").modal('toggle');
})

 
// get tag element
var countdown = document.getElementById('countdown');
var minutes_left;
var hours_left;
$("#powerNap").click({isMoreau: true}, startNap);
$( "#napButton" ).click({isMoreau: false}, startNap);

function startNap(event) {
    var isMoreauNap = event.data.isMoreau;
    function switchModal(){
        $("#my-modal").removeClass("in");
        $(".modal-backdrop").remove();
        $("#my-modal").hide();
        $("#timer-modal").addClass("in");
        $(".modal-backdrop").add();
        $("#timer-modal").show();
        $("#countdown").addClass("darken");
    }
    $(".modal.in").on('hidden.bs.modal', function(e) {
    });
    if(isMoreauNap) {
        var minutes_left = 20;
        var hours_left = 0;
    }
    else {
    var minutes_left = $('#numMinutes').val();
    var hours_left = $('#numHours').val();
    }
    console.log("minutes: " + String(minutes_left));
    var seconds_left = (minutes_left * 60) + (hours_left * 3600);
    var interval = setInterval(incrementTimer,1000);
    function incrementTimer() {
        seconds_left--;   
        console.log(seconds_left);

        if(seconds_left <= 0) {
            clearInterval(interval)
            $("#countdown").removeClass("darken");
        }
    
        var hours = parseInt(seconds_left / 3600);
        var seconds_calc = seconds_left % 3600;
        
        var minutes = parseInt(seconds_calc / 60);
        var seconds = parseInt(seconds_calc % 60);
        
        // format countdown string + set tag value
        
        $("#countdown").html('<span class="hours">' + hours + ' <b>Hours</b></span> <span class="minutes">' + minutes + ' <b>Minutes</b></span> <span class="seconds">' + seconds + ' <b>Seconds</b></span>');  

    }

}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
 
// update the tag with id "countdown" every 1 second
