import React, { Component } from 'react';
import { View, Platform, ScrollView, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();
const FavoriteNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();

function ReservationNavigatorScreen() {
    return(
        <ReservationNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ReservationNavigator.Screen
                name="Reserve Your Table"
                component={Reservation}
                options={{headerTitle: "Reserve Your Table"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </ReservationNavigator.Navigator>
    );
}

function LoginNavigatorScreen() {
    return(
        <LoginNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <LoginNavigator.Screen
                name="Login"
                component={Login}
                options={{headerTitle: "Login"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </LoginNavigator.Navigator>
    );
}

function FavoriteNavigatorScreen() {
    return(
        <FavoriteNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <FavoriteNavigator.Screen
                name="My Favorites"
                component={Favorites}
                options={{headerTitle: "My Favorites"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </FavoriteNavigator.Navigator>
    );
}

function ContactNavigatorScreen() {
    return(
        <ContactNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contact Us"
                component={Contact}
                options={{headerTitle: "Contact Us"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </ContactNavigator.Navigator>
    );
}

function AboutNavigatorScreen() {
    return(
        <AboutNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <AboutNavigator.Screen
                name="About Us"
                component={About}
                options={{headerTitle: "About Us"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </AboutNavigator.Navigator>
    );
}

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{headerTitle: "Home"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </HomeNavigator.Navigator>
    );
}

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={{ headerTitle: "Menu"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
  );

function MainNavigatorScreen() {
    return(
        <MainNavigator.Navigator
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor: '#D1C4E9'
            }}
            drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
        >   
            <MainNavigator.Screen
                name="Login"
                component={LoginNavigatorScreen}
                options={{ headerTitle: "Login"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='sign-in'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{ headerTitle: "Home"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='home'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="About Us"
                component={AboutNavigatorScreen}
                options={{headerTitle: "About Us"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='info-circle'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{ headerTitle: "Menu"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='list'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="Contact Us"
                component={ContactNavigatorScreen}
                options={{headerTitle: "Contact Us"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='address-card'
                      type='font-awesome'            
                      size={22}
                      color={tintColor}
                    />
                )}}
            />
            <MainNavigator.Screen
                name="My Favorites"
                component={FavoriteNavigatorScreen}
                options={{headerTitle: "My Favorites"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='heart'
                      type='font-awesome'            
                      size={22}
                      color={tintColor}
                    />
                )}}
            />
            <MainNavigator.Screen
                name="Reserve Your Table"
                component={ReservationNavigatorScreen}
                options={{headerTitle: "Reserve Your Table"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='cutlery'
                      type='font-awesome'            
                      size={22}
                      color={tintColor}
                    />
                )}}
            />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }

  render() {
 
    return (
        <NavigationContainer>
            <MainNavigatorScreen />           
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);