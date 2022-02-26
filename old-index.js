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
    if (moviesList.children) {
        let children = moviesList.children
        let childrenArr = Array.prototype.slice.call(children)
        childrenArr.forEach(child => child.remove())
    }

    let res = await fetch(
        `https://www.omdbapi.com/?s=${searchInput.value}&apikey=e668e570`
    )
    let data = await res.json()

    movieListDefaultDisplayContainer.style.display = 'none'
    for (let element of movieListDefaultDisplay) {
        element.style.display = 'none'
    }

    const movies = data.Search
    // console.log(data.Search)

    movies.forEach(movie => {
        moviesList.innerHTML += `
        <div>
            <img src=${movie.Poster} />
            <h2>${movie.Title}</h2>

        </div>
    `
    })
}
