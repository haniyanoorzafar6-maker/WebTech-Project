namespace BrewPoint.Api.Models;

public class Coffee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string SizeOptions { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Ingredients { get; set; } = string.Empty;
    public int Calories { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsAvailable { get; set; } = true;
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
