//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
//Accedemos a el id de la pelicula
let id = urlParams.get("id");


//elementos del html
const title=document.getElementById("title");
const pView=document.getElementById("view");
const cabecera=document.getElementById("cabecera");
const imgHead=document.getElementById("imgHead");
const yearMovie=document.getElementById("anio");
const runTimeMovie=document.getElementById("duracion");
const vote=document.getElementById("puntuacion");

const video=document.getElementById("trailer");
const btnCerrar=document.getElementById("botonCerrar");
const abrirVideo=document.getElementById("abrirVideo");


let idVideo="";


const castDiv=document.getElementById("cast");;

document.addEventListener("DOMContentLoaded", () => {
   getDetailsMovie(id);
   getPeopleMovie(id);
   getVideoMovie(id);
   getSimilarMovie(id);
});


btnCerrar.addEventListener('click',()=>{
    video.src="";
})

abrirVideo.addEventListener('click',()=>{
    video.src="https://www.youtube.com/embed/"+idVideo+"?autoplay=1&controls=0";
})

async function getDetailsMovie(idMovie){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/"+idMovie+"?api_key="+apiKey);
        //ENVIO LA DATA COMO PARAMETRO PARA QUE ESTA MODIFIQUE EL HTML
        updateTemplate(response.data);
        console.log(response.data);

    }catch(error){
        console.log(error);
    }
}

//TRAE A LOS ACTORES
async function getPeopleMovie(idMovie){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/"+idMovie+"/credits?api_key="+apiKey);
        groupPeopleMovie(response.data.cast);
    }catch(error){
        console.log(error);
    }
}

async function getVideoMovie(idMovie){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/"+idMovie+"/videos?api_key="+apiKey);
        idVideo=response.data.results[0].key;
    }catch(error){
        console.log(error);
    }
}

async function getSimilarMovie(idMovie){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/"+idMovie+"/similar?api_key="+apiKey);
        while(main.firstChild){
            main.firstChild.remove();
        }
        createSection("Similar Movies",response.data.results,"other");
    }catch(error){
        console.log(error);
    }
}


//MODIFICA LOS ELEMENTOS DEL HTML 
function updateTemplate(dataMovie){
    let date=new Date(dataMovie.release_date);
    title.textContent=dataMovie.title;
    document.title =dataMovie.title;
    pView.textContent=dataMovie.overview;
    imgHead.src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+dataMovie.backdrop_path;
    yearMovie.textContent=date.getFullYear();
    runTimeMovie.textContent=dataMovie.runtime+" min";
    
    //PUNTUACION
    vote.textContent=dataMovie.vote_average;
    let iVote=document.createElement("i");
    iVote.classList.add("ms-xl-1","bi","bi-star-fill");
    vote.appendChild(iVote);
}


function groupPeopleMovie(cast){
    let actors=[];
    let directors=[];
    let writers=[];
    cast.forEach(person => {
        if(person.known_for_department=="Acting"){
            actors.push(person);
        }
        else if(person.known_for_department=="Directing"){
            directors.push(person);
        }
        else if(person.known_for_department=="Writing"){
            writers.push(person);
        }
    });
    createinfoPeople("Actors",actors);
    createinfoPeople("Directors",directors)
    createinfoPeople("Writers",writers);
}


function createinfoPeople(titleCast,people){
    let title=document.createElement("h3");
    title.classList.add("mt-xl-3")
    title.textContent=titleCast;
    let table=document.createElement("table");
    table.classList.add("col-xl-5");

    let tbody=document.createElement("tbody");
    for (let i = 0; i <people.length; i++) {
        if(i>10) break;
        let tr=document.createElement("tr");
        let td=document.createElement("td");
        let link=document.createElement("a");
        link.textContent=people[i].name;
        link.classList.add("text-secondary","person");
        link.setAttribute("href","https://osll-2001.github.io/NETFLIX/views/person.html?id="+people[i].id);
        td.appendChild(link);
        tr.appendChild(td);  
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    castDiv.appendChild(title);
    castDiv.appendChild(table);
}
