let imdbId = 'tt3896198' // IMBd ID
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click', searchMovies)

function searchMovies() {
    // console.log(searchInput.value)
    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=e668e570`) // IMDb Movie title to search for
        .then(res => res.json())
        .then(data => {
            // console.log(data.Search)
            const movies = data.Search
            movies.forEach(movie => console.log(movie))
        })
}

// fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=e668e570`) // IMDb ID
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })
