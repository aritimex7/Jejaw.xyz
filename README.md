# 🏠 Personal Dashboard - AI-Powered Life Management

A comprehensive personal dashboard application with AI-powered financial tracking, task management, and smart insights. Built with Next.js 15, TypeScript, and modern web technologies.

## ✨ Features

### 🤖 AI-Powered Financial Tracker
- **Natural Language Input**: Add transactions using everyday language (e.g., "bought coffee 25k")
- **Smart Categorization**: AI automatically categorizes transactions
- **Budget Monitoring**: Real-time budget tracking with intelligent alerts
- **Spending Insights**: AI-powered analysis of spending patterns

### 📋 Task Management System
- **Smart Task Organization**: AI-powered task prioritization
- **Deadline Tracking**: Never miss important deadlines
- **Progress Monitoring**: Visual progress tracking for all tasks
- **Quick Actions**: Fast task creation and management

### 📅 Calendar & Scheduling
- **Meeting Management**: Schedule and track meetings
- **Smart Reminders**: AI-powered reminder system
- **Event Categorization**: Different types of events (meetings, calls, appointments)
- **Calendar Integration**: Beautiful calendar interface with event details

### 🎯 Budget Management
- **Category Budgets**: Set budgets for different spending categories
- **Real-time Tracking**: Monitor spending against budget limits
- **Alert System**: Get notified when approaching budget limits
- **Visual Progress**: Progress bars and status indicators

### 🤖 AI Personal Assistant
- **Natural Language Chat**: Interact with AI using conversational language
- **Context-Aware Responses**: Personalized advice based on your data
- **Financial Insights**: Get smart financial recommendations
- **Productivity Tips**: AI-powered suggestions for better organization

### 🔔 Smart Notifications
- **Budget Alerts**: Get notified about budget status
- **Task Reminders**: Never miss important deadlines
- **Meeting Notifications**: Stay on top of your schedule
- **AI Insights**: Receive smart recommendations and insights

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Modern styling framework
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend & Database
- **Prisma ORM** - Type-safe database operations
- **SQLite** - Local database for development
- **Next.js API Routes** - Server-side functionality
- **ZAI SDK** - AI integration for smart features

### AI & Intelligence
- **ZAI Web Dev SDK** - AI-powered features
- **Natural Language Processing** - Smart transaction categorization
- **Context-Aware Responses** - Personalized AI assistance

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── assistant/     # AI chat API
│   │   └── transactions/  # Financial transactions API
│   ├── finance/           # Financial tracker page
│   ├── tasks/             # Task management page
│   ├── calendar/          # Calendar page
│   ├── budgets/           # Budget management page
│   ├── assistant/         # AI assistant page
│   ├── settings/          # Settings page
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Layout components
│   │   ├── sidebar.tsx    # Navigation sidebar
│   │   ├── header.tsx     # Header component
│   │   └── dashboard-layout.tsx # Main layout
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── db.ts              # Database client
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## 🎯 Core Features

### 1. Dashboard Overview
- **Financial Summary**: Total balance, income, expenses
- **Task Statistics**: Active tasks, completion rates
- **Upcoming Events**: Calendar integration
- **Quick Actions**: Fast access to common tasks

### 2. Financial Tracker
- **Natural Language Processing**: "bought coffee 25k" →自动分类
- **Transaction Management**: Full CRUD operations
- **Category Management**: Smart categorization
- **Spending Analysis**: AI-powered insights

### 3. Task Management
- **Task Creation**: Quick and detailed task creation
- **Priority Management**: High, medium, low priority levels
- **Status Tracking**: Pending, in progress, completed
- **Deadline Management**: Due date tracking

### 4. Budget Management
- **Budget Creation**: Set limits for categories
- **Progress Tracking**: Visual progress indicators
- **Alert System**: Over-budget warnings
- **Category Management**: Flexible budget categories

### 5. AI Assistant
- **Natural Language Chat**: Conversational interface
- **Context Awareness**: Personalized responses
- **Financial Advice**: Smart recommendations
- **Productivity Tips**: Organization suggestions

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with:
```env
DATABASE_URL="file:./dev.db"
# Add other environment variables as needed
```

### Database Setup
```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate
```

## 🎨 UI/UX Features

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets
- **Smooth Animations**: Micro-interactions
- **Dark Mode**: Theme switching support

### Accessibility
- **Semantic HTML**: Proper structure
- **ARIA Support**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard access
- **Focus Management**: Proper focus handling

## 🤖 AI Integration

### Transaction Categorization
The AI automatically categorizes transactions based on description:
- **Input**: "bought coffee 25k at starbucks"
- **Output**: Category: "Food", Amount: -25000, Tags: ["coffee", "beverage"]

### Personal Assistant
Context-aware AI assistant that provides:
- **Financial Insights**: Spending pattern analysis
- **Budget Recommendations**: Money-saving tips
- **Task Management**: Productivity advice
- **Scheduling Help**: Calendar optimization

## 📊 Data Models

### Core Entities
- **Users**: User profiles and preferences
- **Transactions**: Financial transactions with AI categorization
- **Tasks**: Task management with priorities and deadlines
- **Budgets**: Budget tracking and alerts
- **Meetings**: Calendar events and scheduling
- **AI Memories**: Context storage for personalized responses

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🔮 Future Enhancements

- **Bank Integration**: Connect to real bank accounts
- **Mobile App**: React Native application
- **Advanced Analytics**: More sophisticated AI insights
- **Multi-User**: Family and team features
- **Investment Tracking**: Portfolio management
- **Bill Splitting**: Shared expense management

## 🤝 Contributing

This project is designed to be a comprehensive personal management system. Feel free to contribute features or improvements!

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Next.js, TypeScript, and AI-powered intelligence.