using System.Security.Claims;
using BrewPoint.Api.Data;
using BrewPoint.Api.DTOs;
using BrewPoint.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrewPoint.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/orders")]
public class OrdersController(AppDbContext db) : ControllerBase
{
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetAll() => Ok(await Query().OrderByDescending(o => o.CreatedAt).Select(o => ToDto(o)).ToListAsync());

    [HttpGet("my-orders")]
    public async Task<ActionResult<List<OrderDto>>> Mine()
    {
        var userId = CurrentUserId();
        return Ok(await Query().Where(o => o.UserId == userId).OrderByDescending(o => o.CreatedAt).Select(o => ToDto(o)).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> Get(int id)
    {
        var order = await Query().SingleOrDefaultAsync(o => o.Id == id);
        if (order is null) return NotFound();
        if (!User.IsInRole("Admin") && order.UserId != CurrentUserId()) return Forbid();
        return Ok(ToDto(order));
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> Create(CreateOrderDto dto)
    {
        if (dto.Items.Count == 0) return BadRequest(new { message = "Order must include at least one item." });
        var coffees = await db.Coffees.Where(c => dto.Items.Select(i => i.CoffeeId).Contains(c.Id)).ToDictionaryAsync(c => c.Id);
        if (coffees.Count != dto.Items.Select(i => i.CoffeeId).Distinct().Count()) return BadRequest(new { message = "Invalid coffee selection." });
        var order = new Order { UserId = CurrentUserId(), LocationId = dto.LocationId, PickupTime = dto.PickupTime, OrderNumber = $"BP-{DateTime.UtcNow:HHmmss}", Status = "Pending" };
        foreach (var item in dto.Items)
        {
            var coffee = coffees[item.CoffeeId];
            order.Items.Add(new OrderItem { CoffeeId = item.CoffeeId, Quantity = item.Quantity, Size = item.Size, MilkType = item.MilkType, SugarLevel = item.SugarLevel, Toppings = item.Toppings, UnitPrice = coffee.Price });
            order.TotalAmount += coffee.Price * item.Quantity;
        }
        db.Orders.Add(order);
        await db.SaveChangesAsync();
        var loaded = await Query().SingleAsync(o => o.Id == order.Id);
        return CreatedAtAction(nameof(Get), new { id = order.Id }, ToDto(loaded));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/status")]
    public async Task<ActionResult<OrderDto>> UpdateStatus(int id, UpdateOrderStatusDto dto)
    {
        var allowed = new[] { "Pending", "Preparing", "Ready for Pickup", "Completed", "Cancelled" };
        if (!allowed.Contains(dto.Status)) return BadRequest(new { message = "Invalid order status." });
        var order = await db.Orders.FindAsync(id);
        if (order is null) return NotFound();
        order.Status = dto.Status;
        await db.SaveChangesAsync();
        return Ok(ToDto(await Query().SingleAsync(o => o.Id == id)));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var order = await db.Orders.FindAsync(id);
        if (order is null) return NotFound();
        if (!User.IsInRole("Admin") && order.UserId != CurrentUserId()) return Forbid();
        db.Orders.Remove(order);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private IQueryable<Order> Query() => db.Orders.Include(o => o.User).Include(o => o.Location).Include(o => o.Items).ThenInclude(i => i.Coffee);
    private int CurrentUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    private static OrderDto ToDto(Order o) => new(o.Id, o.OrderNumber, o.Status, o.TotalAmount, o.PickupTime, o.CreatedAt, o.Location.Name, o.User.FullName, o.Items.Select(i => new OrderItemDto(i.Id, i.CoffeeId, i.Coffee.Name, i.Quantity, i.Size, i.MilkType, i.SugarLevel, i.Toppings, i.UnitPrice)).ToList());
}
