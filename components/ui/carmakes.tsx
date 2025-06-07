import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { List, TextInput } from 'react-native-paper';

type CarSuggestion = {
  make: string;
  model: string;
  label: string;
};

export default function CarMakeModelSelector({
  initialMake = '',
  initialModel = '',
  onSelect,
}: {
  initialMake?: string;
  initialModel?: string;
  onSelect: (make: string, model: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CarSuggestion[]>([]);
  const allCars = useRef<CarSuggestion[]>([]);
  const initialized = useRef(false); // To avoid resetting the query every render

  useEffect(() => {
    fetch('https://thebytecrafter.github.io/All-Car-Makes-Dataset/carData.json')
      .then(res => res.json())
      .then(data => {
        const cars: CarSuggestion[] = [];

        data.forEach((entry: any) => {
          entry.models.forEach((model: string) => {
            cars.push({
              make: entry.make,
              model,
              label: `${entry.make} ${model}`,
            });
          });
        });

        allCars.current = cars;

        // Only set the initial label once
        if (initialMake && initialModel && !initialized.current) {
          const initialLabel = `${initialMake} ${initialModel}`;
          setQuery(initialLabel);
          initialized.current = true;
        }
      })
      .catch(error => {
        console.error('Error loading car data:', error);
      });
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = allCars.current
      .filter(car => car.label.toLowerCase().includes(lowerQuery))
      .sort((a, b) => a.label.localeCompare(b.label))
      .slice(0, 15);

    setSuggestions(filtered);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={initialMake}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        mode="outlined"
        style={styles.input}
        outlineStyle={{ borderRadius: 12 }}
        theme={{
          colors: { primary: '#3D5AFE' },
          fonts: { regular: { fontFamily: 'SpaceMono' } },
        }}
      />
      {suggestions.length > 0 && (
  <List.Section style={styles.list}>
    {suggestions.map((item) => (
      <TouchableOpacity
        key={item.label}
        onPress={() => {
          onSelect(item.make, item.model);
          setQuery(item.label);
          setSuggestions([]);
        }}
      >
        <List.Item
          title={item.label}
          titleStyle={styles.listItemText}
          style={styles.listItem}
        />
      </TouchableOpacity>
    ))}
  </List.Section>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: 'white',
    fontFamily: 'SpaceMono',
  },
  list: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  listItemText: {
    fontFamily: 'SpaceMono',
    color: '#333',
  },
});
