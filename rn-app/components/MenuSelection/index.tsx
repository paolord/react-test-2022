import { View, StyleSheet, Button } from 'react-native';
import MenuItem from '../MenuItem';
import { MenuData } from '../../types/components';
import { useEffect, useState } from 'react';
import { getMenuAsEnabledList, getMenuData } from '../../services/data';

const MenuSelection = () => {
  const [allergenInfo, setAllergenInfo] = useState<Array<MenuData>>([]);
  const [mainDish, setMainDish] = useState<Array<MenuData>>([]);
  const [sideDish, setSideDish] = useState<Array<MenuData>>([]);
  const [selectedAllergenInfo, setSelectedAllergenInfo] = useState<string>(""); 
  const [selectedMainDish, setSelectedMainDish] = useState<string>(""); 
  const [selectedSideDish, setSelectedSideDish] = useState<string>(""); 
  const [enabledList, setEnabledList] = useState<Array<string>>([]); 
  const [rules, setRules] = useState<Object>({}); 
  const [enabledMainDishes, setEnabledMainDishes] = useState<Object>({}); 
  const [enabledSideDishes, setEnabledSideDishes] = useState<Object>({});
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [resetMainDish, setResetMainDish] = useState(true);
  const [resetSideDish, setResetSideDish] = useState(true);

  useEffect(() => {
    setAllergenInfo(getMenuData().menus[0]);
    setMainDish(getMenuData().menus[1]);
    setSideDish(getMenuData().menus[2]);
    setEnabledList(getMenuAsEnabledList(getMenuData().menus[0]));
    setRules(getMenuData().rules);
  }, [])

  const handleAllergenInfoClick = (itemId: string) => {
    const rulesList: any = rules;
    const disabledItems = rulesList[itemId].reduce((prev: any, curr: any) => {
      prev[curr] = curr;
      return prev;
    }, {});

    const newEnabledList = mainDish.reduce((prev: any, curr: any) => {
      if (typeof disabledItems[curr.id] === 'undefined') { 
        prev[curr.id] = curr.value; // Main Dish is not on disabled items
      }
      return prev;
    }, {});

    let enableButton = enableSubmit;
    if (typeof newEnabledList[selectedMainDish] === 'undefined') {
      enableButton = false;
    }
    if (typeof newEnabledList[selectedSideDish] === 'undefined') {
      enableButton = false;
    }

    setEnabledMainDishes(newEnabledList);
    setEnabledList(Object.assign(getMenuAsEnabledList(allergenInfo), newEnabledList));
    setSelectedAllergenInfo(itemId);
    setEnableSubmit(enableButton);
    setResetMainDish(true);
    setResetSideDish(true);
  };
  const handleMainDishClick = (itemId: string) => {
    setSelectedMainDish(itemId);
    const rulesList: any = rules;
    if (typeof rulesList[itemId] === 'undefined') {    
      setEnabledList(Object.assign(
        getMenuAsEnabledList(allergenInfo),
        enabledMainDishes,
        getMenuAsEnabledList(sideDish)));
      return;
    }
    const disabledItems = rulesList[itemId].reduce((prev: any, curr: any) => {
      prev[curr] = curr;
      return prev;
    }, {});

    const newEnabledList = sideDish.reduce((prev: any, curr: any) => {
      if (typeof disabledItems[curr.id] === 'undefined') { 
        prev[curr.id] = curr.value; // Side Dish is not on disabled items
      }
      return prev;
    }, {});

    let enableButton = enableSubmit;
    if (typeof newEnabledList[selectedSideDish] === 'undefined') {
      enableButton = false;
    }

    setEnabledSideDishes(newEnabledList);
    setEnabledList(Object.assign(
      getMenuAsEnabledList(allergenInfo),
      enabledMainDishes,
      newEnabledList));
    setSelectedMainDish(itemId);
    setEnableSubmit(enableButton);
    setResetMainDish(false);
    setResetSideDish(true);
  };
  const handleSideDishClick = (itemId: string) => {
    setSelectedSideDish(itemId);
    setEnableSubmit(true);
  };
  const isMenuItemEnabled = (itemId: string) => {
    const list: any = enabledList;
    if (typeof list[itemId] !== 'undefined') {
      return true;
    }
    return false;
  }

  return (
    <View>
      <View style={styles.menugroup}>
        {allergenInfo.map(({id, value}: MenuData) => (
          <MenuItem
            key={id}
            itemId={id}
            itemName={value}
            selected={selectedAllergenInfo}
            enabled={isMenuItemEnabled(id)}
            reset={false}
            clickHandler={handleAllergenInfoClick} />
        ))}
      </View>
      <View style={styles.menugroup}>
        {mainDish.map(({id, value}: MenuData) => (
          <MenuItem
            key={id}
            itemId={id}
            itemName={value}
            selected={selectedMainDish}
            enabled={isMenuItemEnabled(id)}
            reset={resetMainDish}
            clickHandler={handleMainDishClick} />
        ))}
      </View>
      <View style={styles.menugroup}>
        {sideDish.map(({id, value}: MenuData) => (
          <MenuItem
            key={id}
            itemId={id}
            itemName={value}
            selected={selectedSideDish}
            enabled={isMenuItemEnabled(id)}
            reset={resetSideDish}
            clickHandler={handleSideDishClick} />
        ))}
      </View>
      <Button
        title="SUBMIT"
        disabled={!enableSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  menugroup: {
    marginBottom: 20,
  }
});

export default MenuSelection;