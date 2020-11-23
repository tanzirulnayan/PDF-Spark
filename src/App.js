/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Pressable
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Pdf from 'react-native-pdf';
import Icon from 'react-native-ionicons';
import DocumentPicker from 'react-native-document-picker';

const App: () => React$Node = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [source, setSource] = useState({
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true
  });

  const onChangeUri = (uri) => {
    setSource({
      uri: uri,
      cache: true
    })
  }

  const onPressShowHide = () => {
    setIsVisible(!isVisible);
  }

  const onPressBrowseFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      onChangeUri(res.uri);
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#272A2F' }}>
          <View style={{ flex: 1 }}>
            <Pressable onPress={onPressBrowseFile} style={{ flex: 1, borderRadius: 15, borderColor: 'black', justifyContent: 'center', alignItems: 'center', margin: 15, padding: 10, backgroundColor: '#363E49', elevation: 10 }}>
              <Icon name="folder" color="grey" />
              <Text style={ styles.text }>Browse File</Text>
            </Pressable>
          </View>
          <View style={{ flex: 1 }}>
            <Pressable onPress={onPressShowHide} style={{ flex: 1, borderRadius: 15, borderColor: 'black', justifyContent: 'center', alignItems: 'center', margin: 15, padding: 10, backgroundColor: '#363E49', elevation: 10 }}>
            { isVisible ? <Icon name="eye" color="grey" /> : <Icon name="eye-off" color="grey" /> }
              <Text style={ styles.text }>Show or Hide</Text>
            </Pressable>
          </View>
        </View>
        <View style={{ flex: 5, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#272A2F' }}>
            {isVisible ?
              <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link presse: ${uri}`)
                }}
                style={styles.pdf} /> : <Text style={ styles.text }>Nothing to show!</Text>}
          </View>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    color: 'grey'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
