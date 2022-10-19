import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { firebase } from '../config'
import { BackHandler } from 'react-native';

const Accessories = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("products")


    useEffect(() => {
        read();
    }, [])

    // read data
    const read = () => {
        dataRef
            .where('category_name', '==', 'Accessory')
            // .orderBy("createdAt", "desc")
            .onSnapshot((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    const { imgURL } = doc.data();
                    const { name } = doc.data();
                    const { desc } = doc.data();
                    const { price } = doc.data();
                    const { qty } = doc.data();
                    const { category_name } = doc.data();

                    data.push({
                        id: doc.id,
                        imgURL,
                        name,
                        desc,
                        price,
                        qty,
                        category_name,
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


        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, paddingBottom: 20 }}>
                    <Text style={styles.expoView}>"Welcome from Accessory Collection"</Text>
                </View>
                <SafeAreaView style={{ flex: 2, padding: 5, marginTop: -40 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(_, i) => String(i)}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProductDetail", { item })}
                            >
                                <View style={{ padding: 10, paddingTop: 10, }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <View>
                                            <Image
                                                style={styles.iimage}
                                                source={{ uri: item.imgURL }}
                                            />
                                        </View>

                                        <View style={{ padding: 10 }}>

                                            <Text style={styles.text}>Name : {item.name}</Text>
                                            <Text numberOfLines={2} style={styles.text}
                                            >Description : {item.desc}</Text>
                                            <Text style={styles.text}>Price : $ {item.price}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default Accessories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "black",
    },
    iimage: {
        width: 150,
        height: 150,
        borderRadius: 20
    },
    expoText: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
        color: "#f7d081",
        fontWeight: "900",
        letterSpacing: 1,
        lineHeight: 18,
    },
    expoView: {
        textAlign: 'center',
        fontSize: 20,
        color: '#f7d081',
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 30,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
        letterSpacing: 1,
        paddingBottom: 15,
        width: 175,
    }
})