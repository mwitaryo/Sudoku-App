import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialBoard, fetchSolvedBoard, setFilledBoard, setSolvedBoard, setStatus, validateBoard } from '../../store/actions'
import BoardRow from '../../components/BoardRow'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Pressable, Dimensions, Alert, Modal } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { Button } from 'react-native-paper'



export default function Game({ navigation: { navigate }, route: { params } }) {
  const dispatch = useDispatch()
  const initialBoard = useSelector(state => state.initialBoard)
  const solvedBoard = useSelector(state => state.solvedBoard)
  const status = useSelector(state => state.status)
  const filledBoard = useSelector(state => state.filledBoard)
  let GameBoard = solvedBoard.length ? [...solvedBoard] : [...filledBoard]
  // const player = useSelector(state => state.player)
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(600)
  const startTime = new Date()
  const { name, difficulty } = params



  useEffect(() => {
    if (status === 'solved') {
      const finishTime = new Date()
      // const duration = Math.abs(finishTime.getTime() - startTime.getTime() / 1000)
      const startSeconds = startTime.getMinutes() * 60 + startTime.getSeconds()
      const endSeconds = finishTime.getMinutes() * 60 + finishTime.getSeconds()

      const duration = endSeconds - startSeconds
      // console.log(duration);

      // console.log(after - below)
      // dispatch(setPlayer({ ...player, time: +duration }))
      setModalVisible(!modalVisible)
    }
  }, [status])

  useEffect(() => {
    const url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
    dispatch(fetchInitialBoard(url))
    dispatch(setSolvedBoard([]))
    dispatch(setStatus('unsolved'))

  }, [])

  useEffect(() => {
    if (solvedBoard.length) {
      dispatch(setFilledBoard(solvedBoard))
      const url = 'https://sugoku.herokuapp.com/validate'
      dispatch(validateBoard(url))

    }
  }, [solvedBoard])

  const solveHandler = async () => {
    const url2 = 'https://sugoku.herokuapp.com/solve'
    await dispatch(fetchSolvedBoard(url2))
  }

  const unsolvedHandler = async () => {
    await dispatch(setSolvedBoard([]))
    await dispatch(setFilledBoard(initialBoard))
    dispatch(setStatus('unsolved'))

  }

  const stopTimer = () => {
    Alert.alert("Time's up")
  }

  const endGameHandler = () => {
    dispatch(setStatus('unsolved'))
    setModalVisible(false)
    navigate('Finish', { name, difficulty, status })
  }

  const validateHandler = () => {
    const url = 'https://sugoku.herokuapp.com/validate'
    dispatch(validateBoard(url))
    Alert.alert(`validate status: ${status}`)
    if (status === 'solved') {
      navigate('Finish', { name, difficulty, status })
    }

  }
  return (
    <View style={styles.container}>

      <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <Button color="#5B5656" style={{ fontWeight: 'bold  ' }} onPress={() => validateHandler()}>Validate</Button>
      </View>

      <View>
        <Text>{name}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{status === 'solved' ? "Yay! You've solved the board" : "Are you sure?"}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => endGameHandler()}
              >
                <Text style={styles.textStyle}>End Game</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>


      <CountDown
        until={timer}
        onFinish={() => stopTimer()}
        onPress={() => alert('hello')}
        timeToShow={['M', 'S']}
        digitStyle={{ backgroundColor: '#C9D6DF' }}
        digitTxtStyle={{ color: '#52616B' }}
        size={20}
      />

      <View style={styles.buttonGroup}>
        <Button color="#5B5656" onPress={() => solveHandler()} >Solved</Button>
        <Button color="#5B5656" onPress={() => unsolvedHandler()}>Reset</Button>
        <Button color="#5B5656" onPress={() => setModalVisible(!modalVisible)}>End</Button>
      </View>


      <View>
        {
          GameBoard.map((row, i) => (
            <View key={i} style={styles.boardContainer}>
              <BoardRow key={i} row={row} indexRow={i} />
            </View>
          ))
        }


        <View style={styles.textGroup}>
          {/* <Button
            mode="outlined"
            color="#FDC8AA"
            style={{ width: 120 }}
            labelStyle={{ color: "black", fontSize: 12 }}
            style={{ textAlign: 'center'}}

          > Status: </Button>
          <Button
            mode="outlined"
            color="#FFF"
            style={{ width: 120 }}
            labelStyle={{ color: "#FDC8AA", fontSize: 12 }}
            style={{ textAlign: 'center'}}
          > {status} </Button> */}

          <Text style={styles.statusText}>Status</Text>
          <Text style={styles.statusInfo}>{status}</Text>

        </View>
      </View>
    </View>


  )
}

const screenWidth = Dimensions.get('screen').width

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
    justifyContent: 'center'
  },

  textGroup: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center'
  },

  statusText: {
    textAlign: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#FDC8AA',
    borderColor: 'white',
    color: 'white',
    fontSize: 22,
    width: 135,
  },
  statusInfo: {
    textAlign: 'center',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'grey',
    backgroundColor: '#C9D6DF',
    borderColor: 'white',
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393E46',
    width: 135,
    textAlignVertical: 'center'
  },






  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    width: 100,
    marginLeft: 5,
    marginRight: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#C9D6DF",
  },
  textStyle: {
    color: "#393E46",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
