Run the initial migration after restoring packages:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

`Program.cs` also calls `EnsureCreated()` so beginners can run the API immediately against LocalDB for demo use. For production or graded migration review, switch that line to `Migrate()` after generating the migration.
