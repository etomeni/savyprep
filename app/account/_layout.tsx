import { router, Stack } from 'expo-router';
import AcctAuthProvider from '@/components/custom/AcctAuthProvider';
import { kolors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { registerForPushNotificationsAsync } from '@/util/PushNotifications';
import { useAuthHook } from '@/hooks/useAuthHook';
// import AntDesign from '@expo/vector-icons/AntDesign';

const AccountLayout = () => {
  const { setPushNotificationToken } = useAuthHook();

  useEffect(() => {
    registerForPushNotificationsAsync()
    	.then(token => setPushNotificationToken(token ?? ''))
    	// .catch((error: any) => setExpoPushToken(`${error}`));
  }, []);	

  return (
    <AcctAuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{headerShown: false, statusBarBackgroundColor: kolors.theme.secondry }} />

        <Stack.Screen name="exam/ExamPreparation" options={{ headerShown: true, title: "Setup Exam Prep." }} />
        <Stack.Screen name="exam/QuestionScreen" options={{ headerShown: true, title: "Exam practice" }} />

        <Stack.Screen name="interview/InterviewPreparation" options={{ headerShown: true, title: "Setup Interview Prep." }} />
        <Stack.Screen name="interview/QuestionScreen" options={{ headerShown: true, title: "Practice Interview Questions" }} />

        <Stack.Screen name="FeedbackAnalysis" 
          options={{ 
            headerShown: true, 
            title: "Feedback",
            headerLeft: (props) => {
              // console.log(props);
              return (
                <Ionicons name="arrow-back" size={24} color="black"
                  style={{ paddingRight: 15 }}
                  onPress={() => router.dismissTo("/account")}
                />
              )
            }
          }}
        />

        <Stack.Screen name="AIDiscussAssistant" options={{ headerShown: true, title: "AI Discuss Assistant" }} />

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
