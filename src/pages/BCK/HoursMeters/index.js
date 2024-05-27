import { ActivityIndicator, Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components'

import DateTimePicker from '@react-native-community/datetimepicker';
import { MYAPP, apiURL, getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';

export default function HoursMeters({ navigation }) {
  const backPage = () => {
    navigation.goBack();
  }



  // const [kirim, setKirim] = useState({
  //   co2_in: '',
  //   co2_out: '',
  //   co2_rey: '',
  //   co_in: '',
  //   co_out: '',
  //   co_rey: '',
  //   o2_in: '',
  //   o2_out: '',
  //   o2_rey: '',
  //   ch1_in: '',
  //   ch1_out: '',
  //   ch1_rey: '',
  //   ch2_in: '',
  //   ch2_out: '',
  //   ch2_rey: '',
  //   ch3_in: '',
  //   ch3_out: '',
  //   ch3_rey: '',
  //   hc1_in: '',
  //   hc1_out: '',
  //   hc1_rey: '',
  //   hc2_in: '',
  //   hc2_out: '',
  //   hc2_rey: '',
  //   hc3_in: '',
  //   hc3_out: '',
  //   hc3_rey: '',
  //   hcn: '',
  // });

  const [kirim, setKirim] = useState(
    {
      "ch1_in": "2.5", "ch1_out": "5", "ch1_rey": "2", "ch2_in": "30",
      "ch2_out": "30", "ch2_rey": "30", "ch3_in": "0.03845", "ch3_out": "0.00038", "ch3_rey": "1.00038", "co2_in": "0.17", "co2_out": "3.42", "co2_rey": "0.06", "co_in": "1.15", "co_out": "0.02", "co_rey": "0.19", "hc1_in": "10", "hc1_out": "2", "hc1_rey": "2", "hc2_in": "30", "hc2_out": "30", "hc2_rey": "30", "hc3_in": "3", "hc3_out": "3.2", "hc3_rey": "2", "hcn": "0.2109", "o2_in": "10.28", "o2_out": "3.55", "o2_rey": "19.16"
    }
  )

  const [comp, setComp] = useState({})



  const [loading, setLoading] = useState(false)
  const sendServer = () => {

    console.log(kirim)
    navigation.navigate('HasilIMTCalculator', kirim)



  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>

      {/* HEADERS */}


      <ScrollView>
        <View style={{
          padding: 10,
          marginBottom: 10,
          borderBottomWidth: 5,
          borderBottomColor: colors.primary,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/icon.png')} style={{
            width: 60,
            height: 60,
            resizeMode: 'contain'
          }} />
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 12,
            flex: 1,
            textAlign: 'center'
          }}>Urea Formaldehyde Concentrate</Text>
          <TouchableWithoutFeedback onPress={() => {
            // Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            //   {
            //     text: 'Batal',
            //     style: "cancel"
            //   },
            //   {
            //     text: 'Keluar',
            //     onPress: () => {
            //       storeData('user', null);

            //       navigation.reset({
            //         index: 0,
            //         routes: [{ name: 'Splash' }],
            //       });
            //     }
            //   }
            // ])
            navigation.navigate('Account')
          }}>
            <View style={{
              padding: 10,

            }}>
              <Icon type='ionicon' name='person-outline' size={25} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ padding: 10, }}>


          {/* CO2 */}
          <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, borderColor: colors.primary, }}>
            <Text style={{
              fontFamily: fonts.secondary[800], fontSize: 15,
            }}>CO<Text style={{
              fontSize: 10,
            }}>2</Text></Text>
            <Text style={{
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Concentration from GC (%Vol)</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    co2_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    co2_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    co2_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>
          </View>

          {/* CO */}
          <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, borderColor: colors.primary, }}>
            <Text style={{
              fontFamily: fonts.secondary[800], fontSize: 15,
            }}>CO<Text style={{
              fontSize: 10,
            }}></Text></Text>
            <Text style={{
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Concentration from GC (%Vol)</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    co_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    co_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    co_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>
          </View>

          {/* o2 */}
          <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, borderColor: colors.primary, }}>
            <Text style={{
              fontFamily: fonts.secondary[800], fontSize: 15,
            }}>O<Text style={{
              fontSize: 10,
            }}>2</Text></Text>
            <Text style={{
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Concentration from GC (%Vol)</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    o2_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    o2_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    o2_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>
          </View>

          {/* ch1 */}
          <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, borderColor: colors.primary, }}>
            <Text style={{
              fontFamily: fonts.secondary[800], fontSize: 15,
            }}>CH<Text style={{
              fontSize: 10,
            }}>3</Text>OH</Text>
            <Text style={{
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Sample Volume</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch1_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch1_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch1_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>

            <Text style={{
              marginTop: 10,
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Sample Temperature (°C)</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch2_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch2_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch2_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>

            <Text style={{
              marginTop: 10,
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Concentration from GC (%Vol)</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch3_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch3_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    ch3_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>

          </View>

          {/* hcho */}
          <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, borderColor: colors.primary, }}>
            <Text style={{
              fontFamily: fonts.secondary[800], fontSize: 15,
            }}>HCHO<Text style={{
              fontSize: 10,
            }}></Text></Text>
            <Text style={{
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Sample Volume</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc1_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc1_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc1_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>

            <Text style={{
              marginTop: 10,
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Sample Temperature (°C)</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc2_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc2_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc2_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>

            <Text style={{
              marginTop: 10,
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Input Titration Volume (mL)</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                paddingRight: 5,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc3_in: x
                  })
                }} keyboardType='number-pad' iconname="cloud-download-outline" label="INLET REACTOR" />
              </View>
              <View style={{
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc3_out: x
                  })
                }} keyboardType='number-pad' iconname="cloud-upload-outline" label="OUTLET REACTOR" />
              </View>
              <View style={{
                paddingLeft: 5,
                flex: 1,
              }}>
                <MyInput icon={false} onChangeText={x => {
                  setKirim({
                    ...kirim,
                    hc3_rey: x
                  })
                }} keyboardType='number-pad' iconname="reload-circle-outline" label="RECYCLE" />
              </View>
            </View>
            <Text style={{
              marginTop: 10,
              marginBottom: 10,
              fontFamily: fonts.secondary[600], fontSize: 12,
            }}>Normalitas H<Text style={{
              fontSize: 7
            }}>2</Text>SO<Text style={{
              fontSize: 7
            }}>4</Text> </Text>
            <MyInput icon={false} onChangeText={x => {
              setKirim({
                ...kirim,
                hcn: x
              })
            }} keyboardType='number-pad' iconname="reload-circle-outline" nolabel />


          </View>

          {/* DATA INI AKAN MASUK KE DATABASE DAN AKAN KE WHATSAAP SEPERTI DI DOKUMEN DAN DESAINNYA SEPERTI DI FIGMA */}
          {!loading && <MyButton title="Calculate" onPress={sendServer} />}
          {loading && <ActivityIndicator size="large" color={colors.primary} />}
        </View>
        <Text style={{
          fontFamily: fonts.secondary[400],
          textAlign: 'center',
          fontSize: 14,
          color: colors.black,
          marginBottom: 10,
        }}>Copyright © 2024 | Laboratory of Pupuk Kaltim</Text>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({})