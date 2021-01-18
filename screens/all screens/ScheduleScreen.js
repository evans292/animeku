import React, {useEffect, useState} from "react";
import { StyleSheet, ScrollView } from 'react-native';
import axios from "axios";
import Sunday from "../../components/ScheduleScreen/Sunday";
import Monday from "../../components/ScheduleScreen/Monday";
import Tuesday from "../../components/ScheduleScreen/Tuesday";
import Wednesday from "../../components/ScheduleScreen/Wednesday";
import Thursday from "../../components/ScheduleScreen/Thursday";
import Friday from "../../components/ScheduleScreen/Friday";
import Saturday from "../../components/ScheduleScreen/Saturday";

const ScheduleScreen = (props) => {
    const navigation = props.navigation

    const [sunday, setSunday] = useState([]);
    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wednesday, setWednesday] = useState([]);
    const [thursday, setThursday] = useState([]);
    const [friday, setFriday] = useState([]);
    const [saturday, setSaturday] = useState([]);
    
    

    const fetchData = async () => {
        const result = await axios.get(`https://api.jikan.moe/v3/schedule`)
        .then(res => {  
            setSunday(res.data.sunday)
            setMonday(res.data.monday)
            setTuesday(res.data.tuesday)
            setWednesday(res.data.wednesday)
            setThursday(res.data.thursday)
            setFriday(res.data.friday)
            setSaturday(res.data.saturday)
        })
        .catch(err => console.log('ini error ', err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Sunday data={sunday} navigation={navigation}/>
            <Monday data={monday} navigation={navigation}/>
            <Tuesday data={tuesday} navigation={navigation}/>
            <Wednesday data={wednesday} navigation={navigation}/>
            <Thursday data={thursday} navigation={navigation}/>
            <Friday data={friday} navigation={navigation}/>
            <Saturday data={saturday} navigation={navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: 'white'
    },
});

export default ScheduleScreen;