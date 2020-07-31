import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button} from 'react-native';
import { Card, Icon , Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { favorites } from '../redux/favorites';
import { Rating, AirbnbRating} from 'react-native-ratings';
import { color, Value } from 'react-native-reanimated';


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
    
        if (dish != null) {
            return(
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
                    </View>
                </Card>
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
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
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
            <AirbnbRating
                count={5}
                reviews={['Terrible : 1/5', 'Bad : 2/5', 'Okay : 3/5', 'Good : 4/5', 'Great : 5/5']}
                defaultRating={5}
                size={40}
                showRating
                onFinishRating={(rating) => this.setState({rating: rating})}
            />
            <Input
                placeholder='Author'
                leftIcon={<Icon
                    name={'user-o'}
                    type='font-awesome'
                />}
                onChangeText={value => this.setState({ author: value })}
            />
            <Input
                placeholder='Comment'
                leftIcon={<Icon
                    name={'comment-o'}
                    type='font-awesome'
                />}
                onChangeText={value => this.setState({ comment: value })}
            />
            <View style={{margin: 10}}>
            <Button title="Submit"
                    color="#512DA8"
                    onPress={() => this.handleComment(dishId,this.state.rating,this.state.author,this.state.comment)}
            />
            </View>
            <View  style={{margin: 10}}>
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