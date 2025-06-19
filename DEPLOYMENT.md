# Bella Vista Bistro - Deployment Guide

This guide provides detailed instructions for deploying the Bella Vista Bistro website to various platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Netlify Deployment](#netlify-deployment)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Environment Setup](#environment-setup)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Git installed on your system
- Node.js (optional, for local development server)
- A GitHub account
- Your code pushed to a GitHub repository
- Basic command line knowledge

## Local Development

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/bella-vista-bistro.git
   cd bella-vista-bistro
   ```

2. **Start a Local Server**

   Using Python:

   ```bash
   # Python 3.x
   python -m http.server 8000

   # Python 2.x
   python -m SimpleHTTPServer 8000
   ```

   Using Node.js:

   ```bash
   # Install serve globally
   npm install -g serve

   # Start server
   serve
   ```

3. **View the Site**
   - Open your browser to `http://localhost:8000`
   - Test all functionality locally before deployment

## Netlify Deployment

### Method 1: Drag and Drop

1. **Build Your Site**

   - Ensure all files are in their final state
   - Run any build processes if needed

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Drag and drop your site folder to the Netlify dashboard

### Method 2: Git Integration (Recommended)

1. **Connect to GitHub**

   - Log in to Netlify
   - Click "New site from Git"
   - Choose GitHub as your Git provider
   - Authorize Netlify

2. **Configure Build Settings**

   - Choose your repository
   - Set build command (if any)
   - Set publish directory to root (.)
   - Click "Deploy site"

3. **Verify Deployment**
   - Wait for initial deployment
   - Check your site at the provided Netlify URL
   - Test all functionality

## GitHub Pages Deployment

1. **Repository Setup**

   ```bash
   # Ensure you're on main branch
   git checkout main

   # Create gh-pages branch if it doesn't exist
   git checkout -b gh-pages

   # Push to GitHub
   git push origin gh-pages
   ```

2. **Enable GitHub Pages**

   - Go to repository Settings
   - Navigate to "Pages" section
   - Select gh-pages branch as source
   - Save changes

3. **Configure Repository**
   - Ensure repository is public
   - Wait for GitHub Actions to complete
   - Site will be available at `https://yourusername.github.io/bella-vista-bistro`

## Custom Domain Setup

### Netlify Custom Domain

1. **Add Custom Domain**

   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain name
   - Follow DNS configuration instructions

2. **DNS Configuration**
   - Add CNAME record pointing to your Netlify site
   - Wait for DNS propagation (up to 48 hours)
   - Enable HTTPS in Netlify settings

### GitHub Pages Custom Domain

1. **Configure DNS**

   - Add A records pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add CNAME record for www subdomain

2. **Add Domain in GitHub**
   - Go to repository Settings > Pages
   - Enter your custom domain
   - Save changes
   - Check "Enforce HTTPS"

## Environment Setup

### Development Environment

1. **Required Software**

   - Git
   - Text editor (VS Code recommended)
   - Web browser
   - Node.js (optional)

2. **Editor Configuration**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "prettier.singleQuote": true,
     "prettier.trailingComma": "es5"
   }
   ```

### Production Environment

1. **Performance Optimization**

   - Minify CSS and JavaScript
   - Optimize images
   - Enable GZIP compression
   - Configure caching headers

2. **Security Headers**
   ```nginx
   # Example Nginx configuration
   add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-XSS-Protection "1; mode=block" always;
   add_header X-Content-Type-Options "nosniff" always;
   ```

## Troubleshooting

### Common Issues

1. **404 Errors**

   - Check file paths are correct
   - Verify case sensitivity
   - Ensure all files are committed and pushed

2. **HTTPS Issues**

   - Wait for SSL certificate to provision
   - Check DNS configuration
   - Verify HTTPS is enabled in settings

3. **Asset Loading**
   - Use relative paths
   - Check file permissions
   - Verify CORS settings

### Deployment Checklist

- [ ] All files committed and pushed
- [ ] Images optimized
- [ ] Links working correctly
- [ ] CSS/JS minified
- [ ] Forms functioning
- [ ] HTTPS enabled
- [ ] DNS configured
- [ ] Mobile responsive
- [ ] Cross-browser tested

### Getting Help

If you encounter issues:

1. Check the deployment platform's status page
2. Review platform-specific documentation
3. Search Stack Overflow for similar issues
4. Contact support if needed

## Additional Resources

- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [DNS Configuration Guide](https://docs.netlify.com/domains-https/custom-domains)
- [HTTPS Troubleshooting](https://docs.netlify.com/domains-https/troubleshooting-tips)
