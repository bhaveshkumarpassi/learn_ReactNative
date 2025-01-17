import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, PanResponder, Alert, Share} from 'react-native';
import { Card, Icon , Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { favorites } from '../redux/favorites';
import {AirbnbRating, Rating} from 'react-native-ratings';
import { color, Value } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})


function RenderDish(props) {

    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const recognizeAddCommentGesture = ({moveX, moveY, dx, dy}) => {
        if( dx > 200 )
            return true;
        else 
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },

        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then((endState) => console.log(endState.finished ? 'finished' : 'cancelled'))
        },

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            
            else if(recognizeAddCommentGesture(gestureState)) {

                props.onAddComment();
            }
            return true;
        }
    })

    const shareDish = (title, message, url) => {

        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, { dialogTitle: 'Share' + title})
    }
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers}
                    ref={this.handleViewRef}>
                <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.onAddComment()}
                    />
                    <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                    />
                            
                    </View>
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <AirbnbRating count={5} size={20} defaultRating={item.rating} showRating={false} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}


class Dishdetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            showModal: false,
            rating: '',
            author: '',
            comment: ''
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment(dishId,rating,author,comment) {
        
        this.props.postComment(
            dishId,
            rating,
            author,
            comment
        );
        this.toggleModal();
    }

    render() {
        const dishId = this.props.route.params.dishId;
    return(
        <ScrollView>
            
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)}
                onAddComment={() => this.toggleModal()}  />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={() => this.toggleModal()}
                onRequestClose={() => this.toggleModal()}
            >
            <Rating 
                    ratingCount={5}
                    imageSize={40}
                    startingValue={5}
                    showRating
                    onFinishRating={(rating) => this.setState({rating: rating})}
            />
            <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
            <Input
                placeholder='Author'
                leftIcon={<Icon
                    name={'user-o'}
                    type='font-awesome'
                />}
                onChangeText={value => this.setState({ author: value })}
                value={this.state.author}
            />
            </View>
            <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
            <Input
                placeholder='Comment'
                leftIcon={<Icon
                    name={'comment-o'}
                    type='font-awesome'
                />}
                onChangeText={value => this.setState({ comment: value })}
                value={this.state.comment}
            />
            </View>
            <View style={{margin: 20}}>
            <Button title="Submit"
                    color="#512DA8"
                    onPress={() => this.handleComment(dishId,this.state.rating,this.state.author,this.state.comment)}
            />
            </View>
            <View  style={{margin: 20}}>
            <Button title="Cancel"
                    color="grey"
                    onPress={() => this.toggleModal()}
            />
            </View>
            </Modal>
        </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);