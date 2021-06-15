var eyeBtn = document.querySelectorAll('.main-poster__card_img-link'),
    sliderBase = document.querySelector('.slider-base'),
    closeBtn = document.querySelector('.close-btn');
for (let i = 0; i < eyeBtn.length; i++) {
    eyeBtn[i].addEventListener('click', function(){
        sliderBase.style.left = '0';
        document.body.style.overflow = 'hidden';
    })
}
closeBtn.addEventListener('click', function () {
   sliderBase.style.left = '-100%';
   document.body.style.overflow = 'visible';
})
class Slider {
    constructor(options){
    this.slider = document.querySelector(options.slider);
    this.sliderLine = this.slider.querySelector('.slider__line');
    this.slides = this.sliderLine.children;
    this.next = this.slider.querySelector('.slider__next');
    this.prev = this.slider.querySelector('.slider__prev');
    this.interval = options.interval;
    this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
    this.timemove = options.time != undefined ? options.time : 1000;
    this.width = this.slider.clientWidth;
    this.height = this.slider.clientHeight;
    this.moveSize = 'X' === this.dir ? this.width : this.height;
 
    this.activeSlide = 0;
 
    this.sliderLine.style = `position: relative;
                             overflow: hidden;
                             height: ${this.height}px;`
 
    for (let i = 0; i < this.slides.length; i++) {
       const sl = this.slides[i];
       sl.style = ` position:absolute;
                    width: ${this.width}px;
                    height: ${this.height}px;`
 
       if (i != this.activeSlide) {
          sl.style.transform = `translate${this.dir}(${this.moveSize}px)`
       }
       if (i === this.slides.length - 1) {
          sl.style.transform = `translate${this.dir}(${-this.moveSize}px)`;
       }
    }
 
    window.addEventListener('keydown', (e)=>{
        if (e.code == 'ArrowRight') {
           this.move(this.next);
        } else if(e.code == 'ArrowLeft'){
           this.move(this.prev);
        }
    })
 
    if (options.autoplay === true) {
     let interval = setInterval(() => {
       this.move(this.next)
     }, this.interval);
                
     this.slider.addEventListener('mouseenter', ()=>{
       clearInterval(interval);
     })
       this.slider.addEventListener('mouseleave', ()=>{
       interval = setInterval(() => {
       this.move(this.next);
     }, this.interval);
    })
  }
                      
    this.next.addEventListener('click', () => this.move(this.next));
    this.prev.addEventListener('click', () => this.move(this.prev));
    }
    move(btn){
       this.next.disabled = true;
       this.prev.disabled = true;
       setTimeout(() => {
          this.next.disabled = false;
          this.prev.disabled = false; 
       }, this.timemove + 100);
 
       let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize;
 
       for (let i = 0; i < this.slides.length; i++) {
          const slide = this.slides[i];
          slide.style.transition = '0ms';
          if (i != this.activeSlide) {
             slide.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`
          }
       }
 
       this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
       this.slides[this.activeSlide].style.transition = this.timemove + 'ms';
 
 
       if (btn == this.next) {
          this.activeSlide++;
          if (this.activeSlide >= this.slides.length) {
             this.activeSlide = 0;
          }
       } else if (btn == this.prev){
          this.activeSlide--;
          if (this.activeSlide < 0) {
             this.activeSlide = this.slides.length - 1;
          }
       }
 
       this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
       this.slides[this.activeSlide].style.transition = this.timemove + 'ms';
    }
 }
 
const slider = new Slider({
    slider: '.slider',
    direction: 'x',
    time: 1000,
    autoplay:true,
    interval: 2000
}) 

var burgerLink = document.querySelector('.header-nav__burger-link'),
    burgerList = document.querySelector('.header-nav__burger');

burgerLink.addEventListener('click', function () {
   if (burgerList.classList.contains('passive')) {
      burgerList.classList.remove('passive');
      burgerList.classList.add('active');
      burgerLink.innerHTML = '<i class="fas fa-times"></i>';
   } else{
      burgerList.classList.remove('active');
      burgerList.classList.add('passive');
      burgerLink.innerHTML = '<i class="fas fa-bars"></i>';
   }
})


$('.header-nav').css({
   position: 'fixed',
   top: 0,
   width: 100 + '%',
   zIndex: 200
})

$(window).on('scroll', function(){
    let editPosition = $(window).scrollTop() - $(window).height() - $('.header-nav').outerHeight;
    if (editPosition > 0) {
        $('.header-nav').css({
            top:editPosition + 'px',
        })
    } else {
        $('.header-nav').css({
            top: 0,
        })
    }
   })