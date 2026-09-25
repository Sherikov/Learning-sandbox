import '../styles.css';
import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import SocialMedia from './SocialMedia.jsx';


const Card = (props) => {
    const {
        className,
        name,
        tag,
        desription
    } = props;

 
    const handleMouseMove = (event) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleMouseLeave = (event) => {
        const card = event.currentTarget;

        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
    };

    return (
        <div className={className} 
         onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        >
            <div className='cardTop'>
                <svg
                    className="cardWave"
                    viewBox="0 0 510 300"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        className="wavePink"
                        d="M 0 214 C 50 282 120 303 196 258 C 243 225 288 197 334 217 C 383 239 406 296 462 286 C 482 283 498 256 510 230 L 510 282 C 486 300 448 306 411 292 C 374 278 354 238 319 226 C 285 214 250 254 197 280 C 121 317 45 296 0 242 Z"
                    />
                    <path
                        className="waveMain"
                        d="M0 0H510V220C510 259 486 289 448 292C394 296 371 250 328 224C286 198 250 234 194 262C121 299 54 287 0 238V0Z"
                    />
            
                </svg>
                <Avatar alt='Sarah' className='avatarWrap' src='https://images.unsplash.com/photo-1531123897727-8f129e1688ce'></Avatar>
            </div>
            <div className='user'>
                <h1 className='userName'>{name}</h1>
                <h2 className='userTag'>{tag}</h2> 
            </div>
            <SocialMedia></SocialMedia>
            <div className='info'>
                <p>{desription}</p>
            </div>
            <div className='btnContainer'>
                <Button type='button' className='btn btnFollow' text='Follow'></Button>
                <Button type='button' className='btn btnMessage' text='Message'></Button>
            </div>
        </div>
    );

};

export default Card;
