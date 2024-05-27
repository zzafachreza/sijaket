import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
colors

export default function HasilIMTCalculator({ navigation, route }) {

    const item = route.params;

    //CH3OH

    let CH3OH_IN_1 = parseFloat((parseFloat(item.ch1_in) * 273) / (parseFloat(item.ch2_in) + 273));
    let CH3OH_IN = (item.ch3_in * 10 * 0.7 * 100 / CH3OH_IN_1).toFixed(2);

    let CH3OH_OUT_1 = parseFloat((parseFloat(item.ch1_out) * 273) / (parseFloat(item.ch2_out) + 273));
    let CH3OH_OUT = (item.ch3_out * 2 * 0.7 * 100 / CH3OH_OUT_1).toFixed(3);

    let CH3OH_REY_1 = parseFloat((parseFloat(item.ch1_rey) * 273) / (parseFloat(item.ch2_rey) + 273));
    let CH3OH_REY = (item.ch3_rey * 2 * 0.7 * 100 / CH3OH_REY_1).toFixed(3);


    let HCHO_IN_1 = parseFloat((parseFloat(item.hc1_in) * 273) / (parseFloat(item.hc2_in) + 273));
    let HCHO_IN = ((item.hc3_in * item.hcn * 22.4) * 100 / ((1000 * HCHO_IN_1) + item.hc3_in * item.hcn * 22.4)).toFixed(2)


    let HCHO_OUT_1 = parseFloat((parseFloat(item.hc1_out) * 273) / (parseFloat(item.hc2_out) + 273));
    let HCHO_OUT = ((item.hc3_out * item.hcn * 22.) * 100 / ((1000 * HCHO_OUT_1) + item.hc3_out * item.hcn * 22.4)).toFixed(3)


    let KIR = ((100 - ((item.ch3_in * 10 * 0.7 * 100 / CH3OH_IN_1)) - (((item.hc3_in * item.hcn * 22.4) * 100 / ((1000 * HCHO_IN_1) + item.hc3_in * item.hcn * 22.4)))) / 100);

    let KOR = ((100 - (item.ch3_out * 2 * 0.7 * 100 / CH3OH_OUT_1) - ((item.hc3_out * item.hcn * 22.) * 100 / ((1000 * HCHO_OUT_1) + item.hc3_out * item.hcn * 22.4))) / 100);




    let CO2_IN = (item.co2_in * KIR).toFixed(2);
    let CO_IN = (item.co_in * KIR).toFixed(2);
    let O2_IN = (item.o2_in * KIR).toFixed(2);


    let CO2_OUT = (item.co2_out * KOR).toFixed(2);
    let CO_OUT = (item.co_out * KOR).toFixed(2);
    let O2_OUT = (item.o2_out * KOR).toFixed(2);

    let CO2_REY = parseFloat(item.co2_rey).toFixed(2);
    let CO_REY = parseFloat(item.co_rey).toFixed(2);
    let O2_REY = parseFloat(item.o2_rey).toFixed(2);


    console.log(O2_OUT)

    const backPage = () => {
        navigation.goBack()
    }

    const MyList = ({ inlet, outlet, reycle }) => {
        return (
            <View>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{

                            textAlign: 'center',
                            fontFamily: fonts.secondary[800],
                            fontSize: 13,
                        }}>INLET REACTOR</Text>
                        <Text style={{
                            textAlign: 'center',
                            color: colors.success,
                            fontFamily: fonts.secondary[800],
                            fontSize: 20,
                        }}>{inlet}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[800],
                            fontSize: 13,
                        }}>OUTLET REACTOR</Text>
                        <Text style={{
                            textAlign: 'center',
                            color: colors.success,
                            fontFamily: fonts.secondary[800],
                            fontSize: 20,
                        }}>{outlet}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{

                            textAlign: 'center',
                            fontFamily: fonts.secondary[800],
                            fontSize: 13,
                        }}>RECYCLE</Text>
                        <Text style={{
                            textAlign: 'center',
                            color: colors.success,
                            fontFamily: fonts.secondary[800],
                            fontSize: 20,
                        }}>{reycle}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white, }}>
            <MyHeader judul="Result UFC Calculator" onPress={backPage} />
            <ScrollView style={{ padding: 10 }}>

                <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: colors.border }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800], fontSize: 15,
                    }}>CO<Text style={{ fontSize: 10, }}>2</Text> (%Vol)</Text>


                    <MyList inlet={CO2_IN} outlet={CO2_OUT} reycle={CO2_REY} />

                </View>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: colors.border }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800], fontSize: 15,
                    }}>CO<Text style={{ fontSize: 10, }}></Text>(%Vol)</Text>

                    <MyList inlet={CO_IN} outlet={CO_OUT} reycle={CO_REY} />

                </View>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: colors.border }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800], fontSize: 15,
                    }}>O<Text style={{ fontSize: 10, }}>2</Text></Text>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 13, }}>Satuan (%Vol)</Text>

                    <MyList inlet={O2_IN} outlet={O2_OUT} reycle={O2_REY} />

                </View>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: colors.border }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800], fontSize: 15,
                    }}>CH<Text style={{ fontSize: 10, }}>3</Text>OH (%Vol)</Text>

                    <MyList inlet={CH3OH_IN} outlet={CH3OH_OUT} reycle={CH3OH_REY} />

                </View>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: colors.border }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800], fontSize: 15,
                    }}>HC<Text style={{ fontSize: 10, }}></Text>HO (%Vol)</Text>

                    <MyList inlet={HCHO_IN} outlet={HCHO_OUT} reycle={parseFloat(item.hcn).toFixed(3)} />

                </View>
            </ScrollView>
            <Text style={{
                fontFamily: fonts.secondary[400],
                textAlign: 'center',
                fontSize: 14,
                color: colors.black,
                marginBottom: 10,
            }}>Copyright © 2024 | Laboratory of Pupuk Kaltim</Text>
        </View>
    )
}