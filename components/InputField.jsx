import { View, Text, TextInput} from "react-native";
import React from "react";

const InputField = ({fieldTitle,value, placedHolder,setValue, scrollEnabled, multiline, textColor, type, styles, headingStyles}) => {
  return (
    <View className="w-full">
      {/* <Text className={`text-dark-black-200 text-base my-3 self-start font-Rmedium ${headingStyles}`}>{fieldTitle}</Text> */}
      <View className={`rounded-2xl  border-2 border-dark-black-500 bg-dark-black-500 h-16 items-center justify-center focus:border-dark-black-300 ${styles}`}>
        <TextInput
          className="w-full h-full text-lg px-4 text-dark-black-100"
          value={value}
          onChangeText={setValue}
          placeholder={placedHolder}
          placeholderTextColor={textColor}
          keyboardType={type}
          cursorColor={"#FF8E01"}
          scrollEnabled={scrollEnabled}
          multiline={multiline}
        />
      </View>
    </View>
  );
};

export default InputField;
