const Button = (props) => {
    const {
        className,
        type,
        text,
        onClick
    } = props

    return (
        <button type={type ?? 'button'} className={className} onClick={onClick}>
            {text}
        </button>
    )

}

export default Button;
