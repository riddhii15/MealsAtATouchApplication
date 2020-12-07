import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    Alert,
} from "react-native";

import colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Value } from "react-native-reanimated";

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                thumbColor={colors.primaryColor}
                trackColor={{ true: colors.accentColor }}
                value={props.state}
                onValueChange={props.OnChange}
            />
        </View>
    );
};

const FiltersScreen = ({ route, navigation }) => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    // const [saveValue , setSaveValue] = useState(false);
    // const SavedHandler = () => {

    // }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginHorizontal: 12,
                        flexDirection: "row",
                    }}
                    onPress={() => saveFilters("save")}
                >
                    <Ionicons name="ios-save" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    });

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                state={isGlutenFree}
                OnChange={(newValue) => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label="Lactose-free"
                state={isLactoseFree}
                OnChange={(newValue) => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label="Vegan"
                state={isVegan}
                OnChange={(newValue) => setIsVegan(newValue)}
            />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarian}
                OnChange={(newValue) => setIsVegetarian(newValue)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,

        alignItems: "center",
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        alignItems: "center",
        marginVertical: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        margin: 20,
        textAlign: "center",
    },
});

export default FiltersScreen;
