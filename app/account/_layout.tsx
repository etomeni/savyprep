import { Stack } from 'expo-router';
import AcctAuthProvider from '@/components/custom/AcctAuthProvider';

const AccountLayout = () => {
  return (
    <AcctAuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </AcctAuthProvider>
  );
}

export default AccountLayout;
