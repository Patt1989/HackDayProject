import { PersonSalt } from "../App";
import Person from "./Person"
import '../Styles.css'

type Props = {
  salties: PersonSalt[]
}

function BootcampCard({ salties }: Props) {


  return (
    <>
      <h1>BootcampCard</h1>
      <Person salties={salties}/>

    </>
  )
}

export default BootcampCard
