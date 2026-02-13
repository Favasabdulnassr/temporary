# Valentine's Day Website Template - Configuration Guide

## 📋 File Structure Overview

```
your-valentine-website/
├── config.json              # ✏️ YOUR main configuration file (EDIT THIS)
├── src/
│   ├── App.jsx             # Main application component
│   ├── config.js           # Configuration loader
│   ├── assets/
│   │   ├── couple_photo/   # Your photos go here
│   │   ├── gift/          # Gift images
│   │   ├── songs/         # Your music files go here
│   │   ├── album-covers/  # Your album cover images go here
│   │   ├── music-bear.gif # Animated GIFs
│   │   └── your_songs.mp3 # Audio files
│   └── components/
├── public/
├── package.json
└── README.md
```

## 🎯 Key Files Explained

### 1. `config.json` (Your Main Configuration File)
- **WHAT IT IS**: Your personalized configuration file
- **WHAT TO DO**: Edit this file to customize your website
- **CONTAINS**: All your personal information, names, photos, songs, messages
- **IMPORTANT**: This is the ONLY file you need to edit for customization!

## 🚀 Quick Start Guide

### Step 1: Understand the Files
- `config.json` = Your personal settings (EDIT THIS)
- This is the ONLY file you need to customize!

### Step 2: Customize Your Content
Open `config.json` in any text editor and update:

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

### Step 3: Add Your Media
1. **Photos**: Place in `src/assets/couple_photo/`
2. **Songs**: Place audio files in `src/assets/songs/`
3. **Album Covers**: Place in `src/assets/album-covers/`

### Step 4: Update Media Paths
In `config.json`, update the paths to your files:

```json
"couplePhotos": [
  {
    "image": "/src/assets/couple_photo/your_photo_1.jpg",
    "caption": "Our first date"
  }
],
"songs": [
  {
    "title": "Your Song",
    "audio": "/src/assets/songs/your_song.mp3",
    "cover": "/src/assets/album-covers/your_album_cover.jpg"
  }
]
```

## 📝 Configuration Sections

### Names Section
```json
"names": {
  "sender": "Your Name",
  "receiver": "Your Partner's Name"
}
```

### Content Section
```json
"content": {
  "title": "Your main title",
  "subtitle": "Your subtitle",
  "yesButtonText": "Text for YES button",
  "noButtonText": "Text for NO button",
  "successMessage": "Message when they say YES"
}
```

### Theme Section
```json
"theme": {
  "primaryColor": "#ff69b4",
  "secondaryColor": "#ff1493",
  "fontFamily": "Arial, sans-serif"
}
```

### Photos Section
```json
"couplePhotos": [
  {
    "image": "/src/assets/couple_photo/photo1.jpg",
    "caption": "Description of photo"
  }
]
```

### Songs Section
```json
"songs": [
  {
    "title": "Song Title",
    "duration": "3:45",
    "album": "Album Name",
    "artist": "Artist Name",
    "cover": "/src/assets/album-covers/album_cover.jpg",
    "audio": "/src/assets/songs/song.mp3"
  }
]
```

### Songs and Album Covers Setup
1. **Create song files**: Place your MP3 files in `src/assets/songs/`
2. **Create album covers**: Place your album cover images in `src/assets/album-covers/`
3. **Update paths**: Make sure the paths in `config.json` match your file names
4. **File naming**: Use simple names like `song1.mp3`, `album1.jpg`

**Example structure:**
```
src/assets/songs/
├── love-song.mp3
├── our-song.mp3
└── favorite-song.mp3

src/assets/album-covers/
├── love-song.jpg
├── our-song.jpg
└── favorite-song.jpg
```

## ⚠️ Important Notes

### File Path Rules
- Always use forward slashes (`/`) in paths
- Paths are relative to the project root
- Example: `/src/assets/photo.jpg`

### File Naming
- Use simple names without spaces
- Examples: `photo1.jpg`, `our_song.mp3`
- Avoid special characters: `!@#$%^&*()`

### JSON Syntax
- Always use double quotes for strings
- Commas separate items in arrays/objects
- No comma after the last item
- Use online JSON validator if unsure

## 🔧 Testing Your Changes

### Local Testing (Optional)
```bash
# Open terminal
cd path/to/your/valentine/folder

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### What to Test
- ✅ All buttons work
- ✅ Photos display correctly
- ✅ Songs play
- ✅ Text appears as expected
- ✅ Mobile responsiveness

## 🚀 Deployment Options

### Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag your project folder to the dashboard
3. Wait 2-5 minutes
4. Get your live URL!

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Drag your project folder
3. Wait for deployment
4. Get your live URL!

### GitHub Pages
1. Create GitHub repository
2. Push your files
3. Enable GitHub Pages in settings
4. Wait 5-10 minutes
5. Get your live URL!

## 🆘 Troubleshooting

### Common Issues

#### Site Won't Load
- Check file paths in `config.json`
- Ensure files are in correct folders
- Verify JSON syntax is correct

#### Images Not Showing
- Check file extensions (`.jpg`, `.png`, `.gif`)
- Verify file names match exactly
- Ensure images are in `src/assets/couple_photo/`

#### Audio Not Playing
- Check file format (must be `.mp3`)
- Verify file path in `config.json`
- Test audio file separately

#### Build Errors
- Run `npm install` first
- Check for syntax errors in JSON
- Ensure all required files are present

### Getting Help
1. Check this guide
2. Verify JSON syntax online
3. Test with minimal changes
4. Ask for tech help if needed

## 💡 Pro Tips

### Before Sharing
- Test everything thoroughly
- Check mobile compatibility
- Proofread all text
- Compress large images

### File Management
- Keep backup of original template
- Use descriptive file names
- Organize photos logically

### Performance
- Compress images for faster loading
- Keep audio files under 5MB
- Use web-optimized formats

## 🎁 Ready to Share!

Once you've customized your website:

1. **Test everything** - Click all buttons, play songs, view photos
2. **Deploy** - Use one of the deployment methods above
3. **Share** - Send the URL to your special someone!

## 📞 Need Help?

If you get stuck:
- Re-read this guide
- Check file paths carefully
- Test with small changes
- Ask a tech-savvy friend

Remember: This template is designed to be user-friendly! Take your time and enjoy the process of creating something special for your loved one. ❤️

---

**Happy Valentine's Day!** 💌