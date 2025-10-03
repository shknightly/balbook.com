# AGENTS.md

## Project Overview
BalBook is a private social media platform exclusively for Bangladeshi users, featuring full Bangla language support, culturally relevant features, and responsive design optimized for Bangladesh's internet infrastructure.

## Setup Commands
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type checking
pnpm type-check

# Lint code
pnpm lint

# Format code
pnpm format
```

## Code Style
- TypeScript strict mode enabled
- Single quotes, no semicolons
- Use functional patterns where possible
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Immutable data patterns with spread operators
- Async/await over promise chains

## Tech Stack
- **Frontend**: Next.js 14+ (App Router), React 18+
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom Bangla typography
- **State Management**: Zustand or React Context
- **Authentication**: NextAuth.js with Bangladesh phone verification
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: AWS S3 or local CDN for images/videos
- **Real-time**: Socket.io or Pusher for chat/notifications
- **Testing**: Vitest + React Testing Library

## Bangla Language Support

### Font Configuration
```typescript
// app/layout.tsx
import { Noto_Sans_Bengali, Hind_Siliguri, Tiro_Bangla } from 'next/font/google'

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla-sans',
  display: 'swap'
})

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla-display',
  display: 'swap'
})
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'bangla-sans': ['var(--font-bangla-sans)'],
        'bangla-display': ['var(--font-bangla-display)'],
      },
      fontSize: {
        'bangla-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'bangla-base': ['1.0625rem', { lineHeight: '1.7' }],
        'bangla-lg': ['1.1875rem', { lineHeight: '1.75' }],
      }
    }
  }
}
```

### Language Utils
```typescript
// lib/i18n.ts
export const bn = {
  // Navigation
  home: 'হোম',
  profile: 'প্রোফাইল',
  friends: 'বন্ধুরা',
  messages: 'বার্তা',
  notifications: 'বিজ্ঞপ্তি',
  settings: 'সেটিংস',
  
  // Actions
  post: 'পোস্ট করুন',
  like: 'লাইক',
  comment: 'মন্তব্য',
  share: 'শেয়ার',
  
  // Auth
  login: 'লগইন',
  signup: 'সাইন আপ',
  phoneNumber: 'ফোন নম্বর',
  password: 'পাসওয়ার্ড',
}
```

## Architecture Guidelines

### Project Structure
```
balbook/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/
│   │   ├── home/
│   │   ├── profile/
│   │   ├── friends/
│   │   ├── messages/
│   │   └── notifications/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── ui/          # Reusable UI components
│   ├── feed/        # Feed-related components
│   ├── post/        # Post components
│   └── chat/        # Chat components
├── lib/
│   ├── auth.ts      # Authentication logic
│   ├── db.ts        # Database client
│   ├── i18n.ts      # Translations
│   └── utils.ts     # Utility functions
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
├── prisma/
│   └── schema.prisma
└── public/
    └── fonts/       # Local Bangla fonts (fallback)
```

### Component Patterns
```typescript
// Functional component with TypeScript
type PostCardProps = {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string, text: string) => void
}

export const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false)
  
  return (
    <article className="rounded-lg bg-white p-4 shadow-sm">
      {/* Component content */}
    </article>
  )
}
```

## Responsive Design Requirements

### Mobile-First Breakpoints
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '375px',   // Small phones
      'sm': '640px',   // Large phones
      'md': '768px',   // Tablets
      'lg': '1024px',  // Laptops
      'xl': '1280px',  // Desktops
      '2xl': '1536px', // Large desktops
    }
  }
}
```

### Performance Optimization
- Lazy load images with Next.js Image component
- Implement infinite scroll for feeds
- Use React.memo for expensive components
- Debounce search inputs
- Optimize for 2G/3G networks (common in Bangladesh)
- Compress images before upload
- Use WebP format with fallbacks

### Mobile Considerations
```typescript
// Use touch-friendly sizes
const TOUCH_TARGET_SIZE = 44 // minimum 44px for buttons
const MOBILE_PADDING = 16     // comfortable mobile padding

// Detect mobile viewport
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}
```

## Bangladesh-Specific Features

### Phone Authentication
```typescript
// Use +880 country code validation
export const validateBDPhone = (phone: string): boolean => {
  const bdPhoneRegex = /^(\+880|880)?1[3-9]\d{8}$/
  return bdPhoneRegex.test(phone.replace(/\s/g, ''))
}

// Format: +880 1XXX-XXXXXX
export const formatBDPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(880)?1(\d{3})(\d{6})$/)
  if (match) {
    return `+880 1${match[2]}-${match[3]}`
  }
  return phone
}
```

### Location Features
```typescript
// Bangladesh divisions for location picker
export const BD_DIVISIONS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 
  'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'
] as const

// Time zone: Asia/Dhaka (UTC+6)
export const BD_TIMEZONE = 'Asia/Dhaka'
```

### Cultural Considerations
- Right-to-left aware for Bangla text
- Support for Bengali numerals (০১২৩৪৫৬৭৮৯)
- Local date formats (DD/MM/YYYY)
- Bangladesh holidays integration
- Prayer time notifications (optional)

## Privacy & Security

### Data Privacy
```typescript
// Implement strict privacy controls
type PrivacyLevel = 'public' | 'friends' | 'private'

interface PrivacySettings {
  posts: PrivacyLevel
  profile: PrivacyLevel
  friendList: PrivacyLevel
  phoneNumber: PrivacyLevel
}

// Data stays in Bangladesh (consider local hosting)
// Implement GDPR-like privacy controls
// Phone number verification required
// No data sharing with third parties
```

### Content Moderation
```typescript
// Implement content filtering for:
// - Inappropriate content
// - Spam detection
// - Hate speech prevention
// - Fake news flagging (Bangladesh context)
```

## Testing Guidelines

### Unit Tests
```typescript
// components/__tests__/PostCard.test.tsx
import { render, screen } from '@testing-library/react'
import { PostCard } from '../PostCard'

describe('PostCard', () => {
  it('renders Bangla text correctly', () => {
    const post = { text: 'হ্যালো বিশ্ব', author: 'রহিম' }
    render(<PostCard post={post} />)
    expect(screen.getByText('হ্যালো বিশ্ব')).toBeInTheDocument()
  })
})
```

### E2E Tests
- Test complete user flows in Bangla
- Test responsive behavior on mobile
- Test with slow network conditions
- Test offline functionality

## Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90
- Core Web Vitals: All green
- Support for 3G networks (common in Bangladesh)

## Deployment
```bash
# Build and deploy
pnpm build
pnpm start

# Environment variables required:
# DATABASE_URL - PostgreSQL connection
# NEXTAUTH_SECRET - Auth secret
# NEXTAUTH_URL - App URL
# SMS_API_KEY - Bangladesh SMS provider
# AWS_S3_BUCKET - File storage
```

## Git Workflow
```bash
# Branch naming
feature/bangla-typography
fix/mobile-responsive-nav
hotfix/phone-validation

# Commit messages in English
git commit -m "feat: add Bangla font loading"
git commit -m "fix: mobile navigation overflow"
```

## Contributing Guidelines
1. Write all user-facing text in Bangla
2. Test on mobile devices (primary platform)
3. Ensure Bangla fonts load properly
4. Follow accessibility guidelines
5. Test with slow network speeds
6. Keep bundle size minimal
7. Document all Bangladesh-specific features

## Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Bangla Typography Guide](https://fonts.google.com/?subset=bengali)
- [Tailwind CSS](https://tailwindcss.com)
- [Bangladesh Phone Format](https://en.wikipedia.org/wiki/Telephone_numbers_in_Bangladesh)
- [Prisma Docs](https://www.prisma.io/docs)

## Support
For questions or issues, contact the development team or create an issue on GitHub.

---

**মনে রাখবেন**: BalBook বাংলাদেশের জন্য বাংলাদেশীদের দ্বারা তৈরি। প্রতিটি ফিচার আমাদের সংস্কৃতি এবং প্রয়োজনকে মাথায় রেখে ডিজাইন করা হয়েছে।
