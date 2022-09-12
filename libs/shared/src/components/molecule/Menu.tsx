import {
  Menu as ReactMenu,
  MenuItem as ReactMenuItem,
  MenuButton as ReactMenuButton,
} from '@szhsin/react-menu';

export function Menu(props) {
  return <ReactMenu {...props}/>
}

export function MenuItem(props) {
  return <ReactMenuItem {...props}/>
}

export function MenuButton(props) {
  return <ReactMenuButton {...props}/>
}
