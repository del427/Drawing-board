(function (){
  var ocans = document.getElementsByTagName('canvas')[0];
  var ctx = ocans.getContext('2d');
  var color = document.getElementsByClassName('btn1')[0];//取色器
  var clear = document.getElementsByClassName('btn2')[0];//清屏
  var white = document.getElementsByClassName('btn3')[0];//橡皮
  var revoke = document.getElementsByClassName('btn4')[0];//撤销
  var size = document.getElementsByClassName('btn5')[0];//画笔大小
  var key = false;
  var num = 10;
  var imageArr = [];
  var ocolor = 'black'
  function bindEvent(){
      ocans.addEventListener('mousedown',mdown,false);
      clear.addEventListener('click',mclear,false);
      white.addEventListener('click',mwhite,false);
      revoke.addEventListener('click',mrevoke,false);
      color.addEventListener('change',mcolor,false);
      size.addEventListener('click',msize,false);
  }
  //清空画板
  function mclear(){
      ctx.clearRect(0,0,ocans.offsetWidth,ocans.offsetHeight)
  }
  //橡皮擦
  function mwhite(){
      ocolor = 'white';
  }
  //取出数组的最后一位,也就是最近的一次画板信息
  function mrevoke(){
      var image = imageArr.pop()
      ctx.putImageData(image,0,0)
  }
  //取色器
  function mcolor(){
      ocolor = this.value;
  }
  //画笔大小
  function msize(){
     num = this.value;
  }
  //鼠标落下
  function mdown(e){
      var left = e.pageX - ocans.offsetLeft;
      var top = e.pageY - ocans.offsetTop;
      //存储图像信息
      var image = ctx.getImageData(0,0,ocans.offsetWidth,ocans.offsetHeight);
      imageArr.push(image)
      ctx.closePath();
      ctx.moveTo(left,top);
      key = true;
      ctx.save();
      document.addEventListener('mousemove',mmove,false)
      ocans.addEventListener('mouseup',mup,false)
      
  }
  function mmove(e){
      if(key){
          var left = e.pageX - ocans.offsetLeft;
          var top = e.pageY - ocans.offsetTop;
          ctx.lineTo(left,top);
          ctx.stroke();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = num;
          ctx.strokeStyle = ocolor;
      }
  }
  function mup(e){
      key = false;
      ctx.beginPath();
     
  }
  bindEvent()
}())