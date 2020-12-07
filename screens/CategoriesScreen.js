import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTitle from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTitle
                title={itemData.item.title}
                color={itemData.item.color}
                // imageUrl={itemData.item.imageUrl}
                onSelect={() => {
                    props.navigation.navigate("CategoryMealsScreen", {
                        categoryId: itemData.item.id,
                    });
                }}
            />
        );
    };
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CategoriesScreen;
