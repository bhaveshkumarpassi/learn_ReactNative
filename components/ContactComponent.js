import React, {Component} from 'react';
import {Text} from 'react-native';
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
                <Text style={{margin: 10}}>
                121, Clear Water Bay Road {'\n'} {'\n'}
                Clear Water Bay, Kowloon {'\n'} {'\n'}
                HONG KONG {'\n'} {'\n'}
                Tel: +852 1234 5678 {'\n'} {'\n'}
                Fax: +852 8765 4321 {'\n'} {'\n'}
                Email:confusion@food.net {'\n'} {'\n'}
                </Text>
            </Card>
        );
    }
}

export default Contact;