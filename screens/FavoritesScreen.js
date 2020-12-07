import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useSelector } from "react-redux";

import MealList from "../components/MealList";
import colors from "../constants/Colors";

const FavoritesScreen = (props) => {
    const favMeals = useSelector((state) => state.meals.favoriteMeals);

    if (favMeals.length == 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <Text style={styles.defaultText}>
                    No Faorite meals found!! Start adding some!!
                </Text>
            </View>
        );
    }

    return <MealList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    defaultText: {
        // fontWeight: "bold",
        fontSize: 18,
        color: colors.accentColor,
        textAlign: "center",
    },
});

export default FavoritesScreen;
