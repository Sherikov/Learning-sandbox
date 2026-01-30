import '../../styles.css'; 
import DOMElementCreator from '../components/DOMElementCreator.js';
import { renderHeader,  renderFooter } from '../components/layout.js';

// 1. Отрисовываем общие части (Хедер и Футер)
renderHeader();
renderFooter();

const main = document.getElementById('main');

// 2. Данные для меню (повторяют твой HTML)
const menuData = {
    starters: {
        title: "Закуски",
        items: [
            { title: 'Стейк Рибай', price: '390 р', desc: 'Мраморная говядина (зерновой откорм), Морская соль и дробленый перец, Сливочное масло с чесноком и розмарином, Тимьян', img: './img/steak.jpg' },
            { title: 'Паста с трюфелем', price: '280 р', desc: 'Паста Тальятелле (из твердых сортов пшеницы), Сливки 33%, Пармезан выдержанный, Трюфельная паста, Слайсы свежего трюфеля', img: './img/Pasta with truffle.jpg' },
            { title: 'Десерт Павлова', price: '490 р', desc: 'Хрустящая французская меренга, Нежный крем на основе маскарпоне, Свежая клубника и голубика (сезонные ягоды), Соус из маракуйи', img: './img/pavlova dessert.jpg' }
        ]
    },
    mains: {
        title: "Основные блюда",
        items: [
             // Я дублирую данные, как в твоем примере, но тут можно поставить реальные основные блюда
            { title: 'Стейк Рибай', price: '390 р', desc: 'Мраморная говядина (зерновой откорм), Морская соль и дробленый перец, Сливочное масло с чесноком и розмарином, Тимьян', img: './img/steak.jpg' },
            { title: 'Паста с трюфелем', price: '280 р', desc: 'Паста Тальятелле (из твердых сортов пшеницы), Сливки 33%, Пармезан выдержанный, Трюфельная паста, Слайсы свежего трюфеля', img: './img/Pasta with truffle.jpg' },
            { title: 'Десерт Павлова', price: '490 р', desc: 'Хрустящая французская меренга, Нежный крем на основе маскарпоне, Свежая клубника и голубика (сезонные ягоды), Соус из маракуйи', img: './img/pavlova dessert.jpg' }
        ]
    },
    desserts: {
        title: "Десерты",
        items: [
            { title: 'Стейк Рибай', price: '390 р', desc: 'Мраморная говядина (зерновой откорм), Морская соль и дробленый перец, Сливочное масло с чесноком и розмарином, Тимьян', img: './img/steak.jpg' },
            { title: 'Паста с трюфелем', price: '280 р', desc: 'Паста Тальятелле (из твердых сортов пшеницы), Сливки 33%, Пармезан выдержанный, Трюфельная паста, Слайсы свежего трюфеля', img: './img/Pasta with truffle.jpg' },
            { title: 'Десерт Павлова', price: '490 р', desc: 'Хрустящая французская меренга, Нежный крем на основе маскарпоне, Свежая клубника и голубика (сезонные ягоды), Соус из маракуйи', img: './img/pavlova dessert.jpg' }
        ]
    }
};

// 3. Функция для создания одной секции меню
function createMenuSection(sectionData) {
    const section = new DOMElementCreator({ tagName: 'section', className: 'menu_dishes' });
    const title = new DOMElementCreator({ tagName: 'h3', content: sectionData.title });
    const cardsContainer = new DOMElementCreator({ tagName: 'div', className: 'cards' });

    sectionData.items.forEach(dish => {
        const card = new DOMElementCreator({ tagName: 'div', className: 'card' });
        
        const img = new DOMElementCreator({ 
            tagName: 'img', 
            attr: { src: dish.img, alt: dish.title } 
        });

        const info = new DOMElementCreator({ tagName: 'div', className: 'card_info' });
        
        const name = new DOMElementCreator({ tagName: 'h4', content: dish.title });
        const price = new DOMElementCreator({ tagName: 'h4', id: 'price', content: dish.price });
        const desc = new DOMElementCreator({ tagName: 'h5', content: dish.desc });

        info.appendChildren([name, price, desc]);
        card.appendChildren([img, info]);
        
        cardsContainer.append(card);
    });

    section.appendChildren([title, cardsContainer]);
    return section;
}

// 4. Сборка страницы
const menuInfoDiv = new DOMElementCreator({ tagName: 'div', className: 'menu_info' });

// Создаем секции по очереди
menuInfoDiv.append(createMenuSection(menuData.starters));
menuInfoDiv.append(createMenuSection(menuData.mains));
menuInfoDiv.append(createMenuSection(menuData.desserts));

// Добавляем все в Main
menuInfoDiv.addTo(main);