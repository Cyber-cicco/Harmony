var baseSpace = 100
var container = document.querySelector("[data-carousel]");
var btnLeft = document.querySelector("#cbtn-left");
var btnRight = document.querySelector("#cbtn-right");
var elements

function resetElements() {
  elements = container.querySelectorAll("[data-celement]");
}

var carouselState = {
    positionX : 10,
    index : 0,
};

function getPosFromIndex(index){
    return index * - baseSpace + 10;
}


function animateCarousel(carouselState, newCarouselState) {
    for(let el of elements) {
        el.animate(
            [
                // étapes/keyframes
                { transform: `translateX(${carouselState.positionX}vw)` },
                { transform: `translateX(${newCarouselState.positionX}vw)` },
            ],
            animationOption
        )
    }
}
var animationOption = { duration: 500, easing: "ease", fill: "forwards" };

function clickRight() {
    let newCarouselState
    if (carouselState.positionX - baseSpace <= -(elements.length * baseSpace )+ 10) {
        newCarouselState = {
            positionX : getPosFromIndex(0),
            index : 0,
        };
    } else {
        newCarouselState = {
            positionX : carouselState.positionX - baseSpace,
            index : carouselState.index + 1
        }
    }

    animateCarousel(carouselState, newCarouselState);
    carouselState = newCarouselState
}

function resetTabulationIndex(oldIndex) {
    const oldEl = elements[oldIndex];
    const newEl = elements[carouselState.index];
    const oldLinks = oldEl.querySelectorAll('a');
    const oldButtons = oldEl.querySelectorAll('button');
    const oldIframes = oldEl.querySelectorAll('iframe');
    const newLinks = newEl.querySelectorAll('a');
    const newButtons = newEl.querySelectorAll('button');
    const newIframes = newEl.querySelectorAll('iframe');

    for(let el of oldLinks) {
        el.setAttribute("tabindex", -1);
    }
    for(let el of oldButtons) {
        el.setAttribute("tabindex", -1);
    }
    for(let el of oldIframes) {
        el.setAttribute("tabindex", -1);
    }
    for(let el of newLinks) {
        el.setAttribute("tabindex", 0);
    }
    for(let el of newButtons) {
        el.setAttribute("tabindex", 0);
    }
    for(let el of newIframes) {
        el.setAttribute("tabindex", 0);
    }
}

function clickLeft() {

    let newCarouselState;
    console.log(carouselState);
    if (carouselState.positionX === 10) {
        newCarouselState = {
            positionX : getPosFromIndex(elements.length - 1),
            index : elements.length - 1
        };
    } else {
        newCarouselState = {
            positionX : carouselState.positionX + baseSpace,
            index : carouselState.index - 1
        }
    }

    animateCarousel(carouselState, newCarouselState);
    carouselState = newCarouselState
}


btnLeft.addEventListener("click", clickLeft);
btnLeft.addEventListener("keydown",(e) => {
  if (e.key === "Enter") {
    clickLeft();
  }
});
btnRight.addEventListener("click", clickRight);
btnRight.addEventListener("keydown",(e) => {
  if (e.key === "Enter") {
    clickRight();
  }
});
