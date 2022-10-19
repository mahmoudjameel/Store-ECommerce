import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from "../config";
import { BackHandler } from "react-native";

const UserList = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("users");
    const [show, setshow] = useState(false);

    const [id, setId] = useState("");
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");

    useEffect(() => {
        read();
    }, []);

    // read data
    const read = () => {
        setshow(true)
        setTimeout(() => {
            setshow(false)
        }, 1000)
        dataRef
            .where('role', '==', 'Client')
            //.orderBy("createdAt")
            .onSnapshot((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    const { username } = doc.data();
                    const { email } = doc.data();
                    const { phone } = doc.data();
                    const { address } = doc.data();

                    data.push({
                        id: doc.id,
                        username,
                        email,
                        phone,
                        address,
                    });
                });
                setData(data);
            });
    };

    useEffect(() => {
        navigation.addListener("focus", () => {
            function handleBackButtonClick() {
                navigation.goBack();
                return true;
              }
             
                BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
                return () => {
                  BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
                };  
        })
      }, [navigation]);

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.adminText}>View All Users</Text>
                </View>

                <View style={{ flex: 2 }}>
                    <ActivityIndicator size="small" color="gold" animating={show}></ActivityIndicator>
                    <FlatList
                        data={data}
                        keyExtractor={(_, i) => String(i)}
                        renderItem={({ item }) => (
                            <View style={styles.Box}>
                                <View>
                                    <Text style={styles.padd}>
                                        {item.username}
                                    </Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row', padding: 5, }}>
                                        <Text style={styles.textID}>
                                            ID
                                        </Text>
                                        <Text style={styles.text}>
                                            {item.id}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        <MaterialCommunityIcons name="email" color={'#f7d081'} size={25} />
                                        <Text style={styles.text}>
                                            {item.email}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        <MaterialCommunityIcons name="phone" color={'#f7d081'} size={25} />
                                        <Text style={styles.text}>
                                            {item.phone}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        <MaterialCommunityIcons name='map-check-outline' color={'#f7d081'} size={25} />
                                        <Text style={styles.text}>
                                            {item.address}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

export default UserList;

const styles = StyleSheet.create({
    adminText: {
        fontSize: 20,
        color: "white",
        fontWeight: "500",
        letterSpacing: 1,
        padding: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
        letterSpacing: 1,
        padding: 5,
        paddingLeft: 10
    },
    textID: {
        fontSize: 18,
        color: "#f7d081",
        fontWeight: "bold",
        letterSpacing: 1,
        padding: 5,
        paddingRight: 10
    },
    padd: {
        color: 'gold',
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center',
    },
    Box: {

        borderBottomWidth: 1,
        borderColor: "#fff",
        borderRadius: 15,
        padding: 10
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        paddingTop: 20,
        justifyContent: "flex-start",
    },
    decText: {
        fontSize: 10,
        color: 'gold',
        fontWeight: 'bold',
    },
});
