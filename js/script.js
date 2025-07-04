document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO OVERLAY DE IMAGEM (LIGHTBOX) ---
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const closeBtn = document.getElementById('close-btn');
  
    // Seleciona todas as imagens que não estão dentro de um carrossel.
    document.querySelectorAll('.gallery-item__img').forEach(img => {
        img.addEventListener('click', () => {
            if (overlay && overlayImg) {
                overlayImg.src = img.src;
                overlayImg.alt = img.alt;
                overlay.classList.add('active');
            }
        });
    });
  
    // Fecha o overlay ao clicar no botão 'X'.
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          overlay.classList.remove('active');
      });
    }
  
    // Fecha o overlay ao clicar fora da imagem.
    if (overlay) {
      overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
              overlay.classList.remove('active');
          }
      });
    }
  
  
    // --- LÓGICA DOS CARROSSEIS INTERNOS ---
    document.querySelectorAll('.gallery-item--large-carousel').forEach(carouselContainer => {
        const slides = carouselContainer.querySelectorAll('.carousel__slide');
        const prevBtn = carouselContainer.querySelector('.carousel__nav-btn--prev');
        const nextBtn = carouselContainer.querySelector('.carousel__nav-btn--next');
        let currentSlide = 0;
  
        if (slides.length === 0) return;
  
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('carousel__slide--active');
                if (i === index) {
                    slide.classList.add('carousel__slide--active');
                }
            });
        }
  
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede o clique de abrir o overlay.
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
  
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede o clique de abrir o overlay.
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }
  
        // Mostra o primeiro slide ao carregar a página.
        showSlide(currentSlide);
    });
  
  });