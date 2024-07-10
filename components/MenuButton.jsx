import { View, Text,Image, TouchableOpacity } from "react-native";
import React from "react";

const MenuButton = ({ name, icon, handlePress}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-full h-[40] rounded-2xl items-center flex-row justify-start space-x-2 my-2"
    >
      <Image source={icon} className="h-5 w-5"/>
      <Text className="font-Rmedium text-base text-dark-black-100">{name}</Text>
    </TouchableOpacity>
  );
};

export default MenuButton;
