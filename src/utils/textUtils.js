export const trimString = (str, length = 30) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }
  return str;
};

// Validation regex patterns
export const namePattern = /^[A-Za-z\s]+$/; // Only alphabets and spaces
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isNameValid = (value) =>
  namePattern.test(value) && value.trim().length > 0;

// Fixed email validation function - now accepts email as parameter
export const isEmailValid = (email) => emailPattern.test(email);