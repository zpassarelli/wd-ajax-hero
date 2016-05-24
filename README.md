# Ajax Hero

In this exercise, you're tasked with extending this web application by making Ajax calls to the OMDb API and updating the DOM. To get started, fork and clone this repository.

## Search

Though you're free to style the page however you want, the page should behave something like this.

![](screenshots/search.gif)

More specifically, the page should allow a user to do the following.

- Search for movies using keywords (e.g. "star wars").
- Update the page with the move search results from OMDb.

You'll need to extend the existing JavaScript by adding the following behavior.

- Listen for submissions on the search form. Remember to prevent the default action.
- Validate the user input is not blank.
- Clear the previous search results.
- Send an HTTP request to the [OMDB API](http://omdbapi.com/) search endpoint.
- Handle the HTTP response by pushing a new, well-formed JavaScript object into the global `movies` array.
- Render the `movies` array to the page by calling the `renderMovies()` function with no arguments.

Each object in the `movies` array must be well-formed with the following key-value pairs.

| Key      | Value                               |
|----------|-------------------------------------|
| `id`     | The movie's unique imdb ID number.' |
| `poster` | The URL to the movie's poster image |
| `title`  | The title of the movie.             |
| `year`   | The year of the movie's release.    |

## Bonus

Though you're free to style the page however you want, the page should function like this something like this.

![](screenshots/plot.gif)

More specifically, the page should allow a user to do the following.

- Click the "Plot Synopsis" button to spawn a modal with the corresponding movie's plot information.

You'll need to extend the existing JavaScript by adding the following behavior.

- Use the movie's unique imdb ID to send an HTTP request to the [OMDB API](http://omdbapi.com/) id endpoint.
