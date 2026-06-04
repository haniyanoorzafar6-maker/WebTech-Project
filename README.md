# BrewPoint Islamabad

Premium full-stack coffee pickup ordering platform for four BrewPoint locations in Islamabad.

## Features
- Animated Angular + TypeScript storefront with standalone components, signals, reactive forms, route guards, and scroll-driven sections.
- Catalog, coffee details, pickup locations, user dashboard, profile, authentication, and admin panel.
- Vanilla JavaScript `Live Cup Builder` that updates a cup preview with DOM event listeners.
- ASP.NET Core Web API with JWT authentication, role authorization, EF Core, SQL Server, DTOs, validation, Swagger, CORS, centralized error handling, migrations-ready configuration, and seed data.
- SQL schema and seed scripts, report, and narrated demo script.

## Tech Stack
- Frontend: Angular 21, TypeScript, standalone components, Angular Router, Signals, Reactive Forms, and HttpClient.
- Backend: ASP.NET Core Web API, C#, Entity Framework Core, SQL Server, JWT Bearer Auth, Swagger/OpenAPI.
- Database: SQL Server.

## Team Members
- Member 1: Name / Roll No
- Member 2: Name / Roll No
- Member 3: Name / Roll No
- Member 4: Name / Roll No

## Folder Structure
```text
BrewPoint-Islamabad/
  frontend/
  backend/
  database/
  report/
  demo/
```

## Frontend Setup
```bash
cd frontend
npm install
npm start
```

Default frontend URL: `http://localhost:4200`

The frontend API URL is configured in `frontend/public/config.js`:
```js
window.BREWPOINT_API_BASE_URL = "http://localhost:5084/api";
```

## Backend Setup
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

Default backend URL: `https://localhost:7084` or `http://localhost:5084`

If SQL Server LocalDB is unavailable on your machine, you can temporarily run the API with an in-memory development database:
```bash
set ConnectionStrings__DefaultConnection=InMemory
dotnet run --urls http://localhost:5084
```

## Database Setup
1. Install SQL Server or SQL Server Express.
2. Update `backend/appsettings.json` connection string.
3. Run EF migrations with `dotnet ef database update`.
4. Optional: run `database/schema.sql` and `database/seed.sql` manually in SQL Server Management Studio.

## Environment Variables
For production, update `frontend/public/config.js` with the deployed backend URL before building.

Backend JWT and database settings are in `backend/appsettings.json`.

## AWS Backend Deployment
Recommended AWS setup:
- Backend API: AWS Elastic Beanstalk, .NET 8 on Amazon Linux 2023.
- Database: Amazon RDS for SQL Server.
- Frontend: Vercel, with `frontend/public/config.js` pointed to the Elastic Beanstalk API URL.

LocalDB cannot be used in production because it only runs on a local Windows machine.

Publish the backend:
```bash
cd backend
dotnet publish -c Release -o publish
```

Zip the contents of `backend/publish`, not the folder itself, then upload the zip to Elastic Beanstalk.

Elastic Beanstalk environment properties:
```env
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=Server=YOUR_RDS_ENDPOINT,1433;Database=BrewPointIslamabadDb;User Id=YOUR_DB_USER;Password=YOUR_DB_PASSWORD;Encrypt=True;TrustServerCertificate=True
Jwt__Secret=replace-with-a-long-production-secret
Jwt__Issuer=BrewPointIslamabad
Jwt__Audience=BrewPointIslamabadClient
Jwt__ExpiresMinutes=240
Cors__AllowedOrigins__0=https://your-vercel-site.vercel.app
```

After the backend is live, update `frontend/public/config.js` and redeploy Vercel:
```js
window.BREWPOINT_API_BASE_URL = "https://your-elastic-beanstalk-url/api";
```

## API Overview
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/coffees`
- `GET /api/coffees/{id}`
- `POST /api/orders`
- `GET /api/orders/my-orders`
- `GET /api/locations`
- `GET /api/reviews/coffee/{coffeeId}`
- Admin: coffee, location, users, order status, and review management endpoints.

## Seed Credentials
Admin:
- Email: `admin@brewpoint.com`
- Password: `Admin@123`

User:
- Email: `user@brewpoint.com`
- Password: `User@123`

## Screenshots
- Home page screenshot placeholder
- Catalog screenshot placeholder
- Order customization screenshot placeholder
- Dashboard screenshot placeholder
- Admin panel screenshot placeholder

## Links
- Live link: TBD
- Video demo link: TBD

## GitHub Commit Guideline
- Use clear imperative commits, for example `feat: add order customization flow`.
- Keep frontend, backend, and database changes grouped when possible.
- Do not commit secrets, local database files, or generated build folders.
