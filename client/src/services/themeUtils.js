// Theme utility functions
const ThemeUtils = {
  // Apply theme to body when no image background is active
  applyTheme: (theme) => {
    const body = document.body;
    const appHeader = document.querySelector('.App-header');
    
    // Clear all existing theme classes and styles
    body.className = body.className.replace(/theme-\w+/g, '');
    body.style.backgroundImage = '';
    body.style.backgroundSize = '';
    body.style.backgroundPosition = '';
    body.style.backgroundRepeat = '';
    body.style.backgroundAttachment = '';
    
    // Reset header styles
    if (appHeader) {
      appHeader.style.background = '';
      appHeader.style.backdropFilter = '';
      appHeader.style.color = '';
    }
    
    if (theme !== 'image') {
      // Apply the selected color/gradient theme
      body.classList.add(`theme-${theme}`);
      
      // Set appropriate header styles for each theme
      if (appHeader) {
        switch(theme) {
          case 'light':
            appHeader.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
            appHeader.style.color = '#1e293b';
            break;
          case 'blue':
            appHeader.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)';
            break;
          case 'green':
            appHeader.style.background = 'linear-gradient(135deg, rgba(22, 101, 52, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%)';
            break;
          case 'purple':
            appHeader.style.background = 'linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%)';
            break;
          case 'gradient':
            appHeader.style.background = 'rgba(0, 0, 0, 0.7)';
            appHeader.style.backdropFilter = 'blur(10px)';
            break;
          default:
            appHeader.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
      }
    }
  },

  // Apply text theme overlay when image background is active
  applyTextThemeOverlay: (theme) => {
    const appHeader = document.querySelector('.App-header');
    if (!appHeader) return;
    
    // Keep the background image but change text overlay styling
    switch(theme) {
      case 'light':
        appHeader.style.background = 'rgba(255, 255, 255, 0.9)';
        appHeader.style.color = '#1e293b';
        appHeader.style.backdropFilter = 'blur(10px)';
        break;
      case 'dark':
      case 'default':
        appHeader.style.background = 'rgba(0, 0, 0, 0.8)';
        appHeader.style.color = 'white';
        appHeader.style.backdropFilter = 'blur(10px)';
        break;
      case 'blue':
        appHeader.style.background = 'rgba(30, 58, 138, 0.9)';
        appHeader.style.color = 'white';
        appHeader.style.backdropFilter = 'blur(5px)';
        break;
      case 'green':
        appHeader.style.background = 'rgba(22, 101, 52, 0.9)';
        appHeader.style.color = 'white';
        appHeader.style.backdropFilter = 'blur(5px)';
        break;
      case 'purple':
        appHeader.style.background = 'rgba(124, 58, 237, 0.9)';
        appHeader.style.color = 'white';
        appHeader.style.backdropFilter = 'blur(5px)';
        break;
      case 'gradient':
        appHeader.style.background = 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 217, 61, 0.8), rgba(78, 205, 196, 0.8), rgba(69, 183, 209, 0.8))';
        appHeader.style.color = 'white';
        appHeader.style.backdropFilter = 'blur(8px)';
        break;
      default:
        appHeader.style.background = 'rgba(0, 0, 0, 0.7)';
        appHeader.style.color = 'white';
        appHeader.style.backdropFilter = 'blur(5px)';
    }
  },

  // Apply image as background
  applyImageBackground: (imageURL, backgroundTheme) => {
    const body = document.body;
    const appHeader = document.querySelector('.App-header');
    
    // Clear theme classes but keep background image
    body.className = body.className.replace(/theme-\w+/g, '');
    body.style.backgroundImage = `url(${imageURL})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundAttachment = 'fixed';
    
    // Apply current theme as text overlay
    ThemeUtils.applyTextThemeOverlay(backgroundTheme);
  },
};

export default ThemeUtils;
