/**
 * Created by 13355 on 2017/8/27.
 */
(function(Game){
  function Bird(option){
    this.ctx = option.ctx;
    this.img = option.img;
    this.width = this.img.width/3;
    this.height = this.img.height;
    this.x = option.x||100;
    this.y = option.y||100;
    this.index = 0;

    //运动
    this.a = 0.0005;
    this.speed = 0;
    this.maxSpeed = 0.5;
    this.angle = 0;
    this.maxAngle = 45;
  };
  Bird.prototype.render = function(dValue){
    this.speed = this.speed + this.a * dValue;
    if(this.speed > this.maxSpeed){
      this.speed = this.maxSpeed;
    }
    this.y = this.y + this.speed*dValue + 1/2*this.a*dValue*dValue;

    //旋转角度
    this.angle = this.speed/this.maxSpeed*this.maxAngle;


    this.ctx.save();
    this.ctx.translate(this.x,this.y);
    this.ctx.rotate(this.angle*Math.PI/180);
    this.ctx.drawImage(this.img,this.index*this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);
    this.ctx.restore();

    this.index++;
    this.index%=3;
  }
  Game.Bird = Bird;
})(Game)