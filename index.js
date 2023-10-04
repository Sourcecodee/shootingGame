const canva = document.querySelector('.canva')
const can = canva.getContext('2d')
const counter=document.querySelector('.num');

var rows=20;
var cols=20; 
var blocksize=20;
var maxW= cols * blocksize;
var maxH= rows * blocksize;
var playerX= 5*blocksize;
var playerY= 18*blocksize;
var speedX=0;
var speedY=0;
var speedBx=0;
var speedBy=0;
var speedEx=0;
var speedEy=0;
var boss = []
var projectile = []
let count=0;
var gameOver=false;

canva.width = maxW;
canva.height = maxH;


window.onload = function render(){
    // update()
    for(let i=0; i <30; i++){
        let unEqual = new Enemy()
        console.log(unEqual.minionX, unEqual.minionY)
        if(boss.length===0){
            boss.push(unEqual)
        }
        else{
            let b= new Enemy()
            boss.push(b)
        }
        for(let j=0; j<boss.length; j++){
            if(boss[i].minionX===boss[i].minionX && boss[i].minionY===boss[i].minionY){
                boss.splice(i, 1)
                let c = new Enemy()
                boss.push(c)
            }
        }
        // console.log(boss)
    }
    window.addEventListener('keypress', kill)
    window.addEventListener('keydown', move)
}


function move(e){
    if(e.keyCode==39 && playerX!==maxW-20){
        speedX=1
        speedY=0
    }
    else if(e.keyCode==37 && playerX!==0){
        speedX=-1;
        speedY=0;
    }
    else{
        speedX=0;
        speedY=0;
    }
    update()
}

function kill(e){
    if(e.keyCode==32){
        speedBx=0;
        speedBy=-1;
        projectile.push(new Bullet(playerX, playerY, speedBx, speedBy))
        projectile.forEach((project)=>{
            console.log(project.BulletX)
        })
    }
}

function update(){
    can.clearRect(0, 0, maxW, maxH)

    can.fillStyle='orange';
    can.fillRect(0, 0, maxW, maxH);

    playerX+=speedX*blocksize;
    playerY+=speedY*blocksize;

    can.fillStyle='maroon';
    can.fillRect(playerX, playerY, blocksize, blocksize);
}

class Enemy{
    constructor(){
        this.minionX = Math.floor(Math.random()*cols)*blocksize;
        this.minionY = Math.floor(Math.random()*rows/3)*blocksize;
        this.speedEx=speedEx;
        this.speedEy=speedEy+0.2;
    }

    updateE(){
        this.minionX+=this.speedEx;
        this.minionY+=this.speedEy; 

        can.fillStyle='blue'
        can.fillRect(this.minionX, this.minionY, blocksize, blocksize)

        can.fillStyle='black'
        can.strokeRect(this.minionX, this.minionY, blocksize, blocksize)

        if(this.minionY>playerY-blocksize){
            gameOver=true;
            this.speedEy=0;
            return;
        }
    }
}

class Bullet{
    constructor(BulletX, BulletY, speedBx, speedBy){
        this.BulletX=BulletX;
        this.BulletY=BulletY;
        this.speedBx=speedBx;
        this.speedBy=speedBy;
    }

    updateB(){
        this.BulletX+=this.speedBx;
        this.BulletY+=this.speedBy*10;
        console.log(this.BulletY)
 
        boss.forEach((minion)=>{
            minion.updateE()
        })


        can.fillStyle='white'
        can.fillRect(this.BulletX, this.BulletY, blocksize, blocksize)
        can.fillStyle='black'
        can.strokeRect(this.BulletX, this.BulletY, blocksize, blocksize)

        can.fillStyle='maroon';
        can.fillRect(playerX, playerY, blocksize, blocksize)


        // The bullet is too fast console log to see, its why it wasn't equaling the enemy

        for(let i=0; i<boss.length; i++){
            if(this.BulletX-boss[i].minionX===0 && this.BulletY-boss[i].minionY<blocksize){
                console.log('sucess')
                count+=2
                counter.innerHTML=count;
                // console.log(this.BulletX, this.BulletY, boss[i].minionX, boss[i].minionY)
                boss.splice(i, 1)
                for(let g=0; g<projectile.length; g++){
                    projectile.splice(g, 1)
                }
            }    
            // console.log(this.BulletX, bY)
        }

        for(let j=0; j<projectile.length; j++){
            if(projectile[j].BulletY==-20){
                projectile.splice(j, 1)
            }
        }
    }
}

function animate(){
    can.fillStyle='orange';
    can.fillRect(0, 0, maxW, maxH);
    can.fillStyle='black'
    can.lineWidth=3
    can.strokeRect(0, 0, maxW, maxH)

    can.fillStyle='maroon';
    can.fillRect(playerX, playerY, blocksize, blocksize)
    can.fillStyle='black'
    can.lineWidth=1.5
    can.strokeRect(playerX, playerY, blocksize, blocksize)

    projectile.forEach((project)=>{
        project.updateB()
    })

    boss.forEach((minion)=>{
        minion.updateE()
    })
    requestAnimationFrame(animate)
}

animate()