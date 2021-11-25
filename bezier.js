class bezier{

    constructor(arr,x1,y1,x2,y2,i,parent1=null,parent2=null){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.parent1 = parent1;
        this.parent2 = parent2;
        this.i = i;
        this.ix =x1;
        this.iy =y1;
        this.ichange = true;
        this.ia = 0.025;
        this.path = [];

        arr.push(this);
    }

    update(){

        this.path.push({x:this.ix,y:this.iy});

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
        
    }

    render(ctx){
        
        ctx.beginPath();
        ctx.moveTo(this.x1,this.y1);
        ctx.lineTo(this.x2,this.y2);
        ctx.stroke();


        if(this.parent1==null){
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.moveTo(this.x1,this.y1);
            ctx.arc(this.x1,this.y1,4,0,Math.PI*2);
            ctx.fill();
        
        }

        if(this.parent2==null){
            ctx.beginPath();
            ctx.fillStyle = "grey";
            ctx.moveTo(this.x2,this.y2);
            ctx.arc(this.x2,this.y2,4,0,Math.PI*2);
            ctx.fill();
        }

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.ix,this.iy);
        ctx.arc(this.ix,this.iy,4,0,Math.PI*2);
        ctx.fill();

        ctx.beginPath();
        this.path.forEach(e=>{
            ctx.lineTo(e.x,e.y);
        })
        ctx.stroke();
    }



}

export default bezier