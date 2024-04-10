import '../Styles.css'
import Navbar from '../components/Navbar'

type Props = {
  funcResetFilter: () => void
}

function Edit({funcResetFilter}: Props) {

  return (
    <>
      <Navbar funcResetFilter={funcResetFilter}/>
    </>
  )
}

export default Edit