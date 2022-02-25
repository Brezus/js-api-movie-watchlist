let imdbId = 'tt3896198' // IMBd ID
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const moviesList = document.getElementById('moviesList')
const movieListDefaultDisplay = document.getElementsByClassName(
    'movie-list-default-display'
)

searchBtn.addEventListener('submit', searchMovies)

function searchMovies() {
    // IMDb Movie title to search for
    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=e668e570`)
        .then(res => res.json())
        .then(data => {
            console.log(data.Search)
            const movies = data.Search

            for (let element of movieListDefaultDisplay) {
                element.style.display = 'none'
            }

            movies.forEach(movie => {
                console.log(movie)
                moviesList.innerHTML += `
                <h2>${movie.Title}</h2>
            `
            })
        })
}
