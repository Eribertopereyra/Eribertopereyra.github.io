// Espera a que todo el contenido del DOM (la página) esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // ====================================================== //
    // =========== LÓGICA DE CAMBIO DE TEMA ================= //
    // ====================================================== //

    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton.querySelector('i');
    const htmlElement = document.documentElement; // La etiqueta <html>

    // Función para actualizar el ícono del botón según el tema actual.
    const updateIcon = (theme) => {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); // En modo claro, mostramos la luna para cambiar a oscuro
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // En modo oscuro, mostramos el sol para cambiar a claro
        }
    };

    // Al cargar la página, verificamos el tema actual y ajustamos el ícono.
    // El tema ya fue establecido por el script en el <head>, aquí solo sincronizamos el ícono.
    let currentTheme = htmlElement.getAttribute('data-theme');
    updateIcon(currentTheme);

    // 1. ALTERNANCIA MANUAL: Evento de clic en el botón.
    themeToggleButton.addEventListener('click', () => {
        // Obtenemos el tema actual del atributo 'data-theme' en la etiqueta <html>.
        currentTheme = htmlElement.getAttribute('data-theme');

        // Cambiamos al tema opuesto.
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Aplicamos el nuevo tema al documento.
        htmlElement.setAttribute('data-theme', newTheme);

        // Guardamos la preferencia del usuario en el 'localStorage' del navegador.
        // Esto hace que la elección se recuerde en futuras visitas.
        localStorage.setItem('theme', newTheme);

        // Actualizamos el ícono del botón para que refleje el nuevo estado.
        updateIcon(newTheme);
    });

    // 2. ALTERNANCIA AUTOMÁTICA (Listener de cambios del sistema).
    // Escucha si el usuario cambia el tema de su sistema operativo (ej. de modo oscuro a claro en Windows/macOS).
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // IMPORTANTE: Solo aplicamos el cambio automático si el usuario NO ha elegido un tema manualmente.
        // Si 'localStorage.getItem('theme')' tiene un valor, significa que el usuario hizo una elección y la respetamos.
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            updateIcon(newTheme);
        }
    });

});