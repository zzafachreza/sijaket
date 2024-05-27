import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    TouchableNativeFeedback,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar, MyCalendarSecond, MyHeader } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';

export default function Register({ navigation }) {
    const backPage = () => {
        navigation.goBack();
    }




    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        username: '',
        nama_lengkap: '',
        email: '',
        telepon: '',
        password: '',
        repassword: '',


    });

    const simpan = () => {


        console.log(data);
        if (
            data.nama_lengkap.length === 0 &&
            data.email.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Form cannot empty !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Enter your name',
            });
        }

        else if (data.email.length === 0) {
            showMessage({
                message: 'Enter your email',
            });
        }
        else if (data.password.length === 0) {
            showMessage({
                message: 'Enter your password',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Re-enter your password',
            });
        } else {



            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    }


                });
        }
    };



    return (

        <ImageBackground

            style={{
                flex: 1,
                width: '100%',
                height: '100%',


            }}>

            <MyHeader judul="Register" onPress={backPage} />



            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                <View style={{
                    padding: 10

                }}>
                    {/* <Text style={{
                            fontSize: MyDimensi / 2.5,
                            fontFamily: fonts.primary[600],
                            color: colors.black,
                            textAlign:'center',
                            marginBottom:'10%',
                            marginTop:0
                        }}>REGISTRASI</Text> */}
                    {/* <Text style={{
                            fontSize: MyDimensi / 4,
                            fontFamily: fonts.primary[400],
                            color: colors.primary,
                            marginBottom: 10,
                        }}>Silahkan daftar agar bisa login</Text> */}

                    {/* NAMA LENGKAP */}
                    <MyInput iconname="person" onChangeText={x => {
                        setData({
                            ...data,
                            nama_lengkap: x
                        })
                    }} label='Full Name' placeholder='Enter full name' />
                    <MyGap jarak={20} />
                    <MyInput iconname="at" onChangeText={x => {
                        setData({
                            ...data,
                            username: x
                        })
                    }} label='Username' placeholder='Enter username' />
                    <MyGap jarak={20} />
                    <MyInput iconname="mail" onChangeText={x => {
                        setData({
                            ...data,
                            email: x
                        })
                    }} label='Email' placeholder='Enter email' />
                    <MyGap jarak={20} />


                    {/* NOMOR TELEPOM */}
                    <MyInput label='Phone Number' onChangeText={x => {
                        setData({
                            ...data,
                            telepon: x
                        })
                    }} placeholder='Enter phone number' iconname="call" />
                    <MyGap jarak={20} />



                    {/*PASSWORD*/}
                    <MyInput iconname="lock-closed"
                        placeholder="Enter Password"
                        label="Password"
                        value={data.password}
                        secureTextEntry={true}
                        onChangeText={value =>
                            setData({
                                ...data,
                                password: value,
                            })
                        }
                    />


                    {/* INPUT PASSWORD ULANG */}
                    <MyGap jarak={20} />
                    <MyInput
                        borderColor={sama ? colors.border : colors.danger}
                        borderWidth={sama ? 1 : 1}
                        placeholder="Re-enter Password"
                        label="Re-enter password"
                        iconname="lock-closed"
                        secureTextEntry
                        onChangeText={value => {

                            if (value !== data.password) {
                                setSama(false)
                            } else {
                                setSama(true)
                            }

                            setData({
                                ...data,
                                repassword: value,
                            })
                        }

                        }
                    />



                    <MyGap jarak={20} />
                    {!loading &&
                        <>
                            <MyButton


                                title="Register"
                                Icons="log-in"
                                onPress={simpan}
                            />

                        </>
                    }




                    {loading && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator color={colors.primary} size="large" />
                    </View>}
                </View>
                <MyGap jarak={40} />


                <MyGap jarak={10} />
            </ScrollView>

        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    page: {
        position: "relative",
        backgroundColor: colors.white


    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
