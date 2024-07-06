import { View, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../assets/icons/profile-avatar.png";
import CustomButton from "../../components/CustomButton";

const profile = () => {


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
          <CustomButton name={'Logout'} handlePress={() => {}} textstyle={'font-bold text-white'}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
