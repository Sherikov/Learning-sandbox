export default class DOMElementCreator {
    constructor({ tagName, id='', className='', content='', html='', attr={}}) {
        if(tagName === 'svg'){
            this.element=document.createElementNS("http://www.w3.org/2000/svg", "svg");
        }
        else {
            this.element=document.createElement(tagName || 'div');
        }
        //check if id is not empty 
        if(id){
            this.element.id=id;
        };
        //check if className is not empty
        if(className) {
            this.element.setAttribute('class', className);
        };

        for(const [key, value] of Object.entries(attr)){
            this.element.setAttribute(key, value);
        }
        //same with innerText
        if(html) {
            this.element.innerHTML=html;
        }
        else if (content){
            this.element.innerText=content;
        }
        
    };

    //method for adding to parent's container (DOM element)
    addTo(parent) {
        parent.appendChild(this.element);
    };
    //method to add one created element into another created element
    append(child){
        if (child instanceof DOMElementCreator){
            this.element.appendChild(child.element);
        }
        else {
            this.element.appendChild(child);
        }
    };
    //a method of adding several created elements to another.
    appendChildren(childrenArray){
        childrenArray.forEach(child => this.append(child));
    }
};
