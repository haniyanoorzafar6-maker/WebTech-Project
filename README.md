# BrewPoint Islamabad

Premium full-stack coffee pickup ordering platform for four BrewPoint locations in Islamabad.

## Features
- Animated React + TypeScript storefront with scroll-driven sections, Framer Motion, Tailwind CSS, shadcn-style UI components, and Lucide icons.
- Catalog, coffee details, pickup locations, user dashboard, profile, authentication, and admin panel.
- Vanilla JavaScript `Live Cup Builder` that updates a cup preview with DOM event listeners.
- ASP.NET Core Web API with JWT authentication, role authorization, EF Core, SQL Server, DTOs, validation, Swagger, CORS, centralized error handling, migrations-ready configuration, and seed data.
- SQL schema and seed scripts, report, and narrated demo script.

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui-style components, Lucide React, Framer Motion, React Router, React Hook Form, Zod, Axios.
- Backend: ASP.NET Core Web API, C#, Entity Framework Core, SQL Server, JWT Bearer Auth, Swagger/OpenAPI.
- Database: SQL Server.

## Team Members
- Member 1: Haniya Noor / 2502087
- Member 2: Sana Aziz / 2502083
  

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
cp .env.example .env
npm install
npm run dev
```

Default frontend URL: `http://localhost:5173`

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
Frontend `.env`:
```env
VITE_API_BASE_URL=http://localhost:5084/api
```

Backend JWT and database settings are in `backend/appsettings.json`.

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
