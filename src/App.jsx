import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "./config";
import { couplePhotoUrls } from "./couple-photo-urls.generated";

function App() {
  const [noLabel, setNoLabel] = useState("NO 💔");
  const [showHoverPopup, setShowHoverPopup] = useState(false);
  const [showSlidesPopup, setShowSlidesPopup] = useState(false);
  const [showProsConsPopup, setShowProsConsPopup] = useState(false);
  const [hoveredOnce, setHoveredOnce] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [view, setView] = useState("home");
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [giftsOpened, setGiftsOpened] = useState(new Set());

  // Media player state
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);

  // Song data for media player
  const songs = useMemo(() => config.songs, []);

  const slides = useMemo(() => config.prosCons, []);

  const handleNoEnter = useCallback(() => {
    if (!hoveredOnce) {
      setShowHoverPopup(true);
      setHoveredOnce(true);
    } else {
      setNoLabel("YESSS ❤️");
    }
  }, [hoveredOnce]);

  const handleNoLeave = useCallback(() => {
    if (hoveredOnce) {
      setNoLabel("NO 💔");
    }
  }, [hoveredOnce]);

  const closeHoverPopup = useCallback(() => {
    setShowHoverPopup(false);
    setNoLabel("NO 💔");
  }, []);

  const openProsConsPopup = useCallback(() => {
    setShowHoverPopup(false);
    setShowProsConsPopup(true);
  }, []);

  const closeProsConsPopup = useCallback(() => {
    setShowProsConsPopup(false);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Gift tracking functions
  const handleGiftClick = useCallback((giftType) => {
    setGiftsOpened((prev) => {
      const newSet = new Set(prev);
      newSet.add(giftType);
      return newSet;
    });
  }, []);

  const allGiftsOpened = useMemo(() => giftsOpened.size === 3, [giftsOpened]);

  const handleGift1Click = useCallback(() => {
    handleGiftClick("songs");
    setView("songs");
  }, [handleGiftClick]);

  const handleGift2Click = useCallback(() => {
    handleGiftClick("letter");
    setView("letter");
  }, [handleGiftClick]);

  const handleGift3Click = useCallback(() => {
    handleGiftClick("photos");
    setView("photos");
  }, [handleGiftClick]);

  // Media player functions
  const currentSong = useMemo(
    () => songs[currentSongIndex],
    [songs, currentSongIndex],
  );

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  }, [songs.length]);

  const handlePrevious = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  }, [songs.length]);

  const handleSongSelect = useCallback((index) => {
    setCurrentSongIndex(index);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    handleNext();
  }, [handleNext]);

  const handleProgressClick = useCallback(
    (e) => {
      if (audioRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.nativeEvent.offsetX;
        const width = rect.width;
        const progress = clickX / width;
        audioRef.current.currentTime = progress * duration;
        setCurrentTime(progress * duration);
      }
    },
    [duration],
  );

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  if (view === "success") {
    return (
      <div className="valentine-root success">
        <div className="card success-card">
          <h1 className="yay">{config.content.successMessage}</h1>
          <p className="subtitle small">{config.content.successSubtitle}</p>

          <div className="image-card">
            <img
              src={config.media.loveYouBearGif}
              alt="cute gif"
              loading="lazy"
            />
          </div>

          <motion.div
            className="love-text-container"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              stiffness: 200,
            }}
          >
            <motion.h2
              className="love-text"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                textShadow: [
                  "0 0 0 rgba(255, 192, 203, 0)",
                  "0 0 20px rgba(255, 192, 203, 0.8)",
                  "0 0 40px rgba(255, 192, 203, 1)",
                  "0 0 20px rgba(255, 192, 203, 0.8)",
                  "0 0 0 rgba(255, 192, 203, 0)",
                ],
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                textShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              I LOVE YOU❤️
            </motion.h2>
          </motion.div>

          <div style={{ height: 12 }} />
          <motion.button
            className="btn romantic-gift-btn"
            onClick={() => setView("gifts")}
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: "0 15px 30px rgba(255, 122, 162, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {config.navigation.backToGifts}
          </motion.button>
        </div>
      </div>
    );
  }

  if (view === "gifts") {
    return (
      <div className="valentine-root gifts">
        <div className="card gifts-card">
          <h1 className="yay">{config.content.giftsTitle}</h1>

          <div className="gifts-container">
            <div className="gift-card" onClick={handleGift1Click}>
              <h3 className="gift-title">Gift 1</h3>
              <div className="gift-image">
                <img src={config.gifts.gift1} alt="gift 1" loading="lazy" />
              </div>
            </div>

            <div className="gift-card" onClick={handleGift2Click}>
              <h3 className="gift-title">Gift 2</h3>
              <div className="gift-image">
                <img src={config.gifts.gift2} alt="gift 2" loading="lazy" />
              </div>
            </div>

            <div className="gift-card" onClick={handleGift3Click}>
              <h3 className="gift-title">Gift 3</h3>
              <div className="gift-image">
                <img src={config.gifts.gift3} alt="gift 3" loading="lazy" />
              </div>
            </div>
          </div>

          {allGiftsOpened ? (
            <div className="all-gifts-opened">
              <div className="love-you-bear-container">
                <img
                  src={config.media.loveYouBearGif}
                  alt="love you bear"
                  loading="lazy"
                />
              </div>
              <p className="all-gifts-text">
                Yayyyy!! You opened all the gifts! <br />
                LOVE YOU SO MUCH KUNJAAA❤️
              </p>
            </div>
          ) : (
            <>
              <div style={{ height: 12 }} />
              <button className="btn yes" onClick={() => setView("success")}>
                {config.navigation.backToLove}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (view === "songs") {
    return (
      <div className="valentine-root songs">
        <div className="card songs-card">
          <h1 className="yay">{config.content.songsTitle}</h1>

          <div className="media-player-container">
            <motion.div
              className="media-player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Album Art Section */}
              <div className="album-art-section">
                <motion.div
                  className="album-art-frame"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="album-art">
                    <img
                      src={currentSong.cover}
                      alt="Album Cover"
                      loading="lazy"
                      className="album-image"
                    />
                  </div>
                </motion.div>

                <div className="album-info">
                  <h2 className="album-title">{currentSong.album}</h2>
                  <p className="album-artist">{currentSong.artist}</p>
                </div>
              </div>

              {/* Media Controls Section */}
              <div className="media-controls">
                <div className="current-song-info">
                  <h3 className="current-title">{currentSong.title}</h3>
                  <p className="current-artist">{currentSong.artist}</p>
                </div>

                <div className="progress-section">
                  <div className="time-display">
                    <span className="current-time">
                      {formatTime(currentTime)}
                    </span>
                    <span className="duration">{formatTime(duration)}</span>
                  </div>
                  <div
                    className="progress-bar-container"
                    onClick={handleProgressClick}
                  >
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width:
                            duration > 0
                              ? `${(currentTime / duration) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="control-buttons">
                  <motion.button
                    className="control-btn"
                    onClick={handlePrevious}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={config.tooltips.previous}
                  >
                    ⏪
                  </motion.button>

                  <motion.button
                    className="play-btn-large"
                    onClick={handlePlayPause}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={
                      isPlaying ? config.tooltips.pause : config.tooltips.play
                    }
                  >
                    {isPlaying ? "⏸️" : "▶️"}
                  </motion.button>

                  <motion.button
                    className="control-btn"
                    onClick={handleNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={config.tooltips.next}
                  >
                    ⏩
                  </motion.button>
                </div>

                <div className="volume-section">
                  <span className="volume-icon">
                    {volume > 0.5 ? "🔊" : volume > 0 ? "🔉" : "🔇"}
                  </span>
                  <div className="volume-bar-container">
                    <input
                      type="range"
                      className="volume-bar"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Song Playlist */}
            <div className="song-playlist">
              <h3 className="playlist-title">{config.content.songsTitle}</h3>
              <div className="playlist-container">
                {songs.map((song, index) => (
                  <motion.div
                    key={song.id}
                    className={`playlist-item ${index === currentSongIndex ? "active" : ""}`}
                    onClick={() => handleSongSelect(index)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="playlist-item-left">
                      <div className="playlist-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="playlist-info">
                        <h4 className="playlist-title-text">{song.title}</h4>
                        <p className="playlist-artist">{song.artist}</p>
                      </div>
                    </div>
                    <div className="playlist-duration">{song.duration}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={currentSong.audio}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            volume={volume}
          />

          <div style={{ height: 12 }} />
          <button className="btn yes" onClick={() => setView("gifts")}>
            {config.navigation.backToGifts}
          </button>
        </div>
      </div>
    );
  }

  if (view === "photos") {
    return (
      <div className="valentine-root photos">
        <div className="card photos-card">
          <h1 className="yay">{config.content.photosTitle}</h1>
          <div className="photos-grid">
            {Array.isArray(config.couplePhotos) && config.couplePhotos.filter((p) => p && p.image).map((photo, index) => (
              <motion.div
                key={photo.image || index}
                className="photo-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`photo-frame vintage-${index + 1}`}>
                  <img
                    src={
                      import.meta.env.DEV
                        ? `/api/couple-photo/${index + 1}`
                        : (couplePhotoUrls[index] ?? photo.image)
                    }
                    alt={photo.caption || `Memory ${index + 1}`}
                    loading="lazy"
                  />
                </div>
                <p className="photo-caption">{photo.caption}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ height: 12 }} />
          <button className="btn yes" onClick={() => setView("gifts")}>
            {config.navigation.backToGifts}
          </button>
        </div>
      </div>
    );
  }

  if (view === "letter") {
    return (
      <div className="valentine-root letter">
        <div className="card letter-card">
          <h1 className="yay">{config.content.letterTitle}</h1>
          <motion.div
            className="envelope-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="envelope"
              onClick={() => setEnvelopeOpen(!envelopeOpen)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="envelope-flap">
                <div className="envelope-triangle"></div>
              </div>
              <div className="envelope-body">
                <div className="envelope-seal">
                  <span className="heart-symbol">
                    {config.media.envelopeSeal}
                  </span>
                </div>
              </div>
            </motion.div>

            {envelopeOpen && (
              <motion.div
                className="letter-paper"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="letter-content">
                  <h2 className="letter-title">{config.letter.title}</h2>
                  {config.letter.content.map((paragraph, index) => (
                    <p key={index} className="letter-text">
                      {paragraph}
                    </p>
                  ))}
                  <p className="letter-signature">{config.letter.signature}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {envelopeOpen && <div style={{ height: 12 }} />}
          <button className="btn yes" onClick={() => setView("gifts")}>
            {config.navigation.backToGifts}
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        className="valentine-root"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="card"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          <motion.img
            src={config.media.mainBearGif}
            alt="cute bear"
            className="card-image"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.h1
            className="title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="name">{config.names.receiver}</span>
            <span className="ask"> {config.content.title}</span>
            <span className="hearts"> </span>
          </motion.h1>

          <motion.div
            className="choices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              className="btn yes"
              onClick={() => setView("success")}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 12px 25px rgba(255, 122, 162, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {config.content.yesButtonText}
            </motion.button>
            <motion.button
              className="btn no"
              onMouseEnter={handleNoEnter}
              onMouseLeave={handleNoLeave}
              aria-label="No button"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {noLabel}
            </motion.button>
          </motion.div>
        </motion.div>

        {showHoverPopup && (
          <motion.div
            className="overlay"
            onClick={closeHoverPopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="popup"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <button
                className="close-btn"
                onClick={closeHoverPopup}
                aria-label="Close"
              >
                ✕
              </button>
              <p className="popup-text">
                Maybe I should explain the perks of being my Valentine… let me
                tell you 😉
              </p>
              <motion.button
                className="btn okay-btn"
                onClick={openProsConsPopup}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Okay
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {showProsConsPopup && (
          <motion.div
            className="overlay"
            onClick={closeProsConsPopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="pros-cons-popup"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <button
                className="close-btn"
                onClick={closeProsConsPopup}
                aria-label="Close"
              >
                ✕
              </button>

              <h2 className="pros-cons-title">
                {config.content.prosConsTitle}
              </h2>

              <motion.div
                className="cards-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  className="card pros-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="card-title">💖 Pros</h3>
                  <div className="pros-list">
                    <div className="pro-item">
                      <img
                        src={slides[currentSlide].gif}
                        alt="pro"
                        className="pro-gif"
                        loading="lazy"
                      />
                      <p className="pro-text">{slides[currentSlide].text}</p>
                    </div>
                  </div>

                  <div className="pros-nav">
                    <motion.button
                      className="nav-btn"
                      onClick={prevSlide}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        src={config.media.leftButton}
                        alt="previous"
                        className="nav-btn-img"
                      />
                    </motion.button>
                    <span className="slide-indicator">
                      {currentSlide + 1} / {slides.length}
                    </span>
                    <motion.button
                      className="nav-btn"
                      onClick={nextSlide}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        src={config.media.rightButton}
                        alt="next"
                        className="nav-btn-img"
                      />
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  className="card cons-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="card-title">❌ Cons</h3>
                  <div className="cons-content">
                    <img
                      src={config.media.childGif}
                      alt="child"
                      className="cons-gif"
                      loading="lazy"
                    />
                    <p className="cons-text">
                      {config.content.prosConsSubtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
