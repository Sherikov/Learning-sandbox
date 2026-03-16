const InputField = (props) => {
  const {
    label,
    className,
    placeholder,
    type = 'text',
    required = false,
    onChange,
    value,
    name,
    icon,
  } = props;

  return (
    <label className="input-field">
      {label}
      <span className={`input-wrapper${icon ? ' input-wrapper-with-icon' : ''}`}>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          required={required}
        />
        {icon && <span className="input-icon">{icon}</span>}
      </span>
    </label>
  );
};

export default InputField;
