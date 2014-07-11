$(function(){
  $('.loginform').hide()
  $('.background').hide()
  $('.signup-container').hide()

  $('.login-button').on('click', function(){
    $('.background').fadeOut()
    $('.signup-container').fadeOut()
    if ($('.loginform').css('display') === 'block') {
      $('.loginform').hide(500)
    } else {
      $('.loginform').show(500)
    }
  })

  $('.signup-button').on('click', function(){
    $('.signup-container').fadeIn()
    $('.loginform').hide(500)
    $('.background').fadeIn()
  })

  $('.close-signup').on('click', function(){
    $('.background').fadeOut()
    $('.signup-container').fadeOut()
  })

  $('.new_user').on('submit', function(e){
    e.preventDefault()
    var usernameI = $('#user_username').val()
    var emailI = $('#user_email').val()
    var passwordI = $('#user_password').val()
    var signupDetails = {username: usernameI, email: emailI, password: passwordI}
      $.ajax({
        url: '/users',
        method: 'post',
        dataType: 'json',
        data: {user: signupDetails},
        success: function(data){
          lichard = data
          $('.errors').html('')
          if (!data['id']) {
            $.each(data, function(index, value){
              $('.errors').append($('<p>').html(value))
            })
          }

          else {
            $('.errors').html('')
            $('#username').val($('#user_email').val())
            $('#password').val($('#user_password').val())
            $('.signup-container').html('Success!')
            $('.loginform').show(500)
            $('.signup-container').fadeOut()
            $('.background').fadeOut()
          }
        }
      })
  })

  $('#user_username').on('keyup', function(){
    if ($('#user_username').val().length > 0) {
      $('#user_username').css('border', 'solid lightgreen 3px')
    } else {
      $('#user_username').css('border', 'solid red 3px')
    }
  })

    $('#user_email').on('keyup', function(){
    if ($('#user_email').val().search(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) > -1) {
      $('#user_email').css('border', 'solid lightgreen 3px')
    } else {
      $('#user_email').css('border', 'solid red 3px')
    }
  })

    $('#user_password').on('keyup', function(){
    if ($('#user_password').val().length >= 5 && $('#user_password').val().length <= 10) {
      $('#user_password').css('border', 'solid lightgreen 3px')
    } else {
      $('#user_password').css('border', 'solid red 3px')
    }
  })
})
