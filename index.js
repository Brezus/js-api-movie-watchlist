const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const moviesList = document.getElementById('moviesList')
const movieListDefaultDisplayContainer = document.getElementById(
    'movie-list-default-display-container'
)
const movieListDefaultDisplay = document.getElementsByClassName(
    'movie-list-default-display'
)

searchBtn.addEventListener('click', searchMovies)

async function searchMovies() {
    let res = await fetch(
        `https://www.omdbapi.com/?s=${searchInput.value}&apikey=e668e570`
    )
    let data = await res.json()

    const movies = data.Search

    for (let element of movieListDefaultDisplay) {
        element.style.display = 'none'
    }
    movieListDefaultDisplayContainer.style.display = 'none'

    movies.forEach(movie => {
        moviesList.innerHTML += `
        <h2>${movie.Title}</h2>
    `
    })
}
