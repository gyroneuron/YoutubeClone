import { View, TouchableOpacity } from 'react-native'
import React from "react";
import YoutubeLogo from '../assets/logos/yticontext.svg';
import Cast from '../assets/icons/Cast.svg';
import Notification from '../assets/icons/Notification.svg';
import Search from '../assets/icons/Search.svg';

const TopBar = () => {
  return (
    <View className="w-full h-11 items-center flex-row justify-between px-4">
      <View className="items-start justify-center">
        <YoutubeLogo height={20} width={86}/>
      </View>
      <View className="items-end justify-between flex-row w-[110]">
        <TouchableOpacity onPress={() => {}}>
          <Cast height={24} width={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Notification height={24} width={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Search height={24} width={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
