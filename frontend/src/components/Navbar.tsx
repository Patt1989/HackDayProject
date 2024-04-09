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
            <li><a className='navbar_link contrast' href="#">Home</a></li>
            <li><a className='navbar_link' href="#">Favorites</a></li>
            <li><a className='navbar_link' href="#">Choose for me!</a></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
