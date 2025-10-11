# Personal Portfolio Website

A modern, responsive personal portfolio website showcasing skills, experience, education, certifications, and projects.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean and professional interface with smooth animations
- **Interactive Navigation**: Smooth scrolling and mobile-friendly menu
- **Project Showcase**: Display your best work with project cards
- **Experience Timeline**: Visual representation of your work history
- **Skills Section**: Highlight your technical expertise
- **Contact Form**: Simple mailto-based contact functionality
- **GitHub Pages Ready**: Easy deployment with automated workflow

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

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

## File Structure

```
personal-website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── script.js           # JavaScript functionality
│   └── config.js           # Configuration file
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Actions deployment
└── README.md               # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

To run this project locally:

```zsh
cd "/Users/rohitviswam/Documents/personal Website"
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## 🚀 GitHub Pages Deployment

This project is ready for GitHub Pages deployment with a simple, clean implementation.

### Quick Deploy Steps:

1. **Push to GitHub**:
   ```bash
   cd "/Users/rohitviswam/Documents/personal Website"
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

### Contact Form:
The contact form uses the simple mailto approach:
- When visitors click "Send Message", their default email app opens
- Email is pre-addressed to: rohitviswam@gmail.com
- Subject and message are pre-filled with the form data
- Works on all platforms without any backend required

### Local Development:
```bash
# Clone the repository
git clone https://github.com/rohitviswam/personal-Website.git
cd personal-Website

# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Rohit Viswam
- Email: rohitviswam@gmail.com
- LinkedIn: [linkedin.com/in/rohit-viswam](https://www.linkedin.com/in/rohit-viswam/)
- GitHub: [github.com/rohitviswam](https://github.com/rohitviswam)
