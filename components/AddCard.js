import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { lightOrg, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }
  submit = () => {
    const { question, answer } = this.state
    const { addCard, deck, goBack } = this.props
    if (question && answer) {
      addCard(deck.title, { question, answer })
      addCardToDeck(deck.title, { question, answer })
      goBack()
    } else {
      alert('Enter Question & Answer')
    }
  }

  render() {
    const {deck, onSubmit, submitBtnText} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <TextInput 
          style={styles.question} 
          underlineColorAndroid={'transparent'} 
          editable={true} 
          placeholder="Enter the question here" 
          onChangeText={(question) => this.setState({
            question
          })}
        />
        <TextInput 
          style={styles.answer} 
          underlineColorAndroid={'transparent'} 
          editable={true} 
          multiline={true} 
          placeholder="Enter the answer here" 
          onChangeText={(answer) => this.setState({
            answer
          })}
        />
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn]} onPress={this.submit}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  title: {
    color: lightOrg,
    fontSize: 24,
    textAlign: 'center'
  },
  question: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: lightOrg,
    borderRadius: 20
  },
  answer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: lightOrg,
    height: 70
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    flex: 1,
    backgroundColor: lightOrg,
    padding: 10,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 20,
      }
    })
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
    deck: decks[deckTitle] || {}
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
