import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CoreMLImage from "react-native-core-ml-image";

const BEST_MATCH_THRESHOLD = 0.5;

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      classification: null
    };
  }

  onClassification(classifications) {
    var bestMatch = null;

    if (classifications && classifications.length > 0) {
      // Loop through all of the classifications and find the best match
      classifications.forEach((classification) => {
        if (!bestMatch || classification.confidence > bestMatch.confidence) {
          bestMatch = classification;
        }
      });

      // Is best match confidence better than our threshold?
      if (bestMatch.confidence >= BEST_MATCH_THRESHOLD) {
        this.setState({
          bestMatch: bestMatch
        });
      } else {
        this.setState({
          bestMatch: null
        });
      }

    } else {
      this.setState({
        bestMatch: null
      });
    }
    
  }

  render() {
    var classification = null;

    if (this.state.bestMatch) {
      if (this.state.bestMatch && this.state.bestMatch.identifier && this.state.bestMatch.identifier == "hotdog") {
        classification = "🌭 Hot Dog 🌭";
      } else {
        classification = "Not hot dog";
      }

    }

    return (
      <View style={styles.container}>
          <CoreMLImage modelFile="HotDogOrNotHotDog" onClassification={(evt) => this.onClassification(evt)}>
              <View style={styles.container}>
                <Text style={styles.info}>{classification}</Text>
              </View>
          </CoreMLImage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  info: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: 'center',
    fontWeight: "900",
    margin: 10,
  }
});
