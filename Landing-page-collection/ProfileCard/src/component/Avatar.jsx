// Avatar.jsx
const Avatar = (props) => {
  const {
    src,
    className,
    name
  } = props;

  return (
    <div className={className}>
      <img
        className="avatar"
        src={src}
        alt={`${name} avatar`}
      />
    </div>
  );
};

export default Avatar;
