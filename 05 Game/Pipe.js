/**
 * Created by 13355 on 2017/8/27.
 */
(function(Game){
  function Pipe(option){
    this.ctx = option.ctx;
    this.upImg = option.upImg;
    this.downImg = option.downImg;
    this.width = this.upImg.width;
    this.height = 0;
    this.spaceX = 200;
    this.spaceY = 150;
    this.index = option.index||0;
    this.x = (this.index+1)*this.spaceX;
    this.y = 0;
    this.setPos();

  };
  Pipe.prototype.render = function(){
    this.x-=5;
    if(this.x < -this.width){
      this.x = 5*this.spaceX;
      this.setPos();
    }
    //上面的柱子
    var dy = this.upImg.height-this.y;
    this.ctx.drawImage(this.upImg,0,dy,this.width,this.y,this.x,0,this.width,this.y);

    //下面的柱子
    var dh = this.ctx.canvas.height-this.y-this.spaceY;
    console.log(dh);
    this.ctx.drawImage(this.downImg,0,0,this.width,dh,this.x,this.y+this.spaceY,this.width,dh);

    //绘制路径
    this.ctx.rect(this.x,0,this.width,this.y);
    this.ctx.rect(this.x,this.y+this.spaceY,this.width,dh);

  };
  Pipe.prototype.setPos = function(){
    this.y = 100+parseInt(Math.random()*100);
  }
  Game.Pipe = Pipe;
})(Game);