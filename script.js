// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('album-container');

    albumData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'foto-card';
    
    // URL directa de Drive (funciona igual para videos)
    let urlDirecta;
        if (item.tipo === 'video') {
            // Los videos necesitan el endpoint de stream de Drive
            urlDirecta = `https://drive.google.com/file/d/${item.id}/preview`;
        } else {
            // Para fotos seguimos usando el formato que te funciona bien
            urlDirecta = `https://lh3.googleusercontent.com/u/0/d/${item.id}`;
        }

    // Determinamos si es video (puedes ajustar esta lógica según tu JSON)
    const esVideo = (item.tipo == 'video');
    // Si no tienes el mimeType, podrías simplemente añadir una propiedad "esVideo: true" en tu script de Apps Script

    let mediaHTML = '';

    if (esVideo) {
        mediaHTML = `
            <video 
                src="${urlDirecta}" 
                autoplay 
                muted 
                loop 
                playsinline 
                class="video-element">
            </video>`;
    } else {
        mediaHTML = `<img src="${urlDirecta}" alt="${item.titulo}" loading="lazy">`;
    }

    card.innerHTML = `
        <div class="image-wrapper">
            ${mediaHTML}
        </div>
        <div class="info">
            <span class="date">${item.fecha}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
        </div>
    `;
    container.appendChild(card);
});

// 2. Lógica de Fade-In con IntersectionObserver
    const observerOptions = {
        threshold: 0.15, // La foto debe estar al 15% visible para aparecer
        rootMargin: "0px 0px -50px 0px" // Dispara el efecto un poco antes de que llegue al borde
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Una vez que aparece, dejamos de observarla para mejorar rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todas las tarjetas recién creadas y las ponemos bajo observación
    const allCards = document.querySelectorAll('.foto-card');
    allCards.forEach(card => observer.observe(card));
});