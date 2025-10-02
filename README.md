# Rohit Viswam - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing my skills as a Data Engineer, experience in machine learning, big data, and real-time analytics.

## About Me

I'm a Data Engineer at LatentView Analytics with hands-on experience in machine learning, big data, and real-time analytics. I specialize in building scalable solutions using Python, SQL, and data visualization tools, with a proven track record in 5G communication research and deep learning model deployment.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Navigation**: Smooth scrolling navigation with active link highlighting
- **Animated Sections**: Engaging animations and transitions
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading with optimized code

## Sections

1. **Hero Section**: Introduction as a Data Engineer and ML specialist
2. **About**: Personal background and professional statistics
3. **Skills**: Technical skills in programming, ML/AI, big data, and web development
4. **Experience**: Professional timeline including LatentView Analytics, IIT Madras, and Intel Corporation
5. **Education**: MIT degree and Caltech AI/ML program
6. **Certifications**: Professional certifications, awards, and publications
7. **Projects**: Featured projects including LLMOps pipelines, 5G CSI prediction, and more
8. **Contact**: Contact information and form

## Key Projects Featured

- **LLMOps Evaluation Pipeline**: MLflow and Unity Catalog integration
- **5G CSI Prediction System**: Advanced deep learning models for wireless communication
- **Restaurant Recommendation System**: Published research with 50+ features
- **Social Distancing Detection**: Intel OpenVINO optimization (33% to 63% accuracy improvement)
- **IPL Management System**: Complete database-driven sports management
- **Temperature Sensor Interface**: Embedded systems project

## Technologies Highlighted

- **Programming**: Python, C++, C, JavaScript, SQL
- **ML/AI**: TensorFlow, Pandas, NumPy, MLflow, Databricks
- **Big Data**: Unity Catalog, Power BI, LLMOps
- **Web Development**: React.js, Angular, Flask, Node.js
- **Specializations**: Data Analysis, Visualization, MLOps

## Contact

- **Email**: rohitviswam@gmail.com
- **Phone**: +91 8610375216
- **Location**: India

## Professional Background

- **Current**: Data Engineer at LatentView Analytics (Jan 2025 - Present)
- **Research**: IIT Madras Research Intern (Jan 2024 - Jun 2024)
- **Industry**: Intel Corporation Project Intern (May 2023 - Jul 2023)
- **Education**: MIT (Computer & Communication Engineering) + Caltech (AI/ML Program)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality and animations
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter font family)

## Customization

To customize this website with your information:

1. **Personal Information**: Update the content in `index.html`
   - Replace "Rohit Viswam" with your name
   - Update contact information
   - Modify social media links
   - Add your photo (replace the placeholder)

2. **Skills & Experience**: 
   - Update the skills section with your technologies
   - Modify the experience timeline with your work history
   - Update education details

3. **Projects**: 
   - Replace project descriptions with your actual projects
   - Add project images
   - Update project links

4. **Styling**: 
   - Colors can be customized in `css/styles.css`
   - Main brand color: `#2563eb` (blue)
   - Accent color: `#fbbf24` (yellow)

5. **Contact Form**: 
   - Currently shows notifications only
   - Connect to a backend service or email service for actual form submission

## File Structure

```
personal-website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── script.js           # JavaScript functionality
└── README.md               # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

There are two ways to run this project locally:

1) Frontend only (static preview)
   - Quickest way to view the site
   - The contact form uses EmailJS (if configured) or mailto fallback

   Steps (macOS):
   ```zsh
   cd "/Users/rohitviswam/Documents/personal Website"
   python3 -m http.server 8000
   # Open http://localhost:8000
   ```

2) Frontend + Backend (SMTP email via Gmail)
   - Use this to send the contact form through Gmail SMTP

   One-time setup:
   ```zsh
   cd "/Users/rohitviswam/Documents/personal Website"
   python3 -m venv backend/.venv
   source backend/.venv/bin/activate
   pip install -r backend/requirements.txt
   cp .env.example .env  # then edit .env with your SMTP creds
   ```

   .env keys:
   - SMTP_HOST=smtp.gmail.com
   - SMTP_PORT=465 (or leave default)
   - SMTP_USER=your@gmail.com
   - SMTP_PASS=your-google-app-password (no spaces)

   Run the backend:
   ```zsh
   cd "/Users/rohitviswam/Documents/personal Website/backend"
   source .venv/bin/activate
   PORT=5050 python server.py
   # Backend will run at http://localhost:5050
   ```

   View the site via the backend or static server:
   - Best: http://localhost:5050 (same-origin API)
   - Or static: http://localhost:8000 — the form will automatically try http://localhost:5050/api/contact

   Notes:
   - On macOS, SSL cert issues are handled via certifi; the backend also falls back to STARTTLS on port 587 if needed.
   - The client falls back to EmailJS (if configured in `js/config.js`) and then to `mailto:` if the backend isn’t reachable.

## 🚀 GitHub Pages Deployment

This project is configured for GitHub Pages deployment with automated workflows.

### Quick Deploy Steps:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy your site

3. **Your site will be live at**:
   - `https://rohitviswam.github.io/personal-Website/`
   - Or `https://rohitviswam.github.io/` if repo is named `rohitviswam.github.io`

### Backend Deployment (for SMTP contact form):

4. **Deploy backend on Render (Recommended - Free)**:
   - Create account at [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `rohit-portfolio-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn server:app`
   - Add Environment Variables:
     - `SMTP_HOST`: `smtp.gmail.com`
     - `SMTP_PORT`: `465`
     - `SMTP_USER`: `rohitviswam@gmail.com`
     - `SMTP_PASS`: `ghev rnpt aaeh zyik`
     - `CORS_ORIGINS`: `https://rohitviswam.github.io`
   - Click "Create Web Service"

5. **Update frontend config**:
   - After backend deployment, copy your backend URL (e.g., `https://rohit-portfolio-backend.onrender.com`)
   - Update `js/config.js`:
     ```javascript
     API_BASE: 'https://your-actual-backend-url.onrender.com',
     ```
   - Commit and push:
     ```bash
     git add js/config.js
     git commit -m "Update backend API URL"
     git push origin main
     ```

### Alternative Backend Hosting:
- **Railway**: Similar setup at [railway.app](https://railway.app)
- **Heroku**: Use the included Procfile
- **DigitalOcean App Platform**: Deploy backend folder

### Local Development:

For local testing:
```bash
# Start backend
cd backend
source .venv/bin/activate
PORT=5050 python server.py

# Start frontend (in another terminal)
cd "/Users/rohitviswam/Documents/personal Website"
python3 -m http.server 8080

# Update js/config.js to use local backend:
# API_BASE: 'http://localhost:5050'
```

## Deployment

This website can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, please reach out through the contact form on the website.
