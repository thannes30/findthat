function CheckInModel(obj){
  this.id = obj.id;
  this.name = obj.name;
}

function CheckInView(model){
  this.model = model;
  this.el    = undefined;
}

function CheckInCollection(){
  this.checkins = {};
}

CheckInCollection.prototype.fetch = function(cb){
  var that = this;
  return $.ajax({
    url: '/checkins',
    method: 'get',
    dataType: 'json',
    success: function(data, status, jqxhr){
      $.each(data, function(i,datum){
        var checkin = new CheckInModel(datum);
        that.checkins[checkin.id] = checkin;
      });
      if(typeof cb === 'function'){
        cb(data);
      }
    }
  })
}


function addCheckIn(){
  $('.check-in-button').on('click', function(event){
    var id = $(event.target).data('id');
    $.ajax({
      url: '/'
    })
  })
}
