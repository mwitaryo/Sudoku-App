import React from 'react'
import { TextInput, Text, StyleSheet, View, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setFilledBoard, setInitialBoard, validateBoard } from '../../store/actions'

export default function BoardCell(props) {
  const filledBoard = useSelector(state => state.filledBoard)
  const initialBoard = useSelector(state => state.initialBoard)

  const dispatch = useDispatch()
  const row = props.indexRow
  const col = props.indexCol
  let editableNum

  if (initialBoard[row][col]) {
    editableNum = props.col ? false : true
  } else {
    editableNum = true
  }


  function onChangeHandler(number) {
    if (!+number) {
      Alert.alert('Please input a valid number')
    }
    const newBoard = filledBoard.map(row => [...row])
    newBoard[row][col] = +number
    dispatch(setFilledBoard(newBoard))
    const url = 'https://sugoku.herokuapp.com/validate'
    dispatch(validateBoard(url))
  }

  return (
    <View style={!editableNum && { backgroundColor: '#F0F5F9' }}>

      <View style={styles.cellBox} >
        <TextInput
          editable={editableNum}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={onChangeHandler}
          style={{ textAlign: 'center' }}
        >{props.col ? <Text style={{ fontWeight: 'bold', color: 'black' }}>{props.col}</Text> : null}</TextInput>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  cellBox: {
    borderWidth: 1,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#13334C',
  }
})