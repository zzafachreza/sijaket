import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { SvgUri } from 'react-native-svg';
import Intl from "intl";
import 'intl/locale-data/jsonp/id-ID';
import { MyHeader, MyInput } from '../../components';
export default function States({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState([]);

    const getDataTransaksi = () => {
        setLoading(true);
        axios.post(apiURL + 'materi', {
            menu: route.params.menu
        }).then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (



            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('StatesDetail', item)
            }}>
                <View style={{
                    marginBottom: 10,
                    backgroundColor: colors.primary,
                    width: '100%',
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    // borderWidth: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: 20,
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            color: colors.white,
                            fontSize: 16
                        }}>{item.judul}</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: 14
                        }}>Tap untuk lihat jadwal</Text>

                    </View>
                    <Icon type='ionicon' name='calendar' color={colors.white} />


                </View>
            </TouchableWithoutFeedback >



        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul={item.menu} onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>

                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})