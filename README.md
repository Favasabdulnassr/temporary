# Valentine's Day Website Template

A customizable, interactive Valentine's Day website template built with React and Vite. Perfect for expressing your love with a personalized touch!

## 🎁 Features

- **Personalized Names**: Customize sender and receiver names
- **Interactive Gifts**: Three clickable gifts with animations
- **Music Player**: Play your favorite love songs with full media controls
- **Photo Gallery**: Showcase your special moments with captions
- **Love Letter**: Animated envelope with a heartfelt message
- **Responsive Design**: Works beautifully on all devices
- **Easy Customization**: Simple JSON configuration

## 🚀 Quick Start

### 1. Download & Setup
```bash
# Download the template files
# Extract to your desired location
```

### 2. Customize Your Content
Edit `config.json` to personalize your website. Use `config.template.json` as a reference for all available options:

```json
{
  "names": {
    "sender": "Your Name",
    "receiver": "Your Partner's Name"
  },
  "content": {
    "title": "Will you be my Valentine?",
    "yesButtonText": "YES ❤️",
    "noButtonText": "NO 💔"
  }
}
```

**Note**: 
- `config.json` - Your personalized configuration (edit this file)
- `config.template.json` - Complete template with all options (reference only)

### 3. Add Your Media
- **Photos**: Place in `src/assets/couple_photo/` and update `config.json`
- **Songs**: Place audio files in `src/assets/` and update `config.json`
- **Gifts**: Replace gift images in `src/assets/gift/`

### 4. Test Locally (Optional)
```bash
npm install
npm run dev
```
Visit `http://localhost:5173` to see your changes.

### 5. Deploy for Free
Choose your preferred platform:
- [Netlify](#netlify) (Recommended)
- [Vercel](#vercel)
- [GitHub Pages](#github-pages)

## 📁 File Structure

```
valentine-website/
├── config.json              # Main configuration file
├── config.template.json     # Template reference
├── src/
│   ├── App.jsx             # Main application
│   ├── config.js           # Configuration loader
│   ├── assets/
│   │   ├── couple_photo/   # Your photos
│   │   ├── gift/          # Gift images
│   │   └── *.mp3          # Audio files
│   └── components/
├── public/
├── package.json
└── README.md
```

## ⚙️ Configuration Guide

### Basic Settings
```json
{
  "names": {
    "sender": "Your Name",
    "receiver": "Your Partner's Name"
  },
  "theme": {
    "primaryColor": "#ff7ab2",
    "secondaryColor": "#ff4d8d",
    "fontFamily": "Arial, sans-serif"
  }
}
```

### Adding Photos
```json
{
  "couplePhotos": [
    {
      "image": "/src/assets/couple_photo/photo1.jpg",
      "caption": "Our first date"
    }
  ]
}
```

### Adding Songs
```json
{
  "songs": [
    {
      "id": 1,
      "title": "Your Song",
      "duration": "3:45",
      "album": "Album Name",
      "artist": "Artist",
      "cover": "/src/assets/cover.jpg",
      "audio": "/src/assets/song.mp3"
    }
  ]
}
```

### Customizing Content
```json
{
  "content": {
    "title": "Your custom title",
    "successMessage": "Your custom success message",
    "giftsTitle": "Your gifts title"
  },
  "letter": {
    "title": "My Dearest [Name],",
    "content": ["Your message here..."],
    "signature": "Love,\n[Your Name]"
  }
}
```

## 🌐 Deployment

### Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag your project folder to the dashboard
3. Wait for deployment
4. Share your custom URL!

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Drag your project folder
3. Deploy and share!

### GitHub Pages
1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in settings
4. Visit `https://yourusername.github.io/your-repo/`

## 🎨 Customization Tips

- **File Paths**: Always use forward slashes (`/`) in paths
- **File Names**: Avoid spaces and special characters
- **Image Sizes**: Compress large images for faster loading
- **Audio Files**: Keep under 5MB for better performance
- **Testing**: Test all features before deployment

## 🔧 Troubleshooting

### Common Issues
- **Images not showing**: Check file paths and extensions
- **Audio not playing**: Verify MP3 format and file paths
- **Build errors**: Ensure valid JSON syntax in `config.json`
- **Site not loading**: Check all file paths are correct

### Getting Help
1. Check the [Valentine_Template_Guide.pdf](Valentine_Template_Guide.pdf)
2. Verify JSON syntax with an online validator
3. Test with minimal changes first
4. Ask a tech-savvy friend for help

## 📋 Checklist Before Deployment

- [ ] All names and text customized
- [ ] Photos added and paths updated
- [ ] Songs added and paths updated
- [ ] All buttons tested
- [ ] Mobile responsiveness checked
- [ ] Spelling and grammar verified
- [ ] File paths double-checked

## 💡 Pro Tips

1. **Backup First**: Keep a copy of the original template
2. **Test Gradually**: Make small changes and test frequently
3. **File Organization**: Use descriptive file names
4. **Performance**: Compress images and audio files
5. **Privacy**: Be mindful of what you share publicly

## 🎯 What's Included

- ✅ Interactive Valentine's Day website
- ✅ Three customizable gifts
- ✅ Music player with playlist
- ✅ Photo gallery with captions
- ✅ Animated love letter
- ✅ Responsive design
- ✅ Easy configuration system
- ✅ Free deployment options
- ✅ Comprehensive guide

## 💌 Support

This template is designed for users with minimal technical experience. If you encounter issues:

1. Refer to the [Valentine_Template_Guide.pdf](Valentine_Template_Guide.pdf)
2. Check your `config.json` syntax
3. Test with the original template first
4. Make gradual changes

## 📄 License

This template is free to use for personal Valentine's Day projects. Please don't use it for commercial purposes.

---

**Happy Valentine's Day!** ❤️

May your website be as special as your love story!