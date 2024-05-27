import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, ImageBackground, FlatList } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData, getData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import MyCarouser from '../../components/MyCarouser';
import { color } from 'react-native-reanimated';
import { Icon } from 'react-native-elements';

export default function Home({ navigation }) {


  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);

  const [user, setuser] = useState({});

  const gambar = [
    require('../../assets/m1.png'),
    require('../../assets/m2.png'),
    require('../../assets/m3.png'),
    require('../../assets/m4.png'),
    require('../../assets/m5.png'),
    require('../../assets/m6.png'),
    require('../../assets/m7.png'),
    require('../../assets/m8.png'),
    require('../../assets/m9.png'),
    require('../../assets/m10.png'),
  ]

  const [data, setData] = useState([
    'Pengamanan',
    'P2U',
    'Perwira Kontrol',
    'Piket Siang',
    'Piket Malam',
    'Piket Rumah Sakit',
    'Penggeledahan Rutinitas',
    'Penggeledahan Kunjungan',
    'Duta Layanan',
    'Informasi',
  ])





  useEffect(() => {
    getData('user').then(res => {
      setuser(res)
    })
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white

    }}>


      {/* HEADERS */}
      <View style={{
        flexDirection: "row",
        backgroundColor: colors.primary,
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center'


      }}>

        <View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,

          }}>Halo, {user.nama_lengkap}</Text>
          <Text style={{ fontFamily: fonts.secondary[800], color: colors.white, fontSize: 17 }}>
            Sistem Informasi Jadwal Piket
          </Text>
        </View>

        <View>
          <TouchableNativeFeedback onPress={() => {

            Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
              {
                text: 'Batal',
                style: "cancel"
              },
              {
                text: 'Keluar',
                onPress: () => {
                  storeData('user', null);

                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Splash' }],
                  });
                }
              }
            ])

          }} >
            <Icon type='ionicon' name='log-out-outline' size={30} color={colors.white} />
          </TouchableNativeFeedback>
        </View>

      </View>
      <MyCarouser />



      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <FlatList data={data} numColumns={3} renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              if (index == data.length - 1) {
                Linking.openURL('https://www.instagram.com/lapasambon?igsh=MXJjYnV2cmUyZzh3NQ==')
              } else {
                navigation.navigate('States', {
                  menu: item
                })
              }
            }}>
              <View style={{
                marginHorizontal: 2,
                marginVertical: 5,
                flex: 1,
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',


              }}>
                <View style={{
                  width: 80,
                  borderRadius: 10,
                  height: 80,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Image source={gambar[index]} style={{
                    width: 60,
                    height: 60,
                  }} />
                </View>
                <Text style={{
                  textAlign: 'center',
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
      </View>




      {loading && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>}



    </View>




  );
}

const styles = StyleSheet.create({});
