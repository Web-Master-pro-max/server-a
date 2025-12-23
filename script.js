// script.js - HLS Video Player with Multiple Audio Tracks
document.addEventListener('DOMContentLoaded', function() {
  // Video player elements
  const mainVideo = document.getElementById('main-video');
  const playPauseBtn = document.querySelector('.play-pause');
  const volumeBtn = document.querySelector('.volume-btn');
  const volumeSlider = document.querySelector('.volume-range');
  const progressBar = document.querySelector('.progress');
  const progressBarContainer = document.querySelector('.progress-bar');
  const progressHoverTime = document.querySelector('.progress-hover-time');
  const currentTimeEl = document.querySelector('.current-time');
  const durationEl = document.querySelector('.duration');
  const fullscreenBtn = document.querySelector('.fullscreen-btn');
  const videoPlayer = document.querySelector('.video-player');
  
  // Navigation buttons
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Auto-next checkbox
  const autoNextCheckbox = document.getElementById('auto-next');
  const autoNextLabel = document.querySelector('.auto-next-label');
  
  // Settings menu elements
  const settingsBtn = document.querySelector('.settings-btn');
  const settingsMenu = document.querySelector('.settings-menu');
  const settingsDropdown = document.querySelector('.settings-dropdown');
  
  // Playlist elements
  const playlistContainer = document.getElementById('playlist-items-container');
  const videoTitle = document.getElementById('current-video-title');
  const episodeElement = document.querySelector('.episode');
  
  // Mobile elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileTouchControls = document.querySelectorAll('.mobile-touch-controls div');
  
  // Keyboard shortcuts help
  const shortcutsHelp = document.querySelector('.shortcuts-help');
  const keyboardShortcutsBtn = document.querySelector('.keyboard-shortcuts-btn');
  const closeShortcutsBtn = document.querySelector('.close-shortcuts-btn');
  
  // Video data
  const videoData = [
    {
      id: 1,
      title: "One Punch Man: The Strongest Man",
      episode: 1,
      description: "Saitama faces the Vaccine Man in his first heroic battle.",
      hlsMaster: "videos/opm-ep1/master.m3u8",
      thumbnail: "thumbnails/opm-ep1.jpg",
      duration: "24:15",
      views: "2.4M",
      tags: ["Action", "Comedy", "Superhero"]
    },
    {
      id: 2,
      title: "One Punch Man: The Lone Cyborg",
      episode: 2,
      description: "Genos becomes Saitama's disciple after witnessing his power.",
      hlsMaster: "videos/opm-ep2/master.m3u8",
      thumbnail: "thumbnails/opm-ep2.jpg",
      duration: "23:42",
      views: "3.1M",
      tags: ["Action", "Sci-Fi", "Comedy"]
    },
    {
      id: 3,
      title: "One Punch Man: The Obsessive Scientist",
      episode: 3,
      description: "Dr. Genus creates monsters to test Saitama's strength.",
      hlsMaster: "videos/opm-ep3/master.m3u8",
      thumbnail: "thumbnails/opm-ep3.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
    {
      id: 4,
      title: "One Punch Man: Episode 4",
      episode: 4,
      description: "EP-4",
      hlsMaster: "videos/opm-ep4/master.m3u8",
      thumbnail: "thumbnails/opm-ep4.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
    {
      id: 5,
      title: "One Punch Man: Episode 5",
      episode: 5,
      description: "EP-5",
      hlsMaster: "videos/opm-ep5/master.m3u8",
      thumbnail: "thumbnails/opm-ep5.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
     {
      id: 6,
      title: "One Punch Man: Episode 6",
      episode: 6,
      description: "Episode 6",
      hlsMaster: "videos/opm-ep6/master.m3u8",
      thumbnail: "thumbnails/opm-ep6.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
     {
      id: 7,
      title: "One Punch Man: Episode 7",
      episode: 7,
      description: "Episode 7",
      hlsMaster: "videos/opm-ep7/master.m3u8",
      thumbnail: "thumbnails/opm-ep7.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
     {
      id: 8,
      title: "One Punch Man: Episode 8",
      episode: 8,
      description: "Episode 8",
      hlsMaster: "videos/opm-ep8/master.m3u8",
      thumbnail: "thumbnails/opm-ep8.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
     {
      id: 9,
      title: "One Punch Man: Episode 9",
      episode: 9,
      description: "Episode 9",
      hlsMaster: "videos/opm-ep9/master.m3u8",
      thumbnail: "thumbnails/opm-ep9.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
     {
      id: 10,
      title: "One Punch Man: Episode 10",
      episode: 10,
      description: "Episode 10",
      hlsMaster: "videos/opm-ep10/master.m3u8",
      thumbnail: "thumbnails/opm-ep10.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
     {
      id: 11,
      title: "One Punch Man: Episode 11",
      episode: 11,
      description: "Episode 11",
      hlsMaster: "videos/opm-ep11/master.m3u8",
      thumbnail: "thumbnails/opm-ep11.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    },
     {
      id: 12,
      title: "One Punch Man: Episode 12",
      episode: 12,
      description: "Episode 12",
      hlsMaster: "videos/opm-ep12/master.m3u8",
      thumbnail: "thumbnails/opm-ep12.jpg",
      duration: "24:05",
      views: "2.8M",
      tags: ["Action", "Comedy", "Monster"]
    }
  ];
  
  // Variables
  let isSettingsMenuOpen = false;
  let isMouseInSettings = false;
  let currentVideoIndex = 0;
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  let hls = null; // HLS.js instance
  let audioTracks = []; // Available audio tracks
  let currentAudioTrack = 0;
  let qualities = []; // Available quality levels
  
  // Initialize HLS
  function initHLS(videoSrc) {
    // Show loading spinner
    videoPlayer.classList.add('loading');
    
    // Destroy previous HLS instance if exists
    if (hls) {
      hls.destroy();
    }
    
    // Check if HLS.js is supported
    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      
      // Bind HLS to video element
      hls.loadSource(videoSrc);
      hls.attachMedia(mainVideo);
      
      // HLS events
      hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
        console.log('Manifest parsed, quality levels:', data.levels);
        
        // Hide loading spinner
        videoPlayer.classList.remove('loading');
        
        // Get available quality levels
        qualities = data.levels || [];
        updateQualityOptions();
        
        // Get available audio tracks
        if (hls.audioTracks && hls.audioTracks.length > 0) {
          audioTracks = hls.audioTracks;
          updateAudioOptions();
          
          // Set default audio track
          hls.audioTrack = 0;
          currentAudioTrack = 0;
          updateAudioDisplay(0);
        }
        
        // Auto-play if allowed
        mainVideo.play().catch(e => {
          console.log("Autoplay prevented:", e);
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
      });
      
      hls.on(Hls.Events.ERROR, function(event, data) {
        console.error('HLS error:', data);
        videoPlayer.classList.remove('loading');
        
        if (data.fatal) {
          switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Network error, trying to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Media error, trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              console.log('Fatal error, cannot recover');
              hls.destroy();
              break;
          }
        }
      });
      
    } else if (mainVideo.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      videoPlayer.classList.remove('loading');
      mainVideo.src = videoSrc;
      mainVideo.addEventListener('loadedmetadata', function() {
        console.log('Native HLS support detected');
        videoPlayer.classList.remove('loading');
        
        // Try to get audio tracks (limited support in native HLS)
        if (mainVideo.audioTracks && mainVideo.audioTracks.length > 0) {
          audioTracks = Array.from(mainVideo.audioTracks);
          updateAudioOptions();
        }
      });
    } else {
      console.error('HLS is not supported in this browser');
      videoPlayer.classList.remove('loading');
      alert('Your browser does not support HLS video streaming. Please use Chrome, Firefox, or Safari.');
    }
  }
  
  // Update quality options
  function updateQualityOptions() {
    const qualityDropdown = document.getElementById('quality-dropdown');
    const audioDropdown = document.getElementById('audio-dropdown');
    const audioList = document.getElementById('audio-track-list');
    
    // Clear existing options
    qualityDropdown.innerHTML = '';
    audioDropdown.innerHTML = '';
    audioList.innerHTML = '';
    
    // Add Auto quality option
    const autoOption = document.createElement('div');
    autoOption.className = 'quality-option active';
    autoOption.setAttribute('data-quality', 'auto');
    autoOption.textContent = 'Auto';
    autoOption.addEventListener('click', function(e) {
      setQuality('auto');
      closeSettingsDropdown();
    });
    qualityDropdown.appendChild(autoOption);
    
    // Add quality options
    qualities.forEach((level, index) => {
      const option = document.createElement('div');
      option.className = 'quality-option';
      option.setAttribute('data-quality', level.height + 'p');
      option.textContent = level.height + 'p';
      option.addEventListener('click', function(e) {
        setQuality(index);
        closeSettingsDropdown();
      });
      qualityDropdown.appendChild(option);
    });
    
    // Add audio track options
    if (audioTracks.length > 0) {
      audioTracks.forEach((track, index) => {
        // Settings dropdown
        const audioOption = document.createElement('div');
        audioOption.className = `audio-option ${index === 0 ? 'active' : ''}`;
        audioOption.setAttribute('data-audio-index', index);
        audioOption.innerHTML = `<i class="fas fa-volume-up"></i> ${track.name || `Track ${index + 1}`}`;
        audioOption.addEventListener('click', function(e) {
          setAudioTrack(index);
          closeSettingsDropdown();
        });
        audioDropdown.appendChild(audioOption.cloneNode(true));
        
        // Settings menu
        const settingsAudioOption = audioOption.cloneNode(true);
        settingsAudioOption.addEventListener('click', function(e) {
          setAudioTrack(index);
          closeSettingsDropdown();
        });
        audioList.appendChild(settingsAudioOption);
      });
    } else {
      // Fallback audio options
      const defaultAudioTracks = [
        { name: 'Japanese' },
        { name: 'English' }
      ];
      
      defaultAudioTracks.forEach((track, index) => {
        const audioOption = document.createElement('div');
        audioOption.className = `audio-option ${index === 0 ? 'active' : ''}`;
        audioOption.setAttribute('data-audio-index', index);
        audioOption.innerHTML = `<i class="fas fa-volume-up"></i> ${track.name}`;
        audioOption.addEventListener('click', function(e) {
          setAudioTrack(index);
          closeSettingsDropdown();
        });
        audioDropdown.appendChild(audioOption.cloneNode(true));
        audioList.appendChild(audioOption);
      });
    }
  }
  
  // Close all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll('.quality-dropdown, .audio-dropdown, .speed-dropdown').forEach(dropdown => {
      dropdown.style.display = 'none';
    });
  }
  
  // Close settings dropdown
  function closeSettingsDropdown() {
    isSettingsMenuOpen = false;
    settingsMenu.classList.remove('active');
  }
  
  // Set video quality
  function setQuality(qualityLevel) {
    if (hls) {
      if (qualityLevel === 'auto') {
        hls.currentLevel = -1; // Auto quality
        document.querySelector('.current-quality').textContent = 'Auto';
      } else {
        hls.currentLevel = qualityLevel;
        const quality = qualities[qualityLevel];
        document.querySelector('.current-quality').textContent = quality.height + 'p';
      }
      
      // Update active state
      document.querySelectorAll('.quality-option').forEach(option => {
        option.classList.remove('active');
        const optionQuality = option.getAttribute('data-quality');
        if ((qualityLevel === 'auto' && optionQuality === 'auto') || 
            (qualityLevel !== 'auto' && optionQuality === qualities[qualityLevel].height + 'p')) {
          option.classList.add('active');
        }
      });
    }
  }
  
  // Update audio display
  function updateAudioDisplay(trackIndex) {
    const trackName = audioTracks[trackIndex]?.name || (trackIndex === 0 ? 'Japanese' : 'English');
    document.querySelector('.current-audio').textContent = trackName;
    document.querySelector('.current-audio-display').innerHTML = `<i class="fas fa-volume-up"></i> ${trackName}`;
  }
  
  // Set audio track
  function setAudioTrack(trackIndex) {
    if (hls && hls.audioTracks && hls.audioTracks[trackIndex]) {
      hls.audioTrack = trackIndex;
      currentAudioTrack = trackIndex;
      updateAudioDisplay(trackIndex);
      
      // Update active state in all audio option lists
      document.querySelectorAll('.audio-option').forEach(option => {
        option.classList.remove('active');
        if (parseInt(option.getAttribute('data-audio-index')) === trackIndex) {
          option.classList.add('active');
        }
      });
      
      console.log(`Switched to audio track: ${trackIndex}`);
    }
  }
  
  // Format time function
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  // Update video time
  function updateTime() {
    if (!isNaN(mainVideo.duration) && mainVideo.duration > 0) {
      currentTimeEl.textContent = formatTime(mainVideo.currentTime);
      durationEl.textContent = formatTime(mainVideo.duration);
      
      const progressPercent = (mainVideo.currentTime / mainVideo.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  }
  
  // Update hover time on progress bar
  function updateHoverTime(e) {
    if (isNaN(mainVideo.duration) || mainVideo.duration <= 0) return;
    
    const progressBarWidth = progressBarContainer.clientWidth;
    const rect = progressBarContainer.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const hoverTime = (clickPosition / progressBarWidth) * mainVideo.duration;
    
    progressHoverTime.textContent = formatTime(hoverTime);
    const percent = Math.min(Math.max((clickPosition / progressBarWidth) * 100, 0), 100);
    progressHoverTime.style.left = `${percent}%`;
  }
  
  // Play/Pause functionality
  function togglePlayPause() {
    if (mainVideo.paused) {
      mainVideo.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      mainVideo.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
  
  playPauseBtn.addEventListener('click', togglePlayPause);
  
  // Mobile touch controls
  mobileTouchControls.forEach(control => {
    control.addEventListener('click', function(e) {
      e.stopPropagation();
      const action = this.getAttribute('data-action');
      
      switch(action) {
        case 'play-pause':
          togglePlayPause();
          break;
        case 'rewind':
          mainVideo.currentTime = Math.max(0, mainVideo.currentTime - 10);
          break;
        case 'forward':
          mainVideo.currentTime = Math.min(mainVideo.duration, mainVideo.currentTime + 10);
          break;
      }
      
      // Show feedback
      this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      setTimeout(() => {
        this.style.backgroundColor = '';
      }, 200);
    });
  });
  
  // Video end handler for auto-next
  mainVideo.addEventListener('ended', function() {
    if (autoNextCheckbox.checked) {
      playNextVideo();
    }
  });
  
  // Previous video
  function playPreviousVideo() {
    if (currentVideoIndex > 0) {
      currentVideoIndex--;
      loadVideo(currentVideoIndex);
    } else {
      // Loop to last video
      currentVideoIndex = videoData.length - 1;
      loadVideo(currentVideoIndex);
    }
  }
  
  // Next video
  function playNextVideo() {
    if (currentVideoIndex < videoData.length - 1) {
      currentVideoIndex++;
      loadVideo(currentVideoIndex);
    } else {
      // Loop to first video
      currentVideoIndex = 0;
      loadVideo(currentVideoIndex);
    }
  }
  
  prevBtn.addEventListener('click', playPreviousVideo);
  nextBtn.addEventListener('click', playNextVideo);
  
  // Update play/pause button
  mainVideo.addEventListener('play', function() {
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  });
  
  mainVideo.addEventListener('pause', function() {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  });
  
  // Volume control
  volumeBtn.addEventListener('click', function() {
    if (mainVideo.volume > 0) {
      mainVideo.volume = 0;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      volumeSlider.value = 0;
    } else {
      mainVideo.volume = 1;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      volumeSlider.value = 100;
    }
  });
  
  volumeSlider.addEventListener('input', function() {
    const volume = volumeSlider.value / 100;
    mainVideo.volume = volume;
    
    if (volume === 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });
  
  // Show volume slider on hover (desktop only)
  if (!isMobile) {
    volumeBtn.addEventListener('mouseenter', function() {
      volumeSlider.style.display = 'block';
    });
    
    volumeBtn.addEventListener('mouseleave', function(e) {
      if (!volumeBtn.matches(':hover') && !volumeSlider.matches(':hover')) {
        volumeSlider.style.display = 'none';
      }
    });
    
    volumeSlider.addEventListener('mouseleave', function() {
      if (!volumeBtn.matches(':hover')) {
        volumeSlider.style.display = 'none';
      }
    });
  } else {
    // Mobile: toggle volume slider on click
    volumeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      volumeSlider.style.display = volumeSlider.style.display === 'block' ? 'none' : 'block';
    });
    
    // Hide volume slider when clicking elsewhere
    document.addEventListener('click', function(e) {
      if (!volumeBtn.contains(e.target) && !volumeSlider.contains(e.target)) {
        volumeSlider.style.display = 'none';
      }
    });
  }
  
  // Progress bar functionality
  progressBarContainer.addEventListener('mousemove', updateHoverTime);
  progressBarContainer.addEventListener('touchmove', function(e) {
    if (isMobile) {
      const touch = e.touches[0];
      const fakeMouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      updateHoverTime(fakeMouseEvent);
    }
  });
  
  progressBarContainer.addEventListener('click', function(e) {
    if (isNaN(mainVideo.duration) || mainVideo.duration <= 0) return;
    
    const progressBarWidth = this.clientWidth;
    const rect = this.getBoundingClientRect();
    const clickPosition = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left;
    const seekTime = (clickPosition / progressBarWidth) * mainVideo.duration;
    mainVideo.currentTime = seekTime;
  });
  
  // Touch support for progress bar
  progressBarContainer.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const fakeMouseEvent = new MouseEvent('click', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.dispatchEvent(fakeMouseEvent);
  });
  
  // Fullscreen functionality
  fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
      } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
      } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  });
  
  // Update time as video plays
  mainVideo.addEventListener('timeupdate', updateTime);
  
  // Settings menu functionality - FIXED
  settingsBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    // Toggle settings menu
    isSettingsMenuOpen = !isSettingsMenuOpen;
    settingsMenu.classList.toggle('active', isSettingsMenuOpen);
    
    // Close other dropdowns
    closeAllDropdowns();
  });
  
  // Close settings when clicking outside - FIXED
  document.addEventListener('click', function(event) {
    // If settings menu is open and user clicks outside of it
    if (isSettingsMenuOpen && !settingsMenu.contains(event.target) && !settingsBtn.contains(event.target)) {
      closeSettingsDropdown();
    }
    
    // Close other dropdowns when clicking outside
    if (!event.target.closest('.quality-selector') && 
        !event.target.closest('.audio-selector') && 
        !event.target.closest('.playback-speed-selector')) {
      closeAllDropdowns();
    }
  });
  
  // Close settings with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isSettingsMenuOpen) {
      closeSettingsDropdown();
    }
  });
  
  // Handle speed options in settings dropdown
  document.querySelectorAll('.settings-dropdown .speed-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      const speed = this.getAttribute('data-speed');
      mainVideo.playbackRate = parseFloat(speed);
      document.querySelector('.current-speed').textContent = speed === '1' ? '1x' : `${speed}x`;
      
      // Update all speed options
      document.querySelectorAll('.speed-option').forEach(opt => {
        opt.classList.remove('active');
      });
      this.classList.add('active');
      
      // Don't close dropdown immediately on desktop, allow user to make more changes
      if (isMobile) {
        closeSettingsDropdown();
      }
    });
  });
  
  // Handle subtitle options in settings dropdown
  document.querySelectorAll('.settings-dropdown .subtitle-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      const subtitle = this.getAttribute('data-subtitle');
      console.log(`Subtitle changed to: ${subtitle}`);
      
      // Update all subtitle options
      document.querySelectorAll('.subtitle-option').forEach(opt => {
        opt.classList.remove('active');
      });
      this.classList.add('active');
      
      if (isMobile) {
        closeSettingsDropdown();
      }
    });
  });
  
  // Initialize playlist
  function initializePlaylist() {
    playlistContainer.innerHTML = '';
    
    videoData.forEach((video, index) => {
      const playlistItem = document.createElement('div');
      playlistItem.className = `playlist-item ${index === currentVideoIndex ? 'active' : ''}`;
      playlistItem.setAttribute('data-index', index);
      
      playlistItem.innerHTML = `
        <div class="item-thumbnail">
          <img src="${video.thumbnail}" alt="${video.title}" style="width:100%;height:100%;object-fit:cover;">
          <div class="item-overlay">
            <i class="fas fa-play"></i>
          </div>
          <div class="item-duration">${video.duration}</div>
        </div>
        <div class="item-info">
          <h4 class="item-title">Episode ${video.episode}: ${video.title}</h4>
          <div class="item-meta">
            <span class="item-views">${video.views} views</span>
            <span class="item-duration">${video.duration}</span>
          </div>
          ${index === currentVideoIndex ? '<div class="item-status"><span class="item-watched"><i class="fas fa-check-circle"></i> Watching</span></div>' : ''}
        </div>
      `;
      
      playlistItem.addEventListener('click', function() {
        currentVideoIndex = index;
        loadVideo(index);
        
        // Update playlist active states
        document.querySelectorAll('.playlist-item').forEach(item => {
          item.classList.remove('active');
          const statusDiv = item.querySelector('.item-status');
          if (statusDiv) statusDiv.remove();
        });
        this.classList.add('active');
        
        // Add watching status
        const statusDiv = document.createElement('div');
        statusDiv.className = 'item-status';
        statusDiv.innerHTML = '<span class="item-watched"><i class="fas fa-check-circle"></i> Watching</span>';
        this.querySelector('.item-info').appendChild(statusDiv);
        
        // Scroll into view on mobile
        if (isMobile && window.innerWidth < 768) {
          this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      
      playlistContainer.appendChild(playlistItem);
    });
  }
  
  // Load video
  function loadVideo(index) {
    const video = videoData[index];
    
    // Update UI
    videoTitle.textContent = video.title;
    episodeElement.textContent = `Episode ${video.episode}`;
    document.querySelector('.description-text').textContent = video.description;
    
    // Update tags
    const tagsContainer = document.querySelector('.video-tags');
    tagsContainer.innerHTML = '';
    video.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
    
    // Load HLS video
    initHLS(video.hlsMaster);
    
    // Update episode count
    document.querySelector('.episode-count').textContent = `(${videoData.length} episodes)`;
  }
  
  // Mobile navigation
  mobileMenuBtn.addEventListener('click', function() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  mobileNavClose.addEventListener('click', function() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  mobileNavOverlay.addEventListener('click', function() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Don't trigger shortcuts when user is typing
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key.toLowerCase()) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlayPause();
        break;
        
      case 'f':
        e.preventDefault();
        fullscreenBtn.click();
        break;
        
      case 'm':
        e.preventDefault();
        volumeBtn.click();
        break;
        
      case 'arrowleft':
        e.preventDefault();
        mainVideo.currentTime = Math.max(0, mainVideo.currentTime - 10);
        break;
        
      case 'arrowright':
        e.preventDefault();
        mainVideo.currentTime = Math.min(mainVideo.duration, mainVideo.currentTime + 10);
        break;
        
      case 'arrowup':
        e.preventDefault();
        mainVideo.volume = Math.min(1, mainVideo.volume + 0.1);
        volumeSlider.value = mainVideo.volume * 100;
        break;
        
      case 'arrowdown':
        e.preventDefault();
        mainVideo.volume = Math.max(0, mainVideo.volume - 0.1);
        volumeSlider.value = mainVideo.volume * 100;
        break;
        
      case 'n':
        e.preventDefault();
        playNextVideo();
        break;
        
      case 'p':
        e.preventDefault();
        playPreviousVideo();
        break;
        
      // Audio track switching shortcuts
      case '1':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setAudioTrack(0); // Japanese
        }
        break;
        
      case '2':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setAudioTrack(1); // English
        }
        break;
        
      // Jump to percentage with number keys
      case '0': case '3': case '4': case '5': case '6':
      case '7': case '8': case '9':
        e.preventDefault();
        const percent = parseInt(e.key) / 10;
        mainVideo.currentTime = mainVideo.duration * percent;
        break;
        
      case '?':
        e.preventDefault();
        shortcutsHelp.classList.add('active');
        break;
        
      case 'escape':
        e.preventDefault();
        closeSettingsDropdown();
        shortcutsHelp.classList.remove('active');
        break;
    }
  });
  
  // Keyboard shortcuts help
  keyboardShortcutsBtn.addEventListener('click', function() {
    shortcutsHelp.classList.add('active');
  });
  
  closeShortcutsBtn.addEventListener('click', function() {
    shortcutsHelp.classList.remove('active');
  });
  
  shortcutsHelp.addEventListener('click', function(e) {
    if (e.target === shortcutsHelp) {
      shortcutsHelp.classList.remove('active');
    }
  });
  
  // Auto-next checkbox styling
  autoNextCheckbox.addEventListener('change', function() {
    if (this.checked) {
      autoNextLabel.style.color = '#00a8ff';
      autoNextLabel.title = 'Auto play next episode: ON';
    } else {
      autoNextLabel.style.color = '#ffffff';
      autoNextLabel.title = 'Auto play next episode: OFF';
    }
  });
  
  // Dropdown toggle for settings bar (quality, audio, speed selectors)
  document.querySelectorAll('.settings-btn:not(.settings-btn i)').forEach(btn => {
    if (!btn.closest('.settings-menu')) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.nextElementSibling;
        const isVisible = dropdown.style.display === 'block';
        
        // Close all dropdowns first
        closeAllDropdowns();
        
        // Toggle current dropdown
        if (!isVisible) {
          dropdown.style.display = 'block';
        }
      });
    }
  });
  
  // Close dropdowns when clicking on dropdown options (for settings bar)
  document.querySelectorAll('.quality-dropdown .quality-option, .audio-dropdown .audio-option, .speed-dropdown .speed-option').forEach(option => {
    option.addEventListener('click', function() {
      closeAllDropdowns();
    });
  });
  
  // iOS specific fixes
  if (isIOS) {
    // Force playsinline on iOS
    mainVideo.setAttribute('playsinline', '');
    mainVideo.setAttribute('webkit-playsinline', '');
    
    // Prevent iOS from hijacking video playback
    document.addEventListener('touchstart', function() {}, {passive: true});
  }
  
  // Handle orientation changes
  window.addEventListener('orientationchange', function() {
    setTimeout(function() {
      // Refresh video dimensions
      mainVideo.style.height = 'auto';
      mainVideo.style.width = '100%';
      closeAllDropdowns();
      closeSettingsDropdown();
    }, 100);
  });
  
  // Handle resize events
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Update mobile detection
      isMobile = window.innerWidth < 768;
      // Close all dropdowns on resize
      closeAllDropdowns();
      closeSettingsDropdown();
    }, 250);
  });
  
  // Initialize
  function initializePlayer() {
    initializePlaylist();
    loadVideo(currentVideoIndex);
    
    // Initialize auto-next styling
    if (autoNextCheckbox.checked) {
      autoNextLabel.style.color = '#00a8ff';
      autoNextLabel.title = 'Auto play next episode: ON';
    }
  }
  
  // Start the player
  initializePlayer();
});