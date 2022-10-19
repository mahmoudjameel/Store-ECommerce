import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { firebase } from '../config'
import { BackHandler } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
const AdminMen = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("products")

    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [imgURL, setImageURL] = useState("");


    useEffect(() => {
        read();
    }, [])

    // read data
    const read = () => {
        dataRef
            .where('category_name', '==', 'Man')
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
    // Show more or less Text
    const renderViewMore = (onPress) => {
        return (
            <TouchableOpacity onPress={onPress} style={{ paddingTop: 10 }}>
                <Text style={styles.text1}>View More</Text>
            </TouchableOpacity>
        )
    }

    const renderViewLess = (onPress) => {
        return (
            <TouchableOpacity onPress={onPress} style={{ paddingTop: 10 }}>
                <Text style={styles.text1}>View Less</Text>
            </TouchableOpacity>
        )
    }
    return (

        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                
                <SafeAreaView style={{ flex: 2, padding: 10, paddingBottom: 20 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(_, i) => String(i)}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                           
                            <View style={{ padding: 10, paddingTop: 10, }}>
                                <View style={{ flexDirection: "row", }}>
                                    <View>
                                        <Image
                                            style={styles.iimage}
                                            source={{ uri: item.imgURL }}
                                        />
                                    </View>

                                    <View style={{ padding: 10, width: 230 }}>
                                        <Text style={styles.text}>Name : {item.name}</Text>
                                        <Text style={styles.text}>Price : $ {item.price}</Text>
                                        <View style={{ width: 140 }}>
                                            <ViewMoreText
                                                numberOfLines={2}
                                                renderViewMore={renderViewMore}
                                                renderViewLess={renderViewLess}

                                            >
                                                <Text style={[styles.text, styles.decText]}>Description : {item.desc}</Text>
                                            </ViewMoreText>
                                        </View>


                                    </View>
                                </View>
                            </View>
                           
                        )}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default AdminMen

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
    decText: {
        fontSize: 12,
        letterSpacing: 1.5,
        color: '#f7d081',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
        letterSpacing: 1,
        paddingBottom: 15
    },
    text2: {
        width: 200,
    },
    text1: {
        fontSize: 13,
        color: "#fff",
        paddingBottom: 10,
        fontWeight: "500",
        letterSpacing: 1,
        width: 150,
    },
})