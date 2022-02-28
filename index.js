const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const watchlistBtn = document.getElementById('watchlistBtn')
const moviesList = document.getElementById('moviesList')
const movieListDefaultDisplayContainer = document.getElementById(
    'movie-list-default-display-container'
)
const watchListDefaultDisplayContainer = document.getElementById(
    'watch-list-default-display-container'
)
const movieListDefaultDisplay = document.getElementsByClassName(
    'movie-list-default-display'
)

if (searchBtn) {
    searchBtn.addEventListener('click', searchMovies)
}

const watchlist = document.getElementById('watchlist')
const readMore = document.getElementsByClassName('read-more')
const readMorePlot = document.getElementsByClassName('read-more-plot')

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

        let readMoreMovieID = moviesListData.imdbID + 'more'
        let hideReadMore = moviesListData.imdbID + 'hide'

        let summaryPlot = `${moviesListData.Plot.substring(
            0,
            110
        )}<span id=${hideReadMore}>...<span class="black read-more"  onclick="showCompletePlot(${readMoreMovieID}, ${hideReadMore})">Read more</span></span>`

        let readMorePlot = `<span class="read-more-plot" id=${readMoreMovieID} >${moviesListData.Plot.substring(
            110,
            moviesListData.Plot.length
        )}</span>`

        let completePlot = moviesListData.Plot
        let longPlot = summaryPlot + readMorePlot

        let movieID = moviesListData.imdbID
        let movieIDkey = moviesListData.imdbID + 'key'
        // console.log(typeof movieID)

        moviesList.innerHTML += `
                <div class="cards">
                    <div class="card" id=${movieID}>
                        <span id=${movieIDkey} class="hide">${movieIDkey}</span>
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
                            <span class="card-watchlist" id="watchlistBtn" tabindex="0" onclick="addToWatchlist(${movieIDkey},${movieID})"><img src="images/watchlist-icon.svg" alt="Add film to watchlist" class="card-watchlist-plus-icon" />&nbsp;Watchlist</span>
                        </div>
                        <p class="card-plot">${
                            completePlot.length < 110 ? completePlot : longPlot
                        }</p>
                    </div>
                </div>
            `
    })
}

function showCompletePlot(readMoreMovieID, hideReadMore) {
    readMoreMovieID.style.display = 'inline'
    hideReadMore.style.display = 'none'
}

function addToWatchlist(movieIDkey, movieID) {
    localStorage.setItem(movieIDkey.innerHTML, movieID.innerHTML)
}

if (watchlist && localStorage.length > 0) {
    if (watchlist.children) {
        let children = watchlist.children
        let childrenArr = Array.prototype.slice.call(children)
        childrenArr.forEach(child => child.remove())
    }
}

for (let i = 0; i < localStorage.length; i++) {
    let getLocalStorage = localStorage.getItem(localStorage.key(i))

    if (watchlist) {
        watchlist.innerHTML += `<div class="card">${getLocalStorage}</div>`
    }
}
