import { Stack } from 'expo-router';
import AuthProvider from '@/components/custom/AuthProvider';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />

        <Stack.Screen name="signup" options={{ headerShown: false }} />

        <Stack.Screen name="ForgetPassword" options={{ headerShown: true, title: "Forget Password?" }} />

        <Stack.Screen name="VerifyEmail" options={{ headerShown: true, title: "Verification" }} />
        <Stack.Screen name="ResetPassword" options={{ headerShown: true, title: "New Password" }} />
      </Stack>
    </AuthProvider>
  );
}

export default AuthLayout;
