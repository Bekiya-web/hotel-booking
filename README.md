# Hotel Booking System - Frontend

Complete hotel booking management system with admin panel.

## Project Structure

Everything is in this folder! Complete application structure:

```
frontend/                        # You are here!
├── src/                         # Application source code
│   ├── api/                    # API layer (organized by resource)
│   │   ├── supabase-client.ts  # Supabase client
│   │   ├── rooms.api.ts        # Rooms API
│   │   ├── guests.api.ts       # Guests API
│   │   ├── bookings.api.ts     # Bookings API
│   │   ├── reviews.api.ts      # Reviews API
│   │   ├── dashboard.api.ts    # Dashboard stats
│   │   └── index.ts            # API exports
│   │
│   ├── features/               # Feature-based modules
│   │   ├── rooms/              # Room management
│   │   ├── guests/             # Guest management
│   │   ├── reviews/            # Reviews management
│   │   └── media/              # Media library
│   │
│   ├── pages/                  # Page components
│   │   ├── admin/              # Admin pages
│   │   └── ... (public pages)
│   │
│   ├── components/             # Shared components
│   │   ├── site/               # Site components
│   │   └── ui/                 # UI library
│   │
│   ├── lib/                    # Utilities
│   ├── types/                  # TypeScript types
│   ├── hooks/                  # Custom hooks
│   └── assets/                 # Static assets
│
├── public/                     # Public assets
├── supabase/                   # Database files
│   ├── README.md               # Setup guide
│   ├── supabase-schema.sql     # Database schema
│   └── fix-rls-policies.sql    # RLS fixes
│
├── cloudinary/                 # Image storage
│   └── SETUP.md                # Setup guide
│
├── .env                        # Environment variables
├── package.json                # Dependencies
└── README.md                   # This file
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `.env.example` to `.env` and fill in:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
VITE_CLOUDINARY_UPLOAD_PRESET=hotel_uploads
```

### 3. Setup Database
Follow instructions in `supabase/README.md`:
1. Create Supabase project
2. Run `supabase/supabase-schema.sql`
3. Run `supabase/fix-rls-policies.sql`

### 4. Setup Cloudinary
Follow instructions in `cloudinary/SETUP.md`:
1. Create Cloudinary account
2. Create upload preset named `hotel_uploads` (Unsigned mode)

### 5. Run Development Server
```bash
npm run dev
```

Visit http://localhost:8080

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run tests
```

## Features

### Public Features
- Browse available rooms
- View room details with image galleries
- Make bookings
- Read customer reviews
- Contact form

### Admin Features
- Dashboard with real-time statistics
- Room management (CRUD)
- Booking management
- Guest management
- Review management
- Media library with image uploads
- Revenue tracking

## Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Backend**: Supabase (PostgreSQL + REST API)
- **Storage**: Cloudinary (Image CDN)
- **Routing**: React Router v6

## Code Organization

### API Layer (`src/api/`)
Centralized API functions organized by resource:
- Each file handles one resource (rooms, guests, bookings, etc.)
- Clean separation between API logic and UI components
- Easy to test and maintain

### Features (`src/features/`)
Feature-based organization:
- Each feature contains its own components and logic
- Promotes code reusability
- Better scalability

### Components (`src/components/`)
Shared UI components:
- `site/` - Site-specific components
- `ui/` - UI library components (shadcn/ui)

## File Size Guidelines

Files are kept under 300 lines for better maintainability:
- Large files split into smaller, focused modules
- Clear separation of concerns
- Easier to debug and maintain

## Development Guidelines

1. **Keep files under 300 lines** - Split large files into smaller modules
2. **Use feature-based organization** - Group related code together
3. **Centralize API calls** - All API functions in `src/api/`
4. **Type everything** - Use TypeScript types from `src/types/`
5. **Reuse components** - Check `src/components/` before creating new ones

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
VITE_CLOUDINARY_UPLOAD_PRESET=hotel_uploads
```

## Database Setup

See `supabase/README.md` for detailed instructions.

Quick steps:
1. Create Supabase project
2. Run `supabase/supabase-schema.sql` in SQL Editor
3. Run `supabase/fix-rls-policies.sql` in SQL Editor

## Image Storage Setup

See `cloudinary/SETUP.md` for detailed instructions.

Quick steps:
1. Create Cloudinary account
2. Create upload preset: `hotel_uploads` (Unsigned mode)
3. Add credentials to `.env`

## Troubleshooting

### Module Not Found
- Make sure you're in the `frontend/` directory
- Run `npm install`

### Database Connection Error
- Check Supabase URL and key in `.env`
- Verify database schema is created
- Run RLS policy fixes

### Image Upload Fails
- Check Cloudinary credentials in `.env`
- Verify upload preset exists and is "Unsigned"
- Restart development server

### Build Errors
- Clear cache: `rm -rf node_modules dist .vite`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` folder.

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set environment variables
3. Deploy

Make sure to set all environment variables in your deployment platform.

## Testing

```bash
npm run test        # Run tests once
npm run test:watch  # Run tests in watch mode
```

## Project Status

✅ Complete and ready for production
✅ All features implemented
✅ Database integrated
✅ Image storage configured
✅ Admin panel functional
✅ Responsive design
✅ Type-safe with TypeScript

## Support

- **Database Setup**: See `supabase/README.md`
- **Image Storage**: See `cloudinary/SETUP.md`
- **Main Documentation**: See `../README.md` (root)

## License

MIT
