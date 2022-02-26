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

    movies.forEach(async movie => {
        let response = await fetch(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e668e570`
        )
        let moviesListData = await response.json()
        // console.log(moviesListData)
        moviesList.innerHTML += `
                <div class="cards">
                    <div class="card">
                        <div>
                            <img src=${moviesListData.Poster} class="card-poster" />
                        </div>
                        <div class="card-description">
                            <div class="card-header">
                                <h2 class="card-title">${moviesListData.Title}</h2>
                                <img src="images/star-icon.svg" class="star-icon" />
                                <span>${moviesListData.imdbRating}</span>
                            </div>
                            <div class="card-meta">
                                <p>${moviesListData.Runtime}</p>
                                <p>${moviesListData.Genre}</p>
                                <p class="card-watchlist"><img src="images/watchlist-icon.svg" alt=""  class="card-watchlist-plus-icon" />&nbsp;Watchlist</p>
                            </div>
                            <p class="card-plot">${moviesListData.Plot}</p>
                        </div>
                    </div>
                </div>
            `
    })
}
