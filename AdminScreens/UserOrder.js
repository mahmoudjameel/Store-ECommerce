import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../config";
import { BackHandler } from "react-native";

const UserOrder = ({ route, navigation }) => {

    //const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [cartList, setCartList] = useState([]);
    const dataRef = firebase.firestore().collection('orders')
    const [show, setshow] = useState(false);

    const [status, setStatus] = useState('');
    // read data
    const read = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        setshow(true)
        setTimeout(() => {
            setshow(false)
        }, 1000)

        console.log("inside read function");
        dataRef
            .orderBy("createdAt")
            .onSnapshot((querySnapshot) => {
                const data = [];

                querySnapshot.forEach((doc) => {

                    const { userid } = doc.data();
                    const { address } = doc.data();
                    const { cartList } = doc.data();
                    const { phone } = doc.data();
                    const { total } = doc.data();
                    const { username } = doc.data();
                    const { status } = doc.data();
                    const { note } = doc.data();

                    setCartList(doc.data().cartList);

                    data.push({
                        id: doc.id,
                        address,
                        cartList,
                        phone,
                        total,
                        userid,
                        username,
                        status,
                        note,

                    });
                });
                setData(data);
            });

        console.log("order", data.id)
    };
    useEffect(() => {
        read();
    }, []);

    const DeleteOrder = (data) => {
        dataRef
            .doc(data.id)
            .delete()
            .then(() => {
                alert("Deleted Successfully!");
                console.log(" Data Deleted");
            })
            .catch((error) => {
                alert(error);
            });

    }

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
        <View style={styles.container}>
            <Text style={styles.adminText}>OrderDetail</Text>
            <View style={{ flex: 1 }}>
                <ActivityIndicator size="small" color="gold" animating={show}></ActivityIndicator>
                <FlatList
                    data={data}
                    initialNumToRender={10}
                    windowSize={5}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={30}
                    removeClippedSubviews={false}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={true}
                    style={{ flex: 1, marginTop: 16 }}
                    keyExtractor={(_, i) => String(i)}
                    renderItem={({ item }) => (
                        <View>

                            <View style={{
                                borderWidth: 1, borderColor: 'gold', backgroundColor: "#000", padding: 10, borderRadius: 10,
                                marginBottom: 10
                            }}>
                                <ScrollView>

                                    <View>
                                        {
                                            item.status.pending === true ?
                                                (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <MaterialCommunityIcons name="marker-check" size={35} color={'green'} />
                                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gold', textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>This Order is{item.status.pending} Confirmed</Text>


                                                    </View>
                                                )
                                                :
                                                <View style={{ flexDirection: 'row' }}>
                                                    <MaterialCommunityIcons name="alert" size={35} color={'orange'} />
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gold', textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>This Order is{item.status.pending} Pending</Text>


                                                </View>
                                        }


                                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>OrderList</Text>
                                        {
                                            item.cartList.map((cartItem, index) => {

                                                return (
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }} key={index}>
                                                        <Text style={styles.textInfo}>{cartItem.qty} x</Text>
                                                        <Text style={styles.textInfo}>{cartItem.name}</Text>
                                                        <Text style={styles.textInfo}>$ {cartItem.price}</Text>
                                                    </View>
                                                )
                                            }
                                            )
                                        }
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <MaterialCommunityIcons name="truck-delivery-outline" color={'#f7d081'} size={25} />
                                            <Text style={styles.textInfo}>$ 10</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <MaterialCommunityIcons name="cash-100" color={'#f7d081'} size={25} />
                                            <Text style={styles.textInfo}>$ {item.total}</Text>
                                        </View>



                                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Customer's Info</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <MaterialCommunityIcons name="id-card" color={'#f7d081'} size={25} />
                                            <Text style={styles.textInfo}>{item.userid}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <MaterialCommunityIcons name="account" color={'#f7d081'} size={25} />
                                            <Text style={styles.textInfo}>{item.username}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <MaterialCommunityIcons name="phone" color={'#f7d081'} size={25} />
                                            <Text style={styles.textInfo}>{item.phone}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <MaterialCommunityIcons name="home" color={'#f7d081'} size={25} />
                                            <Text style={styles.textInfo}>{item.address}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <MaterialCommunityIcons name="text-box" color={'#f7d081'} size={25} />
                                            <Text style={styles.textInfo}>{item.note}</Text>
                                        </View>
                                    </View>

                                    {
                                        item.status.pending === true ?
                                            (
                                                null

                                            )
                                            :
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('orderConfirm', { item })}
                                                style={styles.button}
                                            >

                                                <Text style={{ borderwidth: 1, padding: 5, fontWeight: 'bold' }}>Order Confirm</Text>

                                            </TouchableOpacity>
                                    }


                                </ScrollView>



                            </View>

                        </View>
                    )}
                />
            </View>
        </View>

    );
}
export default UserOrder;

const styles = StyleSheet.create({
    adminText: {
        fontSize: 20,
        color: "white",
        fontWeight: "500",
        letterSpacing: 1,
        padding: 10,
        textAlign: 'center',
    },
    textBoxes: {
        width: '60%',
        marginLeft: 20,
        fontSize: 16,
        padding: 10,
        borderColor: 'black',
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        color: "black"
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 1,

    },
    textInfo: {
        fontSize: 16,
        color: "#f7d081",
        fontWeight: "500",
        letterSpacing: 1,
        padding: 5,
        paddingTop: 8
    },
    padd: {
        color: 'gold',
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center',
    },
    Box: {
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#fff",
        backgroundColor: "gray",
        borderRadius: 15,
        padding: 10
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        padding: 20,
        justifyContent: "flex-start",
    },
    decText: {
        fontSize: 10,
        color: 'gold',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#f7d081',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
        justifyContent: 'center'
    },
})
