class bezier{

    constructor(arr,x1,y1,x2,y2,i,parent1=null,parent2=null){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.parent1 = parent1;
        this.parent2 = parent2;
        this.haschild = false;
        this.i = i;
        this.ix =x1;
        this.iy =y1;
        this.ichange = true;
        this.ia = 0.025;
        this.path = [];
        this.brushsize=2;
        this.color = 0;
        if(parent1&&parent2){
            this.color = ((parent1.color+parent2.color)/2)+40;
            this.brushsize = ((parent1.brushsize+parent2.brushsize)/2)+.4;
            this.parent1.haschild = true;
            this.parent2.haschild = true;
        }
        

        arr.push(this);
    }

    update(){

        
        if(this.parent1!==null){
            this.x1 = this.parent1.ix;
            this.y1 = this.parent1.iy;
        }
        if(this.parent2!==null){
            this.x2 = this.parent2.ix;
            this.y2 = this.parent2.iy;
        }
        
        this.i+=this.ia;
        if(this.i>1){
            this.i=1;
            this.ia*=-1;
            this.path = [];
        }
        if(this.i<0){
            this.i=0;
            this.ia*=-1;
            this.path = [];
            
        }
        
        this.ix  =this.x1-((this.x1-this.x2)*this.i);
        this.iy  =this.y1-((this.y1-this.y2)*this.i);
        this.path.push({x:this.ix,y:this.iy});
        
    }

    render(ctx){


        ctx.strokeStyle="hsl("+this.color+",50%,50%)";
    
        //line draw
        ctx.beginPath();
        ctx.moveTo(this.x1,this.y1);
        ctx.lineTo(this.x2,this.y2);
        ctx.stroke();            
        



        //xy draw
        if(this.parent1==null&&this.parent2==null){
            ctx.beginPath();
            ctx.fillStyle = "#555";
            ctx.moveTo(this.x1,this.y1);
            ctx.arc(this.x1,this.y1,4,0,Math.PI*2);
            ctx.moveTo(this.x2,this.y2);
            ctx.arc(this.x2,this.y2,4,0,Math.PI*2);
            ctx.fill();
        
        }


        //i draw
        ctx.fillStyle = "#aa3333";
        ctx.beginPath();
        ctx.moveTo(this.ix,this.iy);
        ctx.arc(this.ix,this.iy,4,0,Math.PI*2);
        ctx.fill();



        //path draw
        ctx.lineWidth = this.brushsize;
        ctx.strokeStyle = "black"
        if(this.haschild){return;}
        ctx.beginPath();
        this.path.forEach(e=>{
            ctx.lineTo(e.x,e.y);
        })
        ctx.stroke();
        ctx.lineWidth = 1;

    }



}

export default bezier