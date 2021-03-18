
//contacts=================

const question = document.querySelector(".header__question-list");
const phone = document.querySelector(".header__phone");
const questionDropDown = document.querySelector(".header__top-min");
const phoneDropDown = document.querySelector(".phone-min-img");


function dropDownQuestion() {   
   if (question.style.display == "") {
      question.style.display = "block";   
   } else {
      question.style.display = "";  
   }
}
function dropDownPhone() {   
   if (phone.style.display == "") {  
      phone.style.display = "block";  
   } else {
      phone.style.display = ""; 
   }
}

questionDropDown.addEventListener("click", dropDownQuestion);
phoneDropDown.addEventListener("click", dropDownPhone);



