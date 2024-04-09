import { FormEvent } from 'react';
import '../Styles.css'
type Props = {
  func: (event: FormEvent<HTMLFormElement>) => void
}

function SearchArea({func}: Props) {


return (
  <>
    <form onSubmit={func}>
      <fieldset>
        <label>
          <input
            name="restaurantname_input"
            placeholder="Enter name of restaurant"
          />
        </label>
        <label>
          <input
            name="foodtype_input"
            placeholder="Enter type of food"
          />
        </label>
      </fieldset>

      <input
        type="submit"
        value="Add restaurant"
      />
    </form>
  </>
)
}

export default SearchArea
