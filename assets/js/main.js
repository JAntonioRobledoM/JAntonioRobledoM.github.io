// ================================================
// SCRIPT PRINCIPAL - FUNCIONALIDADES COMUNES
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Año actual en el footer
    updateCurrentYear();
    
    // Menú móvil
    setupMobileMenu();
    
    // Tema claro/oscuro
    setupThemeSwitch();
});

// Actualizar el año actual en el footer
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Configuración del menú móvil
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    }

    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = ''; // Restaurar scroll
            });
        });
    }
}

// Configuración del cambio de tema
function setupThemeSwitch() {
    const themeSwitch = document.querySelector('.theme-switch');
    const themeIcon = document.querySelector('.theme-switch i');
    
    // Verificar si existe el interruptor de tema
    if (!themeSwitch) return;

    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Alternar tema al hacer clic
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Función para scroll suave
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80, // Ajustar para el header fijo
            behavior: 'smooth'
        });
    }
}

// Detectar el scroll para efectos
window.addEventListener('scroll', function() {
    // Header con fondo al hacer scroll
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Detectar cuando se carga la página completamente
window.addEventListener('load', function() {
    // Ocultar pantalla de carga si existe
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Función para detectar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Detección de errores
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    // Aquí puedes implementar un sistema de registro de errores
});