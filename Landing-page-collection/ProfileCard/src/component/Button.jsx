
const Button = (props) => {

    const {
        text,
        type,
        className
    } = props;

    return (
        <button className={className} type={type}>{text}</button>

    );
};

export default Button;