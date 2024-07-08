import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

const CustomButton = ({
  name,
  textstyle,
  handlePress,
  iconColor,
  image,
  submittingStatus,
  buttonStyles
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`w-full min-h-[62px] rounded-2xl flex-row my-10 bg-dark-black-100 items-center justify-center ${buttonStyles} ${
        submittingStatus ? "opacity-50" : "opacity-100"
      }`}
    >
      {image ? (
        <Image
          source={image}
          tintColor={iconColor}
          className="h-12 w-12 mx-5"
          resizeMode="contain"
        />
      ) : null}
      {submittingStatus ? (
        <ActivityIndicator size="small" color="#000000" />
      ) : (
        <Text className={`text-center ${textstyle}`}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
