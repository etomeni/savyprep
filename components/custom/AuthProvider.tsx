import { PropsWithChildren } from 'react';
import { useUserStore } from '@/state/userStore';
import { Redirect } from 'expo-router';

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
    // const { IsLoggedIn } = useAuth();
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    if (isLoggedIn) return <Redirect href="/account" />;

    return children;
}

export default AuthProvider;