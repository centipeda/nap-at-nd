$(".nap-button").click(function(e) {
    $("#myModal").modal('toggle');
})

 
// get tag element
var countdown = document.getElementById('countdown');
var minutes_left;
var hours_left;
$("#powerNap").click({isMoreau: true}, startNap);
$( "#napButton" ).click({isMoreau: false}, startNap);

/*
$(".resumeButton").click(function() {
  startNap();
});
*/

function startNap(event) {
    var isMoreauNap = event.data.isMoreau;
    
    $('#my-modal').modal('hide');
    $("#my-modal").on('hidden.bs.modal', function() {
      $("#timer-modal").modal("show");
      $(".counter").addClass("darken");
      
    });

    $('#timer-modal').modal({
      backdrop: 'static',
      keyboard: false
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
    var isPaused = false;

    function incrementTimer() {
      

      $("#endButton").click(function() {
        $("#timer-modal").modal("hide");
        clearInterval(interval);
      });
        
        seconds_left--;   
        console.log(seconds_left);

        if(seconds_left <= 1) {
            clearInterval(interval)
            $("#countdown").removeClass("darken");
            $("#timer-modal").modal("hide");
            $("#timer-modal").on('hidden.bs.modal', function() {
              $("#finish-modal").modal("show");
              
              
            });
        }

      if(isPaused == true) {
        $("#pauseButton").click(function() {
          isPaused = false;
          var $this = $(this);
          $this.removeClass('resumeButton');
          $(".counter").addClass("darken");
          $this.text('Pause Nap');
        });
      }


      if(isPaused == false) {
        $("#pauseButton").click(function() {
          isPaused = true;
          var $this = $(this);
          $this.addClass('resumeButton');
          if($this.hasClass('resumeButton')){
              $this.text('Resume Nap');         
          } else {
              $this.text('Pause Nap');
          }
          $(".counter").removeClass("darken");
      });
    }

          if(isPaused == true) {           
            seconds_left = seconds_left + 1;
          }

          
        
    
        var hours = parseInt(seconds_left / 3600);
        var seconds_calc = seconds_left % 3600;
        
        var minutes = parseInt(seconds_calc / 60);
        var seconds = parseInt(seconds_calc % 60);
        
        // format countdown string + set tag value
        
        $("#countdown").html('<span class="hours"><h1></h1>' + hours + ' <b>Hours</b></span> <span class="minutes">' + minutes + ' <b>Minutes</b></span> <span class="seconds">' + seconds + ' <b>Seconds</b></span>');  

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
