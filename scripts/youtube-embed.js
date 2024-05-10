// youtube-embed.js

$(document).ready(function() {
  $('.youtube-spoilers a').click(function(e) {
    e.preventDefault();
    var videoUrl = $(this).attr('href');
    var embedUrl = videoUrl.replace("watch?v=", "embed/");
    var iframe = $('<iframe>').attr('src', embedUrl).attr('width', '560').attr('height', '315').attr('frameborder', '0').attr('allowfullscreen', true);
    $(this).replaceWith(iframe);
  });
});
