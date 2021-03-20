import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const GoogleMap = props => {
    const [enterName, setEnterName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState({});
    const onPressMarker = (e) => {
        setLocation(e);
        setModalVisible(!modalVisible);
    };
    const addTitle = () => {
        var e = location;
        var api_link = 'http://api.openweathermap.org/data/2.5/weather?lat=' + e.coordinate.latitude + '&lon=' + e.coordinate.longitude + '&appid=2ffceb49cbacb33a7c9cf056c61a451b';
        fetch(api_link)
            .then((response) => response.json())
            .then((json) => {
                var data = {};
                data['title'] = enterName;
                data['location'] = e;
                data['weather'] = json;
                data['expand'] = false;
                props.onAddMarker(data);
            })
            .catch((error) => console.error(error));
        setModalVisible(!modalVisible);
    };
    return (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modalVisible} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Enter Name" style={styles.inputText} onChangeText={(text) => setEnterName(text)} value={enterName} />
                        <Button style={styles.modalButton} title="Add" onPress={() => addTitle()} />
                    </View>
                </View>
            </Modal>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} onPress={(e) => onPressMarker(e.nativeEvent)}>
                {props.mapLocations.map((location, index) => {
                    return (
                        <Marker key={index} coordinate={{ latitude: location['location']['coordinate']['latitude'], longitude: location['location']['coordinate']['longitude'] }}>
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '95%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputText: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        margin: 15
    },
    modalButton: {

    }
});

export default GoogleMap;