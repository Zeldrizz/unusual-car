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