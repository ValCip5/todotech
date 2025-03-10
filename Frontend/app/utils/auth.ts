import { redirect } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  isAdmin: boolean
}

export async function checkAuth() {
  const token = localStorage.getItem('authToken');

  const response = await fetch('https://todotech.onrender.com/api/auth/verify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem('authToken');
    return redirect('/login');
  }

}

export async function checkAuthAdmin() {
  const token = localStorage.getItem('authToken');

  const response = await fetch('https://todotech.onrender.com/api/auth/verify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem('authToken');
    return redirect('/login');
  }

  const user = await response.json();
    
  if (!user.isAdmin) {
    return redirect('/notfound');
  };
}