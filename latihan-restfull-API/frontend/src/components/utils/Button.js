import { Link } from 'react-router-dom';

const Button = (props) => {
  return (
    <Link to={`${props.url}`} className={`btn ${props.customClass}`}>
      {props.btnName}
    </Link>
  );
};

export default Button;
