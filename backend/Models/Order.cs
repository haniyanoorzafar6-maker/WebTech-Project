namespace BrewPoint.Api.Models;

public class Order
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int LocationId { get; set; }
    public Location Location { get; set; } = null!;
    public string Status { get; set; } = "Pending";
    public decimal TotalAmount { get; set; }
    public DateTime PickupTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
