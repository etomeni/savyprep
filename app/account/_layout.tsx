import { Stack } from 'expo-router';
import AcctAuthProvider from '@/components/custom/AcctAuthProvider';
import { kolors } from '@/constants/Colors';

const AccountLayout = () => {
  return (
    <AcctAuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />

        <Stack.Screen name="exam/ExamPreparation" options={{ headerShown: true, title: "Setup Exam Prep." }} />
        <Stack.Screen name="exam/QuestionScreen" options={{ headerShown: false, title: "Exam practice" }} />

        <Stack.Screen name="interview/InterviewPreparation" options={{ headerShown: true, title: "Setup Interview Prep." }} />
        <Stack.Screen name="interview/QuestionScreen" options={{ headerShown: true, title: "Practice Interview Questions" }} />

        <Stack.Screen name="FeedbackAnalysis" options={{ headerShown: true, title: "Feedback" }} />

        <Stack.Screen name="ProfileInformation" options={{ headerShown: true, title: "Profile Information" }} />
        <Stack.Screen name="FAQ" options={{ headerShown: true, title: "FAQ" }} />
        <Stack.Screen name="Subscription" options={{ headerShown: true, title: "Pricing" }} />
        <Stack.Screen name="ContactUs" options={{ headerShown: false, title: "Chat Us", statusBarBackgroundColor: kolors.theme.secondry }} />
        <Stack.Screen name="Testimonials" options={{ headerShown: true, title: "Testimonials" }} />

      </Stack>
    </AcctAuthProvider>
  );
}

export default AccountLayout;
