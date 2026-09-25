import '../../styles.css'; 
import DOMElementCreator from '../components/DOMElementCreator.js';


export function getHomePage() {
    const container = document.createElement('div');

    // --- 1. Hero Section (Main Banner) ---
    function createHeroSection() {
        const section = new DOMElementCreator({
            tagName: 'section',
            className: 'main_section'
        });

        const block = new DOMElementCreator({ tagName: 'div', className: 'main_block' });

        const title = new DOMElementCreator({
            tagName: 'h2',
            html: 'Вкус, который <br> объединяет' // Using HTML to break lines
        });

        const description = new DOMElementCreator({
            tagName: 'p',
            html: 'Авторская кухня от шефа Ивана Петрова. <br> Открыты ежедневно с 12.00.'
        });

        const btnContainer = new DOMElementCreator({ tagName: 'div' });
        const btnMenu = new DOMElementCreator({ tagName: 'button', className: 'btn', content: 'Смотреть Меню' });
        const btnBook = new DOMElementCreator({ tagName: 'button', className: 'btn order', content: 'Забронировать' });

        btnContainer.appendChildren([btnMenu, btnBook]);
        block.appendChildren([title, description, btnContainer]);
        section.append(block);

        return section;
    }

    // --- 2. Section: Our philosophy---
    function createPhilosophySection() {
        const section = new DOMElementCreator({ tagName: 'section', className: 'main_philosophy' });
        const block = new DOMElementCreator({ tagName: 'div', className: 'main_block' });

        const title = new DOMElementCreator({ tagName: 'h2', content: 'НАША ФИЛОСОФИЯ' });

        const textDiv = new DOMElementCreator({ tagName: 'div' });
        const text = new DOMElementCreator({
            tagName: 'p',
            html: `В основе философии Gusto лежит уважение. Уважение к продукту, к труду фермеров и, конечно, к нашему гостю. <br>
            Мы убеждены, что истинный вкус рождается там, где нет ничего лишнего. 
            Наша кухня — это диалог между классическими традициями и современным взглядом на гастрономию. Мы тщательно отбираем 
            ингредиенты, чтобы позволить им «звучать» в полную силу. Мы не прячем вкус за сложными соусами, мы раскрываем его суть. <br>
            Gusto — это место для тех, кто ценит качество без лишнего пафоса и ищет гастрономические впечатления в каждой детали.`
        });
        textDiv.append(text);

        const btnContainer = new DOMElementCreator({ tagName: 'div' });
        const btnMenu = new DOMElementCreator({ tagName: 'button', className: 'btn', content: 'Смотреть Меню' });
        const btnBook = new DOMElementCreator({ tagName: 'button', className: 'btn order', content: 'Забронировать' });
        btnContainer.appendChildren([btnMenu, btnBook]);

        const img = new DOMElementCreator({
            tagName: 'img',
            className: 'restaurant_pic',
            attr: { src: './img/restaurant.jpg', alt: 'Restaurant Interior' }
        });

        block.appendChildren([title, textDiv, btnContainer, img]);
        section.append(block);

        return section;
    }

    // --- 3. Popular Dishes Section (via array) ---
    function createDishesSection() {
        const section = new DOMElementCreator({ tagName: 'section', className: 'main_dishes' });
        const title = new DOMElementCreator({ tagName: 'h3', content: 'ПОПУЛЯРНЫЕ БЛЮДА' });
        const cardsContainer = new DOMElementCreator({ tagName: 'div', className: 'cards' });

        // Dish data
        const dishesData = [
            {
                img: './img/steak.jpg',
                title: 'Стейк Рибай',
                price: '390 р',
                desc: 'Мраморная говядина (зерновой откорм), Морская соль и дробленый перец, Сливочное масло с чесноком и розмарином, Тимьян'
            },
            {
                img: './img/Pasta with truffle.jpg',
                title: 'Паста с трюфелем',
                price: '280 р',
                desc: 'Паста Тальятелле (из твердых сортов пшеницы), Сливки 33%, Пармезан выдержанный, Трюфельная паста, Слайсы свежего трюфеля / трюфельное масло'
            },
            {
                img: './img/pavlova dessert.jpg',
                title: 'Десерт Павлова',
                price: '490 р',
                desc: 'Хрустящая французская меренга, Нежный крем на основе маскарпоне, Свежая клубника и голубика (сезонные ягоды), Соус из маракуйи, Свежая мята'
            }
        ];

        // Creating dishes card with loop
        dishesData.forEach(dish => {
            const card = new DOMElementCreator({ tagName: 'div', className: 'card' });
            const img = new DOMElementCreator({ tagName: 'img', attr: { src: dish.img, alt: dish.title } });
            
            const info = new DOMElementCreator({ tagName: 'div', className: 'card_info' });
            const name = new DOMElementCreator({ tagName: 'h4', content: dish.title });
            const price = new DOMElementCreator({ tagName: 'h4', id: 'price', content: dish.price });
            const desc = new DOMElementCreator({ tagName: 'h5', content: dish.desc });

            info.appendChildren([name, price, desc]);
            card.appendChildren([img, info]);
            cardsContainer.append(card);
        });

        const fullMenuBtn = new DOMElementCreator({ tagName: 'button', className: 'menu', content: 'ПОСМОТРЕТЬ ПОЛНОЕ МЕНЮ' });

        section.appendChildren([title, cardsContainer, fullMenuBtn]);
        return section;
    }

    // --- 4. Plan a Visit Section ---
    function createBookingSection() {
        const section = new DOMElementCreator({ tagName: 'section', id: 'main_plan_visit' });
        const title = new DOMElementCreator({ tagName: 'h3', content: 'Запланируйте свой визит' });
        const bar = new DOMElementCreator({ tagName: 'div', className: 'booking_bar' });

        // 1. Date input
        const groupDate = new DOMElementCreator({ tagName: 'div', className: 'input_group' });
        const inputDate = new DOMElementCreator({ tagName: 'input', attr: { type: 'date', placeholder: 'Выбрать дату' } });
        groupDate.append(inputDate);

        // 2. Time input
        const groupTime = new DOMElementCreator({ tagName: 'div', className: 'input_group' });
        const clockIcon = new DOMElementCreator({ tagName: 'i', className: 'fa-regular fa-clock icon' });
        
        // We do Select via innerHTML for simplicity, since options is just a list
        const selectTime = new DOMElementCreator({ 
            tagName: 'select', 
            html: `
                <option value="" disabled selected>Выбрать время</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
            `
        });
        const arrow1 = new DOMElementCreator({ tagName: 'i', className: 'fa-solid fa-chevron-down arrow' });
        groupTime.appendChildren([clockIcon, selectTime, arrow1]);

        // 3. Guest input
        const groupGuest = new DOMElementCreator({ tagName: 'div', className: 'input_group' });
        const spacer = new DOMElementCreator({ tagName: 'span', attr: {style: 'width: 5px;'} });
        const selectGuest = new DOMElementCreator({ 
            tagName: 'select', 
            html: `
                <option value="" disabled selected>Гость</option>
                <option value="1">1 человек</option>
                <option value="2">2 человека</option>
                <option value="4">4 человека</option>
            `
        });
        const arrow2 = new DOMElementCreator({ tagName: 'i', className: 'fa-solid fa-chevron-down arrow' });
        groupGuest.appendChildren([spacer, selectGuest, arrow2]);

        const btn = new DOMElementCreator({ tagName: 'button', className: 'search_btn', content: 'НАЙТИ СТОЛИК' });

        bar.appendChildren([groupDate, groupTime, groupGuest, btn]);
        section.appendChildren([title, bar]);
        return section;
    }

    // --- 5. Instagram Section ---
    function createInstaSection() {
        const section = new DOMElementCreator({ tagName: 'section', id: 'main_insta' });
        const title = new DOMElementCreator({ tagName: 'h3', content: 'Следите за нами в @GUSTO_REST' });
        const fotoContainer = new DOMElementCreator({ tagName: 'div', className: 'foto' });

        const images = [
            './img/Pasta with truffle.jpg',
            './img/steak.jpg',
            './img/Food.jpg',
            './img/Restaurant-1.jpg',
            './img/People_restaurant.jpg'
        ];

        images.forEach(src => {
            const img = new DOMElementCreator({
                tagName: 'img',
                className: 'insta_foto',
                attr: { src: src, alt: 'Instagram photo' }
            });
            fotoContainer.append(img);
        });

        section.appendChildren([title, fotoContainer]);
        return section;
    }




    // --- ASSEMBLY: Add all sections to container---
    container.appendChild(createHeroSection().element);
    container.appendChild(createPhilosophySection().element);
    container.appendChild(createDishesSection().element);
    container.appendChild(createBookingSection().element);
    container.appendChild(createInstaSection().element);

    return container;


}



