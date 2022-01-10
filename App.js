import React, {useState} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskItem from './payment.js';
import data from './data.json'

const group_by_m = (data) => {
  var final = new Object()
  var ret = []
  for( var x of data){
    let g_name = x.date.slice(0,7)
    if(g_name in final)
      final[g_name].push(x)
    else
      final[g_name] = [x]
  }
  for(const i in final){
    ret.push({title: i, data: final[i]})
  }
  console.log(ret)
  return ret;
}

const mon = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function App() {
  group_by_m(data.sort((a,b) => b.date.localeCompare(a.date)));
  
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Mohd. Talib</Text>
      <ScrollView style={styles.scrollView}>
        {
        data.map((rec, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TaskItem index={index + 1} rec={rec}/>
            </View>
          );
        })
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});
