/**
 * Created by 13355 on 2017/8/27.
 */
(function(window){
  function Game(option){
    //����
    //���ж��� 3����� 4��½�� 5������ 1ֻ��
    this.ctx = option.ctx;
    this.roles = [];//������ж���
    this.imgArr = ["sky","land","pipe1","pipe2","birds"];//���ͼƬ����
    this.hero = null;
    this.timer = null;
    //��ȡʱ���
    this.startTime = new Date();
    this.endTime = 0;
    this.dValue = 0;

    this.start();
  };
  Game.prototype = {
    constructor:Game,
    //��Ϸ��ʼ
    start:function(){
      var that = this;
      //ͼƬ��������������������
      this.loadImg(function(imgList){
        //������Ϸ����
          that.initial(imgList);
          that.userControl();
          //��ʱ����ͣ����Ⱦ
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
    //����ͼƬ
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
    //��ʼ��Ϸ����
    initial:function(imgList){

      //���
      for (var i = 0; i < 3; i++) {
        var sky = new Game.Sky({
          ctx:this.ctx,
          img:imgList["sky"],
          index:i
        })
        this.roles.push(sky);
      };

      //����
      for (var i = 0; i < 5; i++) {
        var pipe = new Game.Pipe({
          ctx:this.ctx,
          upImg:imgList["pipe2"],
          downImg:imgList["pipe1"],
          index:i
        })
        this.roles.push(pipe);
      };

      //½��
      for (var i = 0; i < 4; i++) {
        var land = new Game.Land({
          ctx:this.ctx,
          img:imgList["land"],
          index:i
        })
        this.roles.push(land);
      };
      //��
      var bird = new Game.Bird({
        ctx:this.ctx,
        img:imgList["birds"],
      })
      this.roles.push(bird);

      this.hero = bird;
      console.log(this.roles);
    },
    //��Ⱦ����
    render:function(dValue){
      for (var i = 0; i < this.roles.length; i++) {
        var obj =  this.roles[i];
        obj.render(this.dValue);
        //console.log(obj);
      }
    },
    //�û�����
    userControl:function(){
      var that = this;
      window.onclick = function(){
        that.hero.speed = -0.3;
      }
    },
    //��ײ���
    impact:function(){
      if(this.ctx.isPointInPath(this.hero.x,this.hero.y)||this.hero.y<0||this.hero.y>this.ctx.canvas.height-112){
        clearInterval(this.timer);
      }
    },
    //��Ϸ����
    over:function(){

    }
  }
  window.Game = Game;
})(window)