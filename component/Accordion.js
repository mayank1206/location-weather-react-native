import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';

const Accordion = props => {
    // const [expand, setExpand] = useState([]);
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerTitle} >Accordion</Text>
            </View>
            <ScrollView>
                {props.mapLocations.map((location, index) => {
                    return (
                        <View key={index} style={styles.listItem}>
                            <TouchableOpacity onPress={props.expandClose.bind(this, index)}>
                                <View style={styles.listItemHeader}>
                                    <View>
                                        <Text style={styles.listItemTitle}>{location['title']}</Text>
                                        <Text style={styles.listItemTitleLocation}>Location : {location['weather']["name"]}</Text>
                                        <Text style={styles.listItemTitleWeather}>Weather : {location['weather']["weather"][0]["description"]}</Text>
                                    </View>
                                    <Button style={styles.deleteItem} title="X" color="black" onPress={props.onDelete.bind(this, index)} />
                                </View>
                            </TouchableOpacity>
                            {location['expand'] ? (
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.listItemContainerData}>Temprature:  {location['weather']["main"]["temp"]}</Text>
                                    <Text style={styles.listItemContainerData}>Pressure:  {location['weather']["main"]["pressure"]}</Text>
                                    <Text style={styles.listItemContainerData}>Humidity:  {location['weather']["main"]["humidity"]}</Text>
                                </View>) : (<View></View>)
                            }
                        </View>
                    )
                })}
            </ScrollView>
        </View >
    );
};
const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
        marginVertical: 5
    },
    listItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        backgroundColor: 'black'
    },
    listItemTitle: {
        color: 'white',
        fontSize: 16,
        width: '85%',
    },
    listItemTitleLocation: {
        color: '#dd7e28',
        fontSize: 13,
    },
    listItemTitleWeather: {
        color: '#add8e6',
        fontSize: 13,
    },
    deleteItem: {
        width: '5%'
    },
    listItemContainer: {
        padding: 10,
        width: '100%',
    },
    listItemContainerData: {
        fontSize: 14
    },
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18
    }
});
export default Accordion;