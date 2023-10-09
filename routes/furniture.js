import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Furniture() {
  const [data, setData] = useState([]);
  const [noFurniture, setNoFurniture] = useState('');

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/furniture-models/')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        if (data === null) {
          setNoFurniture('No furniture avaible.')
        }
        console.log(responseData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <FlatList
        data={data}
        ListEmptyComponent={() => <Text>{noFurniture}</Text>}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.furniture_name}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
