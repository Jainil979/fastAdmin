/**
 * Format a date value for display in the table.
 * @param {string|Date} value - ISO date string or Date object
 * @param {boolean} isDate - true if only date, false if datetime
 * @returns {string} formatted string
 */
export const formatDateForDisplay = (value, isDate = false) => {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date)) return String(value);

  if (isDate) {
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
  } else {
    // Format as YYYY-MM-DD HH:mm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
};

/**
 * Format a date value for input fields (date or datetime-local).
 * @param {string|Date} value - ISO date string or Date object
 * @param {boolean} isDate - true if only date, false if datetime
 * @returns {string} formatted string (YYYY-MM-DD or YYYY-MM-DDTHH:mm)
 */
export const formatDateForInput = (value, isDate = false) => {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date)) return '';

  if (isDate) {
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
  } else {
    // Format as YYYY-MM-DDTHH:mm (no seconds, no milliseconds)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
};