import { Stack } from 'expo-router';
import AuthProvider from '@/components/custom/AuthProvider';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* <Stack.Screen name="signup" options={{ headerShown: false }} />

        <Stack.Screen name="verify-email" options={{ headerShown: false }} />

        <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" options={{ headerShown: false }} /> */}
      </Stack>
    </AuthProvider>
  );
}

export default AuthLayout;
