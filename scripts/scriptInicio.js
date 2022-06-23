const main=document.getElementById("main");
const apiKey="3170044459c69c0c3f94ecc3f366b578";



document.addEventListener("DOMContentLoaded", () => {
    //CREA LA SECCION DE MAS VALORADOS
    getDataTopRated();
    //BUSCA Y CREA LAS SECCIONES EN BASE A LOS GENEROS QUE EXISTEN
    getGenres();
});



async function getDataTopRated(){
    try{
        let response=await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+apiKey);
        let moviesRatedTop=response.data.results;
        console.log(moviesRatedTop);
        createSection("Top Rated",moviesRatedTop);
    }catch(error){
        console.log(error);
    }
}



function createSection(titleSection,movies){
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
    carouselCont.classList.add('carousel');
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
        movieLink.href="http://127.0.0.1:5500/views/movie.html?id="+movies[i].id;
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