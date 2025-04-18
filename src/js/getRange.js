export function getSelectedRange() {
    return localStorage.getItem('rangeSelection') || 'daily';
  }