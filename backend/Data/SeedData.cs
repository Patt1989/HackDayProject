using Microsoft.EntityFrameworkCore;
using backend.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var _context = new RestaurantContext(
                   serviceProvider.GetRequiredService<DbContextOptions<RestaurantContext>>()))
        {
            _context.Database.EnsureDeleted(); // Clear the database
            _context.Database.EnsureCreated(); // Create the database if not exists

            string[] resto_names = { "Mahalo", "Konditori Lyran", "Kafe Plattan", "Greasy Spoon", "Morfar Ginko", "Falloumi" };
            string[] resto_foodTypes = { "Breakfast", "Fika", "Fika", "Breakfast", "Pizza", "Falafel" };

            for (var i = 0; i < resto_names.Length; i++)
            {
                var restaurant = new Restaurant
                {
                    Name = resto_names[i],
                    FoodType = resto_foodTypes[i]
                };

                _context.Restaurants.Add(restaurant);
                _context.SaveChanges();
            }
        }
    }
}