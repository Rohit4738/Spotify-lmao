import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Header, 
  Sidebar, 
  MusicPlayer, 
  ContentGrid, 
  TrackList, 
  SearchView,
  YouTubePlayer
} from './components';
import THEMES from './components';

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
    },
    {
      id: 4,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      image: "https://images.pexels.com/photos/10933700/pexels-photo-10933700.jpeg",
      duration: "8:02",
      youtubeQuery: "Led Zeppelin Stairway to Heaven official"
    },
    {
      id: 5,
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      image: "https://images.unsplash.com/photo-1576514129883-2f1d47a65da6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2V8ZW58MHx8fHwxNzQ4NDkzOTg5fDA&ixlib=rb-4.1.0&q=85",
      duration: "5:03",
      youtubeQuery: "Guns N Roses Sweet Child O Mine official"
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
    },
    {
      id: 4,
      name: "Adele",
      image: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxjb25jZXJ0JTIwc3RhZ2V8ZW58MHx8fHwxNzQ4NDkzOTg5fDA&ixlib=rb-4.1.0&q=85",
      followers: "45,678,901"
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

function App() {
  // State management
  const [currentTheme, setCurrentTheme] = useState('dark-ocean');
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(MOCK_DATA.user);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(70);

  // Load saved theme and user session from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('streamflow-theme');
    const savedUser = localStorage.getItem('streamflow-user');
    
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing saved user:', e);
      }
    }
  }, []);

  // Event handlers
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('streamflow-theme', theme);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('streamflow-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    const loggedOutUser = { ...MOCK_DATA.user, isLoggedIn: false };
    setUser(loggedOutUser);
    localStorage.removeItem('streamflow-user');
    setCurrentView('home');
  };

  const handlePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
      // In a real app, this would control YouTube player
      if (!isPlaying) {
        console.log(`Playing: ${currentTrack.youtubeQuery}`);
        // window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(currentTrack.youtubeQuery)}`, '_blank');
      }
    }
  };

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // In a real implementation, this would start YouTube playback
    console.log(`Now playing: ${track.title} by ${track.artist}`);
    console.log(`YouTube search: ${track.youtubeQuery}`);
    
    // Simulate opening YouTube in new tab for demonstration
    // window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(track.youtubeQuery)}`, '_blank');
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    // In a real app, this would control YouTube player volume
  };

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
    // Handle playlist/album/artist clicks
  };

  // Render content based on current view
  const renderMainContent = () => {
    const theme = THEMES[currentTheme];

    switch (currentView) {
      case 'search':
        return <SearchView theme={currentTheme} onTrackClick={handleTrackClick} />;
        
      case 'library':
        if (!user.isLoggedIn) {
          return (
            <div className={`text-center py-20 ${theme.textSecondary}`}>
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className={`${theme.text} text-2xl font-bold mb-2`}>Sign in to access your library</h2>
              <p className="mb-6">Save songs, create playlists, and more</p>
              <button 
                onClick={() => handleLogin({...MOCK_DATA.user, isLoggedIn: true})}
                className={`${theme.accent} ${theme.accentHover} px-6 py-3 rounded-lg text-white font-medium`}
              >
                Sign in with Google
              </button>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            <ContentGrid 
              theme={currentTheme}
              title="Your Playlists"
              items={MOCK_DATA.userPlaylists}
              onItemClick={handleItemClick}
            />
          </div>
        );
        
      default: // home
        return (
          <div className="space-y-8">
            <ContentGrid 
              theme={currentTheme}
              title="Featured Playlists"
              items={MOCK_DATA.featuredPlaylists}
              onItemClick={handleItemClick}
            />
            
            <div>
              <h2 className={`${theme.text} text-2xl font-bold mb-6`}>Recently Played</h2>
              <TrackList 
                theme={currentTheme}
                tracks={MOCK_DATA.recentlyPlayed}
                onTrackClick={handleTrackClick}
                currentTrack={currentTrack}
              />
            </div>
            
            <ContentGrid 
              theme={currentTheme}
              title="Popular Artists"
              items={MOCK_DATA.topArtists}
              onItemClick={handleItemClick}
              type="artist"
            />
          </div>
        );
    }
  };

  const theme = THEMES[currentTheme];

  return (
    <div className={`min-h-screen ${theme.primary} flex flex-col`}>
      {/* Header */}
      <Header 
        theme={currentTheme}
        onThemeChange={handleThemeChange}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          theme={currentTheme}
          currentView={currentView}
          onViewChange={setCurrentView}
          user={user}
        />
        
        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto p-8 ${theme.gradient} bg-gradient-to-br`}>
          {renderMainContent()}
        </main>
      </div>
      
      {/* Music Player */}
      <MusicPlayer 
        theme={currentTheme}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        currentTrack={currentTrack}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
      
      {/* YouTube Player (hidden) */}
      <YouTubePlayer 
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default App;