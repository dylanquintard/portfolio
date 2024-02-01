import '../styles/Button.scss';

const Button = ({ text }) => {
    return (
        <div>
            <button type="button">{text}</button>
        </div>
    );
  };
  
  export default Button;