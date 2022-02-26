const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const moviesList = document.getElementById('moviesList')
const movieListDefaultDisplay = document.getElementsByClassName(
    'movie-list-default-display'
)

// searchBtn.addEventListener('click', function () {
//     window.alert(`${searchInput.value}`)
// })

searchBtn.addEventListener('click', searchMovies)

async function searchMovies() {
    const res = await fetch(
        `http://www.omdbapi.com/?s=${searchInput.value}&apikey=e668e570`
    )
    const data = await res.json()
    const movies = data.Search

    for (let element of movieListDefaultDisplay) {
        element.style.display = 'none'
    }

    movies.forEach(movie => {
        moviesList.innerHTML += `
        <h2>${movie.Title}</h2>
    `
    })
}
