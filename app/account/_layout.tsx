import { Stack } from 'expo-router';
import AcctAuthProvider from '@/components/custom/AcctAuthProvider';

const AccountLayout = () => {
  return (
    // <AcctAuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />

        <Stack.Screen name="exam/ExamPreparation" options={{ headerShown: false }} />
        <Stack.Screen name="exam/QuestionScreen" options={{ headerShown: false }} />
        <Stack.Screen name="interview/InterviewPreparation" options={{ headerShown: false }} />
        <Stack.Screen name="interview/QuestionScreen" options={{ headerShown: false }} />
        <Stack.Screen name="FeedbackAnalysis" options={{ headerShown: false }} />

        <Stack.Screen name="ProfileInformation" options={{ headerShown: false }} />
        <Stack.Screen name="FAQ" options={{ headerShown: false }} />
        <Stack.Screen name="Subscription" options={{ headerShown: false }} />
        <Stack.Screen name="ContactUs" options={{ headerShown: false }} />
        <Stack.Screen name="Testimonials" options={{ headerShown: false }} />

      </Stack>
    // </AcctAuthProvider>
  );
}

export default AccountLayout;
