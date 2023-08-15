import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <ul className={classes.header__ul}>
          <li>
            <NavLink className={classes.header__link}>Main</NavLink>
          </li>
          <li>
            <NavLink className={classes.header__link}>Products</NavLink>
          </li>
          <li>
            <NavLink className={classes.header__link}>About</NavLink>
          </li>
          <li>
            <NavLink className={classes.header__link}>Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
