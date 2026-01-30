import DOMElementCreator from './DOMElementCreator.js';

function createLogo() {
    const linkWrapper = new DOMElementCreator({ 
        tagName: 'a', 
        attr: { href: 'index.html', class: 'logo-link' } 
    });
    
    const container = new DOMElementCreator({ tagName: 'div', className: 'logo' });
    
    const icon = new DOMElementCreator({
        tagName: 'svg',
        html: '<title>silverware</title><path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />',
        attr: { xmlns:'http://www.w3.org/2000/svg', viewBox:"0 0 24 24", width:"40", height:"40" }
    });
    
    const text = new DOMElementCreator({ tagName: 'h1', content: 'Gusto' });
    
    container.appendChildren([icon, text]);
    linkWrapper.append(container);
    return linkWrapper;
}

export function renderHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    // 1. ОЧИСТКА: Удаляем всё, что было в хедере, перед отрисовкой
    header.innerHTML = '';

    const logo = createLogo();

    // Более надежная проверка: если есть свойство .element, значит это наш класс
    if (logo.element) {
        header.appendChild(logo.element);
    } else {
        header.appendChild(logo);
    }

    const navBar = new DOMElementCreator({ tagName: 'nav', id: 'nav_bar' });
    const navItems = [
        { text: 'Меню', link: 'menu.html' },
        { text: 'О нас/История', link: 'aboutus.html' },
        { text: 'Галерея/Интерьер', link: 'gallery.html' },
        { text: 'Контакты', link: '#footer' }
    ];

    navItems.forEach(item => {
        const li = new DOMElementCreator({ tagName: 'li' });
        const a = new DOMElementCreator({
            tagName: 'a',
            content: item.text,
            attr: { href: item.link, class: 'nav-link' }
        });
        li.append(a);
        navBar.append(li);
    });

    const btn = new DOMElementCreator({ tagName: 'button', className: 'btn', content: 'Забронировать стол ' });
    const btnIcon = new DOMElementCreator({
        tagName: 'svg',
        html: '<path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />',
        attr: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width:"16", height:"16", fill: "currentColor" }
    });
    btn.append(btnIcon);
    navBar.append(btn);

    navBar.addTo(header);
}

export function renderFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    // Очищаем футер перед отрисовкой
    footer.innerHTML = '';

    // --- БЛОК 1: КОНТАКТЫ (Слева) ---
    const contactsDiv = new DOMElementCreator({ tagName: 'div', id: 'contacts' });
    
    // Логотип
    const logo = createLogo(); 
    if (logo.element) {
        contactsDiv.append(logo);
    } else {
        contactsDiv.element.appendChild(logo);
    }

    const contactData = [
        { icon: 'map-marker-outline', path: 'M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z', text: 'Адрес ул.Кочевникова 12' },
        { icon: 'phone', path: 'M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z', text: '+7 (999)-231-00-09' },
        { icon: 'email', path: 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z', text: 'email@gusto.ru' }
    ];

    contactData.forEach(item => {
        const wrapper = new DOMElementCreator({ tagName: 'div', className: 'contact_info' });
        const icon = new DOMElementCreator({
            tagName: 'svg',
            attr: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width:"24", height:"24", fill: "currentColor" },
            html: `<title>${item.icon}</title><path d="${item.path}" />`
        });
        const text = new DOMElementCreator({ tagName: 'h4', content: item.text });
        wrapper.appendChildren([icon, text]);
        contactsDiv.append(wrapper);
    });

    // --- БЛОК 2: ВРЕМЯ РАБОТЫ (По центру) ---
    // Восстанавливаем блок, как на картинке
    const hoursDiv = new DOMElementCreator({ tagName: 'div', id: 'opening_hours' });
    
    hoursDiv.appendChildren([
        new DOMElementCreator({ tagName: 'h3', content: 'Время работы' }), 
        new DOMElementCreator({ tagName: 'h4', content: 'Пн-Вс: 12:00 - 23:00' }),
        new DOMElementCreator({ tagName: 'h4', content: 'Без выходных' })
    ]);

    // --- БЛОК 3: СОЦСЕТИ И ДОКУМЕНТЫ (Справа) ---
    const socialDiv = new DOMElementCreator({ tagName: 'div', id: 'social_media' });
    const mediaContainer = new DOMElementCreator({ tagName: 'div', className: 'media' });

    // Иконки: Instagram, VK, Facebook
    const socials = [
        // Instagram
        { path: 'M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z' },
        // VK (ВКонтакте)
        { path: 'M20.9,16.09C21.13,16.82 20.89,17.41 20.18,17.41H17.7C17.09,17.41 16.8,17.09 16.63,16.68C16.63,16.68 15.79,14.63 13.62,12.69C12.92,12.06 12.62,11.85 12.27,11.85C11.8,11.85 11.68,11.99 11.68,12.78V16.61C11.68,17.06 11.54,17.41 10.29,17.41C7.54,17.41 4.5,15.4 2.66,12.73C0.8,10 0,6.86 0,6.86C0,6.86 0.28,6.23 0.88,6.23H3.36C3.92,6.23 4.18,6.5 4.32,6.8C4.32,6.8 5.44,9.52 6.94,11.2C7.43,11.68 7.89,11.85 8.12,11.85C8.24,11.85 8.41,11.71 8.41,11.16V6.86C8.41,6.38 8.27,6.23 7.85,6.23H7.53C7.23,6.23 7,5.99 7,5.75C7,5.22 7.78,4.83 8.54,4.83H10.32C10.78,4.83 11.04,5.06 11.04,5.5V10.11C11.04,10.22 11.23,10.39 11.32,10.29C11.41,10.18 12.33,8.47 13.38,6.57C13.58,6.22 13.78,6 14.32,6H16.8C17.38,6 17.65,6.29 17.53,6.62C17.53,6.62 17.1,7.66 16.32,8.74C15.89,9.33 15.26,9.96 15.1,10.18C14.89,10.47 15,10.61 15.23,10.85C15.23,10.85 18.82,14.19 19.18,14.61C19.5,14.96 19.5,15.41 19.5,15.41L20.9,16.09Z' },
        // Facebook (Вместо Telegram)
        { path: 'M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.16L15.72 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z' }
    ];

    socials.forEach(s => {
        const svg = new DOMElementCreator({
            tagName: 'svg',
            attr: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width:"40", height:"40", fill: "white" },
            html: `<path d="${s.path}" />`
        });
        mediaContainer.append(svg);
    });

    // Текст под соцсетями (как на картинке)
   const policy = new DOMElementCreator({
    tagName: 'h4',
    content: 'Политика конфиденциальности '
   });
   const offer = new DOMElementCreator({
    tagName:'h4',
    content: 'Публичная оферта'
   });


    socialDiv.appendChildren([mediaContainer, policy, offer]);

    // Добавляем все три блока в футер
    contactsDiv.addTo(footer);
    hoursDiv.addTo(footer);
    socialDiv.addTo(footer);

    // Копирайт в самом низу (на всю ширину)
    const copyright = new DOMElementCreator({ tagName: 'h5', content: '© 2026 Restaurant Gusto' });
    // Небольшой стиль, чтобы копирайт был внизу
    copyright.element.style.gridColumn = '1 / 4';
    copyright.element.style.marginTop = '20px';
    copyright.addTo(footer);
}