import React, {useState} from 'react';
import { SectionList, Pressable, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
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
  return ret;
}

const mon = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const get_total = (data) => {
  var total = 0
  for (x in data){
    if(data[x].paid_by == 'you')
      total+=data[x].amount
    else
      total-=data[x].amount
  }
  return total
}

export default function App() {
  const f_data = group_by_m(data.sort((a,b) => b.date.localeCompare(a.date)));
  const get_sec_name = (d) => {
    return mon[parseInt(d.slice(5,7))-1]+' '+d.slice(0,4)
  }
  const [total, getTotal] = useState(get_total(data));
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Mohd. Talib</Text>
        <View style={(total >= 0) ? styles.totalg : styles.totalr}>
        <Text style={styles.totalText}>Total Payable</Text>
        <Text style={styles.totalAmt}> {total}</Text>
        </View>
        <View style={styles.buttonArea}>
        <Pressable style={(total >= 0) ? styles.totalg : styles.totalr} disabled={total==0} onPress={()=>Alert.alert('Button Pressed.')}>
        <Text style={styles.buttonText}>{total==0 ? 'Settled Up.' : (total > 0 ? 'Get Credit' : 'Settle Up')}</Text></Pressable>
        </View>
      <SafeAreaView style={styles.scrollView}>
      <SectionList
        sections={f_data}
        keyExtractor={(item,index)=> index+item.date}
        renderItem={(item) => <View style={styles.taskContainer}><TaskItem rec={item.item}/></View>}
        renderSectionHeader={({section:{title}})=>(<Text style={styles.secHeader}>{get_sec_name(title)}</Text>)}
        />
      </SafeAreaView>
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
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 10,
  },
  secHeader : {
    // paddingLeft : ,
    marginHorizontal: 20,
    paddingBottom : 3,
    paddingTop : 20,
    borderBottomColor : '#424242',
    borderBottomWidth : 2,
    color : '#848484',
    fontWeight : 'bold',
    fontSize : 12,
  },
  totalg : {
    backgroundColor: '#228b22',
    flexDirection : 'column',
    borderRadius: 12,
    marginHorizontal : 20,
    alignItems: 'center',
    textAlignVertical : 'center',
  },
  totalr : {
    backgroundColor: '#dc143c',
    borderRadius: 12,
    marginHorizontal : 20,
    alignItems: 'center',
    flexDirection : 'column',
    textAlignVertical : 'center',
  },
  totalText : {
    paddingHorizontal : 20,
    color : '#fff',
    fontSize : 16,
    fontWeight : 'bold',
    textAlign : 'center',
    paddingTop : 20,
  },
  totalAmt : {
    paddingHorizontal : 20,
    color : '#fff',
    fontSize : 25,
    fontWeight : 'bold',
    textAlign : 'center',
    paddingBottom : 20,
  },
  buttonText : {
    paddingHorizontal : 20,
    color : '#fff',
    fontSize : 25,
    fontWeight : 'bold',
    textAlign : 'center',
    paddingVertical : 10,
  },
  buttonArea : {
    paddingVertical : 5,
    textAlignVertical : 'center',
  }
});
