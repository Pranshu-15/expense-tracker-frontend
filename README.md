# 💰 Expense Tracker Frontend ✨
## 🌟 Features That Make You Go WOW!
<div align="lefy">
| Feature | Description | Emoji |
|---------|-------------|-------|
| **💸 Expense Management** | Add, edit, and delete expenses with ease | ✏️➕🗑️ |
| **🏷️ Category Organization** | Organize expenses by custom categories | 📂🎯 |
| **📅 Date Filtering** | Filter expenses by date ranges | 🗓️🔍 |
| **📊 Visual Analytics** | Charts and graphs to visualize spending patterns | 📈📉 |
| **📱 Responsive Design** | Mobile-friendly interface that works on all devices | 💻📱⌚ |
| **⚡ Real-time Updates** | Instant updates to expense data | 🔄💨 |
| **🔐 User Authentication** | Secure login and registration system | 🛡️🔑 |
| **🤖 AI Spending Insights** | Smart natural language summaries of your spending via Gemini AI | 🧠✨ |
| **🔑 Secure Password Recovery** | Security question-based forgot password flow | 🔐❓ |
| **🖼️ Persistent Profile Photos** | Base64 database image storage for ephemeral cloud hosting | 📸💾 |
</div>
---

## 🛠️ Tech Stack (The Cool Stuff!)

<div align="left">

| Technology | Purpose | Status |
|------------|---------|--------|
| ⚛️ **React 18** | Frontend Framework | ✅ Latest |
| ⚡ **Vite** | Build Tool | ✅ Lightning Fast |
| 🎨 **CSS3 / Styled Components** | Styling | ✅ Beautiful |
| 🗃️ **React Hooks / Context API** | State Management | ✅ Efficient |
| 🌐 **Axios** | HTTP Client | ✅ Reliable |
| 📊 **Chart.js / Recharts** | Charts | ✅ Interactive |
| 📅 **Date-fns / Moment.js** | Date Handling | ✅ Flexible |
| 🧭 **React Router DOM** | Routing | ✅ Smooth |
| 🧠 **Google Gemini** | AI Summaries | ✅ Integrated |

</div>

---

<div align="left">
## 📋 Prerequisites (Let's Get Ready! 🎯)

Before diving into this awesome project, make sure you have:

- 🟢 **Node.js** (version 16.0+ required) 
- 📦 **npm** (version 8.0+) or **yarn** 
- 🔧 **Git** 

> 💡 **Pro Tip**: Use `node --version` and `npm --version` to check your current versions!
</div>
---

<div align="left">
## 🚀 Installation (3... 2... 1... Blast Off!)

### 1️⃣ **Clone the Repository** 📥
```bash
git clone https://github.com/Pranshu-15/expense-tracker-frontend.git
cd expense-tracker-frontend
```

### 2️⃣ **Install Dependencies** 📦
```bash
npm install
# or if you prefer yarn 🧶
yarn install
```

### 3️⃣ **Environment Setup** ⚙️
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Expense Tracker
```

### 4️⃣ **Launch Development Server** 🚀
```bash
npm run dev
# or
yarn dev
```

🎉 **Boom!** Your app is now running at `http://localhost:5173`

</div>
---
<div align="left">
## 🎬 Available Scripts (Your Command Center!)

| Script | What It Does | Emoji |
|--------|--------------|-------|
| `npm run dev` | 🔥 Runs app in development mode with HMR | 🔄 |
| `npm run build` | 🏗️ Builds app for production | 📦 |
| `npm run preview` | 👀 Serves production build locally | 🖥️ |
| `npm run lint` | 🔍 Checks code quality issues | 🧹 |
| `npm run lint:fix` | 🔧 Auto-fixes ESLint issues | ✨ |
</div>
---
<div align="left">
## 📁 Project Structure (Organized Like a Boss! 🗂️)

```
expense-tracker-frontend/
├── 🌐 public/
│   ├── ⚡ vite.svg
│   └── 🏠 index.html
├── 📂 src/
│   ├── 🧩 components/
│   │   ├── 🔧 common/
│   │   ├── 💰 expense/
│   │   ├── 🔐 auth/
│   │   └── 📊 dashboard/
│   ├── 📄 pages/
│   │   ├── 🏠 Home/
│   │   ├── 📊 Dashboard/
│   │   ├── 💸 Expenses/
│   │   └── 🔑 Login/
│   ├── 🎣 hooks/
│   ├── 🛠️ services/
│   ├── 🔧 utils/
│   ├── 🌐 contexts/
│   ├── 🎨 styles/
│   ├── ⚛️ App.jsx
│   └── 🚀 main.jsx
├── 📦 package.json
├── ⚙️ vite.config.js
├── 📏 .eslintrc.cjs
└── 📖 README.md
```

---
</div>
<div align="left">
## 🎯 Key Components (The Star Players! ⭐)

### 📊 Dashboard
- 💰 Overview of total expenses
- 🔄 Recent transactions  
- 📈 Monthly spending trends
- 🥧 Category-wise breakdown

### 💸 Expense Management  
- ➕ Add new expenses with category and date
- ✏️ Edit existing expenses
- 🗑️ Delete unwanted entries
- 📋 Bulk operations

### 📈 Analytics
- 📅 Monthly/yearly spending reports
- 🥧 Category-wise expense distribution  
- 📊 Spending trends over time
- ⚖️ Budget vs actual comparisons
</div>
---
<div align="left">
## 🔌 API Integration (Backend Connection! 🌐)

This frontend connects to a backend API. Make sure your backend server is running! 🏃‍♂️

### 🛣️ API Endpoints:
| Method | Endpoint | Purpose | Emoji |
|--------|----------|---------|-------|
| `GET` | `/api/expenses` | 📥 Fetch all expenses | 💰 |
| `POST` | `/api/expenses` | ➕ Create new expense | ✨ |
| `PUT` | `/api/expenses/:id` | ✏️ Update expense | 🔄 |
| `DELETE` | `/api/expenses/:id` | 🗑️ Delete expense | ❌ |
| `GET` | `/api/categories` | 📂 Fetch categories | 🏷️ |
| `POST` | `/api/auth/login` | 🔑 User login | 🔐 |
| `POST` | `/api/auth/register` | 📝 User registration | 👤 |

---

## 🚀 Deployment (Go Live! 🌍)

### 🏗️ Build for Production
```bash
npm run build
```
The `dist` folder contains your production-ready files! 📦✨

### 🔷 Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### 🟢 Deploy to Netlify  
1. 🏗️ Build the project: `npm run build`
2. 📤 Upload the `dist` folder to Netlify
3. ⚙️ Configure environment variables in Netlify dashboard

---

## 🤝 Contributing (Join the Team! 👥)

We love contributors! Here's how to join our awesome team:

### 1️⃣ **Fork the Repository** 🍴
### 2️⃣ **Create a Feature Branch** 🌿
```bash
git checkout -b feature/amazing-feature
```
### 3️⃣ **Commit Your Changes** 💾
```bash
git commit -m 'Add some amazing feature ✨'
```
### 4️⃣ **Push to Branch** 🚀
```bash
git push origin feature/amazing-feature
```
### 5️⃣ **Open a Pull Request** 🔄

---

## 📝 Development Guidelines (The Rules of Excellence! 👑)

- ✅ Follow React best practices and hooks patterns
- 🎯 Use functional components with hooks  
- 🎨 Maintain consistent code formatting with Prettier
- 📝 Write meaningful commit messages
- 💬 Add comments for complex logic
- 📱 Ensure responsive design compatibility

---

## 🌐 Browser Support (We've Got You Covered! 🛡️)

| Browser | Support | Emoji |
|---------|---------|-------|
| Chrome | ✅ Latest | 🟢 |
| Firefox | ✅ Latest | 🦊 |
| Safari | ✅ Latest | 🍎 |
| Edge | ✅ Latest | 🔷 |

---

## ⚡ Performance Optimization (Lightning Fast! 🏃‍♂️💨)

- 🔄 Code splitting with React.lazy()
- 🧠 Memoization with React.memo() 
- 📦 Optimized bundle size with Vite
- 🦥 Lazy loading of components
- 🗃️ Efficient state management

---

## 🔧 Troubleshooting (Problem Solver! 🛠️)

### 🚨 Common Issues & Solutions

#### ❌ **Issue**: Module not found errors
#### ✅ **Solution**: Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

#### ❌ **Issue**: Development server not starting  
#### ✅ **Solution**: Check if port 5173 is available

#### ❌ **Issue**: API connection errors
#### ✅ **Solution**: Verify backend server is running and CORS is configured

---

## 📜 License

This project is licensed under the MIT License 📄 - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**🎯 Pranshu** - [GitHub Profile](https://github.com/Pranshu-15) 

*Passionate developer crafting amazing user experiences! 🚀*

---

## 🙏 Acknowledgments (Special Thanks! 🎉)

- ⚛️ React team for the amazing framework
- ⚡ Vite team for the lightning-fast build tool  
- 🌍 Open source community for various libraries used
- ☕ Coffee for keeping us awake during late coding sessions

---

## 💬 Support (We're Here to Help! 🤝)

Got questions? We've got answers! 

1. 🔍 Check existing issues on GitHub
2. 🆕 Create a new issue with detailed information  
3. 📧 Contact the maintainer
</div>
---
