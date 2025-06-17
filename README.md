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