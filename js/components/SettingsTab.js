
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Platform, AsyncStorage } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Separator, Text,Right,Body,Left,Picker, ListItem } from 'native-base';

import { openDrawer } from '../actions/drawer';
import styles from './styles';

const Item = Picker.Item;

class SettingsTab extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      mosques: 'Hoover',
      prayers: 'Tab1',
      news: 'Tab2',
      business: 'Tab3',
      clinic: 'Tab4',
      contact: 'Tab5',
    };
    AsyncStorage.getItem('mosques').then((settingsStr)=>{
      if(settingsStr){
        this.setState({mosques: settingsStr});
      }else{
        AsyncStorage.setItem('mosques', this.state.mosques);
      }
    });
    AsyncStorage.getItem('prayers').then((settingsStr)=>{
      if(settingsStr){
        this.setState({prayers: settingsStr});
        AsyncStorage.setItem('prayers', this.state.prayers);
      }
    });
    AsyncStorage.getItem('news').then((settingsStr)=>{
      if(settingsStr){
        this.setState({news: settingsStr});
      }else{
        AsyncStorage.setItem('news', this.state.news);
      }
    });
    AsyncStorage.getItem('business').then((settingsStr)=>{
      if(settingsStr){
        this.setState({business: settingsStr});
      }else{
        AsyncStorage.setItem('business', this.state.business);
      }
    });
    AsyncStorage.getItem('clinic').then((settingsStr)=>{
      if(settingsStr){
        this.setState({clinic: settingsStr});
      }else{
        AsyncStorage.setItem('clinic', this.state.clinic);
      }
    });
    AsyncStorage.getItem('contact').then((settingsStr)=>{
      if(settingsStr){
        this.setState({contact: settingsStr});
      }else{
        AsyncStorage.setItem('contact', this.state.contact);
      }
    });
  }

  onValueChange(key, value) {
    var obj = {};
  	obj[key] = value;
  	var settingsStates = this.state;
  	var obj2 = {};
  	Object.keys(settingsStates).map(function(currentState,i) {
  		if(settingsStates[currentState] === value){
  			obj2[currentState] = 'None';
  		}
  	})

  	this.setState(obj2);
  	this.setState(obj);
  }

  saveSettings(){
    for(key of Object.keys(this.state)){
      if(this.state[key] === 'None'){
        return;
      }
    }
    for(key of Object.keys(this.state)){
      AsyncStorage.setItem(key, this.state[key]);
    }
    console.log('Save Values');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#7E57C2' }} androidStatusBarColor="#673AB7" iosBarStyle="light-content">
          <Left>
            <Image source={require('./../../img/bis.png')} style={{width: 40, height: 40}} />
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>Settings</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="menu" style={{ color: '#FFF' }}/>
            </Button>
          </Right>
        </Header>

        <Content>
        	<Separator bordered noTopBorder>
                <Text style={{fontSize: 14}}>Default Values</Text>
            </Separator>
            <Text>{this.state.data}</Text>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="locate" />
              </Button>
            </Left>
            <Body>
              <Text>Prayer Times Mosque</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.mosques}
                onValueChange={this.onValueChange.bind(this,'mosques')}>
                <Item label="Hoover" value="Hoover" />
                <Item label="Homewood" value="Homewood" />
                <Item label="Westside" value="Westside" />
              </Picker>
            </Right>
          </ListItem>
        	<Separator bordered noTopBorder>
                <Text style={{fontSize: 14}}>Tab Order</Text>
            </Separator>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Prayers</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.prayers}
                onValueChange={this.onValueChange.bind(this,'prayers')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>News</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.news}
                onValueChange={this.onValueChange.bind(this,'news')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Business</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.business}
                onValueChange={this.onValueChange.bind(this,'business')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Clinic</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.clinic}
                onValueChange={this.onValueChange.bind(this,'clinic')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Contact</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.contact}
                onValueChange={this.onValueChange.bind(this,'contact')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <Button onPress={() => this.saveSettings()} >
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(SettingsTab);

/*    const SETTINGS_KEY = 'Settings'
const settingsObj = [
        {'name':'Business','icon':'cash'},
        {'name':'Clinic','icon':'medkit'},{'name':'Prayers','icon':'moon'},
        {'name':'News','icon':'megaphone'},
        {'name':'Contact','icon':'contact'}];
AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj))

    const SETTINGS_KEY = 'Settings';
    AsyncStorage.getItem(SETTINGS_KEY).then((settingsStr)=>{
      this.setState({"tabOrder": JSON.parse(settingsStr)});
    })*/
