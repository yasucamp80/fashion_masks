$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    let todo = $('content_post').val();
    console.log(todo);
  });
});