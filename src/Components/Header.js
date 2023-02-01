import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Avatar, MD3Colors, Text, Searchbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Chat from '../../chatData.json';
import {searchContact, resetContact} from '../Store/Reducers/Contact';

const width = Dimensions.get('window').width;

const Header = ({name, setLazyContact}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Avatar.Image source={{uri: Chat.profile.picture}} />
        <Text style={style.headerText} variant="headlineSmall">
          Hi, {name}
        </Text>
      </View>
      <Searchbar
        style={style.searchBar}
        placeholder="Search your friends"
        elevation={12}
        searchAccessibilityLabel={'search your friends'}
        loading={isLoading}
        placeholderTextColor={MD3Colors.neutral90}
        iconColor={'white'}
        onEndEditing={event => {
          const txt = event.nativeEvent.text;
          dispatch(searchContact(txt));
          setIsLoading(false);
        }}
        onChangeText={txt => {
          setIsLoading(true);
          if (txt === '') {
            setIsLoading(false);
            dispatch(resetContact());
          }
        }}
        inputStyle={style.searchTextStyle}
      />
    </View>
  );
};
export default Header;

const style = StyleSheet.create({
  container: {
    width: width - 20,
  },
  headerText: {
    color: 'white',
    fontFamily: 'Roboto-Black',
    marginLeft: 12,
  },
  searchTextStyle: {
    color: 'white',
    fontFamily: 'NotoSerif-Regular',
  },
  header: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchBar: {
    height: 50,
    width: '100%',
    margin: 12,
    backgroundColor: MD3Colors.neutralVariant60,
    borderRadius: 12,
    color: 'grey',
    fontSize: 12,
  },
});
