# location_Room_map


This Repository is my learning progress when working the leaflet to react native project. based on Room database on each location. We create room location booking map for mobile use.

using https://github.com/kellyad/react-native-map_2 to create the imagemap.html. Then with html page, we can create overlay image on map with interaction in our mobile apps screen.

### App Features

1. Show Room Place Booking on the map.

 * [x] List of room places on the map.
 * [x] zoom / explore the map.
 * [x] booking room show the pulse of icon that booked .
 * [x] delete room that booked (cancel that booking).
 * [x] show how many rooms that booked on checkout -- rooms.
 
 
<img src="https://github.com/kellyad/location_Room_map/blob/master/screenShot/map.png"
width="256">&nbsp;&nbsp;&nbsp;
<img src="https://github.com/kellyad/location_Room_map/blob/master/screenShot/zoom_map.png"
width="256">&nbsp;&nbsp;&nbsp;
<img src="https://github.com/kellyad/location_Room_map/blob/master/screenShot/dialog_book.png"
width="256">&nbsp;&nbsp;&nbsp;
<img src="https://github.com/kellyad/location_Room_map/blob/master/screenShot/dialog_delete.png"
width="256">&nbsp;&nbsp;&nbsp;
<img src="https://github.com/kellyad/location_Room_map/blob/master/screenShot/booked_icon.png"
width="256">&nbsp;&nbsp;&nbsp;


 ### Use the code

 Just fork/clone the repository to your local machine and npm install and react-native run-ios then you're good to go.
 ```javascript
<WebView
    ref={(ref) => { this.webview = ref; }}
    source={INDEX_FILE}
    // Optional: a callback that will be called when the map has been loaded
    onLoadEnd={this.onWebViewLoaded}
    // handle Message to handle return value of map and event like marker click, map double click
    onMessage={this.handleMessage}
    // Optional : called loading state in the start of running this component
    startInLoadingState={true}
    // Optional : call function to renderLoading
    renderLoading={this.renderLoading}
    // Optional : call function to render error message
    renderError={this.renderError}
    javaScriptEnabled={true}
    onError={this.onError}
    scalesPageToFit={false}
    mixedContentMode={'always'}
  />
  
  
```
to Communicating react native with webview by using 
```
//send message to the map webview , changing the map image to overlay, zooming the map 
this.sendMessage({
              zoom: 1, // map zoom 
              image: "https://i.ibb.co/6XYR35W/Topkapi-Palace-plan.png", // image for overlay inside map
              locations : facilitiesData, // facilities marker
              initialFloor : 1, // initial floor
              width: w, // width of the screen 
              height: h // height of the screen 
            });
            
// return message to the mobile to handle map marker click and other events when click map
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
        
        if ( this.hasOwnProperty(msgData.payload.event) )
        {  
          // . other event like mapmarkerClick
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
```


 ### Tech Stack

 * [x] React Native
 * [x] Leaflet
 * [x] WebView
 * [x] imageOverlay
 * [x] marker
