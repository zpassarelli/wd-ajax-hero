(function() {
  'use strict';

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
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

  var getMovies = function(searchTerm) {
    movies = [];

    var $xhr = $.getJSON(`http://www.omdbapi.com/?s=${searchTerm}`);

    $xhr.done(function(data) {
      var results = data.Search;
      var movie;

      for (var result of results) {
        movie = {
          id: result.imdbID,
          poster: result.Poster,
          title: result.Title,
          year: result.Year
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

      renderMovies();
    });

    $xhr.fail(function(err) {
      console.error(err);
    });
  };

  $('form').on('submit', function(event) {
    event.preventDefault();

    var searchTerm = $('#search').val();

    if (searchTerm.trim() === '') {
      return;
    }

    getMovies(searchTerm);
  });
})();
