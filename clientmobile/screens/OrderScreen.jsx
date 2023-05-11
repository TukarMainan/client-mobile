import Card from "../components/Card";
import {
    Text,
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Modal,
    Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { BASE_URL } from "../config/api";
import Logo from "../logo.png";
import TabRequesting from "../components/TabRequesting";
import TabReceiving from "../components/TabReceiving";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Trade({ route }) {
    const [isTradesLoading, setIsTradesLoading] = useState(true);
    const [isTradesTargetLoading, setIsTradesTargetLoading] = useState(true);
    const [trades, setTrades] = useState([]);
    const [tradesTarget, setTradesTarget] = useState([]);

    async function fetchTrades() {
        try {
            const token = await AsyncStorage.getItem("data");
            const parsedData = JSON.parse(token);
            console.log(parsedData.access_token);
            const { data } = await axios.get(BASE_URL + "/trades/sender", {
                headers: {
                    access_token: parsedData.access_token,
                    // access_token:
                    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDIzZmIxLTdkODgtNDkyMS1hZTZhLTE2MzUwYWM4YjJiMCIsImlhdCI6MTY4MzgxMTE0MH0.V03Ya0TWOtGTX6iAMAh7s_tyXgro4bbFvBR-tnoaWfs",
                },
            });
            setTrades(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsTradesLoading(false);
        }
    }

    async function fetchTradesTarget() {
        try {
            const token = await AsyncStorage.getItem("data");
            const parsedData = JSON.parse(token);
            const { data } = await axios.get(BASE_URL + "/trades/target", {
                headers: {
                    access_token: parsedData.access_token,
                    // access_token:
                    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkMTMxZWUwLTZmMTYtNGZjNy1hMDMzLWZhOGUwNmFjZDE3MiIsImlhdCI6MTY4MzgzMzU3OH0.vrJ7UUpiFx6jwE4Vpq4UHah0vZvMIMpfkPLiuWMPb_g",
                },
            });
            setTradesTarget(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsTradesTargetLoading(false);
        }
    }

    useEffect(() => {
        fetchTrades();
        fetchTradesTarget();
    }, []);
    //   const { item } = route.params;
    const [isVisible, setIsVisible] = useState(true);
    const [loc, setLoc] = useState({
        latitude: -6.121435,
        longitude: 106.774124,
    });

    const navigation = useNavigation();
    function handleAccept() {
        console.log("handle acc");
    }
    function handleReject() {
        console.log("handleReject");
    }

    const handleItemPress = (id) => {
        navigation.navigate("Detail", { id });
    };

    function handleComplete() {
        navigation.navigate("Review");
        console.log("complete");
    }

    function handleChat() {
        navigation.navigate("Chat");
    }

    const [activeTab, setActiveTab] = useState("requesting");

    const handleRequestingTabPress = () => {
        setActiveTab("requesting");
    };

    const handleReceivingTabPress = () => {
        setActiveTab("receiving");
    };

    // async function location(){ // api geopify
    //   try {
    //     const {data} = await axios.get(` https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=90b53ef2d7a44347866db01870984c32`)
    //     setLoc({ address_line1: data.address_line1, address_line2: data.address_line2 });
    //     return { address_line1: data.address_line1, address_line2: data.address_line2 };
    //   } catch (error) {
    //     Alert.alert(
    //       "Cannot get the meeting point.",
    //       [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    //     );
    //   }
    // }

    if (isTradesLoading || isTradesTargetLoading) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner
                    visible={isTradesLoading}
                    customIndicator={
                        <Animatable.View
                            animation="bounce"
                            iterationCount="infinite"
                        >
                            <Image source={Logo} style={styles.spinnerLogo} />
                        </Animatable.View>
                    }
                    overlayColor="rgba(0, 0, 0, 0.5)"
                />
            </View>
        );
    }

    return (
        <>
            <View>
                <View>
                    <Button
                        title="On going request"
                        onPress={handleRequestingTabPress}
                    />
                    <Button
                        title="Incoming request"
                        onPress={handleReceivingTabPress}
                    />
                </View>
                {activeTab === "requesting" && (
                    <TabRequesting trades={trades} />
                )}
                {activeTab === "receiving" && (
                    <TabReceiving trades={tradesTarget} />
                )}
            </View>
            <Modal animationType="fade" transparent={true} visible={isVisible}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            borderWidth: 1,
                            paddingHorizontal: 30,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                marginBottom: 10,
                                textAlign: "center",
                                marginTop: 10,
                            }}
                        >
                            YOUR TRADE REQUEST IS ACCEPTED
                        </Text>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                marginBottom: 10,
                                textAlign: "center",
                            }}
                        >
                            THIS IS YOUR MEETING POINT
                        </Text>
                        <MapView
                            style={{ height: 200, width: 300 }}
                            region={{
                                latitude: loc.latitude,
                                longitude: loc.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={loc} />
                        </MapView>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setIsVisible(false)}
                                style={{
                                    backgroundColor: "gray",
                                    borderRadius: 10,
                                    padding: 10,
                                    width: 140,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsVisible(false)}
                                style={{
                                    backgroundColor: "#7C67F2",
                                    borderRadius: 10,
                                    padding: 10,
                                    width: 140,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                >
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    fontDesc: {
        // paddingLeft: 1,
        // fontSize: 18,
        // fontWeight: "bold",
        textAlign: "left",
        color: "#444444",
        fontSize: 12,
        marginBottom: 2,
        paddingLeft: 12,
    },
    fontTitle: {
        fontWeight: "bold",
        textAlign: "left",
        color: "#222222",
        fontSize: 24,
        marginBottom: 7,
        paddingLeft: 12,
    },
    fontdes: {
        paddingLeft: 12,
        fontSize: 12,
        // fontWeight: "bold",
        textAlign: "left",
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 10,
        marginRight: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.84,
        elevation: 5,
        // marginBottom: 15,
        marginBottom: 15,
        backgroundColor: "#FFF",
        paddingRight: 40,
        paddingLeft: 10,
    },
    containerButton: {
        flexDirection: "row",
        marginRight: 100,
        paddingRight: 200,
        height: 1,
        paddingTop: 30,
        paddingRight: 40,
    },

    card: {
        marginTop: 10,

        // width: 100,
        // height: 100,
        // margin: 10,
        // marginBottom: 100,
        // marginLeft: 50,
    },
    spinnerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    spinnerLogo: {
        width: 40,
        height: 40,
    },
    description: {
        // paddingRight: 5,
        width: 100,
        borderRadius: 12,
        backgroundColor: "#7C67F2",
        height: 30,
        marginTop: 25,
        marginRight: 10,
        marginLeft: 8,
    },
    font: {
        flexDirection: "row",
        paddingTop: 5,
        textAlign: "center",
        color: "#FFF8E7",
        // marginRight: 20,
    },
    reject: {
        flexDirection: "row",
        paddingTop: 5,
        textAlign: "center",
        color: "#FFF8E7",
        // marginLeft: 12,
    },
    containerFill: {
        marginBottom: 50,
    },
    descContain: {
        width: 225,
        height: 50,
        marginBottom: 20,
    },
});
