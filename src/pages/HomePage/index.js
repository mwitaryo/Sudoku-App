
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Dimensions, TextInput, BackHandler, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { setPlayer } from '../../store/actions';




export default function Home({ navigation: { navigate } }) {
  // const playerData = useSelector(state => state.player)
  const [player, setPlayer] = useState({
    name: '',
    difficulty: '',
  })
  const dispatch = useDispatch()

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const options = [
    {
      label: 'Select'
    },
    {
      value: 'easy',
      label: 'Easy'
    },
    {
      value: 'medium',
      label: 'Medium'
    },
    {
      value: 'hard',
      label: 'Hard'
    }
  ]

  const startGame = () => {
    if (player.name && player.difficulty) {
      navigate('Game', { difficulty: player.difficulty, name: player.name })
    } else {
      let message = []

      for (const key in player) {
        if(!player[key]) {
          message.push(`${key} is required`)
        }
      }
      console.log(message);

      

      Alert.alert(message.join('\n'))

    }
  }
  function onChangeHandler(value, key) {
    let test = { ...player }
    test[key] = value
    setPlayer(test)
  }



  return (
    <>
      {/* <KeyboardAvoidingView
        behavior="padding"
        style={styles.wrapper}
      > */}

      <View style={{ flexGrow: 2 }}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={{marginRight:40, textAlignVertical:'center'}}>Name</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(value) => onChangeHandler(value, 'name')}
                autoCapitalize="words"
              >{player.name}</TextInput>
            </View>

            <View style={styles.formGroup}>
              <Text style={{marginRight:20, textAlignVertical:'center'}}>Difficulty</Text>
              <Picker
                ref={pickerRef}
                selectedValue={player.difficulty}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) => onChangeHandler(itemValue, 'difficulty')}
              >
                {
                  options.map((element, i) => (
                    <Picker.Item key={i} label={element.label} value={element.value} />
                  ))
                }
              </Picker>
            </View>

            <Button onPress={() => startGame()} mode="contained" color="#FDC8AA"> Play </Button>
          </View>


        </View>

        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Button mode="outlined" color="#FDC8AA"
              labelStyle={{ color: "black", fontSize: 12 }}
            > Leaderboard </Button>
            <Button mode="contained" color="#FDC8AA" onPress={() => BackHandler.exitApp()}> Quit </Button>
          </View>
        </View>
      </View>

      {/* </KeyboardAvoidingView> */}


    </>

  )
}

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height


const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1, // grow secara main axis. 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    flex: 1,
    marginBottom: 30
  },
  boardContainer: {
    flexDirection: 'row'
  },
  inputField: {
    borderWidth: 1,
    backgroundColor: '#ecf0f1',
    width: 200,
    textAlign:'center'
  },

  formContainer: {
    borderWidth: 1,
    padding: 15,
    width: screenWidth * 0.8
  },
  formGroup: {
    flexDirection: 'row'
  }
});
