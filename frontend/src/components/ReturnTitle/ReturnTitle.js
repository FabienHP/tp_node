import './ReturnTitle.css'
import {ReactComponent as ReturnIcon} from '../../assets/returnIcon.svg';
import { useNavigate } from 'react-router-dom';

function ReturnTitle(props) {
  const navigate = useNavigate();

  return (
    <div className={`returnTitle ${props.className}`}>
      {props.return && <ReturnIcon onClick={() => navigate(-1)} />}
      <h3 className='paragTitle'>{props.title}</h3>
    </div>
  );
}

export default ReturnTitle;
