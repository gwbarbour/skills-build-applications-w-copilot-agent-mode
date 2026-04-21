// API utility functions for connecting to the Django REST backend

export const getApiBaseUrl = () => {
  // Use the GitHub Codespace hostname if available
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
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
