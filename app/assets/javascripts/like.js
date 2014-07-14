function LikeModel(obj){
  this.user_id = obj.user_id;
  this.venue_id = obj.venue_id;
}

function LikeView(model){
  this.model = model;
  this.el = undefined;
}

function LikeCollection(){
  this.likes = {};
}

//fetch a user's likes
LikeCollection.prototype.fetch = function(){
  var that = this;
  $.ajax({
    url: '/venues',
    method: 'get',
    dataType: 'json',
    success: function(data){
      $.each(data, function(datum){
        $.each(data[datum].likes, function(likeDatum){
          console.log(data[datum].likes[likeDatum]);
          return data[datum].likes[likeDatum];
        })
      })
    }
 })
}

//like a venue
function addLike(){
  $('.like-button').on('click', function(event){
    var id = $(event.target).data('id');
    $.ajax({
      url: '/venues/likes',
      method: 'post',
      dataType: 'json',
      data: {id: id},
      success: function(data){
        $(event.target).remove();
      },
    })
  })
}
