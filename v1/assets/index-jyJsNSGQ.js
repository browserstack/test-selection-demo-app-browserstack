// shim: load the current built bundle when an old v1 path is requested
(function(){
  var s = document.createElement('script');
  s.type = 'module';
  s.src = '/test-selection-demo-app-browserstack/assets/index-h7QiALb6.js';
  s.crossOrigin = 'anonymous';
  s.onload = function(){console.info('Loaded replacement bundle for v1 path');};
  s.onerror = function(){console.error('Failed to load replacement bundle for v1 path');};
  document.head.appendChild(s);
})();