import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  WebView, 
  Platform, 
  Text, 
  Alert, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const colors = {
  toscagreen: '#00398B',
  searchText: '#000000'
}
import { newFacilities } from './testFacilities';
export const styless = StyleSheet.create({
  mainScreen : {
    flex:1
  },
  smallerText:{
    fontSize:12
  },
  bigText:{fontSize:18}
})
export const formStyles = StyleSheet.create({
  mainScreen : {
    flex:1
  },
  smallerText:{
    fontSize:12
  },
  bigText:{fontSize:18}
})


const INDEX_FILE = require(`./image.html`);
const MESSAGE_PREFIX = 'react-native-map_2';

class FloorPlan extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      zoom : 1, 
      mapLoaded: false,
      mapImage : '',
      height: 0,
      width : 0,
      facilities : newFacilities, 
      bookedList : []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendUpdatedMap = this.sendUpdatedMap.bind(this);
    this.onMapEvent = this.onMapEvent.bind(this);
    this.onMapMarkerClicked = this.onMapMarkerClicked.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount(){
    this.sendMessage({
      zoom: 1,
        image: 'https://image.ibb.co/h7nrCp/J1QS.gif',
        locations : [],
        height : 400,
        width :400
    })
    this.setState( { mapLoaded :false } );
    this.sendUpdatedMap();
  }
  
  componentDidUpdate(prevProps, prevState){
    const {mapImage, height, width, facilities, bookedList } = this.state
      const facilitiesData  =  _.map(facilities,(facility =>({
        id : facility.id,
        facility_name : facility.facility_name,
        location : facility.location,
        capacity: facility.capacity,
        floor: facility.floor,
        created_by: facility.created_by,
        room_number: facility.room_number,
        coords: facility.coords,
        status: facility.status,
        size: [64, 64],
        animation: bookedList     
                    ? bookedList.includes(facility.id) 
                      ? 'pulse' 
                      : null 
                    : null
      })));
        let h, w;
        if(this.state.facilities !== prevState.facilities || mapImage !== 'https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png' ) {
          Image.getSize('https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png'//floors.floor_plan.toString().replace(/"/g, '').replace(/\\/g, '').replace("\\/","/")
          , (width, height) => {
            let imgHeight = height;
            let imgWidth = width;
            if(imgHeight > imgWidth){
                h = 1280 * 2,
                w = imgWidth/imgHeight * 1280 * 2;
            }
            else{
                w = 1280 * 2,
                h = imgHeight/imgWidth * 1280 * 2;
            }
            
            this.sendMessage({
              zoom: 1,
              image: "https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png",//floors.floor_plan.toString().replace(/"/g, '').replace(/\\/g, '').replace("\\/","/"),
              locations : facilitiesData,
              initialFloor : 1,
              width: w,
              height: h
            });

            this.setState({ mapImage : "https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png",
                          height : h ,
                          width : w })
          });
        }
        else{
          this.sendMessage({
            zoom: 1,
              image: "https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png",//floors.floor_plan.toString().replace(/"/g, '').replace(/\\/g, '').replace("\\/","/"),
              locations : facilitiesData,
              height : height ,
              width : width 
          })
          //this.setState({mapLoaded : false});
        }

  }

  AddToBucketList(payload){
    const { bookedList } = this.state;
      this.setState({
        bookedList : _.concat(bookedList,payload.payload.id)
      })
      this.sendUpdatedMap();
    
  }

  DeleteFromBucketList(payload){
    const { bookedList } = this.state;

      var bookedListAfterDeleted = _.remove(bookedList, function(n){
        return n.id == payload.payload.id
      })
      this.setState({
        bookedList : bookedListAfterDeleted
      })
      this.sendUpdatedMap();
  }

  sendUpdatedMap(zoom = 1){

    const { mapImage, height, width, facilities, bookedList } = this.state;
    const facilitiesData  =  _.map(facilities,(facility =>({
                              id : facility.id,
                              facility_name : facility.facility_name,
                              location : facility.location,
                              capacity: facility.capacity,
                              floor: facility.floor,
                              created_by: facility.created_by,
                              room_number: facility.room_number,
                              coords: facility.coords,
                              status: facility.status,
                              size: [64, 64],
                              animation: bookedList     
                                          ? bookedList.includes(facility.id) 
                                            ? 'pulse' 
                                            : null 
                                          : null
                            })));

    let h, w;                  
      if( mapImage !== 'https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png' ) {
        Image.getSize( 'https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png'
        , (width, height) => {  
          let imgHeight = height;
          let imgWidth = width;
          if(imgHeight > imgWidth){
              h = 1280 * 2,
              w = imgWidth/imgHeight * 1280 * 2;
          }
          else{
              w = 1280 * 2,
              h = imgHeight/imgWidth * 1280 * 2;
          }

          this.sendMessage({
            zoom: zoom,
            image: "https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png",//floors.floor_plan.toString().replace(/"/g, '').replace(/\\/g, '').replace("\\/","/"),
            locations : facilitiesData,
            initialFloor : 1,
            height : h,
            width : w
          });

          this.setState({ mapImage :"https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png",
                        height : h ,
                        width : w })
        });
      }
      else{
        this.sendMessage({
          zoom: zoom,
            image: "https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png",//floors.floor_plan.toString().replace(/"/g, '').replace(/\\/g, '').replace("\\/","/"),
            locations : facilitiesData,
            height : height,
            width : width
        })
      }
  }
  onMapEvent = (payload) => {
    const {zoom} = payload;
    this.setState({zoom : zoom});
  }

  onMapMarkerClicked = (payload) => {
     const { payload : { id } } = payload;
     const { facilities, bookedList } = this.state;
     const facility = _.find(facilities, {id: id});

      let  Message = 
                      "name : " +  facility.facility_name + " \n" + 
                      "facilities_type_name:  Facility Room "+ " \n" +
                      "room_number : " + facility.room_number + " \n" + 
                      "capacity : " + facility.capacity + "people \n"+
                      "size : " + "64 meter x 20 meter" + " \n"+ 
                      // (facilitiesRateMessage !== ""  || facilitiesRate !== {} 
                      //   ? facilitiesRateMessage : "There is No Rate for This Facility") +
                      "status_info : " + facility.status + " \n"

      let alreadyListed = bookedList ? bookedList.includes(id) : false
      let BookMessage = facility.status === "Not Booked" 
                          ? alreadyListed 
                            ? "This Booking has already on your bucket list" 
                            : 'Are you sure you want to book this facility ? '
                          : "Have Already Booked by other sales";
      let BookButton = facility.status === "Not Booked"   
                        ? alreadyListed 
                          ? [{text: 'DELETE',onPress: () => {
                              this.DeleteFromBucketList(payload)
                            }},
                            {text: 'CANCEL'}]
                          : [{text: 'BOOK',onPress: () => {
                              this.AddToBucketList(payload)
                            }},
                            {text: 'CANCEL'}]
                        : null;
      Alert.alert(
        'Booking this facility',
      Message + BookMessage,
        BookButton,
        { cancelable: false }
      )
  }
  // data to send is an object containing key value pairs that will be
  // spread into the destination's state
  sendMessage = (payload) => {
    // if (this.state.mapLoaded) {
    // only send message when webview is loaded
    const message = JSON.stringify({
      prefix: MESSAGE_PREFIX,
      payload
    });

    // console.log(`WebViewLeaflet: sending message: `, JSON.stringify(message));
    if( message && this.webview ){ this.webview.postMessage(message, '*'); }
    // }
  };

  //
  handleMessage = (event) => {
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        // if we receive an event, then pass it to the parent by calling
        // the parent function wtith the same name as the event, and passing
        // the entire payload as a parameter
        
        if (msgData.payload.event === "onResize"){
          this.setState( { mapLoaded : true } );
        }
        // this.sendUpdatedMap()
        if ( this.hasOwnProperty(msgData.payload.event) )
        {
          this[msgData.payload.event](msgData.payload);
        }
        else {
          this.setState({
            state: {
              ...this.state,
              mapState: {
                ...this.mapState,
                ...msgData.payload
              }
            }
          });
        }
        // WebViewLeaflet will also need to know of some state changes, such as
        // when the mapComponent is mounted
        
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  onError = (error) => {
    return (
      <View style={styles.activityOverlayStyle}>
        <Text>WebViewError</Text>
        <Text>{error}</Text>
      </View>
    );
  };

  renderError = (error) => {
    return (
      <View style={styles.activityOverlayStyle}>
        <Text>RenderError</Text>
        <Text>{error}</Text>
      </View>
    );
  };

  renderLoadingIndicator = () => {
    return (
      <View style={styles.activityOverlayStyle}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size="large"
            animating={!this.props.eventReceiver.state.mapsState.mapLoaded}
          />
        </View>
      </View>
    );
  };
  render() {
    const { bookedList } = this.state;
    const booking_items_count =  bookedList.length
      return (
        <View style={[styless.mainScreen]}>
          {/* <ScrollView style={{flex : 1}}> */}
            <View style={[formStyles.inputWrap, {flex: 1, flexDirection: 'row', 
             justifyContent:'center', alignItems:"center", marginBottom:0,
            paddingLeft:30, paddingTop:8 }]}>
                <Text style={[styles.smallerText, {color:colors.searchText}]}>Location </Text>
                <View style={{width:14}}></View>
                
            </View>
            <View style={[formStyles.formShadow,{flex: 9 }]}>
              
              <WebView
                style={{ ...StyleSheet.absoluteFillObject }}
                ref={(ref) => { this.webview = ref; }}
                source={INDEX_FILE}
                onLoadEnd={this.onWebViewLoaded}
                onMessage={this.handleMessage}
                startInLoadingState={true}
                renderLoading={this.renderLoading}
                renderError={this.renderError}
                javaScriptEnabled={true}
                onError={this.onError}
                scalesPageToFit={false}
                mixedContentMode={'always'}
              />
              {this.props.centerButton ? (
                <View
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 20,
                    padding: 10
                  }}>
                </View>
              ) : null}
            </View>
            <View style={{flex:1, flexDirection:'row', minHeight:50, paddingLeft:30, paddingTop:17, }}>
              <View style={{flex:0}}>
                <Image 
                  style={{height:16 , width:18}}
                  source={require('./images/shopping_cart.png')} />
              </View>
              <View style={{flex:0, paddingLeft:6}}>
                <Text style={[styless.smallerText]}>Checkout</Text>
                <Text style={[styless.bigText, { color:colors.toscagreen, paddingTop:6}]}>{booking_items_count} Rooms</Text>
              </View>
              <View style={{flex:1, padding:10,paddingRight:30, alignItems:'flex-end', justifyContent:'flex-start', flexDirection:'row-reverse'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:1, flexDirection:'column',paddingBottom:20, justifyContent:'flex-end', alignItems:'flex-end'}}>
                  <TouchableOpacity
                    style={[formStyles.buttonPrimary, {flex:0, paddingVertical:7, paddingHorizontal:14}]}
                    accessibilityLabel="btn_Go_To_Create_Booking" 
                    onPress = {() => booking_items_count > 0  
                                ?  {}
                                :    {}}>
                    <Text style={[styles.buttonText,{color: '#fff',fontSize:16}]}>PROCESS</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          {/* </ScrollView> */}
        </View>
      );
    }
  
}

FloorPlan.propTypes = {
  defaultIconSize: PropTypes.array,
  currentPosition: PropTypes.array,
//  locations: PropTypes.array,
  onMapClicked: PropTypes.func,
  onMarkerClicked: PropTypes.func,
  onWebviewReady: PropTypes.func,
  panToLocation: PropTypes.bool,
  zoom: PropTypes.number,
  showZoomControls: PropTypes.bool,
  centerButton: PropTypes.bool,
  showMapAttribution: PropTypes.bool,
  currentPositionMarkerStyle: PropTypes.object,
  onCurrentPositionClicked: PropTypes.func
};


const styles = StyleSheet.create({
  activityOverlayStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5
  },
  activityIndicatorContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#2196F3',
      borderRadius: 2
    }
  })
});

export default FloorPlan;
