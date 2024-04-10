import { FormEvent } from 'react';
import '../Styles.css'
import { Restaurant } from '../App';

type Props = {
    restaurants: Restaurant[],
    func: (event: FormEvent<HTMLFormElement>) => void
}

function FilterArea({ restaurants, func }: Props) {

    const foodTypes: string[] = [];
    for (let restaurant of restaurants) {
        for (let aType of restaurant.foodType) {
            if (!foodTypes.find(t => t === aType))
                foodTypes.push(aType);
        }
    }

    const countries: string[] = [];
    for (let restaurant of restaurants) {
        if (!countries.find(t => t === restaurant.country))
            countries.push(restaurant.country);
    }

    const locations: string[] = [];
    for (let country of countries) {
        for (let restaurant of restaurants.filter(r => r.country == country)) {
            if (!locations.find(t => t === restaurant.city + ", " + country)) {
                locations.push(restaurant.city + ", " + country);
            }
        }
    }

    return (
        <>
            <div>
                <form id="form_filterRestaurant" onSubmit={func}>
                    <label>Location</label>
                    <select name="location" defaultValue="Please select location" >
                        {locations.map(location => {
                            return (
                                <option value={location}>{location}</option>
                            )
                        })}
                    </select>

                    <label>Type of food</label>
                    <select name="foodtype" defaultValue="Please select type of food" >
                        <option value="All">All</option>
                        {foodTypes.map(aType => {
                            return (
                                <option value={aType}>{aType}</option>
                            )
                        })}
                    </select>

                    <label>Favorites?</label>
                    <select name="favorite" defaultValue="Please select type of food" >
                        <option value="All">All</option>
                        <option value="1">Only favorites</option>
                        <option value="0">Only non-favorites</option>
                    </select>

                    <input className="input-button" type="submit" value="Filter restaurants" />
                    <button>Choose for me!</button>
                </form>
            </div>
        </>
    )
}

export default FilterArea
