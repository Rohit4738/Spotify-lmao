import React, { useState, useEffect, useRef } from 'react';

// Theme configurations
const THEMES = {
  'dark-ocean': {
    name: 'Dark Ocean',
    primary: 'bg-slate-900',
    secondary: 'bg-slate-800',
    accent: 'bg-cyan-500',
    accentHover: 'hover:bg-cyan-600',
    text: 'text-white',
    textSecondary: 'text-slate-300',
    border: 'border-slate-700',
    gradient: 'from-slate-900 to-cyan-900'
  },
  'midnight-purple': {
    name: 'Midnight Purple',
    primary: 'bg-indigo-950',
    secondary: 'bg-indigo-900',
    accent: 'bg-purple-500',
    accentHover: 'hover:bg-purple-600',
    text: 'text-white',
    textSecondary: 'text-indigo-300',
    border: 'border-indigo-800',
    gradient: 'from-indigo-950 to-purple-900'
  },
  'forest': {
    name: 'Forest',
    primary: 'bg-emerald-950',
    secondary: 'bg-emerald-900',
    accent: 'bg-emerald-500',
    accentHover: 'hover:bg-emerald-600',
    text: 'text-white',
    textSecondary: 'text-emerald-300',
    border: 'border-emerald-800',
    gradient: 'from-emerald-950 to-green-900'
  },
  'rose-gold': {
    name: 'Rose Gold',
    primary: 'bg-pink-950',
    secondary: 'bg-pink-900',
    accent: 'bg-pink-500',
    accentHover: 'hover:bg-pink-600',
    text: 'text-white',
    textSecondary: 'text-pink-300',
    border: 'border-pink-800',
    gradient: 'from-pink-950 to-rose-900'
  },
  'arctic': {
    name: 'Arctic',
    primary: 'bg-slate-100',
    secondary: 'bg-white',
    accent: 'bg-blue-500',
    accentHover: 'hover:bg-blue-600',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    border: 'border-slate-300',
    gradient: 'from-slate-100 to-blue-100'
  },
  'sunset': {
    name: 'Sunset',
    primary: 'bg-orange-950',
    secondary: 'bg-orange-900',
    accent: 'bg-orange-500',
    accentHover: 'hover:bg-orange-600',
    text: 'text-white',
    textSecondary: 'text-orange-300',
    border: 'border-orange-800',
    gradient: 'from-orange-950 to-red-900'
  }
};

// Mock data with the images from vision_expert_agent
const MOCK_DATA = {
  user: {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
    isLoggedIn: false
  },
  featuredPlaylists: [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The most played songs right now",
      image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg",
      trackCount: 50
    },
    {
      id: 2,
      title: "Indie Mix",
      description: "Discover indie artists",
      image: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc0ODQ5Mzk3MHww&ixlib=rb-4.1.0&q=85",
      trackCount: 30
    },
    {
      id: 3,
      title: "Electronic Vibes",
      description: "Best electronic music",
      image: "https://images.pexels.com/photos/844928/pexels-photo-844928.jpeg",
      trackCount: 40
    },
    {
      id: 4,
      title: "Acoustic Sessions",
      description: "Stripped down versions",
      image: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
      trackCount: 25
    }
  ],
  recentlyPlayed: [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      image: "https://images.unsplash.com/photo-1580656449278-e8381933522c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHxlbnwwfHx8fDE3NDg0OTM5ODV8MA&ixlib=rb-4.1.0&q=85",
      duration: "5:55",
      youtubeQuery: "Queen Bohemian Rhapsody official"
    },
    {
      id: 2,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
      duration: "3:01",
      youtubeQuery: "John Lennon Imagine official"
    },
    {
      id: 3,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      image: "https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHx2aW55bCUyMHJlY29yZHxlbnwwfHx8fDE3NDg0OTM5ODV8MA&ixlib=rb-4.1.0&q=85",
      duration: "6:30",
      youtubeQuery: "Eagles Hotel California official"
    }
  ],
  topArtists: [
    {
      id: 1,
      name: "The Beatles",
      image: "https://images.unsplash.com/photo-1575285113814-f770cb8c796e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8fDE3NDg0OTM5NzR8MA&ixlib=rb-4.1.0&q=85",
      followers: "31,234,567"
    },
    {
      id: 2,
      name: "Taylor Swift",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8fDE3NDg0OTM5NzR8MA&ixlib=rb-4.1.0&q=85",
      followers: "89,123,456"
    },
    {
      id: 3,
      name: "Drake",
      image: "https://images.unsplash.com/photo-1520170975578-25bd5217bf3d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGdlbnJlc3xlbnwwfHx8fDE3NDg0OTM5ODB8MA&ixlib=rb-4.1.0&q=85",
      followers: "67,890,123"
    }
  ],
  userPlaylists: [
    {
      id: 1,
      title: "My Favorites",
      trackCount: 127,
      image: "https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg"
    },
    {
      id: 2,
      title: "Workout Mix",
      trackCount: 45,
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
    },
    {
      id: 3,
      title: "Chill Vibes",
      trackCount: 78,
      image: "https://images.pexels.com/photos/10667620/pexels-photo-10667620.jpeg"
    }
  ]
};

// Icons
const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const LibraryIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const SkipNextIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);

const SkipPrevIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
);

const VolumeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// YouTube Player Component
export const YouTubePlayer = ({ isPlaying, currentTrack, onEnded }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (currentTrack && isPlaying) {
      // In a real implementation, you would use YouTube API here
      // For now, we'll simulate the YouTube player
      console.log(`Playing: ${currentTrack.youtubeQuery}`);
    }
  }, [isPlaying, currentTrack]);

  return (
    <div className="hidden">
      {/* Hidden YouTube player would go here */}
      <div ref={playerRef}></div>
    </div>
  );
};

// Header Component
export const Header = ({ theme, onThemeChange, user, onLogin, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  const handleGoogleLogin = () => {
    // Simulate Google OAuth flow
    setTimeout(() => {
      onLogin({
        ...MOCK_DATA.user,
        isLoggedIn: true,
        name: 'John Doe',
        email: 'john.doe@gmail.com'
      });
    }, 1000);
  };

  return (
    <div className={`${THEMES[theme].secondary} ${THEMES[theme].text} p-4 flex justify-between items-center ${THEMES[theme].border} border-b`}>
      <div className="flex items-center space-x-4">
        <h1 className={`text-xl font-bold ${THEMES[theme].accent.replace('bg-', 'text-')}`}>
          StreamFlow
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Theme Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowThemes(!showThemes)}
            className={`px-3 py-1 rounded-md ${THEMES[theme].accent} ${THEMES[theme].accentHover} text-white text-sm`}
          >
            Theme
          </button>
          {showThemes && (
            <div className={`absolute right-0 top-10 ${THEMES[theme].secondary} ${THEMES[theme].border} border rounded-lg shadow-lg z-50 w-48`}>
              {Object.entries(THEMES).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => {
                    onThemeChange(key);
                    setShowThemes(false);
                  }}
                  className={`block w-full text-left px-4 py-2 ${THEMES[theme].textSecondary} hover:${THEMES[theme].accent.replace('bg-', 'bg-')}/20 first:rounded-t-lg last:rounded-b-lg`}
                >
                  {themeData.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        {user.isLoggedIn ? (
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2"
            >
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className={THEMES[theme].textSecondary}>{user.name}</span>
            </button>
            {showProfile && (
              <div className={`absolute right-0 top-10 ${THEMES[theme].secondary} ${THEMES[theme].border} border rounded-lg shadow-lg z-50 w-48`}>
                <div className="p-4">
                  <p className={`${THEMES[theme].text} font-medium`}>{user.name}</p>
                  <p className={`${THEMES[theme].textSecondary} text-sm`}>{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setShowProfile(false);
                  }}
                  className={`block w-full text-left px-4 py-2 ${THEMES[theme].textSecondary} hover:${THEMES[theme].accent.replace('bg-', 'bg-')}/20 rounded-b-lg`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={handleGoogleLogin}
            className={`flex items-center space-x-2 px-4 py-2 ${THEMES[theme].accent} ${THEMES[theme].accentHover} rounded-lg text-white`}
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Sidebar Component
export const Sidebar = ({ theme, currentView, onViewChange, user }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'library', label: 'Your Library', icon: LibraryIcon }
  ];

  return (
    <div className={`w-64 ${THEMES[theme].secondary} ${THEMES[theme].text} h-full flex flex-col`}>
      {/* Navigation */}
      <div className="p-6">
        <nav className="space-y-4">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition-colors ${
                  currentView === item.id 
                    ? `${THEMES[theme].accent} text-white` 
                    : `${THEMES[theme].textSecondary} hover:${THEMES[theme].text}`
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Playlists */}
      {user.isLoggedIn && (
        <div className="flex-1 px-6">
          <div className={`h-px ${THEMES[theme].border} border-t mb-4`}></div>
          <h3 className={`${THEMES[theme].textSecondary} text-sm font-semibold mb-4 uppercase tracking-wider`}>
            Your Playlists
          </h3>
          <div className="space-y-2">
            {MOCK_DATA.userPlaylists.map(playlist => (
              <button
                key={playlist.id}
                className={`block w-full text-left p-2 rounded-lg ${THEMES[theme].textSecondary} hover:${THEMES[theme].text} transition-colors`}
              >
                <div className="font-medium">{playlist.title}</div>
                <div className="text-xs opacity-70">{playlist.trackCount} songs</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Music Player Component
export const MusicPlayer = ({ theme, isPlaying, onPlayPause, currentTrack, volume, onVolumeChange }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  return (
    <div className={`${THEMES[theme].secondary} ${THEMES[theme].text} ${THEMES[theme].border} border-t p-4`}>
      <div className="flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          {currentTrack ? (
            <>
              <img 
                src={currentTrack.image} 
                alt={currentTrack.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <div className={`${THEMES[theme].text} font-medium truncate`}>
                  {currentTrack.title}
                </div>
                <div className={`${THEMES[theme].textSecondary} text-sm truncate`}>
                  {currentTrack.artist}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 ${THEMES[theme].primary} rounded-lg`}></div>
              <div>
                <div className={`${THEMES[theme].textSecondary} text-sm`}>No track selected</div>
              </div>
            </div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-lg">
          <div className="flex items-center space-x-4">
            <button className={`${THEMES[theme].textSecondary} hover:${THEMES[theme].text} transition-colors`}>
              <SkipPrevIcon />
            </button>
            <button 
              onClick={onPlayPause}
              className={`${THEMES[theme].accent} ${THEMES[theme].accentHover} p-3 rounded-full text-white transition-colors`}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className={`${THEMES[theme].textSecondary} hover:${THEMES[theme].text} transition-colors`}>
              <SkipNextIcon />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className={`${THEMES[theme].textSecondary} text-xs`}>
              {Math.floor(progress * 3.6 / 60)}:{Math.floor(progress * 3.6 % 60).toString().padStart(2, '0')}
            </span>
            <div className={`flex-1 h-1 ${THEMES[theme].primary} rounded-full overflow-hidden`}>
              <div 
                className={`h-full ${THEMES[theme].accent} transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className={`${THEMES[theme].textSecondary} text-xs`}>
              {currentTrack?.duration || '0:00'}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <VolumeIcon className={`${THEMES[theme].textSecondary} w-5 h-5`} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(e.target.value)}
            className="w-24 accent-current"
          />
        </div>
      </div>
    </div>
  );
};

// Content Grid Component
export const ContentGrid = ({ theme, title, items, onItemClick, type = 'playlist' }) => {
  return (
    <div className="mb-8">
      <h2 className={`${THEMES[theme].text} text-2xl font-bold mb-6`}>{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map(item => (
          <div 
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`${THEMES[theme].secondary} p-4 rounded-lg cursor-pointer hover:${THEMES[theme].accent.replace('bg-', 'bg-')}/20 transition-all group`}
          >
            <div className="relative mb-4">
              <img 
                src={item.image} 
                alt={item.title || item.name}
                className={`w-full aspect-square object-cover ${type === 'artist' ? 'rounded-full' : 'rounded-lg'}`}
              />
              <button className={`absolute bottom-2 right-2 ${THEMES[theme].accent} p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0`}>
                <PlayIcon className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className={`${THEMES[theme].text} font-semibold mb-1 truncate`}>
                {item.title || item.name}
              </h3>
              <p className={`${THEMES[theme].textSecondary} text-sm truncate`}>
                {type === 'artist' 
                  ? `${item.followers} followers`
                  : item.description || `${item.trackCount} songs`
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Track List Component
export const TrackList = ({ theme, tracks, onTrackClick, currentTrack }) => {
  return (
    <div className="space-y-1">
      {tracks.map((track, index) => (
        <div 
          key={track.id}
          onClick={() => onTrackClick(track)}
          className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
            currentTrack?.id === track.id 
              ? `${THEMES[theme].accent}/20` 
              : `hover:${THEMES[theme].secondary}`
          }`}
        >
          <div className={`w-8 text-center ${THEMES[theme].textSecondary} text-sm`}>
            {currentTrack?.id === track.id ? <PlayIcon className="w-4 h-4 mx-auto" /> : index + 1}
          </div>
          <img 
            src={track.image} 
            alt={track.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className={`${THEMES[theme].text} font-medium truncate`}>{track.title}</div>
            <div className={`${THEMES[theme].textSecondary} text-sm truncate`}>{track.artist}</div>
          </div>
          <div className={`${THEMES[theme].textSecondary} text-sm`}>
            {track.duration}
          </div>
        </div>
      ))}
    </div>
  );
};

// Search Component
export const SearchView = ({ theme, onTrackClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    playlists: []
  });

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate search
      const filteredTracks = MOCK_DATA.recentlyPlayed.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredArtists = MOCK_DATA.topArtists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredPlaylists = MOCK_DATA.featuredPlaylists.filter(playlist =>
        playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults({
        tracks: filteredTracks,
        artists: filteredArtists,
        playlists: filteredPlaylists
      });
    } else {
      setSearchResults({ tracks: [], artists: [], playlists: [] });
    }
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${THEMES[theme].textSecondary}`} />
        <input
          type="text"
          placeholder="Search for songs, artists, or playlists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 ${THEMES[theme].secondary} ${THEMES[theme].text} ${THEMES[theme].border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-current`}
        />
      </div>

      {/* Search Results */}
      {searchQuery.length > 2 ? (
        <div className="space-y-8">
          {searchResults.tracks.length > 0 && (
            <div>
              <h3 className={`${THEMES[theme].text} text-xl font-semibold mb-4`}>Songs</h3>
              <TrackList 
                theme={theme} 
                tracks={searchResults.tracks} 
                onTrackClick={onTrackClick}
              />
            </div>
          )}
          
          {searchResults.artists.length > 0 && (
            <ContentGrid 
              theme={theme}
              title="Artists"
              items={searchResults.artists}
              onItemClick={(item) => console.log('Artist clicked:', item)}
              type="artist"
            />
          )}
          
          {searchResults.playlists.length > 0 && (
            <ContentGrid 
              theme={theme}
              title="Playlists"
              items={searchResults.playlists}
              onItemClick={(item) => console.log('Playlist clicked:', item)}
            />
          )}
          
          {searchResults.tracks.length === 0 && searchResults.artists.length === 0 && searchResults.playlists.length === 0 && (
            <div className={`text-center py-12 ${THEMES[theme].textSecondary}`}>
              <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      ) : (
        <div className={`text-center py-12 ${THEMES[theme].textSecondary}`}>
          <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Start typing to search for music...</p>
        </div>
      )}
    </div>
  );
};

export { THEMES as default };