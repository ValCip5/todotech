export function isAuthenticated(): boolean {
    // Example: Check if a token exists in localStorage
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if token exists, false otherwise
  }