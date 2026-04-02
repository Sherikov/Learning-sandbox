const Info = (props) => {

    const {
        className,
        text,
        tag: Tag='h1'
    } = props;

    return (
        <Tag className={className}>{text}</Tag>
    )
}

export default Info;