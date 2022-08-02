import { RadioButton } from "react-native-paper";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItemProps } from "../../types/components";


const MenuItem = (props: MenuItemProps) => {
  let checked = false;
  
  if (!props.enabled) {
    checked = false;
  }
  if (props.reset) {
    checked = false;
  }
  if (props.selected === props.itemId) {
    checked = true;
  }

  return (
    <TouchableOpacity
      style={styles.menuitem}
      disabled={!props.enabled}
      onPress={() => props.clickHandler(props.itemId)}>
      <RadioButton
        status={checked ? "checked" : "unchecked"}
        disabled={!props.enabled}
        value="" />
        <Text style={props.enabled ? styles.text : styles.disabledText}>{props.itemName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuitem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    lineHeight: 30,
  },
  disabledText: {
    lineHeight: 30,
    color: '#CCCCCC'
  }
});

export default MenuItem;