# create-tauri-app-project-wind

A modern, professional desktop application starter template built with Tauri, React 18, TypeScript, and Shadcn UI. Features a custom title bar, responsive navigation, and comprehensive UI component showcase.

## 🚀 Quick Start

### Interactive Installation (Recommended)

The CLI will guide you through configuration with interactive prompts:

```bash
npm create tauri-app-project-wind@latest
```

You'll be prompted for:
- 📁 **Project folder name** – Name for your project directory (lowercase, dashes/underscores allowed)
- 🏷️ **App display name** – How your app will be labeled in the window/titlebar
- 👤 **Author name** – Your name or organization (used in metadata)
- 📦 **Bundle identifier** – Reverse domain (e.g., com.company.app) for Tauri packaging
- 📦 **Package manager** – Choose npm, yarn, pnpm, or bun
- ⚡ **Auto-install** – Automatically install dependencies after setup

### Quick Install with Defaults

Provide the project name as an argument to skip the first prompt:

```bash
npm create tauri-app-project-wind@latest my-app
```

### Package Manager Specific

#### npm
```bash
npm create tauri-app-project-wind@latest my-app
```

#### yarn
```bash
yarn create tauri-app-project-wind my-app
```

#### pnpm
```bash
pnpm create tauri-app-project-wind my-app
```

#### bun
```bash
bun create tauri-app-project-wind my-app
```

## ✨ What's Included

### Core Technologies
- ⚡ **Tauri** - Build smaller, faster, more secure desktop applications
- ⚛️ **React 18** - Modern React with hooks and concurrent features
- 📘 **TypeScript** - Full type safety across the entire application
- 🎨 **Shadcn UI** - 52+ beautiful, accessible UI components
- 🎯 **Vite** - Lightning-fast development with HMR
- 💅 **TailwindCSS** - Utility-first CSS framework

### Custom Features
- 🪟 **Custom Title Bar** - Native-like window controls (minimize, maximize, close)
- 🎨 **Theme System** - Light/Dark/System modes with live switching
- 📱 **Responsive Design** - Mobile-first approach with breakpoint handling
- 🍔 **Smart Navigation** - Hamburger menu on mobile, menubar on desktop
- 🎭 **Modern Animations** - Smooth transitions and interactive elements
- 🏗️ **Clean Architecture** - Pages, layouts, and components separation

## 🎨 UI Components

### Custom Components
- **TitleBar** - Custom window controls with draggable area
  - Minimize, Maximize/Restore, Close buttons
  - Integrated theme toggle with Sun/Moon icons
  - Responsive hamburger menu (mobile)
  - Desktop menubar (File, Edit, View, Help)
  - About and Keyboard Shortcuts dialogs

### Shadcn UI Components (52+)
**Form & Input**: Button, Input, Textarea, Checkbox, Switch, Radio Group, Select, Input OTP, Form, Field, Input Group

**Navigation**: Menubar, Navigation Menu, Breadcrumb, Tabs, Pagination, Command

**Feedback**: Alert, Alert Dialog, Dialog, Toast/Sonner, Progress, Spinner, Skeleton, Badge

**Layout**: Card, Separator, Scroll Area, Resizable Panels, Aspect Ratio, Sheet

**Overlay**: Dropdown Menu, Context Menu, Popover, Hover Card, Tooltip, Drawer

**Data Display**: Table, Avatar, Calendar, Carousel, Accordion, Collapsible, Toggle, Toggle Group

## 🛠️ Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── ui/                 # 52+ Shadcn UI components
│   │   ├── demo/               # Component showcase
│   │   ├── TitleBar.tsx        # Custom window controls
│   │   └── theme-provider.tsx  # Theme context
│   ├── layouts/
│   │   └── MainLayout.tsx      # Main app layout wrapper
│   ├── pages/
│   │   └── Welcome.tsx         # Welcome/demo page
│   └── lib/
│       └── utils.ts            # Utility functions
├── src-tauri/
│   ├── src/main.rs             # Rust backend
│   └── tauri.conf.json         # Tauri configuration
└── package.json                # Node dependencies
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server (web preview)
npm run tauri dev        # Run Tauri app in development mode

# Build
npm run build            # Build frontend for production
npm run tauri build      # Build complete desktop application
```

## 🎯 Key Features

### Custom Title Bar
- Native-like window controls (minimize, maximize, close)
- Draggable area - Click and drag to move window
- Double-click to maximize
- Integrated theme toggle with Sun/Moon icons
- Responsive menu that adapts to screen size

### Responsive Navigation
**Desktop (≥768px)**: Traditional menubar with File, Edit, View, Help menus

**Mobile (<768px)**: Modern hamburger icon with smooth animation and slide-out navigation

### Theme System
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes
- **System Mode** - Auto-detects OS preference and updates live

## 📚 Documentation

For full documentation, examples, and advanced usage, visit:

🔗 [GitHub Repository](https://github.com/ssanaullahrais/project-wind-tauri-js-starter-kit)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License

## 🙏 Credits

Built with [Tauri](https://tauri.app/), [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Shadcn UI](https://ui.shadcn.com/)

---

**Happy coding! 🚀**
