$(function () {
  $(".card[data-link]").each(function (_, card) {
    var link = card.dataset.link;
    $.ajax(link).done(function (html) {
      var responseDocument = document.implementation.createHTMLDocument(link);
      responseDocument.documentElement.innerHTML = html;
      var ogp = {};
      for (const meta of responseDocument.querySelectorAll('meta[property^="og:"]')) {
        ogp[meta.getAttribute("property")] = meta.content;
      }

      $(card).append(
        $('<a target="_blank">')
          .attr("href", link)
          .append(
            $('<img class="card-img-top">').attr({
              src: ogp["og:image"],
              alt: ogp["og:image:alt"]
            })
          ),
        $('<div class="card-body">').append(
          $('<h3 class="card-title">').text(ogp["og:title"]),
          $('<p class="card-text">').text(ogp["og:description"])
        ),
        $('<div class="card-footer">').append(
          $('<a class="card-link" target="_blank">Run</a>').attr("href", link),
          $('<a class="card-link" target="_blank">Source</a>').attr("href", `https://github.com/AsturaPhoenix/${link}`)
        )
      );
    });
  });
});