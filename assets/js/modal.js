function initModal() {
  let triggers = document.querySelectorAll('[data-modal]');
  let modal = document.querySelector('#modal');
  let modalBg = document.querySelector('#modal-bg');

  triggers.forEach(m => {
    m.addEventListener("click", (e) => {
      toggleModal(m.getAttribute('data-modal'), modal, modalBg);
    });
    m.addEventListener("keydown", (e) => {
      if (e.key === "Enter") toggleModal(m.getAttribute('data-modal'), modal, modalBg);
    })
  })

}


/**
* @param {string | undefined} modalName
* @param {Element} modal
* @param {Element} modalBg
*/
function toggleModal(modalName, modal, modalBg) {
  if (!modal.classList.contains("modal")) {
    modalBg.removeAttribute("hidden");
    modal.classList.add("modal");
    modal.removeAttribute("hidden");
    modal.querySelector("#modal-content").setAttribute('src', `./assets/images/${modalName}.png`)
    return;
  }
  modalBg.setAttribute("hidden", "true");
  modal.classList.remove("modal");
  modal.setAttribute("hidden", "true");
  modal.querySelector("#modal-content").setAttribute('src', './assets/images/graphisme/blank.png')
}

function closeModal() {
  let modal = document.querySelector('#modal');
  let modalBg = document.querySelector('#modal-bg');
  toggleModal(undefined, modal, modalBg);
}
