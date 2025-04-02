import { PropsWithChildren } from 'react';
import { Redirect } from 'expo-router';
import { useUserStore } from '@/state/userStore';

const AcctAuthProvider: React.FC<PropsWithChildren> = ({children}) => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    // const userData = useUserStore((state) => state.userData);

    // if (!isLoggedIn || !userData.userId) return <Redirect href="/auth/Login" />;
    if (!isLoggedIn) return <Redirect href="/auth/login" />;

    return children;
}

export default AcctAuthProvider;