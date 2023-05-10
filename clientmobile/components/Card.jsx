import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Card({ item }) {
    const itemCreatedAt = item?.Category.createdAt;
    const currentDate = new Date();
    const createdDate = new Date(itemCreatedAt);

    const timeDiff = currentDate.getTime() - createdDate.getTime();

    const seconds = Math.floor(timeDiff / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timePostCreatedInString = "";

    if (days > 0) {
        timePostCreatedInString = `${days} days ago`;
    } else if (hours > 0) {
        timePostCreatedInString = `${hours} hours ago`;
    } else if (minutes > 0) {
        timePostCreatedInString = `${minutes} minutes ago`;
    } else {
        timePostCreatedInString = `Just now`;
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: item?.images[0] }} style={styles.image} />
            <Text style={styles.name}>{item?.title}</Text>
            <Text style={styles.category}>{item?.Category.name}</Text>
            <Text style={styles.category}>{timePostCreatedInString}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    con: {},
    container: {
        alignItems: "center",
        marginBottom: 10,
        borderBottomWidth: 2,
        // borderLeftWidth: 2,
        borderColor: "#e3dccc",
    },
    image: {
        width: 150,
        height: 150,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "#FFF8E7",
        width: 150,
        color: "#333333",
        textAlign: "left",
        paddingLeft: 8,
        paddingTop: 8,
    },
    category: {
        fontSize: 12,
        // fontWeight: "bold",
        backgroundColor: "#FFF8E7",
        width: 150,
        textAlign: "left",
        paddingLeft: 8,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        color: "#F68383",
        paddingBottom: 12,
    },
});
