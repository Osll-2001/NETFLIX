//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
console.log(urlParams);
//Accedemos a el id de la pelicula
let id = urlParams.get("id");


//elementos del html
const title=document.getElementById("title");
const pView=document.getElementById("view");
const cabecera=document.getElementById("cabecera");
const imgHead=document.getElementById("imgHead");
const yearMovie=document.getElementById("anio");
const runTimeMovie=document.getElementById("duracion");

document.addEventListener("DOMContentLoaded", () => {
   getDetailsMovie(id);
   getActorsMovie(id);
});

async function getDetailsMovie(idMovie){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/"+idMovie+"?api_key="+apiKey);
        updateTemplate(response.data);
        

    }catch(error){
        console.log(error);
    }
}

function updateTemplate(dataMovie){
    let date=new Date(dataMovie.release_date);
    title.textContent=dataMovie.title;
    pView.textContent=dataMovie.overview;
    imgHead.src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+dataMovie.backdrop_path;
    yearMovie.textContent=date.getFullYear();
    runTimeMovie.textContent=dataMovie.runtime+" min";
}

async function getActorsMovie(idMovie){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/"+idMovie+"/credits?api_key="+apiKey);
        console.log(response.data.cast);
    }catch(error){
        console.log(error);
    }
}

