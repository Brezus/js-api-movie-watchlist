const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const watchlistBtn = document.getElementById('watchlistBtn')
const moviesList = document.getElementById('moviesList')
const movieListDefaultDisplayContainer = document.getElementById(
    'movie-list-default-display-container'
)
const movieListDefaultDisplay = document.getElementsByClassName(
    'movie-list-default-display'
)

if (searchBtn) {
    searchBtn.addEventListener('click', searchMovies)
}

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

        let completePlot = moviesListData.Plot
        let summaryPlot = `${moviesListData.Plot.substring(
            0,
            110
        )} ... <a class="black">Read more</a>`

        moviesList.innerHTML += `
                <div class="cards">
                    <div class="card">
                        <img src=${moviesListData.Poster} class="card-poster" />

                        <div class="card-header">
                            <h2 class="card-title">${moviesListData.Title}</h2>
                            <img src="images/star-icon.svg" class="star-icon" />
                            <span class="card-rating">${
                                moviesListData.imdbRating
                            }</span>
                        </div>
                        
                        <div class="card-meta">
                            <span class="card-runtime">${
                                moviesListData.Runtime
                            }</span>
                            <span>${moviesListData.Genre}</span>
                            <a class="card-watchlist" id="watchlistBtn" onclick="addToWatchlist()"><img src="images/watchlist-icon.svg" alt="Add film to watchlist" class="card-watchlist-plus-icon" />&nbsp;Watchlist</a>
                        </div>
                        <p class="card-plot" onclick="showCompletePlot()">${
                            completePlot.length > 132
                                ? summaryPlot
                                : completePlot
                        }</p>
                    </div>
                </div>
            `
    })
}

const watchlist = document.getElementById('watchlist')

function addToWatchlist() {
    console.log('added!')
}
