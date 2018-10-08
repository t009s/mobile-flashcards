import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { lightOrg, black, gray } from '../utils/colors'

export default class Deck extends Component {
  render() {
    const { title, questions, bigFonts } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[
          styles.title, (bigFonts)
            ? { fontSize: 36 }
            : ''
        ]}>{title}</Text>
        <Text style={[
          styles.count, (bigFonts)
            ? { fontSize: 24 }
            : ''
        ]}>{questions.length} {questions.length > 1 ? 'cards' : 'card'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: 'center'
  },
  count: {
    color: gray,
    fontSize: 16,
    textAlign: 'center'
  }
})