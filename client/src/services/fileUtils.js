// File utility functions
const FileUtils = {
  // Format file size to human-readable format
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  // Create a file object to store in state
  createFileObject: (file, backgroundTheme) => {
    const fileURL = URL.createObjectURL(file);
    
    return {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      backgroundTheme: backgroundTheme,
      uploadedAt: new Date().toISOString(),
      fileURL: fileURL,
      isImage: file.type.startsWith('image/')
    };
  },
  
  // Clean up file URL to prevent memory leaks
  revokeFileURL: (fileURL) => {
    if (fileURL) {
      URL.revokeObjectURL(fileURL);
    }
  }
};

export default FileUtils;
