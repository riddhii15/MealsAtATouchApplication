import React, { useCallback, useMemo, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import colors from "../constants/Colors";

const CategoryMealsScreen = ({ route, navigation }) => {
    const catId = route.params.categoryId;

    const selectCategory = useMemo(
        () => CATEGORIES.find((cat) => cat.id == catId),
        [catId]
    );

    const availableMeals = useSelector((state) => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        (meal) => meal.categoryIds.indexOf(catId) >= 0
    );

    if (displayedMeals.length == 0) {
        return (
            <View style={styles.content}>
                <Text style={styles.defaultText}>
                    No Meals found, Check your filters!!
                </Text>
            </View>
        );
    }

    const handleDetailsPress = useCallback(() => {
        navigation.navigate("MealDetailScreen");
    }, [navigation.navigate]);

    const [value, setValue] = React.useState(selectCategory.title);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: value === "" ? "No title" : value,
        });
    }, [navigation, value]);

    return <MealList listData={displayedMeals} navigation={navigation} />;
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

export default CategoryMealsScreen;
