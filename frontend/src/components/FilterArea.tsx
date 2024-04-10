import { FormEvent } from 'react';
import { Restaurant } from '../App';
import '../Styles.css'

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
            <div className='filter-area'>
                <form id="form_filterRestaurant" onSubmit={func}>
                    <label className='filter-label'>Location</label>
                    <select className="input-field" name="location" defaultValue="Please select location" >
                        {locations.map(location => {
                            return (
                                <option value={location}>{location}</option>
                            )
                        })}
                    </select>

                    <label className='filter-label'>Type of food</label>
                    <select className="input-field" name="foodtype" defaultValue="Please select type of food" >
                        <option value="All">All</option>
                        {foodTypes.map(aType => {
                            return (
                                <option value={aType}>{aType}</option>
                            )
                        })}
                    </select>

                    <label className='filter-label'>Favorites?</label>
                    <select className="input-field" name="favorite" defaultValue="Please select type of food" >
                        <option value="All">All</option>
                        <option value="1">Only favorites</option>
                        <option value="0">Only non-favorites</option>
                    </select>

                    <input className="input-button" type="submit" name="submitFilter" value="Filter restaurants" />
                    <button type="submit" name="submitRandom" >Choose for me!</button>
                </form>
            </div>
        </>
    )
}





export default FilterArea
