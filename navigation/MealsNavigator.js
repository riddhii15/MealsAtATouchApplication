import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import colors from "../constants/Colors";

const Stack = createStackNavigator();

const StackNav = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: { backgroundColor: colors.primaryColor },
            }}
        >
            <Stack.Screen
                name="CategoriesScreen"
                component={CategoriesScreen}
                options={{
                    headerTitle: "Meal Categories!",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                marginHorizontal: 12,
                                flexDirection: "row",
                            }}
                            onPress={() => {
                                navigation.toggleDrawer();
                            }}
                        >
                            <Ionicons name="ios-menu" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="CategoryMealsScreen"
                component={CategoryMealsScreen}
            />
            <Stack.Screen
                name="MealDetailScreen"
                component={MealDetailScreen}
            />
            {/* <Stack.Screen name="FiltersScreen" component={FiltersScreen} />

            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} /> */}
        </Stack.Navigator>
    );
};

const FavNav = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: { backgroundColor: colors.primaryColor },
            }}
        >
            <Stack.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                options={{
                    headerTitle: "Your Favorite!!",
                    // headerLeft: () => (
                    //     <TouchableOpacity
                    //         style={{
                    //             marginHorizontal: 12,
                    //             flexDirection: "row",
                    //         }}
                    //         onPress={() => {
                    //             navigation.toggleDrawer();
                    //         }}
                    //     >
                    //         <Ionicons name="ios-menu" size={24} color="white" />
                    //     </TouchableOpacity>
                    // ),
                }}
            />
            <Stack.Screen name="MealsNavigator" component={MealsNavigator} />
        </Stack.Navigator>
    );
};

const FilterNav = ({ route, navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: { backgroundColor: colors.primaryColor },
            }}
        >
            <Stack.Screen
                name="FiltersScreen"
                component={FiltersScreen}
                options={{
                    headerTitle: "Filter Meals!!!",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                marginHorizontal: 12,
                                flexDirection: "row",
                            }}
                            onPress={() => {
                                navigation.toggleDrawer();
                            }}
                        >
                            <Ionicons name="ios-menu" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginHorizontal: 12,
                                flexDirection: "row",
                            }}
                            onPress={() => {
                                console.log("saving filter!!");
                            }}
                        >
                            <Ionicons name="ios-save" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const Tab = createMaterialBottomTabNavigator();
const MealsFavTabNavigator = () => {
    return (
        <Tab.Navigator
            activeColor="white"
            inactiveColor={colors.accentColor}
            barStyle={{ backgroundColor: colors.primaryColor }}
            shifting={true}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name == "Meals") {
                        iconName = "ios-restaurant";
                    } else if (route.name == "Favorites") {
                        iconName = "ios-star";
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={26} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Meals" component={StackNav} />
            <Tab.Screen name="Favorites" component={FavNav} />
        </Tab.Navigator>
    );
};

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: colors.accentColor,
                itemStyle: { marginTop: 20 },
                labelStyle: {
                    fontSize: 16,
                },
            }}
        >
            <Drawer.Screen
                name="Meals Favs"
                component={MealsFavTabNavigator}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="ios-restaurant"
                            size={size}
                            color={focused ? colors.accentColor : "gray"}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Filters"
                component={FilterNav}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="filter"
                            size={26}
                            color={focused ? colors.accentColor : "gray"}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};
const MealsNavigator = () => {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
};

export default MealsNavigator;
