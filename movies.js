const resDiv = document.querySelector('#results');
 nextBtn = document.querySelector('#next'),
 prevBtn = document.querySelector('#prev'),
 totalPages = document.querySelector('#total'),
 pageDisplay = document.querySelector('#page'),
 searchForm = document.querySelector('#search'),
 searchQuery = document.querySelector('#query'),
 openOverlay = document.querySelectorAll('#open'),
 overlay = document.querySelector('.Overlay'),
 closeBtn = document.querySelector('#closeOverlay'),
 infoDiv = document.querySelector('.info'),
homeBtn = document.querySelector('.home'),
movie2 = document.querySelector('.movie2'),
quer = document.querySelector('#query')
errors1 =document.querySelector('#errors'),
loadM = document.querySelector('#loadM')

     





let current_page = 1;
let searchPage = 1
pageDisplay.innerHTML = current_page;


//This even listener listens to the click on the current button and increase the page by 1

nextBtn.addEventListener('click', () => {
  current_page++;
  
  pageDisplay.innerHTML = current_page;
  getMovies();
});

loadM.addEventListener('click',()=>{
  searchPage ++
  
movieSearcher()
  
})

prevBtn.addEventListener('click', () => {
  current_page--;
  pageDisplay.innerHTML = current_page;

  if (current_page < 1) {
    current_page = 1;
    alert("You already on page 1");
    pageDisplay.innerHTML = current_page;
  }

  getMovies();
})
//this event listen retuns to the home page and clears the search page and the movies result


  






//this reloads the function getmovies when you refresh the windows 

window.onload = () => {
  getMovies();
  
}


//this checks to see if the user has a valid internet connection before loading the get movies function

window.addEventListener('online', () => {
  getMovies();
});
// this event listener shows no internet connection when the users is online or connected to the internet 
window.addEventListener('offline', () => {
  resDiv.innerHTML = "No internet connection, check your wifi or cable and try again😉😉";
});

//this fuction is for the seaching of the movies 
function movieSearcher(){
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pagination = document.querySelector('#pagination');

  const searchHeading = document.querySelector('#searchHeading');
  const movieTerm = searchQuery.value;
 
 //if search value is not equal to empty stringg then serachMovies (function) takes the value in the movieterm and puts it in the seracheading by using the variable movieterm
 

 if (movieTerm !== "") {

  searchMovie(movieTerm);
  searchHeading.style.display = "block";

  searchHeading.innerHTML = `Searching For: <span>${movieTerm}</span>`;
  searchHeading.innerHTML= ""
  quer.style.borderColor= "#373b69";
  

} else {
  quer.style.borderColor= "red";
  return false;
} 

pagination.style.display = "none";
prevBtn.style.display = "none";
 nextBtn.style.display = "none";



  let total = Math.round(movieTerm.movie_count / movieTerm.limit);
  console.log(total)
  totalPages.innerHTML = total;



});

//this function takes a parameter called movieterm which is the value from the search term to loop through the movie arrays to fetch movies with the same names 

const searchMovie = (movie) => {

  fetch(`https://yts.mx/api/v2/list_movies.json?limit=50&&query_term=${movie}&&page=${searchPage}`)
    .then(response => {
      return response.json();
    })

    //so  fetch method retuns json of arrays then cont called movieObj takes the moviedata from the api and store it as movieObj
    .then(movieData => {
      const movieObj = movieData.data;
      let Output = '';
      let total = Math.round(movieObj.movie_count / movieObj.limit);
      totalPages.innerHTML = total;

//this if statement checks if the total movies are not equal to zero, if it returns teue it then loop true each movie and dispaly the results according the html which is easy to undertand and i won't write commment because I have to write plenty to explain something simple 🤣🤣🤣!!


      if (movieObj.movie_count !== 0) {

        movieObj.movies.forEach(movieInfo => {
          Output += `
          <div class="movie">
            <h2 class="movie-title" title="${movieInfo.title}">${movieInfo.title_english}</h2>
            <img src="${movieInfo.medium_cover_image}" alt="${movieInfo.title}">
            <input type="hidden" value="${movieInfo.id}">
            <div class="movie1">
           <div class="movie2"> ${movieInfo.year}</div>
            <button id="open" class="open">Download Movie </button>
           
            <div class="movie2"> ${movieInfo.rating}</div>
            </div>
            <div class="movietyp"> ${movieInfo.genres}</div>
          </div>
        `;
        });
// if no movie is fund with the search keyword the error id then return no movie found or returns empy string when a movie is fund 
        document.querySelector('#errors').innerHTML = "";

      } else {
        document.querySelector('#errors').innerHTML = `<h1>No movie Found: ${movie}</h1>`;

      }


      resDiv.innerHTML = Output;


    })
    .catch(error => {
      console.log(`There is an Error: ${error}`);
    });

}
}

movieSearcher()
const getMovies = () => {

  fetch(`https://yts.mx/api/v2/list_movies.json?limit=50&&page=${current_page}`)
    .then(response => {
      return response.json();
    })
    .then(movieData => {
      const movieObj = movieData.data;
        console.log(movieObj)
      let Output = '';

      let total = Math.round(movieObj.movie_count / movieObj.limit);
      totalPages.innerHTML = total;

      movieObj.movies.forEach(movieInfo => {
   
        Output += `
          <div class="movie">
            <h2 class="movie-title" title="${movieInfo.title}">${movieInfo.title_english}</h2>
            <img src="${movieInfo.medium_cover_image}" alt="${movieInfo.title}">
            <input type="hidden" value="${movieInfo.id}">
            <div class="movietyp"> ${movieInfo.genres}</div>
            <div class="movie1">
           <div class="movie2"> ${movieInfo.year}</div>
            <button id="open" class="open">Download Movie </button>
            <div class="movie2"> ${movieInfo.rating}</div>
            </div>
            
          </div>
         
        `;
  
           
      });

     

      resDiv.innerHTML = Output;


    })
    .catch(error => {

      console.log(`There is an Error: ${error}`);
    });


}




closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  document.body.setAttribute('style', 'overflow:auto');
});



resDiv.addEventListener('click', (e) => {

  if (e.target.className == "open") {
    const movieID = e.target.parentElement.parentElement.children[2].value;
    document.body.setAttribute('style', 'overflow:hidden');
    overlay.style.display = 'block';

    getMovieById(movieID);
  }

});

const getMovieById = (id) => {

  fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    .then(response => {
      return response.json();
    })
    .then(movieData => {
      const movieObj = movieData.data.movie;
      let Output = '';


      Output += `
          <div class="movie-thumbnail">
            <img src="${movieObj.medium_cover_image}" alt="${movieObj.title}">
          </div>
          <div class="movie-details">
            <h1 title="${movieObj.title}">${movieObj.title_english}</h1> 
            <p>${movieObj.description_full}</p>
            <ul>
            ${movieObj.torrents.map(torrent => `
            <li>Download: <a href="${torrent.url}">${torrent.url}</a></li>
            <li>Quality: ${torrent.quality} | Type: ${torrent.type} | Size: ${torrent.size} | Seeds: ${torrent.seeds} | Peers: ${torrent.peers}</li>
            <hr>
            `).join('')}
            </ul>
            <h2>Movie Trailer</h2>
            <div class="trailer">
            
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieObj.yt_trailer_code}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        
        `;


      infoDiv.innerHTML = Output;


    })
    .catch(error => {
      console.log(`There is an Error: ${error}`);
    });


}
let map = new Map ()

map.set('name', 'how are you doing ')
map.set('age', 'I am 25 years old')


for (let k of map.keys()){
  console.log(k)
}


for (let [y, m] of map.entries()){
 console.log( `the key is ${y} and the values are ${m}`)
}
