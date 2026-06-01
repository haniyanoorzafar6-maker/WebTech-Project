# BrewPoint Islamabad Report

## Cover Page
Project: BrewPoint Islamabad  
Course: [Course Name]  
Instructor: [Instructor Name]  
Submission Date: [Date]

## Team Details
- Member 1: [Name / Roll No]
- Member 2: [Name / Roll No]
- Member 3: [Name / Roll No]
- Member 4: [Name / Roll No]

## Introduction
BrewPoint Islamabad is a full-stack coffee pickup ordering platform for four Islamabad locations. It combines a polished animated frontend with a secure ASP.NET Core backend and SQL Server database.

## Problem Statement
Coffee pickup experiences often feel fragmented: customers browse menus in one place, call branches separately, and cannot track preparation status. BrewPoint solves this with one unified order, pickup, and tracking workflow.

## System Architecture
React communicates with ASP.NET Core Web API over REST. The API uses JWT for identity, EF Core for data access, and SQL Server for persistence.

## Frontend Architecture
The frontend is organized into pages, reusable components, hooks, services, types, and styles. React Router handles pages, React Hook Form and Zod validate forms, Axios calls the API, and Framer Motion powers transitions.

## Backend Architecture
Controllers expose REST endpoints for auth, coffees, locations, orders, users, and reviews. DTOs prevent direct entity exposure. Middleware centralizes error responses.

## Database Schema
Core entities include users, roles, coffees, locations, orders, order items, and reviews. Relationships enforce order ownership, pickup branch selection, review authorship, and role-based access.

## API Documentation
Swagger is available at `/swagger` when the backend runs in development mode. Major endpoints include `/api/auth/login`, `/api/coffees`, `/api/locations`, `/api/orders`, `/api/users`, and `/api/reviews`.

## UI Screenshots
- Home page: [Insert screenshot]
- Catalog page: [Insert screenshot]
- Coffee detail page: [Insert screenshot]
- User dashboard: [Insert screenshot]
- Admin panel: [Insert screenshot]

## Deployment Steps
1. Configure SQL Server connection string.
2. Run `dotnet restore` and `dotnet ef database update`.
3. Run the backend with `dotnet run`.
4. Configure frontend `.env`.
5. Run `npm install` and `npm run build`.
6. Deploy frontend static assets and backend API to the chosen hosting provider.

## Conclusion
BrewPoint Islamabad demonstrates a production-minded ordering workflow with authentication, role-based admin operations, seeded data, and a premium animated interface.
