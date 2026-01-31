import '../../styles.css'; 
import DOMElementCreator from '../components/DOMElementCreator.js';
import { renderHeader, renderFooter } from '../components/layout.js';

// Render header and footer
renderHeader();
renderFooter();

const main = document.getElementById('main');

const aboutUsContainer = new DOMElementCreator({id: 'about_us'});
const imgAboutUs = new DOMElementCreator({
    tagName: 'img',
    attr: { src:'./img/aboutus.jpg' , alt: 'Chef-photo'}
});
const txtAbout = new DOMElementCreator({tagName: 'h2', content:'Наша история'});
const paragAbout =new DOMElementCreator({html: `<p>
                Наша история История GUSTO началась с простой мечты: создать место, где время замедляется, а еда становится поводом для искреннего общения. Мы верим, что ужин — это не просто прием пищи, это маленькое событие, которое сближает людей. С момента открытия в 2022 году мы стремимся быть тем самым местом, куда приходят за теплом, улыбками и, конечно же, безупречным вкусом.

Философия кухни В сердце нашего ресторана — авторский взгляд на европейскую классику. Мы не гонимся за мимолетными трендами, мы создаем еду, которая понятна и интересна. Мы уважаем традиции, но всегда добавляем щепотку современности.

Наш Шеф Кухню возглавляет шеф-повар Иван Петров. Его почерк — это внимание к деталям и фанатичная любовь к продукту. Иван уверен: «Вкусное блюдо рождается задолго до того, как попадает на сковороду — оно начинается с выбора правильного ингредиента».
            </p>`});

aboutUsContainer.appendChildren([imgAboutUs, txtAbout, paragAbout]);
aboutUsContainer.addTo(main);