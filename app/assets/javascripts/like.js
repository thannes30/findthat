function likeVenue(){
  var object = {};
  return object;
}

//like a venue
function addLike(obj){
  var newLike = {'name': obj};
  var currentUserId = $('.current-user-id').val();
  return $.ajax({
      url: '/likes',
      method: 'post',
      dataType: 'json',
      data: {like: obj},
      success: function(data){
        // $(e.target).fadeOut();
        // $(event.target).remove();
        console.log(data);
      },
    })
  }
