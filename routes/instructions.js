import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Furniture() {
  const [data, setData] = useState([]);
  const [noFurniture, setNoFurniture] = useState('');

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('http://10.0.2.2:8000/instructions/')
      .then((response) => response.json())
      .then((responseData) => {
        for (let i=0; i<responseData.length; i++){
          if (responseData[i].instruction_name=="General"){
            setData(responseData[i].instruction_text);
            break;
          }
        }
        if (data === null) {
          setNoFurniture('No furniture available.');
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
            <Text>{item.instruction_name}</Text>
            <Text style={{ width: '80%' }}>{item.instruction_text}</Text>
            <Text></Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
