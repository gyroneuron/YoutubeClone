import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../assets/icons/profile-avatar.png";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";

const profile = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const Signout = async () => {
    try {
      const { error: signoutError } = await supabase.auth.signOut();

      if(signoutError) {
        Alert.alert(signoutError.name, signoutError.message);
      } else {
        router.replace('/LoginScreen');
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <SafeAreaView className="flex-1 h-full w-full bg-black items-center justify-center">
      <ScrollView className="flex-1 h-full w-[90%] bg-black">
        <View className="h-full w-full flex-1 p-2 items-center justify-center">
          <Image
            source={ProfilePic}
            resizeMode="contain"
            className="h-32 w-32 rounded-full"
          />
          <Text className="text-center text-3xl text-white mt-3">
              Vivek Jaglan
            </Text>
          <View className="h-full w-full flex-1 p-5 items-start justify-center mt-3 bg-dark-black-500 rounded-2xl">
            
            <Text className="text-center text-lg font-medium text-dark-elevated-lbl">
              Email: <Text className="text-center text-lg font-medium text-dark-black-100">vivekjaglan34@gmail.com</Text>
            </Text>
            <Text className="text-center text-lg font-medium text-dark-elevated-lbl">
              Videos: <Text className="text-center text-lg font-bold text-dark-black-200"> 0 </Text>
            </Text>
          </View>
          <CustomButton name={'Logout'} handlePress={Signout} textstyle={'font-Rbold'}/>
          <CustomButton name={'Login'} handlePress={() => router.navigate('/LoginScreen')} textstyle={'font-Rbold'}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
