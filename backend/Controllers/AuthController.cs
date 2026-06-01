using System.Security.Claims;
using BrewPoint.Api.Data;
using BrewPoint.Api.DTOs;
using BrewPoint.Api.Models;
using BrewPoint.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrewPoint.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext db, TokenService tokens) : ControllerBase
{
    [HttpPost("signup")]
    public async Task<ActionResult<AuthResponseDto>> Signup(SignupDto dto)
    {
        if (await db.Users.AnyAsync(u => u.Email == dto.Email)) return BadRequest(new { message = "Email already exists." });
        var role = await db.Roles.SingleAsync(r => r.Name == "User");
        var user = new User { FullName = dto.FullName, Email = dto.Email, Phone = dto.Phone, PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password), RoleId = role.Id, Role = role };
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return Created("/api/auth/me", tokens.CreateAuthResponse(user));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var user = await db.Users.Include(u => u.Role).SingleOrDefaultAsync(u => u.Email == dto.Email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)) return Unauthorized(new { message = "Invalid credentials." });
        return Ok(tokens.CreateAuthResponse(user));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> Me()
    {
        var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await db.Users.Include(u => u.Role).SingleOrDefaultAsync(u => u.Id == id);
        return user is null ? NotFound() : Ok(new UserDto(user.Id, user.FullName, user.Email, user.Phone, user.Role.Name));
    }
}
