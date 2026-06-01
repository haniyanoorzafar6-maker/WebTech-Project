using BrewPoint.Api.Data;
using BrewPoint.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrewPoint.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/users")]
public class UsersController(AppDbContext db) : ControllerBase
{
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAll() => Ok(await db.Users.Include(u => u.Role).Select(u => new UserDto(u.Id, u.FullName, u.Email, u.Phone, u.Role.Name)).ToListAsync());

    [Authorize(Roles = "Admin")]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDto>> Get(int id)
    {
        var user = await db.Users.Include(u => u.Role).SingleOrDefaultAsync(u => u.Id == id);
        return user is null ? NotFound() : Ok(new UserDto(user.Id, user.FullName, user.Email, user.Phone, user.Role.Name));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<UserDto>> Update(int id, UpdateUserDto dto)
    {
        var currentId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
        if (!User.IsInRole("Admin") && currentId != id) return Forbid();
        var user = await db.Users.Include(u => u.Role).SingleOrDefaultAsync(u => u.Id == id);
        if (user is null) return NotFound();
        user.FullName = dto.FullName;
        user.Phone = dto.Phone;
        await db.SaveChangesAsync();
        return Ok(new UserDto(user.Id, user.FullName, user.Email, user.Phone, user.Role.Name));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await db.Users.FindAsync(id);
        if (user is null) return NotFound();
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
