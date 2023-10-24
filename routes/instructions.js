import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Furniture() {
  const [data, setData] = useState([]);
  const [noFurniture, setNoFurniture] = useState('');

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/instructions/')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        if (data === null) {
          setNoFurniture('No furniture avaible.');
        }
        console.log(responseData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        ListEmptyComponent={() => <Text>{noFurniture}</Text>}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Text>{item.id}</Text>
            <Text>Material id: {item.material}</Text>
            <Text>Surface finish id: {item.surface_finish}</Text>
            <Text>Upholstery id: {item.upholstery}</Text>
            <Text style={{ width: '80%' }}>{item.instruction_text}</Text>
            <Text></Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
