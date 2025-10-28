import { clsx } from 'clsx'

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatDate(date, locale = 'en') {
  try {
    if (!date) return '';
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  } catch {
    return '';
  }
}

export function debounce(func, wait) {
  if (typeof func !== 'function') throw new Error('First argument must be a function');
  if (typeof wait !== 'number' || wait < 0) throw new Error('Wait time must be a positive number');
  
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  if (typeof func !== 'function') throw new Error('First argument must be a function');
  if (typeof limit !== 'number' || limit < 0) throw new Error('Limit must be a positive number');
  
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function lerp(start, end, factor) {
  if (typeof start !== 'number' || typeof end !== 'number' || typeof factor !== 'number') {
    throw new Error('All arguments must be numbers');
  }
  return start + (end - start) * factor;
}

export function clamp(value, min, max) {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('All arguments must be numbers');
  }
  return Math.min(Math.max(value, min), max);
}

// Sanitize HTML to prevent XSS
export function sanitizeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Safe text truncation
export function truncateText(text, maxLength = 100) {
  if (typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}