// ================================================
// SCRIPT DE ANIMACIONES
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Efecto de fade-in para elementos
    setupFadeInAnimations();
    
    // Iniciar animación de habilidades
    setupSkillsAnimation();
    
    // Configurar contador para estadísticas
    setupCounters();
});

// Configuración de animaciones fade-in
function setupFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Dejar de observar después de animar
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 10% del elemento visible
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

// Animación de barras de habilidades
function setupSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Obtener el porcentaje de la barra de habilidades
                const width = entry.target.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                
                // Reiniciar la animación
                entry.target.style.width = '0%';
                
                // Aplicar la animación después de un pequeño retraso
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 100);
                
                // Dejar de observar después de animar
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
}

// Configuración de contadores para estadísticas
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Función de aceleración para efecto más natural
                    const easedProgress = easeOutQuad(progress);
                    
                    const currentValue = Math.floor(easedProgress * targetValue);
                    target.textContent = currentValue.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = targetValue.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
                
                // Dejar de observar después de animar
                countersObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    counters.forEach(counter => {
        countersObserver.observe(counter);
    });
}

// Función de aceleración para animaciones más naturales
function easeOutQuad(t) {
    return t * (2 - t);
}

// Efecto parallax para secciones
function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Animación de escritura de texto
function setupTypewriterEffect() {
    const typeElements = document.querySelectorAll('.typewriter');
    
    if (typeElements.length === 0) return;
    
    typeElements.forEach(element => {
        const text = element.getAttribute('data-text');
        const speed = parseInt(element.getAttribute('data-speed') || 100);
        
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    typewriterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        typewriterObserver.observe(element);
    });
}

// Inicializar todas las animaciones
function initAllAnimations() {
    setupFadeInAnimations();
    setupSkillsAnimation();
    setupCounters();
    setupParallaxEffect();
    setupTypewriterEffect();
}

// Llamar a todas las animaciones cuando se carga la página
window.addEventListener('load', initAllAnimations);