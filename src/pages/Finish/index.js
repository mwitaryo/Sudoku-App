import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInitialBoard } from '../../store/actions'


export default function Finish({ navigation: { navigate }, route: { params } }) {
  const dispatch = useDispatch()

  // const player = useSelector(state => state.player)
  // const { name, difficulty } = player
  const { name, difficulty, status } = params

  useEffect(() => {
    const url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
    dispatch(fetchInitialBoard(url))
  }, [])

  const finishHandler = () => {
    navigate('Home')
  }

  const playAgainHandler = () => {
    navigate('Game')
  }
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {
          status === 'solved' ?
            <View style={{ alignItems: 'center' }}>

              <Text>Congratulations !!!</Text>
              <Text>{name}</Text>
              <Text>You've finished the game</Text>
            </View>
            :
            <View style={{ alignItems: 'center' }}>
              <Text>GAME OVER</Text>
              <Text>
                {name}
              </Text>
              <Text>
                Would you like to try again?
              </Text>
            </View>
        }
      </View>

      <View style={styles.buttonGroup}>
        <Button mode="outlined"
          labelStyle={{ color: '#FDC8AA', fontSize: 13, fontWeight: 'bold' }}
          contentStyle={{ width: 120 }}
          style={{ margin: 4 }}
          onPress={() => playAgainHandler()}>Play Again</Button>
        <Button mode="contained"
          color="#FDC8AA"
          labelStyle={{ color: 'white', fontSize: 13 }}
          contentStyle={{ width: 120 }}
          style={{ margin: 4 }}
          onPress={() => finishHandler()}>Finish</Button>
      </View>
    </View>
  )
}


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // width: screenWidth * 0.8,
    // height: screenWidth * 0.8
  },
  table: {
    flex: 1,
    marginBottom: 30
  },
  boardContainer: {
    flexDirection: 'row'
  },

  buttonGroup: {
    flexDirection: 'row',
    margin: 8,
    justifyContent: 'center',

  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 8,
    width: screenWidth * 0.7,
    height: screenHeight * 0.2
  }
});


