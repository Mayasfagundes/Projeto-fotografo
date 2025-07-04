document.addEventListener('DOMContentLoaded', function() {
  const formWrapper = document.getElementById('form-wrapper');
  const successWrapper = document.getElementById('success-wrapper');
  const contactForm = document.getElementById('contact-form');
  const formContainer = document.querySelector('.contact-form__container');
  const orbContainer = document.querySelector('.contact-page__visuals');

  if (!formWrapper || !successWrapper || !contactForm) {
      console.error("ERRO: Elementos essenciais do formulário não encontrados no HTML.");
      return;
  }

  contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const messageField = document.getElementById('message');
      let isFormValid = true;

      [nameField, emailField, messageField].forEach(field => field.classList.remove('is-invalid'));

      if (nameField.value.trim() === '') {
          nameField.classList.add('is-invalid');
          isFormValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
          emailField.classList.add('is-invalid');
          isFormValid = false;
      }
      
      if (messageField.value.trim() === '') {
          messageField.classList.add('is-invalid');
          isFormValid = false;
      }

      if (isFormValid) {
          formWrapper.classList.add('is-hidden');
          successWrapper.classList.remove('is-hidden');
      }
  });
  
  const resetButton = document.getElementById('reset-form-btn');
  if(resetButton) {
      resetButton.addEventListener('click', () => {
          successWrapper.classList.add('is-hidden');
          formWrapper.classList.remove('is-hidden');
          contactForm.reset();
      });
  }

  const closeButton = document.getElementById('close-form-btn');
  if(closeButton) {
      closeButton.addEventListener('click', () => {
          formContainer.style.transform = 'scale(0.9)';
          formContainer.style.opacity = '0';
          setTimeout(() => {
              formContainer.style.display = 'none';
          }, 400);
      });
  }

  if (orbContainer) {
      const orbs = [
          { el: document.getElementById('orb-one'),   x: 50,  y: 50,  dx: 1.2, dy: 1.0 },
          { el: document.getElementById('orb-two'),   x: 400, y: 400, dx: -1.0, dy: 0.8 },
          { el: document.getElementById('orb-three'), x: 200, y: 500, dx: 0.8, dy: -1.2 },
          { el: document.getElementById('orb-four'),  x: 600, y: 100, dx: -0.8, dy: -1.0 }
      ];

      function animateOrbs() {
          const containerWidth = orbContainer.offsetWidth;
          const containerHeight = orbContainer.offsetHeight;
          
          orbs.forEach(orb => {
              if (!orb.el) return;
              orb.x += orb.dx;
              orb.y += orb.dy;
              
              if (orb.x + orb.el.offsetWidth >= containerWidth || orb.x <= 0) {
                  orb.dx *= -1;
              }
              if (orb.y + orb.el.offsetHeight >= containerHeight || orb.y <= 0) {
                  orb.dy *= -1;
              }
              
              orb.el.style.left = `${orb.x}px`;
              orb.el.style.top = `${orb.y}px`;
          });
          
          requestAnimationFrame(animateOrbs);
      }
      animateOrbs();
  }
});