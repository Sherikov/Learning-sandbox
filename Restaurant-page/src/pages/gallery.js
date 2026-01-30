import '../../styles.css'; 
import DOMElementCreator from '../components/DOMElementCreator.js';
import {  renderHeader, renderFooter } from '../components/layout.js';

// 1. Отрисовываем общие части (Хедер и Футер)
renderHeader();
renderFooter();

const main = document.getElementById('main');
 
const galleryContainer = new DOMElementCreator({id: 'interior'});
const containerTxt= new DOMElementCreator({tagName: 'h2', content: 'Галерея / Интерьер'});

const galleryImg = [ 
    {class:'img_1', src:'./img/gallery-4.jpg'},
    {class:'img_2', src:'./img/restaurant.jpg'},
    {class:'img_3', src:'./img/gallery-5.jpg'},
    {class:'img_4', src:'./img/gallery-6.jpg'},
    {class:'img_5', src:'./img/Restaurant-1.jpg'},
    {class:'img_6', src:'./img/gallery-2.jpg'},
    {class:'img_7', src:'./img/gallery-1.jpg'},
    {class:'img_8', src:'./img/People_restaurant.jpg'}
];


const imgContainer = new DOMElementCreator({id: 'gallery'});

galleryImg.forEach(item =>{
    const photo =new DOMElementCreator({
        tagName: 'img',
        className: item.class,
        attr: {src: item.src}
    });
    imgContainer.append(photo);
});

galleryContainer.appendChildren([containerTxt, imgContainer]);
galleryContainer.addTo(main);