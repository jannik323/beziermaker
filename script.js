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


    anybez(100,100,140,140,8);

}

let lastRenderTime = 0;
let GameSpeed = 60;

function anybez(x,y,w,h,n){

        const anchors = [];

        let lastx = x;
        let lasty = y;
        for(let i=0;i<n;i++){
            let newx = lastx;
            let newy = lasty+h;
            if(i%2==0){
                newx= lastx+w;
                newy = lasty;
            }else
            if(i%3==0){
                newx= lastx;
                newy = lasty-h;
            }else
            if(i%4==0){
                newx= lastx+w;
                newy = lasty-h;
            }

            anchors.push(new bezier(bezarr,lastx, lasty, newx, newy,  0));
            lastx = newx;
            lasty = newy;        
        }


        
        let lastgroup = {...anchors};
        for(let i=1;i<n;i++){
            let ni = n-i;
            const tempgroup = {...lastgroup};
            lastgroup = [];
            for(let nii=0;nii<ni;nii++){
                lastgroup.push(new bezier(bezarr, 0, 0, 0, 0, 0,tempgroup[nii],tempgroup[nii+1]));
                
            }
        }

}



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
let selp = null;

addEventListener("mousemove",(e)=>{

    if(!mousedown){
        selp = null;
        return;
    };
    
    if(selp==null){
        bezarr.forEach(bez=>{        
            if(distance(e.clientX,bez.x1,e.clientY,bez.y1)<50||distance(e.clientX,bez.x2,e.clientY,bez.y2)<50){
                if(bez.parent1==null&&bez.parent2==null){
                    selp = bez;
                }
            }
        });

    }else{

        if(distance(e.clientX,selp.x1,e.clientY,selp.y1)<50){
            selp.x1 = e.clientX;
            selp.y1 = e.clientY;
        }else
        if(distance(e.clientX,selp.x2,e.clientY,selp.y2)<50){
            selp.x2 = e.clientX;
            selp.y2 = e.clientY;
        }

    }
    
})

addEventListener("mousedown",()=>{
mousedown = true;
})

addEventListener("mouseup",()=>{
    mousedown = false;
})
