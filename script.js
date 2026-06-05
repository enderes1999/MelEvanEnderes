const text = [
    "Web Developer",
    "System Developer",
    "UI/UX Designer",
    "IT Student"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {

    if(index >= text.length){
        index = 0;
    }

    currentText = text[index];

    if(!isDeleting){
        document.getElementById("typing").textContent =
        currentText.substring(0, charIndex++);

        if(charIndex > currentText.length){
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        }
    } else {

        document.getElementById("typing").textContent =
        currentText.substring(0, charIndex--);

        if(charIndex < 0){
            isDeleting = false;
            index++;
        }
    }

    setTimeout(typeEffect, 100);
}
// Scroll Reveal

const reveals = document.querySelectorAll(
".project-card, .timeline, .skill"
);

window.addEventListener("scroll",()=>{

    reveals.forEach(element=>{

        const top =
        element.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            element.classList.add("active");
        }

    });

});
const topBtn =
document.getElementById("topBtn");

window.onscroll = function(){

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";
    }
};

topBtn.onclick = ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"
    });
};
const cards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", () => {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add("show");
        }
    });
});
typeEffect();