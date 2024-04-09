using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Restaurant
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string FoodType { get; set; }

}