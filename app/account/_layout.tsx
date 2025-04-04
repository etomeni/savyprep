import { Stack } from 'expo-router';
import AcctAuthProvider from '@/components/custom/AcctAuthProvider';

const AccountLayout = () => {
  return (
    // <AcctAuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />

        <Stack.Screen name="exam/ExamPreparation" options={{ headerShown: false }} />
        <Stack.Screen name="interview/InterviewPreparation" options={{ headerShown: false }} />

        <Stack.Screen name="ProfileInformation" options={{ headerShown: false }} />
        <Stack.Screen name="FAQ" options={{ headerShown: false }} />
        <Stack.Screen name="Subscription" options={{ headerShown: false }} />
        <Stack.Screen name="ContactUs" options={{ headerShown: false }} />

      </Stack>
    // </AcctAuthProvider>
  );
}

export default AccountLayout;
