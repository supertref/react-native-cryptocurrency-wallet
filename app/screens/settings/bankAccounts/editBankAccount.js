import React, {Component} from 'react'
import {View, Alert, AsyncStorage, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import EditBankAccountComponent from './bankAccountComponent'

export default class EditBankAccount extends Component {
  static navigationOptions = {
    title: 'Edit Bank Account',
  }

  constructor(props) {
      super(props)
      const params = this.props.navigation.state.params.reference
      this.state = {
        id: params.id,
        name: params.name,
        number: params.number,
        type: params.type,
        bank_name: params.bank_name,
        branch_code: params.branch_code,
        swift: params.swift,
        iban: params.iban,
        bic: params.bic,
      }
   }

   updateName = (name) => {
      this.setState({name})
   }
   updateNumber = (number) => {
      this.setState({number})
   }
   updateType = (type) => {
      this.setState({type})
   }
   updateBank = (bank_name) => {
      this.setState({bank_name})
   }
   updateBranch = (branch_code) => {
      this.setState({branch_code})
   }
   updateSwift = (swift) => {
      this.setState({swift})
   }
   updateIBAN = (iban) => {
      this.setState({iban})
   }
   updateBIC = (bic) => {
      this.setState({bic})
   }
   goToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: 'Settings'}),
        }),
        NavigationActions.navigate({ routeName: 'SettingsBankAccounts'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
   }

   update = async() => {
     //console.log(this.state)
     const value = await AsyncStorage.getItem('token')
     fetch('https://rehive.com/api/3/user/bank_accounts/' + this.state.id + '/', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
        body: JSON.stringify(this.state),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.goToHome()
        }
        else {
          Alert.alert('Error',
            responseJson.message,
            [{text: 'OK'}])
        }
      })
      .catch((error) => {
        Alert.alert('Error',
            error,
            [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
      })
   }

  render() {
    return (
      <View style={styles.container}>
        <EditBankAccountComponent
          values={this.state}
          updateName={this.updateName}
          updateNumber={this.updateNumber}
          updateType={this.updateType}
          updateBank={this.updateBank}
          updateBranch={this.updateBranch}
          updateSwift={this.updateSwift}
          updateIBAN={this.updateIBAN}
          updateBIC={this.updateBIC}
          save={this.update}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    padding:15,
  },
})