  function saveVenue(){
    var object = {};
    return object;
  }

  function checkIn(obj){
    // debugger;
    var newVenue = saveVenue();
    var currentUserId = $('.current-user-id').val();
      $.ajax({
        url: '/checkins',
        method: 'post',
        dataType: 'json',
        data: {venue: newVenue},
        success: function(data){
          alert('Weve got you checked in.');
        }
      })
    }
