
    const SETTINGS_KEY = 'Settings'
const settingsObj = [
        {'name':'Business','icon':'cash'},
        {'name':'Clinic','icon':'medkit'},{'name':'Prayers','icon':'moon'},
        {'name':'News','icon':'megaphone'},
        {'name':'Contact','icon':'contact'}];
AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj))

    const SETTINGS_KEY = 'Settings';
    AsyncStorage.getItem(SETTINGS_KEY).then((settingsStr)=>{
      this.setState({"tabOrder": JSON.parse(settingsStr)});
    })