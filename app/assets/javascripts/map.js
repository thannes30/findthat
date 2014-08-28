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
  var geocoder = "";
  var pos = "";

  $("#query").click(function(){
    $(this).val("");
  });

  $("#citystate").click(function(){
    $(this).val("");
  });

  // show/hide zipcode div
  $(function(){
    $("#usegeo").on('change', function(){
      $("#citystate").slideToggle();
    });
  });

  // input placeholder
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

  // input placeholder
  $("#citystate").blur(function(){
    if ($(this).val() == "") {
      $(this).val("Enter City and State");
    }
    if ($(this).val() != "Enter City and State") {
      $(this).addClass("focus");
    } else {
      $(this).removeClass("focus");
    }
  });

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
    getTips(options);
  });

  // getTips
  function getTips(options){
    $.ajax({
      type: "GET",
      url: "https://api.foursquare.com/v2/venues/"+options.venue_id+"/tips?sort=recent&oauth_token=PV3JLPOZHVZ2MF4QIVWDWZE4ZDIKGHAVJJNGMNFVZAS2ADMC&v=20140715",
      success: function(data){
        var data = data.response.tips
        var rand = Math.floor((Math.random() * 20) + 1);
        $(options.event.target.parentElement).append('<p>'+data.items[rand].text+'</p>');
      }
    });
  };

  $("#searchform").submit(function(event){

    if(!$("#usegeo").is(':checked')) {

        event.preventDefault();
        geocoder = new google.maps.Geocoder();
        var address = $("#citystate").val();
        geocoder.geocode( { 'address': address}, function(results, status) {
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
        getVenues();
      });
    console.log("search by city state")
    //search foursquare for my search term around users' current location
    function getVenues() {
      $.ajax({
          type: "GET",
          url: "https://api.foursquare.com/v2/venues/explore?ll="+lat+","+lng+"&client_id=TNDU1XWFBW0AEKBMMYRSXOUCN21HWG4ZH3GS0FBVVY31UC3N&client_secret=1UOTAT2RRP5QUDKXBBO5FCZ4ESQIA2C44X3WWNMDKEQJO4XN&v=20130619&query="+$("#query").val()+"",
          success: function(data) {
            console.log(data.response.groups[0].items);
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
     };
    } else {
      event.preventDefault();
      if (!lat) {
        navigator.geolocation.getCurrentPosition(getLocation);
      } else {
        getVenues();
      }

    //get location, save it to lat, long, and pos for infowindow
    function getLocation(location) {
        lat = location.coords.latitude;
        lng = location.coords.longitude;
        pos = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      getVenuesByGeo();
    }
    console.log("get venues by geo");

    //search foursquare for my search term around users' current location
    function getVenuesByGeo() {
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
            anchor: new google.maps.Point(24/2, 24),
            },
            markerOptions = {
            map: map,
            position: new google.maps.LatLng(this.venue.location.lat, this.venue.location.lng),
            id: this.venue.id,
            title: this.venue.name,
            animation: google.maps.Animation.DROP,
            icon: markerImage,
            optimized: false
            },
            marker = new google.maps.Marker(markerOptions);
          });
          var infowindow = new google.maps.InfoWindow({
              map: map,
              position: pos,
              content: 'You are here.'
          });
        }
      });
     } //end getVenuesByGeo
    }; //end else
  }); //end search submit

  //before search, show map
  function mapbuild() {
    $("#venues").hide();
    var myOptions = {
    zoom:5,
    center: new google.maps.LatLng(38.962612,-99.080879),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: false
    },f
    map = new google.maps.Map(document.getElementById('map'), myOptions);
  };

  mapbuild();
});
