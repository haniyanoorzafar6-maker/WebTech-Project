using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BrewPoint.Api.Migrations;

public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable("Roles", table => new
        {
            Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
            Name = table.Column<string>(nullable: false)
        }, constraints: table => table.PrimaryKey("PK_Roles", x => x.Id));

        migrationBuilder.CreateTable("Coffees", table => new
        {
            Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
            Name = table.Column<string>(nullable: false),
            Description = table.Column<string>(nullable: false),
            Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
            Category = table.Column<string>(nullable: false),
            SizeOptions = table.Column<string>(nullable: false),
            ImageUrl = table.Column<string>(nullable: false),
            Ingredients = table.Column<string>(nullable: false),
            Calories = table.Column<int>(nullable: false),
            IsFeatured = table.Column<bool>(nullable: false),
            IsAvailable = table.Column<bool>(nullable: false)
        }, constraints: table => table.PrimaryKey("PK_Coffees", x => x.Id));

        migrationBuilder.CreateTable("Locations", table => new
        {
            Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
            Name = table.Column<string>(nullable: false),
            Address = table.Column<string>(nullable: false),
            Phone = table.Column<string>(nullable: false),
            OpeningHours = table.Column<string>(nullable: false),
            Latitude = table.Column<decimal>(type: "decimal(9,6)", nullable: false),
            Longitude = table.Column<decimal>(type: "decimal(9,6)", nullable: false)
        }, constraints: table => table.PrimaryKey("PK_Locations", x => x.Id));

        migrationBuilder.CreateTable("Users", table => new
        {
            Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
            FullName = table.Column<string>(nullable: false),
            Email = table.Column<string>(nullable: false),
            PasswordHash = table.Column<string>(nullable: false),
            Phone = table.Column<string>(nullable: true),
            RoleId = table.Column<int>(nullable: false)
        }, constraints: table =>
        {
            table.PrimaryKey("PK_Users", x => x.Id);
            table.ForeignKey("FK_Users_Roles_RoleId", x => x.RoleId, "Roles", "Id", onDelete: ReferentialAction.Cascade);
        });

        migrationBuilder.CreateTable("Orders", table => new
        {
            Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
            OrderNumber = table.Column<string>(nullable: false),
            UserId = table.Column<int>(nullable: false),
            LocationId = table.Column<int>(nullable: false),
            Status = table.Column<string>(nullable: false),
            TotalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
            PickupTime = table.Column<DateTime>(nullable: false),
            CreatedAt = table.Column<DateTime>(nullable: false)
        }, constraints: table =>
        {
            table.PrimaryKey("PK_Orders", x => x.Id);
            table.ForeignKey("FK_Orders_Users_UserId", x => x.UserId, "Users", "Id", onDelete: ReferentialAction.Cascade);
            table.ForeignKey("FK_Orders_Locations_LocationId", x => x.LocationId, "Locations", "Id", onDelete: ReferentialAction.Cascade);
        });

        migrationBuilder.CreateTable("Reviews", table => new
        {
            Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
            UserId = table.Column<int>(nullable: false),
            CoffeeId = table.Column<int>(nullable: false),
            Rating = table.Column<int>(nullable: false),
            Comment = table.Column<string>(nullable: false),
            CreatedAt = table.Column<DateTime>(nullable: false)
        }, constraints: table =>
        {
            table.PrimaryKey("PK_Reviews", x => x.Id);
            table.ForeignKey("FK_Reviews_Users_UserId", x => x.UserId, "Users", "Id", onDelete: ReferentialAction.Cascade);
            table.ForeignKey("FK_Reviews_Coffees_CoffeeId", x => x.CoffeeId, "Coffees", "Id", onDelete: ReferentialAction.Cascade);
        });

        migrationBuilder.CreateTable("OrderItems", table => new
        {
            Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
            OrderId = table.Column<int>(nullable: false),
            CoffeeId = table.Column<int>(nullable: false),
            Quantity = table.Column<int>(nullable: false),
            Size = table.Column<string>(nullable: false),
            MilkType = table.Column<string>(nullable: false),
            SugarLevel = table.Column<string>(nullable: false),
            Toppings = table.Column<string>(nullable: false),
            UnitPrice = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
        }, constraints: table =>
        {
            table.PrimaryKey("PK_OrderItems", x => x.Id);
            table.ForeignKey("FK_OrderItems_Orders_OrderId", x => x.OrderId, "Orders", "Id", onDelete: ReferentialAction.Cascade);
            table.ForeignKey("FK_OrderItems_Coffees_CoffeeId", x => x.CoffeeId, "Coffees", "Id", onDelete: ReferentialAction.Cascade);
        });

        migrationBuilder.CreateIndex("IX_Roles_Name", "Roles", "Name", unique: true);
        migrationBuilder.CreateIndex("IX_Users_Email", "Users", "Email", unique: true);
        migrationBuilder.CreateIndex("IX_Users_RoleId", "Users", "RoleId");
        migrationBuilder.CreateIndex("IX_Orders_UserId", "Orders", "UserId");
        migrationBuilder.CreateIndex("IX_Orders_LocationId", "Orders", "LocationId");
        migrationBuilder.CreateIndex("IX_OrderItems_OrderId", "OrderItems", "OrderId");
        migrationBuilder.CreateIndex("IX_OrderItems_CoffeeId", "OrderItems", "CoffeeId");
        migrationBuilder.CreateIndex("IX_Reviews_UserId", "Reviews", "UserId");
        migrationBuilder.CreateIndex("IX_Reviews_CoffeeId", "Reviews", "CoffeeId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable("OrderItems");
        migrationBuilder.DropTable("Reviews");
        migrationBuilder.DropTable("Orders");
        migrationBuilder.DropTable("Coffees");
        migrationBuilder.DropTable("Users");
        migrationBuilder.DropTable("Locations");
        migrationBuilder.DropTable("Roles");
    }
}
