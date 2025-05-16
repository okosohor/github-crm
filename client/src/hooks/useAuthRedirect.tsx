import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRemoveTokens = () => {
      navigate('/');
    };

    window.addEventListener('removeTokens', handleRemoveTokens);

    return () => {
      window.removeEventListener('removeTokens', handleRemoveTokens);
    };
  }, [navigate]);
}
