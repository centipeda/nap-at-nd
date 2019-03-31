$("#nap-form").submit(function() {
    $("#nap-form-body").text("Thank you for submitting! Your submission will be reviewed and approved by administrators.");
});

$("#review-form").submit(function() {
    console.log("reset");
    $("#review-main").text("Thank you for reviewing! Your submission will be reviewed and approved by administrators.");
    $("#review-form-footer").html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
});