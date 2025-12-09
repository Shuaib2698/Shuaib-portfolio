// app/utils/dataStorage.js
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PASSWORD_FILE = path.join(DATA_DIR, 'admin_password.json');
const TOKENS_FILE = path.join(DATA_DIR, 'tokens.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
function initializeFile(filePath, defaultValue = {}) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
  }
}

// Initialize all data files
initializeFile(PASSWORD_FILE, { 
  hash: "$2b$10$SHD/onD/oKYRaMZzCsTjh.jfOtRHfUrrBESjIObh1NHRcyyZT2oJG",
  updatedAt: new Date().toISOString()
});

initializeFile(TOKENS_FILE, {});

// Password Store
export const passwordStore = {
  get: () => {
    try {
      const data = JSON.parse(fs.readFileSync(PASSWORD_FILE, 'utf8'));
      return data.hash;
    } catch (error) {
      console.error('Error reading password:', error);
      return process.env.ADMIN_PASSWORD_HASH || 
        "$2b$10$SHD/onD/oKYRaMZzCsTjh.jfOtRHfUrrBESjIObh1NHRcyyZT2oJG";
    }
  },
  
  set: (newHash) => {
    try {
      const data = {
        hash: newHash,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(PASSWORD_FILE, JSON.stringify(data, null, 2));
      // Also update environment variable for current session
      process.env.ADMIN_PASSWORD_HASH = newHash;
      return true;
    } catch (error) {
      console.error('Error saving password:', error);
      return false;
    }
  }
};

// Token Store (persistent version)
export const tokenStore = {
  set: (token, data) => {
    try {
      const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));
      tokens[token] = data;
      fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },
  
  get: (token) => {
    try {
      const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));
      return tokens[token];
    } catch (error) {
      console.error('Error reading token:', error);
      return null;
    }
  },
  
  delete: (token) => {
    try {
      const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));
      delete tokens[token];
      fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  },
  
  has: (token) => {
    try {
      const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));
      return !!tokens[token];
    } catch (error) {
      console.error('Error checking token:', error);
      return false;
    }
  }
};