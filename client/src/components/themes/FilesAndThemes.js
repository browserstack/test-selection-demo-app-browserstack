import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FileUtils from '../../services/fileUtils';
import ThemeUtils from '../../services/themeUtils';

function FilesAndThemes({ backgroundTheme, setBackgroundTheme, hasImageBackground, setHasImageBackground }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPEG, PNG, GIF, TXT, and PDF files are allowed');
        return;
      }
      
      setSelectedFile(file);
      
      // Automatically set theme to "image" if it's an image file
      if (file.type.startsWith('image/')) {
        setBackgroundTheme('image');
        toast.success(`Image "${file.name}" selected - will be set as background!`);
      } else {
        toast.success(`File "${file.name}" selected successfully!`);
      }
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      
      // Create a FormData object to handle file upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('backgroundTheme', backgroundTheme);
      
      // For demo purposes, we'll simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to uploaded files list
      const newUploadedFile = FileUtils.createFileObject(selectedFile, backgroundTheme);
      
      setUploadedFiles(prev => [...prev, newUploadedFile]);
      setSelectedFile(null);
      toast.success('File uploaded successfully!');
      
      // Automatically apply image as background if it's an image file
      if (newUploadedFile.isImage) {
        setBackgroundTheme('image');
        applyImageBackground(newUploadedFile.fileURL);
        toast.info('Image automatically set as background!');
      }
      
      // Reset file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (theme) => {
    setBackgroundTheme(theme);
    
    if (hasImageBackground) {
      // When image background is active, themes control text overlay styling
      ThemeUtils.applyTextThemeOverlay(theme);
    } else {
      // Normal theme behavior - control full background
      ThemeUtils.applyTheme(theme);
    }
    
    const themeDisplayName = hasImageBackground 
      ? `${theme} text overlay` 
      : (theme === 'image' ? 'Image Background' : theme);
    
    toast.success(`Theme changed to ${themeDisplayName}`);
  };

  const applyImageBackground = (imageURL) => {
    ThemeUtils.applyImageBackground(imageURL, backgroundTheme);
    setHasImageBackground(true);
    toast.success('Image background applied!');
  };

  const applyFileAsBackground = (file) => {
    if (file.isImage && file.fileURL) {
      setBackgroundTheme('image');
      applyImageBackground(file.fileURL);
    } else {
      handleThemeChange(file.backgroundTheme);
    }
  };

  const handleDeleteFile = (fileId) => {
    console.log('Delete file clicked for ID:', fileId);
    
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    
    console.log('User confirmed deletion');
    
    // Find the file to clean up its URL
    const fileToDelete = uploadedFiles.find(file => file.id === fileId);
    console.log('File to delete:', fileToDelete);
    
    if (fileToDelete && fileToDelete.fileURL) {
      FileUtils.revokeFileURL(fileToDelete.fileURL);
      
      // If this is the current background image, reset to normal themes
      if (fileToDelete.isImage && hasImageBackground) {
        console.log('Removing image background');
        const body = document.body;
        body.style.backgroundImage = '';
        body.style.backgroundSize = '';
        body.style.backgroundPosition = '';
        body.style.backgroundRepeat = '';
        body.style.backgroundAttachment = '';
        
        setHasImageBackground(false);
        
        // Apply current theme as normal background theme
        setTimeout(() => {
          handleThemeChange(backgroundTheme);
        }, 100);
        
        toast.info('Background image removed, switched to theme mode');
      }
    }
    
    setUploadedFiles(prev => {
      const newFiles = prev.filter(file => file.id !== fileId);
      console.log('Updated files list:', newFiles);
      return newFiles;
    });
    
    toast.success('File deleted successfully!');
  };

  return (
    <div className="tab-content">
      {/* Theme Selection */}
      <div className="theme-section">
        <h2>
          {hasImageBackground ? '🎨 Text Overlay Themes' : '🎨 Background Themes'}
        </h2>
        <div className="theme-selector">
          <div className="theme-options">
            {[
              { value: 'default', name: 'Default Dark', color: '#282c34' },
              { value: 'light', name: 'Light Mode', color: '#ffffff' },
              { value: 'blue', name: 'Ocean Blue', color: '#1e3a8a' },
              { value: 'green', name: 'Forest Green', color: '#166534' },
              { value: 'purple', name: 'Royal Purple', color: '#7c3aed' },
              { value: 'gradient', name: 'Sunset Gradient', color: 'linear-gradient(45deg, #ff6b6b, #ffd93d)' },
              ...(hasImageBackground ? [] : [{ value: 'image', name: 'Image Background', color: '#333' }])
            ].map(theme => (
              <button
                key={theme.value}
                className={`theme-option ${backgroundTheme === theme.value ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.value)}
                style={{ 
                  background: theme.color,
                  border: backgroundTheme === theme.value ? '3px solid #61dafb' : '2px solid #ccc'
                }}
              >
                {theme.name === 'Image Background' ? '🖼️ ' : ''}{theme.name}
              </button>
            ))}
          </div>
          <p className="theme-info">
            {hasImageBackground 
              ? `Current text overlay: ${backgroundTheme}` 
              : `Current theme: ${backgroundTheme}`
            }
          </p>
          {hasImageBackground && (
            <div className="image-mode-info">
              <p>🖼️ Image background mode active - themes control text overlay styling</p>
              <button 
                className="clear-image-btn"
                onClick={() => {
                  setHasImageBackground(false);
                  handleThemeChange(backgroundTheme);
                }}
              >
                🗑️ Remove Image Background
              </button>
            </div>
          )}
        </div>
      </div>

      {/* File Upload Section */}
      <div className="file-upload-section">
        <h2>📁 File Upload</h2>
        <form onSubmit={handleFileSubmit} className="file-upload-form">
          <div className="upload-area">
            <input
              id="fileInput"
              type="file"
              onChange={handleFileUpload}
              accept=".jpg,.jpeg,.png,.gif,.txt,.pdf"
              disabled={loading}
            />
            <div className="upload-info">
              {selectedFile ? (
                <div className="selected-file">
                  <p><strong>Selected:</strong> {selectedFile.name}</p>
                  <p><strong>Size:</strong> {FileUtils.formatFileSize(selectedFile.size)}</p>
                  <p><strong>Type:</strong> {selectedFile.type}</p>
                  {selectedFile.type.startsWith('image/') && (
                    <p className="image-notice">🖼️ <strong>This image will automatically become your background!</strong></p>
                  )}
                </div>
              ) : (
                <div className="upload-placeholder">
                  <p>📎 Choose a file to upload</p>
                  <p>🖼️ Images (JPEG, PNG, GIF) will automatically become backgrounds</p>
                  <p>📄 Also supports: TXT, PDF (Max 5MB)</p>
                </div>
              )}
            </div>
          </div>

          <div className="theme-for-file">
            <label>Background theme for this file:</label>
            <select
              value={backgroundTheme}
              onChange={(e) => setBackgroundTheme(e.target.value)}
              disabled={loading}
            >
              <option value="default">Default Dark</option>
              <option value="light">Light Mode</option>
              <option value="blue">Ocean Blue</option>
              <option value="green">Forest Green</option>
              <option value="purple">Royal Purple</option>
              <option value="gradient">Sunset Gradient</option>
              <option value="image">Use as Image Background</option>
            </select>
          </div>

          <button type="submit" disabled={loading || !selectedFile}>
            {loading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </div>

      {/* Uploaded Files List */}
      <div className="uploaded-files-section">
        <h2>📋 Uploaded Files ({uploadedFiles.length})</h2>
        {uploadedFiles.length === 0 ? (
          <p className="no-files">No files uploaded yet.</p>
        ) : (
          <div className="files-list">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-info">
                  <div className="file-header">
                    <h4>{file.name}</h4>
                    {file.isImage && (
                      <div className="image-preview">
                        <img src={file.fileURL} alt={file.name} style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '2px solid rgba(255,255,255,0.3)'
                        }} />
                      </div>
                    )}
                  </div>
                  <p>Size: {FileUtils.formatFileSize(file.size)}</p>
                  <p>Type: {file.type}</p>
                  <p>Theme: <span className="theme-badge">{file.backgroundTheme}</span></p>
                  <p>Uploaded: {new Date(file.uploadedAt).toLocaleString()}</p>
                </div>
                <div className="file-actions">
                  <button
                    className="delete-file-btn"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    🗑️ Delete
                  </button>
                  <button
                    className="apply-theme-btn"
                    onClick={() => applyFileAsBackground(file)}
                  >
                    {file.isImage && file.backgroundTheme === 'image' ? '🖼️ Set as Background' : '🎨 Apply Theme'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilesAndThemes;
