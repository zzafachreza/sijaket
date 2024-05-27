import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';

export default function Splash({ navigation }) {

  const img = new Animated.Value(0);
  const text = new Animated.Value(0);
  Animated.timing(img, {
    toValue: windowWidth / 2,
    duration: 750,
    useNativeDriver: false,
  }).start();

  Animated.timing(text, {
    toValue: windowHeight / 4.5,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login')
        } else {
          // navigation.replace('GetStarted')
          navigation.replace('Home')
        }
      })
    }, 1200)
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      position: 'relative'

    }}>


      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


      }}>
        <ImageBackground style={{
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <Animated.Image
            source={require('../../assets/logo.png')}
            resizeMode="contain"
            style={{
              width: img,
              height: img,
              marginBottom: 20
            }}
          />

          <Animated.Text style={{
            fontFamily: fonts.secondary[800],
            color: colors.white,
            fontSize: 30,
            textAlign: 'center'
          }}>{MYAPP}</Animated.Text>

          <Animated.Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
            fontSize: 15,
            textAlign: 'center'
          }}>(Sistem Informasi Jadwal Piket)</Animated.Text>
          <Animated.Text style={{
            marginBottom: 20,
            fontFamily: fonts.secondary[400],
            color: colors.white,
            fontSize: 15,
            textAlign: 'center'
          }}>Lapas Kelas IIA Ambon </Animated.Text>
          <ActivityIndicator color={colors.white} size="large" />
        </ImageBackground>
      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
