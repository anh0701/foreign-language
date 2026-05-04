const Button = ({ text, icon, onClick, className = "" }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {icon && <i className={`fa-solid ${icon}`}></i>} {text}
    </button>
  );
};

export default Button;