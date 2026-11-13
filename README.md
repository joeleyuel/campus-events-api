
# Campus Events API

A RESTful API built with NestJS and TypeScript for managing campus events and their sessions.

## Technologies
- NestJS
- TypeScript
- Node.js
- class-validator
- class-transformer

## Features
- Retrieve all campus events
- Retrieve upcoming events
- Retrieve individual events
- Retrieve sessions belonging to events
- Create new events
- Filter events by category, location and publication status
- Sort events by title or event date
- Paginate event results
- Validate incoming request data
- Handle missing events and sessions with 404 responses

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project:

```bash
cd campus-events-api
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run start:dev
```

The API runs at:

http://localhost:3000/api

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/events | Get all events |
| GET | /api/events/upcoming | Get upcoming events |
| GET | /api/events/:id | Get one event |
| GET | /api/events/:id/sessions | Get event sessions |
| GET | /api/events/:id/sessions/:sessionId | Get one session |
| POST | /api/events | Create an event |

## Query Parameters

- category
- location
- isPublished
- sortBy
- order
- page
- limit

Example:

/api/events?category=technology&page=1&limit=3

## Storage

This project uses in-memory arrays for storing events and sessions.
Data resets when the application restarts.

## Author

Eyuel Bilhatu
