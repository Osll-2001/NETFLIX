const main=document.getElementById("main");
const apiKey="3170044459c69c0c3f94ecc3f366b578";

const searchInput=document.getElementById("searchInput");
const searchForm=document.getElementById("form-search");



document.addEventListener("DOMContentLoaded", () => {
    //CREA LA SECCION DE MAS VALORADOS
    getDataTopRated();
    //BUSCA Y CREA LAS SECCIONES EN BASE A LOS GENEROS QUE EXISTEN
    getGenres();
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchValue=searchInput.value;
    getSearchMovie(searchValue);
});

async function getSearchMovie(searchValue){
   try{
       let response=await axios.get("https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&query="+searchValue);
       let searchMovies=response.data.results;
       while(main.firstChild){
         main.firstChild.remove();
       }
        createSection("Search: "+searchValue,searchMovies,"search");
        searchInput.value="";
    }catch(error){
        console.log(error);
    }

    
}


async function getDataTopRated(){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+apiKey);
        let moviesRatedTop=response.data.results;
        console.log(moviesRatedTop);
        createSection("Top Rated",moviesRatedTop,"other");
    }catch(error){
        console.log(error);
    }
}

function menAdvertencia(mensaje){
    const divMenAdvertencia=document.createElement('div');
    divMenAdvertencia.classList.add('bg-danger','text-white','border-danger','p-2','text-center','col-xl-10','mx-auto','mt-xl-5','fs-5');
    divMenAdvertencia.textContent=mensaje;
    main.appendChild(divMenAdvertencia);
    setTimeout(() => {
      divMenAdvertencia.style.display="none";
      getDataTopRated();
      getGenres();
      searchInput.value="";
    }, 3000);
  }

function createSection(titleSection,movies,typeC){
    if(movies.length<=0){
        menAdvertencia(titleSection+", We didn’t find anything related");
        return;
    }
    //contenedor
    let section=document.createElement("div");
    section.classList.add('seccion','contenedor');

    //titulo
    let titleContainer=document.createElement("div");
    titleContainer.classList.add('title');
    let title=document.createElement("h3");
    title.textContent=titleSection;
    titleContainer.appendChild(title);
    section.appendChild(titleContainer);
    
    //CAROUSEL MAIN
    let carousel=document.createElement("div");
    carousel.classList.add('con-main');
    
    //botones
    let buttonLeft=document.createElement('button');
    buttonLeft.setAttribute("id","arrowLeft");
    let iconoLeft=document.createElement('i');
    iconoLeft.classList.add('bi','bi-chevron-left');
    buttonLeft.appendChild(iconoLeft);

    let buttonRight=document.createElement('button');
    buttonRight.setAttribute("id","arrowRight");
    let iconoRight=document.createElement('i');
    iconoRight.classList.add('bi','bi-chevron-right');
    buttonRight.appendChild(iconoRight);

    //AGREGAMOS LOS BOTONES AL CAROUSEL
    carousel.appendChild(buttonLeft);
    carousel.appendChild(buttonRight);

    //contenido carousel
    let containerCarousel=document.createElement("div");
    containerCarousel.classList.add('container-carousel');
    let carouselCont=document.createElement("div");
    //cambia el display al ser una busqueda
    if(typeC=="search"){ 
        carouselCont.classList.add('search');
        buttonRight.style.display="none";
        buttonLeft.style.display="none";
    }else{
     carouselCont.classList.add('carousel');
    }
    carouselCont.setAttribute("id","carousel");

    //SCROLL CAROUSEL DERECHA
    buttonRight.addEventListener('click',()=>{
        containerCarousel.scrollLeft+=containerCarousel.offsetWidth;
    })
    
    //SCROLL CAROUSEL IZQUIERDA
    buttonLeft.addEventListener('click',()=>{
        containerCarousel.scrollLeft-=containerCarousel.offsetWidth;
    })

    
    //PELICULAS
    for (let i = 0; i < movies.length; i++) {
        //LIMITA LA CANTIDAD DE PELICULAS MOSTRADAS A 15
        if(i>14) break;

        let movieContainer=document.createElement("div");
        movieContainer.classList.add('movie');
        let movieLink=document.createElement("a");
        movieLink.setAttribute("id",movies[i].id);
        let imgMovie=document.createElement("img");
        imgMovie.src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+movies[i].poster_path;
        movieLink.appendChild(imgMovie);
        movieLink.href="https://osll-2001.github.io/views/movie.html?id="+movies[i].id;
        movieContainer.appendChild(movieLink);
        hoverMovie(movieContainer);
        
        carouselCont.appendChild(movieContainer);
    }

    //AGREGAMOS EL CONTENEDOR QUE GUARDA TODO LO DEL CAROUSEL AL CONTENIDO DEL CAROUSEL
    containerCarousel.appendChild(carouselCont);
    //AGREGAMOS EL CONTENIDO DEL CAROUSEL AL CAROUSEL
    carousel.appendChild(containerCarousel);
    //agregamos el carrousel a la seccion
    section.appendChild(carousel);
    //agregamos la seccion al main
    main.appendChild(section);

}


//funcion de hover a las peliculas
function hoverMovie(movie){
    movie.addEventListener('mouseenter',()=>{
        setTimeout(()=>{
            movie.classList.remove('hover');
            movie.classList.add('hover');
        })
    },300);
    movie.addEventListener('mouseleave',()=>{
        movie.classList.remove('hover');
    })
}


