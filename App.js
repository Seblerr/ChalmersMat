/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ScrollView,
  RefreshControl
} from 'react-native';
import {
  getWeekday, fetchLinsen, checkOpen, 
  karen, express, ls, fetchMenu, test, kokboken
} from './fetchmenu.js'



export default class App extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      expressMenu: [],
      karenMenu: [],
      linsenMenu: [],
      lsMenu: [],
      kokbokenMenu: [],
      refreshing: false,
    }
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.update()
    this.setState({ refreshing: false });

  }

  componentDidMount() {
    this.update()
  }

  update() {
    fetchMenu(express).then(val => {
      this.setState({ expressMenu: val })
    })

    fetchMenu(karen).then(val => {
      this.setState({ karenMenu: val })
    })

    fetchMenu(ls).then(val => {
      this.setState({ lsMenu: val })
    })

    fetchMenu(kokboken).then(val => {
      this.setState({ kokbokenMenu: val })
    })

    fetchLinsen().then(val => {
      this.setState({ linsenMenu: val })
    })
  }

  displayMenu(rest) {
    if (checkOpen())
      return <View><Text style={{ fontSize: 16, fontStyle: 'italic' }}>Closed for the weekend</Text></View>
    else {
      return rest.map((x) =>
        <View key={x.id}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{x.dishType}</Text>
          <View><Text style={{fontSize: 16, fontStyle: 'italic'}}>{x.dish}</Text></View>
        </View>
      )
    }

  }

  displayLinsen() {
    if (checkOpen())
      return <View><Text style={{ fontSize: 16, fontStyle: 'italic' }}>Closed for the weekend</Text></View>
    else {
      return this.state.linsenMenu.map((x) =>
        <View key={Math.random()}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Dagens</Text>
          <View><Text style={{fontSize: 16, fontStyle: 'italic'}}>{x.dish}</Text></View>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.welcome}>
              ChalmersMat
          </Text>
          </View>

          {/*L's Kitchen */}
          <View style={[styles.menus, {backgroundColor: '#90A4AE'}]}>
          <Text style={styles.titleText}>L's Kitchen</Text>
            {this.displayMenu(this.state.lsMenu)}
          </View>

          {/*Kokboken */}
          <View style={[styles.menus, {backgroundColor: '#E0E0E0'}]}>
          <Text style={styles.titleText}>Kokboken</Text>
            {this.displayMenu(this.state.kokbokenMenu)}
          </View>

          {/*Kårrestaurangen */}
          <View style={[styles.menus, {backgroundColor: '#90A4AE'}]}>
            <Text style={styles.titleText}>Kårrestaurangen</Text>
            {this.displayMenu(this.state.karenMenu)}
          </View>

          {/*Express Johanneberg */}
          <View style={[styles.menus, {backgroundColor: '#E0E0E0'}]}>
            <Text style={styles.titleText}>Express</Text>
            {this.displayMenu(this.state.expressMenu)}
          </View>

          {/*Linsen */}
          <View style={[styles.menus, {backgroundColor: '#90A4AE'}]}>
            <Text style={styles.titleText}>Linsen</Text>
            {this.displayLinsen()}
          </View>
        </View>
      </ScrollView>

    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flex: 1,
    padding: 30,
    backgroundColor: '#E0E0E0'

    // backgroundColor: 'green'
  },
  menus: {
    flex: 1,
    padding: 15,
    // backgroundColor: 'green'
  },
  welcome: {
    fontSize: 48,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    // marginBottom: 40
    // paddingTop: 40,
    // backgroundColor: "blue"
  }
});