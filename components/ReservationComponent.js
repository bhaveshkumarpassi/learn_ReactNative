import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
  Easing,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import { Notifications } from 'expo';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      elite: false,
      date: new Date(),
      time: new Date(),
      show: false,
      mode: "date",
    };
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    
    Alert.alert(
      'Confirm Reservation ?',
      'Number of Guests: ' + this.state.guests.toString() + '\n' + 'is Elite ? : ' + this.state.elite.toString() + '\n' + 'Date : ' + this.state.date.toDateString() + '\n' + 'Time : ' + this.state.time.toTimeString() + '\n',
      [
          {
            text: 'Cancel',
            type: 'cancel',
            onPress: () => this.resetForm()
          },
          {
            text: 'Ok',
            onPress: () => {this.presentLocalNotification(this.state.date, this.state.time), this.addReservationToCalendar(this.state.date), this.resetForm()}
          }
      ],
      {cancelable: true}
    )
  }

  resetForm() {
    this.setState({
      guests: 1,
      elite: false,
      date: new Date(),
      time: new Date(),
      show: false,
      showModal: false,
      mode: "date",
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
        }
    }
    return permission;
  }

  async obtainCalendarPermission() {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    if(permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if(permission.status !== 'granted') {
        Alert.alert('Pernission has to be granted for calendar support');
      }
    }
    return permission;
  }

  async getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
  }

  async addReservationToCalendar(date) {
      await this.obtainCalendarPermission();
      const defaultCalendarSource =
  
  Platform.OS === 'ios'
  
  ? await this.getDefaultCalendarSource()
  
  : { isLocalAccount: true, name: 'Expo Calendar' };

  let details = {
  
  title: 'Con Fusion Table Reservation',
  
  source: defaultCalendarSource,
  
  name: 'internalCalendarName',
  
  color: 'blue',
  
  entityType: Calendar.EntityTypes.EVENT,
  
  sourceId: defaultCalendarSource.id,
  
  ownerAccount: 'personal',
  
  accessLevel: Calendar.CalendarAccessLevel.OWNER,
  
  }
  const calendarId = await Calendar.createCalendarAsync(details);

     await Calendar.createEventAsync(calendarId, {
        title:  'Con Fusion Table Reservation',
        startDate: new Date(Date.parse(date)),
        endDate: new Date(Date.parse(date) + 7200000),
        timeZone: 'Asia/Hong_Kong',
        location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'

      });
  }

  async presentLocalNotification(date, time) {
    await this.obtainNotificationPermission();
    Notifications.createChannelAndroidAsync('confusion', {
      name: 'confusion',
      sound: true,
      vibrate: true
    });
    Notifications.presentLocalNotificationAsync({
        title: 'Your Reservation',
        body: 'Reservation for '+ date.toDateString() + ' ' + time.toTimeString() + ' requested',
        ios: {
            sound: true
        },
        android: {
            
            channelId: 'confusion',
            color: '#512DA8'
        }
    });
  }


  render() {
    
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ guests: itemValue })
            }
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Elite/Non-Elite ?</Text>
          <Switch
            style={styles.formItem}
            value={this.state.elite}
            trackColor="#512DA8"
            onValueChange={(value) => this.setState({ elite: value })}
          ></Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <TouchableOpacity style={styles.formItem}
            style={{
                padding: 7,
                borderColor: '#512DA8',
                borderWidth: 2,
                flexDirection: "row"
            }}
            onPress={() => this.setState({ show: true, mode: 'date' })}
          >
          <Icon type='font-awesome' name='calendar' color='#512DA8' />
          <Text >
              {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
          </Text>
          </TouchableOpacity>
          {this.state.show && (
            <DateTimePicker
              value={this.state.date}
              mode={this.state.mode}
              display="default"
              minimumDate={new Date()}
              onChange={(selected, value) => {
                if (value !== undefined) {
                  this.setState({
                    show: this.state.mode === "time" ? false : true,
                    mode: "time",
                    date: new Date(selected.nativeEvent.timestamp),
                    time: new Date(selected.nativeEvent.timestamp),
                  });
                } else {
                  this.setState({ show: false });
                }
              }}
            />
          )}
        </View>
        <View style={styles.formRow}>
          <Button
            onPress={() => this.handleReservation()}
            title="Reserve"
            color="#512DA8"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;
