// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  $.get('/:dateValue', function(date) {
    var dateFormat = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
      date = new Date().toLocaleDateString("en-us", dateFormat);
    
      $('<li></li>').text(date).appendTo('ul#dreams');
    
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});


