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

function searchMovies() {
    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=e668e570`)
        .then(res => res.json())
        .then(data => {
            const movies = data.Search

            for (let element of movieListDefaultDisplay) {
                element.style.display = 'none'
            }

            movies.forEach(movie => {
                moviesList.innerHTML += `
                <h2>${movie.Title}</h2>
            `
            })
        })
}
