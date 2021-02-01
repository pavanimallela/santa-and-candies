class SnowFlakes{
constructor(){
    this.x=random(0,windowWidth);
    this.y=random(0,windowHeight);
    this.image=loadImage("Images/snowflakes.png")
}
update(){
    this.y=this.y+10;
    if(this.y>windowHeight){
        this.y=random(0,windowHeight);
        this.x=random(0,windowWidth);
    }
}
display(){
    imageMode(CENTER);
    image(this.image,this.x,this.y,20,20);
}
}
