
const movies = document.querySelector('.movies');
const movie = document.querySelector('.movie');
const mov = document.querySelector('.mov')
const first = document.querySelector('.first')
const second = document.querySelector('.second')
const third = document.querySelector('.third')
const searchBox = document.querySelector('#searchBox')
const searchI = document.querySelector('#searchI')
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=a2f9167784a7eccf1191ea866d2884ae&page=1';

// code to open and close the movies drropdown menu
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


window.onload = content(url)

// function to get data from the movie db database and display it
function content(url){
    let obj;
    let van;
    let film;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onload = function getF(){
        if(this.readyState===4 && this.status===200){
            obj = this.responseText;
            van = JSON.parse(obj)
            film = van.results
            // console.log(film)
            film.forEach(item => {
                // console.log(item.title)
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
                console.log(logo)
                elem.appendChild(title)
                para.appendChild(logo)
                para.appendChild(elem)
                mov.appendChild(para)
                // console.log(para)
            });
        }
        else console.log('err');
    }
    xhr.send();
}

//pagination callback
// function that accepts a api then sends back data
const page = (url)=>{
    // clear the div then display new data
    mov.innerHTML=''
    console.log('yes')
    content(url)
}


// event listeners for each numbered button on page
first.addEventListener('click', ()=>page('https://api.themoviedb.org/3/discover/movie?api_key=a2f9167784a7eccf1191ea866d2884ae&page=1'))
second.addEventListener('click', ()=>page('https://api.themoviedb.org/3/discover/movie?api_key=a2f9167784a7eccf1191ea866d2884ae&page=2'))
third.addEventListener('click', ()=>page('https://api.themoviedb.org/3/discover/movie?api_key=a2f9167784a7eccf1191ea866d2884ae&page=3'))


// To search for any movie from website using fetch
function getter(){
    let searchR;
    let searchT = encodeURIComponent(searchBox.value)

    // clear the div then display new data
    mov.innerHTML=''
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=a2f9167784a7eccf1191ea866d2884ae&query=${searchT}`)
    .then((res)=> parsedResult=res.json())
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
            }
        )
    })
    .catch((err)=>{
        alert(err.name)
    })
    console.log(searchT)
}

searchI.addEventListener('click', getter)



