import { PersonSalt } from '../App'
import '../Styles.css'

type Props = {
  salties: PersonSalt[]
}

function Person({ salties }: Props) {

  return (
    <>
        <h5>Person</h5>
        <ul>
          <li>{salties[0].name}</li>
        </ul>
    </>
  )
}

export default Person
