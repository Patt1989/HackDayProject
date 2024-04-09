import { FormEvent, useEffect, useState } from "react";
import Gallery from "./components/Gallery"
import './Styles.css'

export type Restaurant= {
  name: string;
  foodType: string;
}

// 7175
function App() {

  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  // useEffect(() => {
  //   fetch('https://localhost:7175/api/Restaurants')
  //     .then(response => response.json())
  //     .then(data => setRestaurants(data));
  // }, []);

  // useEffect(() => {
  //   fetch('https://www.googleapis.com/maps/customsearch/v1?key=AIzaSyAzgiwGOf80Q9OEpKb4OdpPKYauGAx1BFs&cx=56d301fd6412745b6&q=mahalo+stockholm')
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }, []);

  // useEffect(() => {
  //   fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=mahalo%stockholm&key=AIzaSyAzgiwGOf80Q9OEpKb4OdpPKYauGAx1BFs')
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }, []);

  // if (restaurants) {
    return (
      <>
        <h1>App</h1>
        {/* <Gallery salties={restaurants!} /> */}
      </>
    )
  // }
}


export default App
