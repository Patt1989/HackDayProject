using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly RestaurantService _service;

        public RestaurantsController(RestaurantService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<Restaurant>> PostRestaurant(DTORequestRestaurant restaurant)
        {
            var result = await _service.PostNewRestaurant(restaurant);
            if (result is null)
            {
                return NotFound();
            }
            return CreatedAtAction("GetRestaurant", new { id = result.Id }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetAll(string foodType = null)
        {
            List<Restaurant> result;
            if (foodType is null)
            {
                result = await _service.GetRestaurants();
            }
            else
            {
                result = await _service.GetRestaurants(foodType);
            }

            if (result is null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
        {
            var result = await _service.GetRestaurantById(id);
            if (result is null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Restaurant>> DeleteRestaurant(int id)
        {
            var result = await _service.DeleteRestaurantById(id);
            if (result is null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpPatch("{id}/favorite")]
        public async Task<ActionResult<Restaurant>> PatchRestaurantFavorite(int id)
        {
            try
            {
                return await _service.PatchFavoriteById(id);
            }
            catch (FileNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }

        //     // PUT: api/CDs/{id}
        //     [HttpPut("{id}")]
        //     public async Task<ActionResult<Restaurant> PutRestaurant(int id, Restaurant restaurant)
        //     {
        //         try
        //         {
        //             return await _service.PutRestaurantById(id, restaurant);
        //         }
        //         catch (FileNotFoundException e)
        //         {
        //             return NotFound(e.Message);
        //         }
        //         catch (ArgumentException e)
        //         {
        //             return BadRequest(e.Message);
        //         }
        //     }
    }
}
