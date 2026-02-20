fadeElements.forEach(el => {
  // берём текущий transform по X, если есть, или 0
  const style = window.getComputedStyle(el);
  const matrix = new WebKitCSSMatrix(style.transform);
  const currentX = matrix.m41; // смещение по X
  
  el.style.opacity = 0;
  el.style.transform = `translate(${currentX}px, 30px)`; // сохраняем X
  el.style.transition = 'all 0.8s ease';
  observer.observe(el);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const style = window.getComputedStyle(entry.target);
      const matrix = new WebKitCSSMatrix(style.transform);
      const currentX = matrix.m41; // оставляем X
      entry.target.style.opacity = 1;
      entry.target.style.transform = `translate(${currentX}px, 0)`; // только Y анимируем
    }
  });
}, { threshold: 0.2 });
