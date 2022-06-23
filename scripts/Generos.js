async function getGenres(){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+apiKey);
        let Genres=response.data.genres;
        //FUNCIÓN QUE RECORRE LOS GENEROS 
        createSectionGenres(Genres);
    }catch(error){
        console.log(error);
    }
}

function createSectionGenres(genres){
    genres.forEach(genre => {
        //CONSUME LAS PELICULAS
        getMoviesGenre(genre.id,genre.name);
    });
}

async function getMoviesGenre(idGenre,name){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+apiKey+"&with_genres="+idGenre);
        let moviesGenre=response.data.results;
        createSection(name,moviesGenre);
    }catch(error){
        console.log(error);
    }
}