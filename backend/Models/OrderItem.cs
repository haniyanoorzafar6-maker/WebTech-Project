namespace BrewPoint.Api.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public int CoffeeId { get; set; }
    public Coffee Coffee { get; set; } = null!;
    public int Quantity { get; set; }
    public string Size { get; set; } = string.Empty;
    public string MilkType { get; set; } = string.Empty;
    public string SugarLevel { get; set; } = string.Empty;
    public string Toppings { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
}
