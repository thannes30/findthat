  function saveVenue(){
    var object = {};
    return object;
  }

  //check in to a venue
  function checkIn(obj){
    var newVenue = {'name': obj};
    var currentUserId = $('.current-user-id').val();
      $.ajax({
        url: '/checkins',
        method: 'post',
        dataType: 'json',
        data: {checkin: obj},
        success: function(data){
          console.log(obj);
        }
      })
    }
