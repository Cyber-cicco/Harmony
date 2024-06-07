var modalContents

function initModal() {
  modalContents = new Map()
  modalContents["graphisme/presentation_grenier_1"] = {
    type: "carousel",
    urls: [
      'graphisme/presentation_grenier_1',
      'graphisme/presentation_grenier_2',
      'graphisme/presentation_grenier_3',
      'graphisme/presentation_grenier_4',
      'graphisme/presentation_grenier_5',
    ]
  }
  modalContents["graphisme/presentation_roc_bihan"] = {
    type: "image"
  }
  modalContents["graphisme/presentation_charleen"] = {
    type: "image"
  }
  modalContents["graphisme/modal_brisset"] = {
    type: "image"
  }

  modalContents["illustration/01_pearl"] = {
    type: "image"
  }
  modalContents["illustration/02_cassandre"] = {
    type: "image"
  }
  modalContents["illustration/03_opale"] = {
    type: "image"
  }
  modalContents["illustration/04_echo"] = {
    type: "image"
  }
  modalContents["illustration/05_arthur"] = {
    type: "carousel",
    urls: [
      "illustration/05_arthur",
      "illustration/05_presentation_2",
    ]
  }
  modalContents["illustration/06_films_ta_formation"] = {
    type: "page",
    adress: "film"
  }
  modalContents["illustration/07_feminisme"] = {
    type: "image"
  }
  modalContents["illustration/08_sorciere"] = {
    type: "image"
  }
  modalContents["illustration/09_burnout"] = {
    type: "page",
    adress: "burnout"
  }

  let triggers = document.querySelectorAll('[data-modal]');
  let modal = document.querySelector('#modal');
  let modalBg = document.querySelector('#modal-bg');


  triggers.forEach(m => {
    m.addEventListener("click", (e) => {
      toggleModal(m.getAttribute('data-modal'), modal, modalBg, modalContents);
    });
    m.addEventListener("keydown", (e) => {
      if (e.key === "Enter") toggleModal(m.getAttribute('data-modal'), modal, modalBg, modalContents);
    })
  })

}

/**
* @typedef {{type:string, urls? : string[], adress? : string}} ModalContent
* @param {string | undefined} modalName
* @param {Element} modal
* @param {Element} modalBg
* @param {Map<string, ModalContent>} modalContents
*/
function toggleModal(modalName, modal, modalBg, modalContents) {
  if (!modal.classList.contains("modal")) {
    modalBg.removeAttribute("hidden");
    modal.classList.add("modal");
    modal.removeAttribute("hidden");
    const contentOpts = modalContents[modalName];
    switch (contentOpts.type) {
      case 'image':
        modal.querySelector("#modal-content").innerHTML = `
        <div class="flex justify-center h-full w-full">
          <img width="1500" data-celement="true" class="image" src="assets/images/${modalName}.png">
        </div>
          `
        break;
      case 'carousel':
        modal.querySelectorAll("[data-carousel-control]").forEach((el) => {
          el.removeAttribute("hidden")
        })
        modal.querySelector("#modal-content").innerHTML = contentOpts.urls.map((url) => {
          return `<img data-celement="true" class="image" src="assets/images/${url}.png">`
        }).join('')
        break;
      case 'page':
        htmx.ajax('GET', `./components/${contentOpts.adress}.html`, '#modal-content')
    }
    resetElements()
    return;
  }
  modalBg.setAttribute("hidden", "true");
  modal.classList.remove("modal");
  modal.querySelectorAll("[data-carousel-control]").forEach((el) => {
    el.setAttribute("hidden", "true")
  })
  modal.setAttribute("hidden", "true");
  modal.querySelector("#modal-content").innerHTML = `<img class="image" src="assets/images/graphisme/blank.png">`
}

function closeModal() {
  let modal = document.querySelector('#modal');
  let modalBg = document.querySelector('#modal-bg');
  toggleModal(undefined, modal, modalBg, modalContents);
}
