;(function(){
  const view=document.querySelector('.viewer');
  const progress=document.querySelector('.progress' );
  const timeBar=progress.querySelector('.progress__filled')
  const toggle=document.querySelector('.toggle');
  const ranges=document.querySelectorAll('.player__slider');
  const btns=document.querySelectorAll('.player__button');
  
  function togglePlay(){
    const method=view.paused? 'play':'pause';
    view[method]();
    const icon=view.paused?'►':'❚ ❚';
    toggle.innerText=icon;
  }

  function sliderbarChange(){
    const timebarPer=(view.currentTime/view.duration)*100
    timeBar.style.flexBasis= `${timebarPer}%`;//插值更简单但是这样也行timebarPer+'%'
  }
  function updaterange(){
    view[this.name]=this.value
    // console.log(this);
  }
  function changeTime(e){
      const slidTime=(e.offsetX/progress.offsetWidth)*view.duration;//记录移动的时间，比值是滑动距离/动画时长=点击位置/动画视图宽度
      view.currentTime=slidTime;
  }
  function updateTime(){
   // console.log(typeof this.dataset.skip);//string
    view.currentTime+=parseFloat(this.dataset.skip);
  }
let mousedown=false;
view.addEventListener('click',togglePlay);
view.addEventListener('timeupdate',sliderbarChange)
toggle.addEventListener('click',togglePlay)
ranges.forEach(range=>range.addEventListener('change',updaterange))
// console.log(ranges);
btns.forEach(btn=>btn.addEventListener('click',updateTime))
progress.addEventListener('click',changeTime)
progress.addEventListener('mousedown',()=>mousedown=true)
progress.addEventListener('mousemove',(e)=>mousedown&&changeTime(e))//这里暗示如果不存在mousedown事件后面的changetime也不会触发
progress.addEventListener('mouseup',()=>mousedown=false)


  
})()