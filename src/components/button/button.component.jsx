import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

// props.children is available to every component
const Button = ({ children, buttonType, ...otherAttributes }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherAttributes}
    >
      {children}
    </button>
  );
};

export default Button;
