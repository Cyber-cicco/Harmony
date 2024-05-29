let triggers = document.querySelectorAll('[data-modal]');
let modal = document.querySelector('#modal');
let modalBg = document.querySelector('#modal-bg');

triggers.forEach(m => {
  m.addEventListener("click", (e) => {
    toggleModal(m.getAttribute('data-modal'))
  });
  m.addEventListener("keydown", (e) => {
    if (e.key === "Enter") toggleModal(m.getAttribute('[data-modal]'));
  })
})


/**
*@param {string} modalName
*/
function toggleModal(modalName) {
  if (!modal.classList.contains("modal-left")) {
    modalBg.removeAttribute("hidden");
    modal.classList.add("modal");
    modal.removeAttribute("hidden");
    htmx.ajax('GET', `/components/${modalName}.html`, '#modal')
    return;
  }
  modalBg.setAttribute("hidden", "true");
  modal.classList.remove("modal");
  modal.setAttribute("hidden", "true");
}

