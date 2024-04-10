import { Link } from 'react-router-dom'
import '../Styles.css'

function Navbar() {

  return (
    <>
      <div className='navbar-container'>
        <nav>
          <ul>
            <li className='navbar_header'><strong>Where to eat?</strong></li>
          </ul>
          <ul>
            <li><Link className='navbar_link' to="/">Home</Link></li>
            <li><Link className='navbar_link' to="/favorites">Favorites</Link></li>
            <li><Link className='navbar_link' to="/randompicker">Choose for me!</Link></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
