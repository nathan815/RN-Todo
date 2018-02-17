import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';

export default class App extends Component {

  getDate(ts) {
    const d = new Date(ts);
    return d.getHours().toString().padStart(2,"0") + ":" + 
           d.getMinutes().toString().padStart(2,"0") + " " + 
           (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  }

  render() {
    const { timestamp, text, completed } = this.props.val;
    return (
      <View style={[ styles.note, completed && styles.completed ]}>
        <View style={styles.content}>
          <TimeAgo style={[styles.dateText, completed && styles.completedText]} time={timestamp} />
          <Text style={[styles.noteText, completed && styles.completedText]}>
            {text}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={this.props.markCompleted}>
            <Icon name="done" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.delete}>
            <Icon name="delete" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  content: {
    flex: 3
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  completed: {
    opacity: 0.5
  },
  completedText: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },
  dateText: {
    color: '#aaa',
    fontSize: 13
  },
  noteText: {
    fontSize: 15
  }
});
