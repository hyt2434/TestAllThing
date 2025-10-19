import { Routes, useLocation } from 'react-router-dom';

function AuthPage() {
  const location = useLocation();
  const isSignUp = location.pathname.includes('signup');
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <p className="mt-4">
        {isSignUp 
          ? 'Create a new account to access all features.' 
          : 'Sign in to your account to manage bookings and preferences.'}
      </p>
    </div>
  );
}

export default AuthPage;