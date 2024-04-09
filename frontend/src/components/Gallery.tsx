import { PersonSalt } from "../App";
import BootcampCard from "./BootcampCard"
import '../Styles.css'
import { ChangeEvent, useState } from "react";

type Props = {
  salties: PersonSalt[]
}

function Gallery({ salties}: Props) {


  return (
    <>
      <h1 className="gallery-header">Gallery</h1>
      <BootcampCard salties={salties}/>
    </>
  )
}

export default Gallery
