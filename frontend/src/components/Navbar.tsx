import { Link } from 'react-router-dom'
import '../Styles.css'

type Props = {
  funcResetFilter: () => void
}

function Navbar({ funcResetFilter}: Props) {

  return (
    <>
        <nav className='navbar-container'>
          <ul className='navbar-element'> 
            <li className='navbar_header'><strong>Where to eat?</strong></li>
          </ul>
          <ul className='navbar-element'>
            <li><Link className='navbar_link' to="/">Home</Link></li>
            <li><Link className='navbar_link' to="/favorites">Favorites</Link></li>
            <li><Link className='navbar_link' to="/randompicker" onClick={funcResetFilter}>Choose for me!</Link></li>
          </ul>
        </nav>
    </>
  )
}

export default Navbar
