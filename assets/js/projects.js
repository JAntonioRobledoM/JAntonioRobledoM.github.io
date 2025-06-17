// ================================================
// SCRIPT PARA LA PÁGINA DE PROYECTOS
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Configurar filtrado de proyectos
    setupProjectFilter();
    
    // Configurar vista detallada de proyectos (si existe)
    setupProjectDetails();
    
    // Configurar modales de proyectos (si existen)
    setupProjectModals();
});

// Configuración del filtro de proyectos
function setupProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    // Función para filtrar proyectos
    function filterProjects(category) {
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (category === 'all' || categories.includes(category)) {
                card.classList.remove('hidden');
                // Reactivar la animación de fade-in
                setTimeout(() => {
                    card.classList.add('fade-in', 'active');
                }, 10);
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in', 'active');
            }
        });
    }
    
    // Asignar evento click a los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar proyectos según la categoría
            const category = this.getAttribute('data-filter');
            filterProjects(category);
        });
    });
    
    // Mostrar todos los proyectos al cargar la página
    filterProjects('all');
}

// Configuración de la vista detallada de proyectos
function setupProjectDetails() {
    // Verificar si estamos en la página de detalles de proyecto
    if (window.location.pathname.includes('project-detail.html')) {
        // Obtener el ID del proyecto de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (projectId) {
            // Aquí podrías cargar los detalles del proyecto desde un JSON o API
            // Por ahora, simulamos que ya tenemos los datos en la página
            console.log(`Cargando detalles del proyecto: ${projectId}`);
            
            // Ejemplo de cómo podrías cargar datos desde un archivo JSON local
            // fetch('assets/data/projects.json')
            //     .then(response => response.json())
            //     .then(data => {
            //         const project = data.find(p => p.id === projectId);
            //         if (project) {
            //             displayProjectDetails(project);
            //         } else {
            //             showProjectNotFound();
            //         }
            //     })
            //     .catch(error => {
            //         console.error('Error cargando los detalles del proyecto:', error);
            //         showProjectError();
            //     });
        } else {
            // Redirigir a la página de proyectos si no hay ID
            window.location.href = 'projects.html';
        }
    }
}

// Función para mostrar los detalles del proyecto
function displayProjectDetails(project) {
    // Actualizar el título de la página
    document.title = `${project.title} | Jose Antonio Robledo`;
    
    // Actualizar el contenido de la página con los detalles del proyecto
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectImage = document.getElementById('project-image');
    const projectTags = document.getElementById('project-tags');
    const projectLinks = document.getElementById('project-links');
    
    if (projectTitle) projectTitle.textContent = project.title;
    if (projectDescription) projectDescription.innerHTML = project.description;
    if (projectImage) projectImage.src = project.image;
    
    // Agregar etiquetas del proyecto
    if (projectTags) {
        projectTags.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'project-tag';
            tagElement.textContent = tag;
            projectTags.appendChild(tagElement);
        });
    }
    
    // Agregar enlaces del proyecto
    if (projectLinks) {
        projectLinks.innerHTML = '';
        
        if (project.demo) {
            const demoLink = document.createElement('a');
            demoLink.href = project.demo;
            demoLink.className = 'btn';
            demoLink.target = '_blank';
            demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Demo';
            projectLinks.appendChild(demoLink);
        }
        
        if (project.github) {
            const githubLink = document.createElement('a');
            githubLink.href = project.github;
            githubLink.className = 'btn btn-outline';
            githubLink.target = '_blank';
            githubLink.innerHTML = '<i class="fab fa-github"></i> Código';
            projectLinks.appendChild(githubLink);
        }
    }
    
    // Mostrar la galería de imágenes si existe
    if (project.gallery && project.gallery.length > 0) {
        setupProjectGallery(project.gallery);
    }
}

// Función para mostrar error cuando no se encuentra el proyecto
function showProjectNotFound() {
    const projectContainer = document.querySelector('.project-detail');
    if (projectContainer) {
        projectContainer.innerHTML = `
            <div class="project-not-found">
                <i class="fas fa-exclamation-circle"></i>
                <h2>Proyecto no encontrado</h2>
                <p>Lo sentimos, el proyecto que estás buscando no existe o ha sido eliminado.</p>
                <a href="projects.html" class="btn">Ver todos los proyectos</a>
            </div>
        `;
    }
}

// Función para mostrar error al cargar el proyecto
function showProjectError() {
    const projectContainer = document.querySelector('.project-detail');
    if (projectContainer) {
        projectContainer.innerHTML = `
            <div class="project-error">
                <i class="fas fa-times-circle"></i>
                <h2>Error al cargar el proyecto</h2>
                <p>Ha ocurrido un error al cargar los detalles del proyecto. Por favor, inténtalo de nuevo más tarde.</p>
                <a href="projects.html" class="btn">Ver todos los proyectos</a>
            </div>
        `;
    }
}

// Configuración de modales para proyectos
function setupProjectModals() {
    const projectLinks = document.querySelectorAll('.project-modal-link');
    
    if (projectLinks.length === 0) return;
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project-id');
            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });
    
    // Cerrar modal al hacer clic en el botón de cerrar o fuera del modal
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
            closeProjectModal();
        }
    });
    
    // Cerrar modal al presionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

// Función para abrir un modal de proyecto
function openProjectModal(projectId) {
    // Aquí podrías cargar los detalles del proyecto desde un JSON o API
    // Por ahora, simulamos que ya tenemos los datos
    const projectData = {
        id: projectId,
        title: 'Título del Proyecto',
        description: 'Descripción del proyecto...',
        image: 'assets/img/projects/project-image.jpg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demo: '#',
        github: '#'
    };
    
    // Crear el modal
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>${projectData.title}</h2>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${projectData.image}" alt="${projectData.title}">
                    </div>
                    <div class="modal-content">
                        <p>${projectData.description}</p>
                        <div class="project-tags">
                            ${projectData.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${projectData.demo}" class="btn" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="${projectData.github}" class="btn btn-outline" target="_blank"><i class="fab fa-github"></i> Código</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar el modal al DOM
    const modalElement = document.createElement('div');
    modalElement.id = 'project-modal';
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement);
    
    // Prevenir scroll en el body
    document.body.classList.add('modal-open');
    
    // Animar entrada del modal
    setTimeout(() => {
        modalElement.classList.add('active');
    }, 10);
}

// Función para cerrar el modal de proyecto
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        
        // Eliminar el modal después de la animación
        setTimeout(() => {
            modal.remove();
            document.body.classList.remove('modal-open');
        }, 300);
    }
}

// Configuración de galería de imágenes para la vista detallada
function setupProjectGallery(galleryImages) {
    const galleryContainer = document.getElementById('project-gallery');
    if (!galleryContainer) return;
    
    // Crear la galería
    let galleryHTML = '<div class="gallery-container">';
    
    galleryImages.forEach((image, index) => {
        galleryHTML += `
            <div class="gallery-item">
                <img src="${image}" alt="Imagen del proyecto ${index + 1}" class="gallery-image">
            </div>
        `;
    });
    
    galleryHTML += '</div>';
    galleryContainer.innerHTML = galleryHTML;
    
    // Configurar lightbox para las imágenes
    const galleryImages2 = document.querySelectorAll('.gallery-image');
    
    galleryImages2.forEach(image => {
        image.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });
}

// Función para abrir lightbox de imagen
function openLightbox(imageSrc) {
    const lightboxHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-container">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
                <img src="${imageSrc}" alt="Imagen ampliada" class="lightbox-image">
            </div>
        </div>
    `;
    
    // Agregar el lightbox al DOM
    const lightboxElement = document.createElement('div');
    lightboxElement.id = 'lightbox';
    lightboxElement.innerHTML = lightboxHTML;
    document.body.appendChild(lightboxElement);
    
    // Prevenir scroll en el body
    document.body.classList.add('lightbox-open');
    
    // Animar entrada del lightbox
    setTimeout(() => {
        lightboxElement.classList.add('active');
    }, 10);
    
    // Cerrar lightbox al hacer clic en el botón de cerrar o fuera de la imagen
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Cerrar lightbox al presionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Función para cerrar el lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        
        // Eliminar el lightbox después de la animación
        setTimeout(() => {
            lightbox.remove();
            document.body.classList.remove('lightbox-open');
        }, 300);
    }
}