function doAnimation() {
  const elements = document.querySelectorAll('.gay-square');
  const observer = new IntersectionObserver(entries => {
    elements.forEach(element => {
      element.classList.toggle('gay-slide-left', entries[0].isIntersecting);
    })
  });

  elements.forEach(el => {
    observer.observe(el);
  })
}
