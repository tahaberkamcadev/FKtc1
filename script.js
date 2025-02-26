// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Animate elements on scroll
const animateElements = [
  '.feature-card',
  '.service-card',
  '.contact-form',
  '.info-card',
  '.stat-box',
  '.about-text'
].forEach(selector => {
  document.querySelectorAll(selector).forEach(element => {
    observer.observe(element);
  });
});

// Animated statistics counter with better performance
function animateValue(element, start, end, duration) {
  if (!element) return;
  
  const range = end - start;
  const minFrame = 50;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const currentValue = Math.floor(progress * range + start);
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1 && element.isConnected) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
}

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      if (statNumber && !statNumber.dataset.animated) {
        const targetValue = parseInt(statNumber.dataset.target, 10);
        if (!isNaN(targetValue)) {
          statNumber.dataset.animated = 'true';
          animateValue(statNumber, 0, targetValue, 2000);
        }
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-box').forEach(stat => {
  statsObserver.observe(stat);
});

// Parallax effect kaldırıldı
let ticking = false;

// Scroll event listener sadece gerekli fonksiyonları çağıracak
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      initScrollEffects();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Performance optimizations
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Intersection Observer for animations with better performance
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Optimize animation elements selection
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.feature-card, .service-card, .contact-form, .info-card, .stat-box, .about-text'
  );
  
  animateElements.forEach(element => animationObserver.observe(element));
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize form handling
  initFormHandling();
  
  // Initialize statistics animation
  initStatisticsAnimation();
  
  // Initialize particle effects
  initParticleEffects();
});

// Optimized smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Enhanced form handling
function initFormHandling() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  const submitButton = contactForm.querySelector('.submit-button');
  let isSubmitting = false;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const formData = new FormData(contactForm);
    if (!validateForm(formData)) {
      showFormError('Lütfen tüm gerekli alanları doğru şekilde doldurun');
      return;
    }
    
    try {
      isSubmitting = true;
      submitButton.textContent = 'Gönderiliyor...';
      submitButton.disabled = true;
      
      // Simüle edilmiş form gönderimi (gerçek API çağrısıyla değiştirilecek)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      submitButton.textContent = 'Mesaj Gönderildi!';
      submitButton.style.backgroundColor = '#00cc66';
      contactForm.reset();
      
      setTimeout(() => {
        submitButton.textContent = 'Mesaj Gönder';
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '';
      }, 3000);
      
    } catch (error) {
      showFormError('Bir hata oluştu. Lütfen tekrar deneyin.');
      submitButton.disabled = false;
      submitButton.textContent = 'Mesaj Gönder';
    } finally {
      isSubmitting = false;
    }
  });
}

// Optimized statistics animation
function initStatisticsAnimation() {
  const stats = document.querySelectorAll('.stat-box');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (statNumber && !statNumber.dataset.animated) {
          const targetValue = parseInt(statNumber.dataset.target, 10);
          if (!isNaN(targetValue)) {
            statNumber.dataset.animated = 'true';
            animateValue(statNumber, 0, targetValue, 2000);
          }
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  stats.forEach(stat => statsObserver.observe(stat));
}

// Optimized particle effects
function initParticleEffects() {
  const particlesContainer = document.querySelector('.cta-particles');
  if (!particlesContainer) return;
  
  const particlePool = new Array(500).fill(null).map(() => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    return particle;
  });
  
  let lastTime = 0;
  const particleInterval = 100;
  
  function animate(currentTime) {
    if (currentTime - lastTime > particleInterval) {
      const particle = particlePool.find(p => !p.isActive);
      if (particle) {
        animateParticle(particle, particlesContainer);
      }
      lastTime = currentTime;
    }
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}

function animateParticle(particle, container) {
  if (!particle.isActive) {
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * container.offsetWidth;
    const startY = container.offsetHeight;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}px;
      top: ${startY}px;
      transform: translateY(${-container.offsetHeight}px);
      transition: transform 5s linear, opacity 5s linear;
    `;
    
    if (!particle.parentElement) {
      container.appendChild(particle);
    }
    
    particle.isActive = true;
    
    setTimeout(() => {
      particle.isActive = false;
      particle.style.transform = '';
    }, 5000);
  }
}

// Utility functions
function validateForm(formData) {
  const email = formData.get('email');
  const name = formData.get('name');
  const message = formData.get('message');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return name && name.length >= 2 &&
         email && emailRegex.test(email) &&
         message && message.length >= 10;
}

function showFormError(message) {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  
  const existingError = contactForm.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
  
  contactForm.insertBefore(errorDiv, contactForm.firstChild);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Gelişmiş animasyon kontrolü
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Ardışık animasyonlar için
        const children = entry.target.querySelectorAll('.animate-child');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animated');
          }, index * 200);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => observer.observe(element));
}

// Gelişmiş parçacık efektleri
function createParticle(x, y, container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const size = Math.random() * 4 + 2;
  const angle = Math.random() * 360;
  const speed = Math.random() * 2 + 1;
  const radius = Math.random() * 100 + 50;
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  let startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = elapsed / 2000; // 2 saniye animasyon
    
    if (progress < 1) {
      const currentAngle = angle + progress * 360;
      const radian = currentAngle * Math.PI / 180;
      
      const currentX = x + Math.cos(radian) * radius * progress;
      const currentY = y + Math.sin(radian) * radius * progress;
      
      particle.style.transform = `translate(${currentX}px, ${currentY}px)`;
      particle.style.opacity = 1 - progress;
      
      requestAnimationFrame(animate);
    } else {
      container.removeChild(particle);
    }
  }
  
  container.appendChild(particle);
  requestAnimationFrame(animate);
}

// Gelişmiş hover efektleri
function initHoverEffects() {
  const cards = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .info-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// Gelişmiş scroll efektleri
function initScrollEffects() {
  let lastScroll = 0;
  const header = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      header.classList.remove('scroll-down');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// Hamburger menü fonksiyonu
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Sayfa yüklendiğinde tüm efektleri başlat
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initHoverEffects();
  initScrollEffects();
  initParticleEffects();
  initFormHandling();
  initSmoothScroll();
  initStatisticsAnimation();
  initHamburgerMenu();
  
  // Tıklama efektleri
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button')) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      createParticle(x, y, e.target);
    }
  });
});