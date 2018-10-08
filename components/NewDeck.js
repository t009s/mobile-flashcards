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
import { black, white, lightOrg } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class NewDeck extends Component {
  state = {
    title: ""
  }

  submit = () => {
    const { title } = this.state
    const { addDeck } = this.props
    if (title) {
      addDeck(title)
      saveDeckTitle(title)
      this.toHome()
    } else {
      alert('Enter Deck Title')
    }
  }

  toHome() {
    this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckLabel}>What is the title of your new deck?</Text>
        <TextInput 
          underlineColorAndroid={'transparent'} 
          style={styles.deckTitle} 
          editable={true} 
          maxLength={50} 
          placeholder="Deck Title" 
          onChangeText={(title) => this.setState({
            title
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
  deckLabel: {
    margin: 10,
    color: black,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40
  },
  deckTitle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: lightOrg
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

function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps, {addDeck})(NewDeck)
