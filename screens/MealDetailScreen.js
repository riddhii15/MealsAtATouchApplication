import React, { useCallback, useEffect } from "react";
import {
    ToastAndroid,
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import colors from "../constants/Colors";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    );
};

const MealDetailScreen = ({ route, navigation }) => {
    const availableMeals = useSelector((state) => state.meals.meals);
    const mealId = route.params.mealId;
    const currentMealIsFavorite = useSelector((state) =>
        state.meals.favoriteMeals.find((meal) => meal.id == mealId)
    );

    const selectedMeal = availableMeals.find((meal) => meal.id == mealId);

    const [value, setValue] = React.useState(selectedMeal.title);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: value === "" ? "No title" : value,
        });
    }, [navigation, value]);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        navigation.setParams({ isFav: currentMealIsFavorite });
    }, [currentMealIsFavorite]);

    useEffect(() => {
        const isFavorite = route.params.isFav;
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginHorizontal: 10,
                    }}
                    onPress={() => toggleFavoriteHandler(mealId)}
                >
                    <Ionicons
                        name={isFavorite ? "ios-star" : "ios-star-outline"}
                        color="white"
                        size={30}
                    />
                    {/* <AntDesign
                        name={isFavorite ? "star" : "staro"}
                        size={26}
                        color="white"
                    /> */}
                </TouchableOpacity>
            ),
        });
    }, [toggleFavorite]);

    return (
        <ScrollView>
            <Image
                source={{ uri: selectedMeal.imageUrl }}
                style={styles.image}
            />
            <View style={styles.details}>
                <Text>{selectedMeal.duration}m</Text>
                <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ingredients) => (
                <ListItem key={ingredients}>{ingredients}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((steps) => (
                <ListItem key={steps}>{steps}</ListItem>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
    },
});

export default MealDetailScreen;
