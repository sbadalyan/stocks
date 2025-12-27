import { View, Text} from 'react-native';
import React from 'react';

type CommentType = {
  id: string,
  name: string,
  email: string,
};

const Comment = React.memo(({item}: {item: CommentType}) => {
  return (
    <View style={{ borderWidth: 1, borderColor: 'blue', marginBottom: 10}}>
      <Text style={{fontWeight: 'bold'}}>Email: {item?.email}</Text>
      <Text style={{fontWeight: 'bold'}}>Title: {item?.name}</Text>
    </View>
  );
});

export default Comment;