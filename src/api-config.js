let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'vitawallet.io') {
  backendHost = 'https://vitawallet.io';
} else if(hostname === 'staging.vitawallet.io') {
  backendHost = 'https://staging.api.vitawallet.io';
} else if(/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000';
}

export const API_ROOT = backendHost + '/api';