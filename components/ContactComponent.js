import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-elements';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state={

        };
    }

    render() {
        return(
            <Card title={"Our Address"}>
                <View>
                <Text style={{margin: 10}}>121, Clear Water Bay Road</Text>
                <Text style={{margin: 10}}>Clear Water Bay, Kowloon</Text>
                <Text style={{margin: 10}}>HONG KONG</Text>
                <Text style={{margin: 10}}>Tel: +852 1234 5678</Text>
                <Text style={{margin: 10}}>Fax: +852 8765 4321</Text>
                <Text style={{margin: 10}}>Email:confusion@food.net</Text>
                </View>
            </Card>
        );
    }
}

export default Contact;