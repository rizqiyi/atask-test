# GitHub User Search

### 1. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Add your GitHub Personal Access Token:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

#### 🔑 How to Get GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "GitHub User Search App")
4. Select expiration period
5. **No scopes needed** for public repository access
6. Click **"Generate token"**
7. Copy the token and paste it in your `.env` file

> ⚠️ **Important**: Keep your token secure and never commit it to version control!

### 3. Run the Project

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at `http://localhost:5173`

# GitHub User Search

A modern React application that integrates with the GitHub API to search for users and display their repositories. Built with React, TypeScript, Tailwind CSS, and react-hook-form for optimal performance and user experience.

![GitHub User Search Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=GitHub+User+Search+Demo)

## ✨ Features

- 🔍 **Smart User Search** - Search for up to 5 GitHub users with usernames similar to your input
- 👤 **User Selection** - Click any user to view all their public repositories
- 📚 **Complete Repository List** - Displays ALL repositories (no pagination limits)
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Built with SWR for efficient data fetching and caching
- 📱 **Mobile First** - Optimized for mobile devices with responsive design
- 🔄 **Real-time Updates** - Form state management with react-hook-form
- 🛡️ **Error Handling** - Comprehensive error handling and loading states

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Package Manager**: npm, yarn, or pnpm
- **GitHub Personal Access Token** (for API access)

### 1. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Add your GitHub Personal Access Token:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

#### 🔑 How to Get GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "GitHub User Search App")
4. Select expiration period
5. **No scopes needed** for public repository access
6. Click **"Generate token"**
7. Copy the token and paste it in your `.env` file

> ⚠️ **Important**: Keep your token secure and never commit it to version control!

### 3. Run the Project

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```