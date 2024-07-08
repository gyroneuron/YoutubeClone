import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import HomeIcon from "../../assets/icons/Home.svg";
import HomeFilledIcon from "../../assets/icons/Home_Fill.svg";
import ShortsIcon from "../../assets/icons/Short.svg";
import ShortsFilledIcon from "../../assets/icons/Short_Fill.svg";
import AddIcon from "../../assets/icons/Add.svg";
import SubsIcon from "../../assets/icons/Subscriptions.svg";
import SubsFilledIcon from "../../assets/icons/Subscriptions_Fill.svg";

const _layout = () => {
  const TabIcon = ({name}) => {
    return (
          <Text
            className="font-Rregular text-white text-center text-[10px]">
            {name}
          </Text>
    );
  };

  return (
    <Tabs
      initialRouteName="upload"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#0F0F0F",
          height: "9%",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center">
              {
                focused?
                <HomeFilledIcon height={24} width={24} color={color} />
                : <HomeIcon height={24} width={24} color={color} />
              }
              <TabIcon
                name={"Home"}
                color={color}
                focused={focused}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="shorts"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center">
              {
                focused?
                <ShortsFilledIcon height={24} width={24} color={color} />
                : <ShortsIcon height={24} width={24} color={color} />
              }
              <TabIcon
                name={"Shorts"}
                color={color}
                focused={focused}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center">
              <AddIcon height={38} width={38} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center">
              {
                focused?
                <SubsFilledIcon height={24} width={24} color={color} />
                : <SubsIcon height={24} width={24} color={color} />
              }
              <TabIcon
              name={"Subscription"}
              color={color}
              focused={focused}
            />
            </View>
          ),
          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center">
              <Image source={require('../../assets/icons/profile-avatar.png')} resizeMode="cover" className="h-[24] w-[24] rounded-full" />
              <TabIcon
              name={"You"}
            />
            </View>
          ),
          
        }}
      />
    </Tabs>
  );
};

export default _layout;
