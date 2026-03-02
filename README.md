# MYtinerary – Progressive travel planner

MYtinerary is a MERN PWA for travelers who want curated city itineraries they can customize, favorite, and share. It’s built with a classic class-based React frontend, Express/Mongo backend, JWT authentication, and optional Google OAuth. The whole thing runs as a single Node deployment where the API and client bundle live together.

---

## Why it exists

- Showcase end-to-end React + Redux + Node patterns (pre-hooks era still relevant for legacy teams).
- Demonstrate real-world concerns: authentication, favorites, file uploads, data seeding, and responsive UI.
- Act as a playground for experimenting with PWA features (service workers, offline assets) and Google login flows.

---

## Feature highlights

- **Cities & itineraries:** Browse curated itineraries by city, drill into activities, see pricing/duration/hashtags, and mark favorites.
- **Auth flows:** Traditional email/password (JWT) plus Google OAuth (via Passport). Token endpoints return 24h JWTs.
- **Favorites dashboard:** `/favorite` route fetches itineraries referenced on the user document.
- **Image upload:** Activities support photo uploads via Multer + GridFS storage.
- **PWA touches:** Manifest + service worker give installability and offline caching for the client bundle.

Screenshots (from `/client/public` assets):
![Home](https://user-images.githubusercontent.com/45729368/116073757-22d84680-a691-11eb-8ab3-3760f2a729f8.png)
![Cities](https://user-images.githubusercontent.com/45729368/116073839-3e435180-a691-11eb-82ae-03c361c19e3e.png)
![Itineraries](https://user-images.githubusercontent.com/45729368/116073953-5b782000-a691-11eb-828f-12888e5c42c1.png)
![Menu](https://user-images.githubusercontent.com/45729368/116074010-6e8af000-a691-11eb-8e3a-e3bfc7fb584c.png)
![Login](https://user-images.githubusercontent.com/45729368/116074175-a85bf680-a691-11eb-885c-845b37590207.png)
![Favorites](https://user-images.githubusercontent.com/45729368/116074303-d0e3f080-a691-11eb-8e44-b0956295a6d4.png)

---

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | React (class components), Redux, React Router, Styled components, CRA tooling |
| Backend | Express.js, Mongoose, Passport (JWT + Google), Multer/GridFS uploads |
| Database | MongoDB (local URI or Atlas), GridFS bucket for media |
| Auth | JWT (local) + Google OAuth (passport-google-oauth20 + passport-google-token) |

---

## Setup

```bash
# install server deps
npm install

# install client deps
cd client && npm install
# or run from root
npm run client-install

# environment
cp config/keys_dev.js config/keys.js   # adjust credentials
# keys file stores mongo URI, JWT secret, Google keys, etc.

# seed data (optional)
# e.g., use data.JSON / itineraries.json + POST to /cities, /itineraries for sample content

# run both client + server
npm run dev
```

- API: `http://localhost:5000`
- Client: `http://localhost:3000`

Production build: `npm run build` (backend) + `cd client && npm run build`. Express serves `/client/build` when `NODE_ENV=production`.

---

## API overview

### Cities (`/cities`)
- `GET /` → list of cities sorted alphabetically
- `GET /:city` → single city data (name capitalized)
- `POST /` → create
- `PUT /:id` → update
- `DELETE /:id` → delete

### Itineraries (`/itineraries`)
- `GET /` → all itineraries
- `GET /:city` → itineraries for a city
- `GET /activity/:activityId` → single itinerary via `_id`
- `POST /` → create itinerary (includes activities array)
- `PUT /:id` → update
- `DELETE /:id` → delete
- `PUT /itineraries/favorite` → push itinerary IDs onto a user’s favorites and return the hydrated docs
- `POST /uploads` → upload activity image via Multer/GridFS (10MB limit)

### Users/Auth
- `/users` → CRUD for user profiles
- `/auth/google` + `/auth/google/redirect` → Passport OAuth dance
- `/auth/googlelogin` → token exchange returning JWT + profile data
- `/favorite` → fetch user favorites
- `/log` → email/password login endpoints
- `/profile` → profile update routes

---

## Frontend structure

```
client/src
├── component
│   ├── CitiesPage, ItinerariesPage, FavoritesPage
│   ├── Menu, Header, Footer, Loader
│   └── Auth components (Login, SignUp)
├── store (Redux store config)
└── App.js (routing + layout)
```

- Redux actions fetch `/cities` and `/itineraries` and populate the store.
- Favorites state syncs with the server via `/favorite` endpoints.
- Service worker (`serviceWorker.js`) gives offline caching for static assets.

---

## Running in production mode

```bash
npm run build        # transpiles server into /dist (if configured)
cd client && npm run build
NODE_ENV=production node server.js
```

Express will serve the built React files and keep the API routes under `/cities`, `/itineraries`, etc.

---

## Future improvements

- [ ] Finish Google login in production (currently works locally).
- [ ] Add itinerary collaboration/comments with sockets.
- [ ] Improve Lighthouse PWA score (push notifications, better offline fallbacks).
- [ ] Containerize with Docker Compose (API + Mongo + client).

---

✈️ Built by [Arya Ludianto](mailto:arya.ludianto@gmail.com). Happy to walk through the codebase or discuss how I’d evolve it further.
