import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, MD3Colors, Text, Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Chat from '../../chatData.json';
import {searchContact, resetContact} from '../Store/Reducers/Contact';

const Header = ({name, setLazyContact}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <View>
      <View style={style.header}>
        <Avatar.Image source={{uri: Chat.profile.picture}} />
        <Text style={style.headerText} variant="headlineSmall">
          Hi, {name}
        </Text>
      </View>
      <Searchbar
        style={style.searchBar}
        placeholder="search"
        loading={isLoading}
        placeholderTextColor={'white'}
        iconColor={'white'}
        onChangeText={txt => {
          setIsLoading(true);
          setTimeout(() => {
            dispatch(searchContact(txt));
            setIsLoading(false);
            if (txt === '') {
              dispatch(resetContact());
            }
          }, 2000);
        }}
        inputStyle={style.searchTextStyle}
      />
    </View>
  );
};
export default Header;

const style = StyleSheet.create({
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
  },
  searchBar: {
    height: 50,
    margin: 9,
    backgroundColor: MD3Colors.neutralVariant60,
    borderRadius: 12,
    color: 'white',
  },
});
