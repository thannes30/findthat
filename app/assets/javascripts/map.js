$(function() {
  var lat = "";
  var lng = "";
  var appendeddatahtml = "";
  var arguments = "";
  var str = "";
  var newstr = "";
  var phone = "";
  var rating = "";
  var icon = "";
  var address = "";

  $("#query").click(function(){
    $(this).val("");
  });

  $("#zipcode").click(function(){
    $(this).val("");
  });

  // show/hide zipcode div
  $(function(){
    $("#usegeo").on('change', function(){
      $("#zipcode").slideToggle();
    });
  });

  $("#query").blur(function(){
    if ($(this).val() == "") {
      $(this).val("Example: Happy Hour");
    }
    if ($(this).val() != "Example: Happy Hour") {
      $(this).addClass("focus");
    } else {
      $(this).removeClass("focus");
    }
  });

  $("#zipcode").blur(function(){
    if ($(this).val() == "") {
      $(this).val("Enter Zip Code");
    }
    if ($(this).val() != "Enter Zip Code") {
      $(this).addClass("focus");
    } else {
      $(this).removeClass("focus");
    }
  });

  //on submit, get user's location
  $("#searchform").submit(function(event){
    event.preventDefault();
    if (!lat) {
      navigator.geolocation.getCurrentPosition(getLocation);
    } else {
      getVenues();
    }
  });

  //get location, save it to lat, long
  function getLocation(location) {
      lat = location.coords.latitude;
      lng = location.coords.longitude;
    getVenues();
  }

  //check in at venue
  $('#venues').on('click', '.check-in-button', function(e){
    var object = {};
    object.name = $(e.target.parentElement).find('h3 a').html();
    object.venue_id = $(e.target.parentElement).find('h3').data('venue-id');
    checkIn(object);
  });

  //like venue
  $('#venues').on('click', '.like-button',function(e){
    var object = {};
    object.name = $(e.target.parentElement).find('h3 a').html();
    object.venue_id = $(e.target.parentElement).find('h3').data('venue-id');
    addLike(object).then(function(){
      $(e.target).fadeOut();
    });
  });

  //view tips
  $('#venues').on('click', '.view-tips-button', function(e){
    var options = {};
    options.venue_id = $(e.target.parentElement).find('h3').data('venue-id');
    options.event = e;
    // debugger;
    getTips(options);
    // console.log(object);
  })

  function getTips(options){
    $.ajax({
      type: "GET",
      url: "https://api.foursquare.com/v2/venues/"+options.venue_id+"/tips?sort=recent&oauth_token=PV3JLPOZHVZ2MF4QIVWDWZE4ZDIKGHAVJJNGMNFVZAS2ADMC&v=20140715",
      success: function(data){
        var data = data.response.tips
        rand = Math.floor((Math.random() * 20) + 1);
        $(options.event.target.parentElement).append('<p>'+data.items[rand].text+'</p>');
      }
    })
  }

  //search foursquare for my search term around users' current location
  function getVenues() {
    $.ajax({
        type: "GET",
        url: "https://api.foursquare.com/v2/venues/explore?ll="+lat+","+lng+"&client_id=TNDU1XWFBW0AEKBMMYRSXOUCN21HWG4ZH3GS0FBVVY31UC3N&client_secret=1UOTAT2RRP5QUDKXBBO5FCZ4ESQIA2C44X3WWNMDKEQJO4XN&v=20130619&query="+$("#query").val()+"",
        success: function(data) {
        $("#venues").show();
        var dataobj = data.response.groups[0].items;
        $("#venues").html("");

        // rebuild the map using data
        var myOptions = {
          zoom:14,
          center: new google.maps.LatLng(lat,lng-.018),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          panControl: false
        },
        map = new google.maps.Map(document.getElementById('map'), myOptions);


        // build markers and elements for venues returned
        $.each( dataobj, function() {
          if (this.venue.categories[0]) {
            str = this.venue.categories[0].icon.prefix;
            newstr = str.substring(0, str.length - 1);
            icon = newstr+this.venue.categories[0].icon.suffix;
          } else {
            icon = "";
          }

          if (this.venue.url){
            url = this.venue.url;
          } else {
            url = "";
          }

          if (this.venue.contact.formattedPhone) {
            phone = "Phone:"+this.venue.contact.formattedPhone;
          } else {
            phone = "";
          }

          if (this.venue.location.address) {
            address = '<p class="subinfo">'+this.venue.location.address;
          } else {
            address = "";
          }

          if (this.venue.location.city){
            city = ', '+this.venue.location.city+'<br>';
          } else {
            city = "";
          }

          if (this.venue.hours){
            hours = this.venue.hours.status;
          } else {
            hours = "";
          }

          if (this.venue.rating) {
            rating = '<span class="rating">'+this.venue.rating+'</span>';
          }

          if (this.venue.id) {
            fsquare_id = this.venue.id;
          }

          appendeddatahtml = '<div class="venue"><h3 data-venue-id="'+fsquare_id+'">'+'<a href='+url+'>'+this.venue.name+'</a>'+rating+'</h3>'+address+city+phone+'<br />'+hours+'</p><p><strong>Total Checkins:</strong> '+this.venue.stats.checkinsCount+'</p><button class="check-in-button">Check In</button><button class="view-tips-button">View Tips</button><button class="like-button">Like</button></div>';
          $("#venues").append(appendeddatahtml);

          // Build markers
          var markerImage = {
          url:'images/map-marker.png',
          scaledSize: new google.maps.Size(24, 24),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(24/2, 24)
          },
          markerOptions = {
          map: map,
          position: new google.maps.LatLng(this.venue.location.lat, this.venue.location.lng),
          title: this.venue.name,
          animation: google.maps.Animation.DROP,
          icon: markerImage,
          optimized: false
          },
          marker = new google.maps.Marker(markerOptions)
        });
      }
    });
  }

  function mapbuild() {
    $("#venues").hide();
    var myOptions = {
    zoom:5,
    center: new google.maps.LatLng(38.962612,-99.080879),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: false
    },f
    map = new google.maps.Map(document.getElementById('map'), myOptions);
  }

  mapbuild();
});
