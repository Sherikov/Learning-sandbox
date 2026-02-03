import '../styles.css'; 
import { renderHeader, renderFooter } from './components/layout.js';

// Importing page rendering functions
import { getHomePage } from './pages/home.js';     
import { getMenuPage } from './pages/menu.js';
import { getAboutUsSection } from './pages/aboutus.js';
import { getGallery } from './pages/gallery.js';

// 1. Rendering Header and Footer
renderHeader();
renderFooter();

const main = document.getElementById('main');

// 2. Navigation function
function navigateTo(pageName) {
    // 1. Clearing main section
    main.innerHTML = '';

    if (pageName !== 'contacts') {
        window.scrollTo(0, 0);
    }

    let content;

    switch(pageName) {
        case 'home':
            content = getHomePage();
            break;
        case 'menu':
            content = getMenuPage();
            break;
        case 'about':
            content = getAboutUsSection(); //
            break;
        case 'gallery':
            content = getGallery();
            break;
        case 'contacts':
           
            content = getHomePage();
            break;
        default:
            content = getHomePage();
    }

    // 2. First, we insert content into the DOM
    if (content) {
        const elementToAdd = content.element ? content.element : content;
        main.appendChild(elementToAdd);
    }

    // 3. And only AFTER inserting the content do we scroll to the footer
    if (pageName === 'contacts') {
     // setTimeout is needed so the browser has time to "render" the height of the new main page
    // and correctly calculate the footer position
        setTimeout(() => {
            const footer = document.getElementById('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100); 
    }
}

// 3. Attach event listener to the menu
// We search for links created by layout.js
document.addEventListener('DOMContentLoaded', () => {
    // load home page by default 
    navigateTo('home');

    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Cancel the standard link transition
            const target = link.getAttribute('data-target');
            if (target) {
                navigateTo(target);
            }
        });
    });
    
    // Logo processing (to return to the main page)
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }
});