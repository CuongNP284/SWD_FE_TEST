import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cookieUtils } from '@/utils/cookies';
import { useAuthenticateMutation, useLogoutMutation } from '@/state/api/authApi';

export const useAuth = () => {
    const router = useRouter();
    const [authenticate] = useAuthenticateMutation();
    const [logout] = useLogoutMutation();
    
    const saveToken = useCallback((response: AuthResponse) => {
        console.log(JSON.stringify(response.role));
        cookieUtils.setTokens({accessToken: response.accessToken, roles: response.role});
    }, []);

    const delToken = useCallback(() => {
        cookieUtils.clearTokens();
      }, []);
  
    const handleLogin = useCallback( async (data: AuthRequest) => {
        const response = await authenticate(data).unwrap();
        console.log(JSON.stringify(response));
        saveToken(response);
        router.push('/');
    }, [router, saveToken]);

    const handleLogout = useCallback( async (token : string) => {
        const response = await logout({token});
        delToken();
        router.push('/signin');
    }, [router, saveToken]);

    return {
      handleLogin,
      handleLogout,
      saveToken
    };
  };