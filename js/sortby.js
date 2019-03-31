
$(document).ready(function() {
    loadFile("js/napspots.json", storeNapData);
})

$("#Privacy-button").click(function(e) {
    storeNapData.sort(SortByPrivacy);
})

$("#Comfort-button").click(function(e) {
    storeNapData.sort(SortByPrivacy);
})

$("#Noise-button").click(function(e) {
    storeNapData.sort(SortByNoise);
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

  $(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  });
  
  var storeNapDataPrivacy=storeNapData;
  var storeNapDataComfort=storeNapData;
  var storeNapDataPrivacy=storeNapData;

  /*
  for(var n=0;n<storeNapData.length;n++){
    document.write(storeNapData[n].ID + ' ' + storeNapData[n].Name + '<br>');

  }
  */
