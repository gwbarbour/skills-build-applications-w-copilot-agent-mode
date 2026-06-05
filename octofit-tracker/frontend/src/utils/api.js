// API utility functions for connecting to the Django REST backend

export const getApiBaseUrl = () => {
  // Use the GitHub Codespace hostname if available
  let codespaceName = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME;

  if (codespaceName) {
    // strip any trailing -<port> (e.g. -3000) from the variable
    codespaceName = codespaceName.replace(/-\d+$/, '');
    // ensure we always point to port 8000
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  // If running inside a Codespace web preview, derive the Codespace name from
  // the current hostname (e.g. <name>-3000.app.github.dev) and switch port to 8000.
  try {
    if (typeof window !== 'undefined' && window.location && window.location.hostname.endsWith('.app.github.dev')) {
      const host = window.location.hostname; // e.g. my-codespace-3000.app.github.dev
      const m = host.match(/^(.+?)-\d+\.app\.github\.dev$/);
      if (m) {
        const name = m[1];
        return `https://${name}-8000.app.github.dev/api`;
      }
      // fallback: replace any trailing -<port>.app.github.dev
      const replaced = host.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
      return `https://${replaced}/api`;
    }
  } catch (e) {
    // ignore and fall back to localhost
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000/api';
};

export const formatApiURL = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/${endpoint}/`;
};

export const parseData = (data) => {
  // Handle both paginated responses (.results) and plain array responses
  if (data && data.results && Array.isArray(data.results)) {
    console.log('Paginated response detected, extracting results');
    return data.results;
  }
  
  if (Array.isArray(data)) {
    console.log('Plain array response detected');
    return data;
  }
  
  console.warn('Unexpected data format:', data);
  return [];
};
