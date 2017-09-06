/**
 * Created by 13355 on 2017/8/27.
 */
(function(window){
  function Game(option){
    //画布
    //所有对象 3个天空 4个陆地 5个柱子 1只鸟
    this.ctx = option.ctx;
    this.roles = [];//存放所有对象
    this.imgArr = ["sky","land","pipe1","pipe2","birds"];//存放图片名称
    this.hero = null;
    this.timer = null;
    //获取时间差
    this.startTime = new Date();
    this.endTime = 0;
    this.dValue = 0;

    this.start();
  };
  Game.prototype = {
    constructor:Game,
    //游戏开始
    start:function(){
      var that = this;
      //图片加载完后再做后面的事情
      this.loadImg(function(imgList){
        //创建游戏对象
          that.initial(imgList);
          that.userControl();
          //定时器不停的渲染
          that.timer = setInterval(function(){
            that.endTime = new Date();
            that.dValue = that.endTime - that.startTime;
            that.startTime = that.endTime;
            that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height)
            that.ctx.beginPath();
            that.render(that.dValue);

            that.impact();
          },50)

      });
    },
    //加载图片
    loadImg:function(callback){
      var that = this;
      var imgList = {};
      var count = 0;
      for (var i = 0; i < this.imgArr.length; i++) {

        var obj = this.imgArr[i];
        var img = new Image();
        img.src = "../imgs/"+ obj + ".png";
        imgList[obj] = img;
        img.onload  = function(){
          count++;
          if(count > that.imgArr.length-1){
            callback&&callback(imgList);
          }
        }
      }
      console.log(imgList);

    },
    //初始游戏对象
    initial:function(imgList){

      //天空
      for (var i = 0; i < 3; i++) {
        var sky = new Game.Sky({
          ctx:this.ctx,
          img:imgList["sky"],
          index:i
        })
        this.roles.push(sky);
      };

      //柱子
      for (var i = 0; i < 5; i++) {
        var pipe = new Game.Pipe({
          ctx:this.ctx,
          upImg:imgList["pipe2"],
          downImg:imgList["pipe1"],
          index:i
        })
        this.roles.push(pipe);
      };

      //陆地
      for (var i = 0; i < 4; i++) {
        var land = new Game.Land({
          ctx:this.ctx,
          img:imgList["land"],
          index:i
        })
        this.roles.push(land);
      };
      //鸟
      var bird = new Game.Bird({
        ctx:this.ctx,
        img:imgList["birds"],
      })
      this.roles.push(bird);

      this.hero = bird;
      console.log(this.roles);
    },
    //渲染对象
    render:function(dValue){
      for (var i = 0; i < this.roles.length; i++) {
        var obj =  this.roles[i];
        obj.render(this.dValue);
        //console.log(obj);
      }
    },
    //用户控制
    userControl:function(){
      var that = this;
      window.onclick = function(){
        that.hero.speed = -0.3;
      }
    },
    //碰撞检测
    impact:function(){
      if(this.ctx.isPointInPath(this.hero.x,this.hero.y)||this.hero.y<0||this.hero.y>this.ctx.canvas.height-112){
        clearInterval(this.timer);
      }
    },
    //游戏结束
    over:function(){

    }
  }
  window.Game = Game;
})(window)