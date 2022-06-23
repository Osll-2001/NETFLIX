
//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
//Accedemos a el id de la pelicula
let id = urlParams.get("id");


//ELEMENTOS HTML
const namePerson=document.getElementById("name");
const bioPerson=document.getElementById("bio");
const departmentPerson=document.getElementById("department");
const birthday=document.getElementById("birthday");
const place=document.getElementById("place");

const picture=document.getElementById("picture");

document.addEventListener("DOMContentLoaded", () => {
    getDataPerson(id);
    getMoviesPerson(id);
});
 


async function getDataPerson(idPerson){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/person/"+idPerson+"?api_key="+apiKey);
        let dataPerson=response.data;
        console.log(dataPerson);
        setDataTemplate(dataPerson);  
    }catch(error){
        console.log(error);
    }
}

async function getMoviesPerson(idPerson){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/person/"+idPerson+"/movie_credits?api_key="+apiKey);
        let data=response.data.cast;
        while(main.firstChild){
            main.firstChild.remove();
        }
        createSection("Movies",data,"other");
    }catch(error){
        console.log(error);
    }
}

function setDataTemplate(dataPerson){
    let deadthday="Present";
    namePerson.textContent=dataPerson.name;
    document.title =dataPerson.name;
    departmentPerson.textContent=dataPerson.known_for_department;
    bioPerson.textContent=dataPerson.biography;
    let iBirth=document.createElement("i");
    iBirth.classList.add("bi","bi-calendar","me-xl-2");
    birthday.appendChild(iBirth);
    if(dataPerson.deathday) deadthday=dataPerson.deathday;
    birthday.append(dataPerson.birthday," - ",deadthday);
    
    let iPlace=document.createElement("i");
    iPlace.classList.add("bi","bi-hospital","me-xl-2");
    place.appendChild(iPlace);
    place.append(dataPerson.place_of_birth);

    picture.src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+dataPerson.profile_path;
}

