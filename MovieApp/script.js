const apiKey = "b792f9ee66a94d0c5362bdb0b0f2d3d4"; 
const searchButton = document.getElementById("search-btn");
const moviesGrid = document.getElementById("movies-grid");
const movieDetailsModal = document.getElementById("movie-details-modal");
const closeModalButton = document.getElementById("close-modal");
const addToWatchlistButton = document.getElementById("add-to-watchlist");
const movieTitle = document.getElementById("movie-title");
const movieSynopsis = document.getElementById("movie-synopsis");
const movieRating = document.getElementById("movie-rating");
const movieRuntime = document.getElementById("movie-runtime");
const movieCastList = document.getElementById("movie-cast");
const suggestionsContainer = document.getElementById("suggestions");
const modalContent = document.getElementById('modal-info');
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
const genresMovie = document.getElementById('genres');
const war = document.getElementById('war');
const kids = document.getElementById('kids');
const searchInput = document.getElementById("search"); 
const movieSearch = document.getElementById('movie-search');
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMoviesSearch(query);
    }
});

closeModalButton.addEventListener("click", () => {
    movieDetailsModal.style.display = "none";
});

async function fetchMoviesSearch(query) {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        
        const data = await response.json();
        displayMoviesSearch(data.results);
        console.log(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
function displayMoviesSearch(movies) {
    
    movieSearch.innerHTML = "";
    movies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img onclick="showMovieDetails(${movie.id})" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
        
        movieSearch.appendChild(movieCard);
    });
}

async function fetchMovies(query) {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        
        const data = await response.json();
        displayMovies(data.results);
        console.log(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();
    if (query) {
        await getSearchSuggestions(query); 
    } else {
        suggestionsContainer.innerHTML = ""; 
    }
});

function displayMovies(movies) {
    
    moviesGrid.innerHTML = "";
    movies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img onclick="showMovieDetails(${movie.id})" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
        
        moviesGrid.appendChild(movieCard);
    });
}

function displayMoviesGenres(movies,genre) {
    genresMovie.innerHTML = '';
    try{
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img onclick="showMovieDetails(${movie.id})" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            genresMovie.appendChild(movieCard);
        });
    }catch(error){
        console.error('Hellnah',error,movie,genre);
    }

}
async function fetchMoviesByGenre(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
        displayMoviesGenres(data.results,query);
       
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
async function displayMovies(movies) {
    moviesGrid.innerHTML = ""; 
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;

      
        movieImage.addEventListener("click", () => {
            showMovieDetails(movie.id);  
        });

        movieCard.appendChild(movieImage);
        moviesGrid.appendChild(movieCard);
    });
}
addToWatchlistButton.addEventListener("click", () => {
    const movieId = movieTitle.innerText;
    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
});
function displayMoviesWar(movies,genre) {
    war.innerHTML = '';
    try{
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img onclick="showMovieDetails(${movie.id})" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            war.appendChild(movieCard);
        });
    }catch(error){
        console.error('Hellnah',error,movie,genre);
    }

}
async function fetchMoviesWar(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&with_genres=${16}`);
        const data = await response.json();
        displayMoviesWar(data.results,query);
       
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
function displayMoviesKids(movies,genre) {
    kids.innerHTML = '';
    try{
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img onclick="showMovieDetails(${movie.id})" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            kids.appendChild(movieCard);
        });
    }catch(error){
        console.error('Hellnah',error,movie,genre);
    }

}
async function fetchMoviesKids(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&with_genres=${16}`);
        const data = await response.json();
        displayMoviesKids(data.results,query);
       
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movie = await response.json();

     
        movieTitle.innerHTML = movie.title;
        movieSynopsis.innerHTML = movie.overview;
        movieRating.innerHTML = `Rating: ${movie.vote_average}`;
        movieRuntime.innerHTML = `Runtime: ${movie.runtime} minutes`;

        
        movieCastList.innerHTML = "";
        if (movie.cast) {
            movie.cast.slice(0, 5).forEach(castMember => {
                const castItem = document.createElement("li");
                castItem.textContent = castMember.name;
                movieCastList.appendChild(castItem);
            });
        }

    
        movieDetailsModal.style.display = "flex";
     

    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

closeModalButton.addEventListener("click", () => {
    movieDetailsModal.style.display = "none";
});
searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();
    console.log(query);
    if (query) {
        await getSearchSuggestions(query); 
    } else {
        suggestionsContainer.innerHTML = ""; 
    }
});
async function getSearchSuggestions(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
        suggestionsContainer.innerHTML = "";  

        data.results.forEach(suggestion => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.innerHTML = suggestion.title;
            suggestionItem.addEventListener("click", () => {
                searchInput.value = suggestion.title;
                fetchMovies(suggestion.title); 
                suggestionsContainer.innerHTML = ""; 
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    } catch (error) {
        console.error("Error:", error);
        suggestionsContainer.innerHTML = "<p>Sorry, we couldn't get suggestions.</p>";
    }
}



fetchMoviesByGenre('thriller');
fetchMoviesWar('A');
fetchMoviesKids('marvel hero')