import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Favorites from "./pages/Favorites"
import RandomPicker from "./pages/RandomPicker"
import './Styles.css'
import { FormEvent, useEffect, useState } from "react";
import Gallery from "./components/Gallery";

export type Restaurant = {
  id: number;
  name: string;
  city: string,
  country: string,
  foodType: string[];
  favorite: number;
}

function App() {

  const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>();

  useEffect(() => {
    fetch('https://localhost:7175/api/Restaurants')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRestaurants(data);
        setFilteredRestaurants(data);
      });
  }, []);

  async function addRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const inputName = formData.get('restaurantname_input') as string
    const inputCity = formData.get('city_input') as string
    const inputCountry = formData.get('country_input') as string
    const inputFoodtype = formData.get('foodtype_input') as string
    const inputFoodtype_array = inputFoodtype.split(',').map(s => s.trim()) as string[];

    if (inputName && inputCity && inputCountry && inputFoodtype) {
      document.getElementsByClassName("error-message")[0].innerHTML = ""

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputName, city: inputCity, country: inputCountry, foodType: inputFoodtype_array })
      };
      await fetch('https://localhost:7175/api/Restaurants', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRestaurants([...restaurants!, data])
        });

      var formElement: HTMLFormElement = document.getElementById('form_addRestaurant') as HTMLFormElement;
      formElement!.reset();
    }
    else {
      document.getElementsByClassName("error-message")[0].innerHTML = "Please complete the entire form"
    }
  }

  async function deleteRestaurant(id: string) {
    var intId: number = +id;
    await fetch(`https://localhost:7175/api/Restaurants/${id}`, { method: 'DELETE' })
      .then(() => setRestaurants((oldRestaurants) => oldRestaurants?.filter(resto => resto.id != intId)));
    setFilteredRestaurants((oldRestaurants) => oldRestaurants?.filter(resto => resto.id != intId))
  }

  async function changeFavoriteStatus(id: string) {
    await fetch(`https://localhost:7175/api/Restaurants/${id}/favorite`, { method: 'PATCH' })
    .then(response => response.json())
    .then(data => {
      var newRestaurants = [...restaurants!];
      var index = newRestaurants?.findIndex(r => r.id == +id)
      newRestaurants[index] = data;
      setRestaurants(newRestaurants)

      var newFilteredRestaurants = [...filteredRestaurants!];
      var index = newFilteredRestaurants?.findIndex(r => r.id == +id)
      newFilteredRestaurants[index] = data;
      setFilteredRestaurants(newFilteredRestaurants)
    });
  }

  async function filterRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const inputLocation = formData.get('location') as string
    const inputFoodtype = formData.get('foodtype') as string
    const inputFavorite = formData.get('favorite') as string

    var selectedRestaurants = restaurants!.filter(r => r.foodType.find(t => t == inputFoodtype));
    setFilteredRestaurants(selectedRestaurants);
    //   var formElement: HTMLFormElement = document.getElementById('form_addRestaurant') as HTMLFormElement;
    //   formElement!.reset();
    // }
    // else {
    //   document.getElementsByClassName("error-message")[0].innerHTML = "Please complete the entire form"
    // }
  }


  if (restaurants && filteredRestaurants) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home restaurants={restaurants} funcAddRestaurant={addRestaurant} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} />} />
              <Route path="favorites" element={<Favorites restaurants={restaurants} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} />} />
              <Route path="edit" element={<Edit />} />
              <Route path="randompicker" element={<RandomPicker restaurants={restaurants} filteredRestaurants={filteredRestaurants} funcFilter={filterRestaurant} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} />} />
              <Route path="*" element={<Home restaurants={restaurants} funcAddRestaurant={addRestaurant} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App

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
