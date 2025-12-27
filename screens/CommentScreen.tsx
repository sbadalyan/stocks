import { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import Comment from '../components/Comment'
import useComment from '../hooks/useComment';

type CommentType = {
  id: string,
  name: string,
  email: string,
};


const CommentScreen = () => {
  const { comments, isError, isLoading, refetch } = useComment();

  const renderLoading = useCallback(() => {
    return (
      <View><Text>Loading...</Text></View>
    );
  }, []);

  const renderError = useCallback(() => {
    return (
      <View><Text>Error...</Text></View>
    );
  }, []);

  const renderRow = useCallback(({item}: {item : CommentType}) => <Comment item={item} />, []);

  const renderComments = useCallback(() => {
    return (
      <FlatList
        style={{paddingHorizontal: 20}}
        data={comments}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={renderRow}
        initialNumToRender={10}
        getItemLayout={(_, index) => ({length: 64, offset: 64 * index, index})}
        removeClippedSubviews
        windowSize={20}
        maxToRenderPerBatch={20}
        //onEndReached={}
      />
    );
  }, [comments, renderRow]);

  return (
    <View>
      {isLoading && renderLoading()}
      {isError && renderError()}
      {comments.length > 0 && renderComments()}
    </View>
  );
};
export default CommentScreen;


