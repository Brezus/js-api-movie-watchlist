const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const watchlistBtn = document.getElementById('watchlistBtn')
const removeFromWatchlistBtn = document.getElementById('removeFromWatchlistBtn')
const removeMovie = document.getElementById('removeMovie')
const moviesList = document.getElementById('moviesList')
const movieListDefaultDisplayContainer = document.getElementById(
    'movie-list-default-display-container'
)
const watchListDefaultDisplayContainer = document.getElementById(
    'watchlist-default-display-container'
)
const movieListDefaultDisplay = document.getElementsByClassName(
    'movie-list-default-display'
)
const cardWatchlistBtn = document.getElementsByClassName('watchlist-btn')
const removeWatchlistBtn = document.getElementsByClassName(
    'remove-watchlist-btn'
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
        let watchlistBtnKey = moviesListData.imdbID + 'watchlistBtn'
        let removeBtnKey = moviesListData.imdbID + 'removeBtn'

        moviesList.innerHTML += `
                <div class="cards">
                    <div class="card" id=${movieID}>
                        <span id=${movieIDkey} class="hide movie-key">${movieIDkey}</span>
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
                            <!--
                            <span class="card-watchlist" id="watchlistBtn" tabindex="0" onclick="addToWatchlist(${movieIDkey},${movieID})"><img src="images/watchlist-icon.svg" alt="Add film to watchlist" class="card-watchlist-plus-icon" />&nbsp;Watchlist</span>
                            -->

                            <span class="card-watchlist watchlist-btn" id="${watchlistBtnKey}" tabindex="0" onclick="addToWatchlist(${movieIDkey}, ${movieID}, ${watchlistBtnKey}, ${removeBtnKey})"><img src="images/watchlist-icon.svg" alt="Add film to watchlist" class="card-watchlist-plus-icon" />&nbsp;Watchlist</span>

                            <!--
                            <span class="card-watchlist" id="removeFromWatchlistBtn" tabindex="0" onclick="removeFromWatchlist(${movieIDkey})"><img src="images/remove-icon.svg" alt="Remove film to watchlist" class="card-watchlist-plus-icon" />&nbsp;Remove</span>
                            -->

                            <span class="card-watchlist remove-watchlist-btn" id="${removeBtnKey}" tabindex="0" onclick="removeFromWatchlist(${movieIDkey}, ${removeBtnKey}, ${watchlistBtnKey}, ${removeBtnKey})"><img src="images/remove-icon.svg" alt="Remove film to watchlist" class="card-watchlist-plus-icon" />&nbsp;Remove</span>

                        </div>
                        <p class="card-plot">${
                            completePlot.length < 110 ? completePlot : longPlot
                        }</p>
                    </div>
                </div>
            `
    })

    setTimeout(displayWatchlistOrRemoveBtn, 500)
}

let localStorageKeys = Object.keys(localStorage)

function showCompletePlot(readMoreMovieID, hideReadMore) {
    readMoreMovieID.style.display = 'inline'
    hideReadMore.style.display = 'none'
}

function addToWatchlist(movieIDkey, movieID, watchlistBtnKey, removeBtnKey) {
    localStorage.setItem(movieIDkey.innerHTML, movieID.innerHTML)
    watchlistBtnKey.style.display = 'none'
    removeBtnKey.style.display = 'inline'
}

let movieCards = document.getElementsByClassName('card')
let movieKey = document.getElementsByClassName('movie-key')

function removeFromWatchlist(
    movieIDkey,
    removeBtnKey,
    watchlistBtnKey,
    removeBtnKey
) {
    localStorage.removeItem(movieIDkey.innerHTML)

    if (watchlist) {
        localStorage.removeItem(movieIDkey.innerHTML) // works

        let parentEl = document.getElementById(
            movieIDkey.innerHTML
        ).parentElement
        parentEl.remove()
    }

    watchlistBtnKey.style.display = 'inline'
    removeBtnKey.style.display = 'none'

    if (watchlist && localStorage.length === 0) {
        if (watchlist.children) {
            let children = watchlist.children
            let childrenArr = Array.prototype.slice.call(children)
            childrenArr.forEach(child => (child.style.display = 'flex'))
        }
    }
}

if (watchlist && localStorage.length > 0) {
    if (watchlist.children) {
        let children = watchlist.children
        let childrenArr = Array.prototype.slice.call(children)
        childrenArr.forEach(child => (child.style.display = 'none'))
    }
}

for (let i = 0; i < localStorage.length; i++) {
    let getLocalStorage = localStorage.getItem(localStorage.key(i))

    if (watchlist) {
        watchlist.innerHTML += `<div class="card">${getLocalStorage}</div>`
    }

    for (let button of cardWatchlistBtn) {
        button.style.display = 'none'
    }
}

if (watchlist) {
    for (let button of removeWatchlistBtn) {
        button.style.display = 'inline'
    }
}

function displayWatchlistOrRemoveBtn() {
    for (let movie of movieKey) {
        let removeBtnID = movie.id.slice(0, 9) + 'removeBtn'
        let removeBtn = document.getElementById(removeBtnID)

        let watchlistBtnID = movie.id.slice(0, 9) + 'watchlistBtn'
        let watchlistBtn = document.getElementById(watchlistBtnID)

        localStorageKeys.forEach(key => {
            if (movie.id === key) {
                console.log('included!')
                removeBtn.style.display = 'inline'
                watchlistBtn.style.display = 'none'
            }
        })
    }
}
