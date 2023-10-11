import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Button, Menu, Provider, IconButton} from 'react-native-paper';

const MenuExample = () => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => setVisible(false);
  const openMenu = v => setVisible(true);

 
  return (
    <View style={styles.container}>
      <Menu
        style={{marginTop: 60, flex: 1, minWidth: 200, marginLeft: -10}}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity>
            <IconButton
              icon="menu"
              size={28}
              onPress={openMenu}
              iconColor="#333333"
            />
          </TouchableOpacity>
        }>
        <Menu.Item title="Change Language" />
        <Menu.Item  title="Logout" />
      </Menu>
    </View>
  );
};

export default MenuExample;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
