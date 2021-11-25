"use strict";
import bezier from "./bezier.js";


let can = document.getElementById("bez_canvas");
can.width = document.body.clientWidth
can.height = document.body.clientHeight;
can.ctx = can.getContext("2d");
can.ctx.lineWidth = 1;
can.ctx.shadowColor = "black";
const bezarr = [];

// game loop 

setup();
window.requestAnimationFrame(main); 


function setup(){

    new bezier(bezarr,100,100,400,100,0)
    new bezier(bezarr,400,200,100,200,0);
    new bezier(bezarr,100,300,300,400,0,bezarr[1],bezarr[0]);


    new bezier(bezarr,100,500,300,500,0)
    new bezier(bezarr,300,500,300,600,0)
    new bezier(bezarr,300,600,100,600,0)

    new bezier(bezarr,300,600,300,500,0,bezarr[3],bezarr[4])
    new bezier(bezarr,300,600,300,500,0,bezarr[4],bezarr[5])
    new bezier(bezarr,300,600,300,500,0,bezarr[6],bezarr[7])

}

let lastRenderTime = 0;
let GameSpeed = 60;

function main(currentTime){
    window.requestAnimationFrame(main);
    const sslr = (currentTime- lastRenderTime)/1000
    if (sslr < 1 / GameSpeed) {return}
    lastRenderTime = currentTime;  
    render();
    update();
}



function update(){
    bezarr.forEach(bez=>{bez.update()});

}

function render(){
can.ctx.clearRect(0,0,can.width,can.height);
bezarr.forEach(bez=>{bez.render(can.ctx)});
}


//util
function distance(x1,x2,y1,y2){return Math.sqrt(((x2-x1)**2)+((y2-y1)**2))}
function randomrange(min, max) {return Math.floor(Math.random() * (max - min + 1) + min)}


let mousedown = false;

addEventListener("mousemove",(e)=>{

    if(!mousedown)return;
    bezarr.forEach(bez=>{
        if(distance(e.clientX,bez.x1,e.clientY,bez.y1)<50){
            bez.x1 = e.clientX;
            bez.y1 = e.clientY;
        }
        if(distance(e.clientX,bez.x2,e.clientY,bez.y2)<50){
            bez.x2 = e.clientX;
            bez.y2 = e.clientY;
        }
    });
    
})

addEventListener("mousedown",()=>{
mousedown = true;
})

addEventListener("mouseup",()=>{
    mousedown = false;
})
