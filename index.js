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

    const movies = data.Search // cant use this

    movies.forEach(async movie => {
        let response = await fetch(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e668e570`
        )
        let moviesListData = await response.json()
        console.log(moviesListData)
        moviesList.innerHTML += `
                <div>
                    <div>
                        <img src=${moviesListData.Poster} />
                    </div>
                    <div>
                        <h2>${moviesListData.Title}</h2>
                        <img src="images/star-icon.svg" />
                        <p>${moviesListData.imdbRating}</p>
                        <p>${moviesListData.Runtime}</p>
                        <p>${moviesListData.Genre}</p>
                        <p>Watchlist</p>
                        <p>${moviesListData.Plot}</p>
                    </div>    
                </div>
            `
    })
}
