import { BASE_URL } from '@/shared/constants';

const RouterLink = (props) => {

    const {
        to, children, ...rest
    } = props;

    const handleClick = (event) => {
        event.preventDefault();
        window.history.pushState({}, '', to);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
}

export default RouterLink;