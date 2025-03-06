import { redirect } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

export async function checkAuth() {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return redirect('/login');
  }

  return token;
}

export async function checkAuthAdmin() {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return redirect('/notfound');
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    
    if (!decodedToken.isAdmin) {
      return redirect('/notfound');
    }
    return decodedToken;
  } catch (error) {
    return redirect('/notfound');
  }
}

