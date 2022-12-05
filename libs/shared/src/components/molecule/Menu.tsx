import {
  Menu as ReactMenu,
  MenuItem as ReactMenuItem,
  MenuButton as ReactMenuButton,
  ControlledMenu as ReactControlledMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export function Menu(props) {
  return <ReactMenu {...props}/>
}

export function MenuItem(props) {
  return <ReactMenuItem {...props}/>
}

export function MenuButton(props) {
  return <ReactMenuButton {...props}/>
}

export function ControlledMenu(props) {
  return <ReactControlledMenu {...props}/>
}
