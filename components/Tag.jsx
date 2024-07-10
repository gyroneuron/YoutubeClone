import { View, Text,Image, TouchableOpacity } from "react-native";
import React from "react";

const Tag = ({ name, icon, handlePress, icon2}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="h-[30] px-3 mx-1 space-x-1 items-center flex-row justify-center bg-neutral-800 rounded-3xl"
    >
      <Image source={icon} className="h-4 w-4"/>
      <Text className="font-Rbold text-sm text-dark-black-100">{name}</Text>
      {
        icon2?
        (<View className="flex-row space-x-2 items-center justify-center">
          <Text className="font-Rbold text-sm text-dark-black-300 ml-2">|</Text>
          <Image source={icon2} className="h-4 w-4"/>
        </View>): null
      }
      
    </TouchableOpacity>
  );
};

export default Tag;
