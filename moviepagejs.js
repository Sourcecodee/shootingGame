const movies = document.querySelector('.movies');
const movie = document.querySelector('.movie');
const mov = document.querySelector('.mov')
const moviePanel = document.querySelector('.movie-panel')
const searchBox = document.querySelector('#searchBox')
const searchI = document.querySelector('#searchI')


const displayL = (event) =>{
    if(!event.target.matches('.movies')){
        movie.classList.remove('show') 
    }
    else{
        movie.classList.toggle('show')
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    addEventListener('click', displayL)
});


// To search for any movie from website using fetch
function getter(){
    let searchR;
    let searchT = encodeURIComponent(searchBox.value)

    // clear the div then display new data
    mov.innerHTML=''
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=a2f9167784a7eccf1191ea866d2884ae&query=${searchT}`)
    .then((res)=>  parsedResult=res.json())
    .then((parsedResult)=>{
        searchR=parsedResult.results
        console.log(searchR)
        searchR.forEach((item)=>{
            const title = document.createTextNode(item.title)
            const elem = document.createElement('p')
            const para = document.createElement('div')
            para.setAttribute('class', 'card') 
            const logo = document.createElement('img')
            if(item.poster_path){
            logo.setAttribute('src', `https://image.tmdb.org/t/p/w400${item.poster_path}`)
            }
            else{
            logo.setAttribute('src', `https://via.placeholder.com/400`)
            }
            elem.appendChild(title)
            para.appendChild(logo)
            para.appendChild(elem)
            mov.appendChild(para)
            console.log(title)
            moviePanel.style.height='auto';
            }
        )
    })
    .catch((err)=>{
        alert(err.name)
    })
    console.log(searchT)
}

searchI.addEventListener('click', getter)