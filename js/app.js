(function() {
  'use strict';

  var movies = [];

  var getMovies = function(searchTerm) {
    movies = [];

    var $xhr = $.getJSON(`http://www.omdbapi.com/?s=${searchTerm}`);

    $xhr.done(function(data) {
      var results = data.Search;
      var movie;

      for (var result of results) {
        movie = {
          poster: result.Poster,
          title: result.Title,
          year: result.Year,
          id: result.imdbID
        };

        getPlot(movie);
      }
    });

    $xhr.fail(function(err) {
      console.error(err);
    });
  };

  var getPlot = function(movie) {
    var $xhr = $.getJSON(`http://www.omdbapi.com/?i=${movie.id}&plot=full`);

    $xhr.done(function(data) {
      movie.plot = data.Plot;

      movies.push(movie);

      renderCards();
    });

    $xhr.fail(function(err) {
      console.error(err);
    });
  };

  var renderCards = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div>').addClass('col s4');
      var $card = $('<div>').addClass('card hoverable');
      var $content = $('<div>').addClass('card-content');
      var $title = $('<h6>').addClass('card-title').text(movie.title);
      var $poster = $('<img>').addClass('responsive-img').attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      }).css({
        height: '425px',
        width: '100%'
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div>').addClass('card-action');
      var $plot = $('<a>').addClass('waves-effect waves-light btn modal-trigger').attr('href', `#${movie.id}`).text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $('<div>').attr('id', `${movie.id}`).addClass('modal');
      var $modalContent = $('<div>').addClass('modal-content');
      var $modalHeader = $('<h4>').text(movie.title);
      var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  $('form').on('submit', function(event) {
    var searchTerm = $('#search').val();

    if (searchTerm.trim() === '') {
      return;
    }

    getMovies(searchTerm);

    event.preventDefault();
  });
})();
