using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class DTORequestRestaurant
{
    public string Name { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string[] FoodType { get; set; }

}