const burgerMenu = document.querySelector(".burger-menu");
          
const changeBody = document.querySelector(".body-menu");
const changeBody2 = document.querySelector(".menu");

const contentBody = document.querySelector("body");

function activeBurger() {
         
   if(burgerMenu.classList.contains("active-burger") == false) {
      burgerMenu.classList.add("active-burger");
   } else {
      burgerMenu.classList.remove("active-burger");
   }

   if (burgerMenu.classList.contains("active-burger") == true) {
      changeBody.classList.add("remove-in-burger");
      changeBody2.classList.add("remove-in-burger");
      contentBody.style.overflow = "hidden";
   } else if (burgerMenu.classList.contains("active-burger") == false) {
      changeBody.classList.remove("remove-in-burger");
      changeBody2.classList.remove("remove-in-burger");
      contentBody.style.overflow = "visible";
   }
}

burgerMenu.addEventListener("click", activeBurger);


//SPAN============================================================================

const bodyMenuSpan = document.querySelector(".body-menu__span");
const changeSpan = document.querySelector(".body-menu__furniture-list");

function activeSpan() {
   if(bodyMenuSpan.classList.contains("active-span") == false) {
      bodyMenuSpan.classList.add("active-span");
   } else {
      bodyMenuSpan.classList.remove("active-span");
   }

   if (bodyMenuSpan.classList.contains("active-span") == true) {
      changeSpan.classList.add("furniture-list-active");
   } else if (bodyMenuSpan.classList.contains("active-span") == false) {
      changeSpan.classList.remove("furniture-list-active");
   }
}
bodyMenuSpan.addEventListener("click", activeSpan);