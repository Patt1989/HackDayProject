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
            _context.Database.Migrate();
            _context.Database.EnsureCreated(); // Create the database if not exists

            string[] resto_names = { "Mahalo", "Konditori Lyran", "Kafe Plattan", "Greasy Spoon", "Morfar Ginko", "Falloumi" };
            string[] resto_foodTypes1 = { "Bakery", "Breakfast" };
            string[] resto_foodTypes2 = { "Bakery", "Sandwich" };
            string[] resto_foodTypes3 = { "Bakery" };
            string[] resto_foodTypes4 = { "Breakfast" };
            string[] resto_foodTypes5 = { "Pizza" };
            string[] resto_foodTypes6 = { "Falafel" };
            string[][] resto_foodTypes = { resto_foodTypes1, resto_foodTypes2, resto_foodTypes3, resto_foodTypes4, resto_foodTypes5, resto_foodTypes6 };

            for (var i = 0; i < resto_names.Length; i++)
            {
                var restaurant = new Restaurant
                {
                    Name = resto_names[i],
                    FoodType = resto_foodTypes[i],
                    City = "Stockholm",
                    Country = "Sweden",
                    Favorite = false
                };

                _context.Restaurants.Add(restaurant);
                _context.SaveChanges();
            }

            string[] resto_names_NL = { "Anne&Max", "Het Slachthuis", "Lab071", "Logica" };
            string[] resto_foodTypes_NL1 = { "Bakery", "Breakfast", "Sandwich" };
            string[] resto_foodTypes_NL2 = { "Burgers", "Falafel" };
            string[] resto_foodTypes_NL3 = { "Pizza" };
            string[] resto_foodTypes_NL4 = { "Breakfast", "Sandwich" };
            string[][] resto_foodTypes_NL = { resto_foodTypes_NL1, resto_foodTypes_NL2, resto_foodTypes_NL3, resto_foodTypes_NL4};

            for (var i = 0; i < resto_names_NL.Length; i++)
            {
                var restaurant = new Restaurant
                {
                    Name = resto_names_NL[i],
                    FoodType = resto_foodTypes_NL[i],
                    City = "Leiden",
                    Country = "the Netherlands",
                    Favorite = false
                };

                _context.Restaurants.Add(restaurant);
                _context.SaveChanges();
            }
        }
    }
}