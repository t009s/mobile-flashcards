import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import {clearDB} from './utils/api'
import { setLocalNotification } from './utils/notifications'
import { lightOrg, white, orange } from './utils/colors'
import Decks from './components/Decks'
import AddCard from './components/AddCard'
import NewDeck from './components/NewDeck'
import DeckDetails from './components/DeckDetails'
import Quiz from './components/Quiz'
import { Entypo } from '@expo/vector-icons'

function FlashCardsStatusBar({ backgroundColor, ...props }){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Decks:{
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor} />
    }
  }
},{
  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios'? lightOrg : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : lightOrg,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
   }
  }
})

export const MainNavigator = createStackNavigator({
  Home:{
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckDetails:{
    screen: DeckDetails,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
         backgroundColor: lightOrg 
      },
      headerBackTitle: null,
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
         backgroundColor: lightOrg 
      },
      headerBackTitle: null,
      title: "Add Card"
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
         backgroundColor: lightOrg
      },
      headerBackTitle: null,
      title: "Quiz"
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <FlashCardsStatusBar backgroundColor={orange} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
