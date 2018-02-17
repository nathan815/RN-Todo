import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  SegmentedControlIOS
} from 'react-native';
import { Icon } from 'react-native-elements';

import Note from './components/Note';

const FILTER_OPTIONS = ['All','Pending','Completed'];
const FILTER_ALL = 0;
const FILTER_PENDING = 1;
const FILTER_COMPLETED = 2;

export default class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNoteText: "",
      filterIndex: FILTER_PENDING
    };
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.addNote = this.addNote.bind(this);
  };

  addNote() {
    const notes = this.state.notes;
    const text = this.state.newNoteText.trim();
    let filterIndex = this.state.filterIndex;
    if(!text)
      return;
    if(filterIndex === FILTER_COMPLETED)
      filterIndex = FILTER_PENDING;
    notes.push({ 
      text, 
      completed: false,
      timestamp: new Date().toISOString()
    });
    this.setState({
      notes,
      filterIndex,
      newNoteText: "",
    });
    Keyboard.dismiss();
  }

  markCompleted(key) {
    const notes = this.state.notes;
    notes[key].completed = !notes[key].completed;
    this.setState({
      notes: notes
    });
  }

  confirmDeleteNote(key) {
    Alert.alert(
      'Delete Item',
      'Do you really want to delete this todo item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: () => this.deleteNote(key)},
      ]
    );
  }

  deleteNote(key) {
    const notes = this.state.notes;
    notes.splice(key,1);
    this.setState({
      notes: notes
    });
  }

  generateNoteList(filter) {
    return this.state.notes
    .map((val, key) => {
      if(this.state.filterIndex === FILTER_PENDING && val.completed || 
          this.state.filterIndex === FILTER_COMPLETED && !val.completed) {
        return;
      }
      return <Note key={key} keyval={key} val={val} 
                   markCompleted={() => this.markCompleted(key)} 
                   delete={() => this.confirmDeleteNote(key)} />
    });
  }

  render() {
    let notes = this.generateNoteList();
    const pendingCount = this.state.notes.filter((val) => !val.completed).length;
    // check if notes is empty (or full of null values)
    if(notes.filter((val) => val != null ).length <= 0) {
      notes = (
        <View style={styles.noNotes}>
          <Icon name="layers-clear" size={45} color="#444" />
          <Text style={styles.noNotesText}>No todo items to show</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}>My Todo List ({pendingCount})</Text>
        </View>
        <SegmentedControlIOS 
          style={styles.segmentedControl}
          tintColor="steelblue"
          values={FILTER_OPTIONS}
          selectedIndex={this.state.filterIndex}
          onChange={(event) => {
            this.setState({filterIndex: event.nativeEvent.selectedSegmentIndex});
          }}
        />
        <ScrollView style={styles.scrollView}>
         {notes}
        </ScrollView>
        <KeyboardAvoidingView style={styles.footer} keyboardVerticalOffset={10} behavior="padding">
          <TextInput 
            style={styles.addTodoInput} 
            placeholder="What do you want to do?" 
            onChangeText={(newNoteText) => this.setState({ newNoteText })}
            value={this.state.newNoteText} 
            onSubmitEditing={this.addNote}
          />
          <TouchableOpacity style={styles.addTodoBtn} onPress={this.addNote}>
            <Icon name="add" color="#fff" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10
  },
  content: {
    flex: 1
  },
  header: {
    backgroundColor: 'steelblue',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    padding: 10,
    paddingTop: Platform.OS == 'ios' ? 24 : 0,
    color: 'white'
  },
  segmentedControl: {
    margin:10
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  scrollView: {
  },
  addTodoBtn: {
    flex: 1,
    padding: 9,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 10
  },
  addTodoBtnText: {
    color: 'white',
    fontSize: 15
  },
  addTodoInput: {
    flex: 5,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#e5e5e5'
  },
  noNotes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  noNotesText: {
    marginTop: 20,
    fontSize: 20
  }
});
