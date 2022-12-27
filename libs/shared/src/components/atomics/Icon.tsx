import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //
import '@fortawesome/fontawesome-free-solid';
// import { faBars, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  FaTools,
  FaRegSquare,
  FaBluetooth,
  FaLayerGroup,
  FaPlusCircle,
} from 'react-icons/fa'; // https://react-icons.github.io/react-icons/

export function Icon({ name, ...rest }) {
  if (name === 'tools') {
    return <FaTools {...rest} />;
  } else if (name === 'FaRegSquare') {
    return <FaRegSquare {...rest} />;
  } else if (name === 'bluetooth') {
    return <FaBluetooth {...rest} />;
  } else if (name === 'floor') {
    return <FaLayerGroup {...rest} />;
  } else if (name === 'solid-circle-plus') {
    return <FaPlusCircle {...rest} />;
  } else {
    return <FontAwesomeIcon icon={name} {...rest} />;
  }
}
