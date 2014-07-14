  function saveVenue(){
    var object = {};
    object['name'] = this.venue.id;
    return object;
  }

  function checkIn(){
    $('.check-in-button').on('click', function(e){
    var newVenue = saveVenue();
    var currentUserId = $('.current-user-id').val();
      $.ajax({
        url: '/venues',
        method: 'post',
        dataType: 'json',
        data: {venue: newVenue},
        success: function(data){

        }
      })
    })
  }
