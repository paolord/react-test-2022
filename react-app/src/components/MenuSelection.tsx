import React, { useEffect, useState } from 'react';
import RadioButton from './RadioButton';
import { getMenuData, getMenuAsEnabledList } from '../services/data';
import { MenuData, MenuItemGroupNames, MenuSelectionProps, MenuSelectionState } from '../types/components';

class  MenuSelection extends React.Component<MenuSelectionProps, MenuSelectionState> {

  constructor(props: MenuSelectionProps) {
    super(props);
    this.state = {
      allergenInfo: [],
      mainDish: [],
      sideDish: [],
      enabledList: {},
      enabledMainDishes: {},
      enabledSideDishes: {},
      rules: {},
      selectedMainDish: "",
      selectedSideDish: "",
      enableSubmit: false,
      resetMainDish: false,
      resetSideDish: false
    };
    this.handleAllergenInfoClick = this.handleAllergenInfoClick.bind(this);
    this.handleMainDishClick = this.handleMainDishClick.bind(this);
    this.handleSideDishClick = this.handleSideDishClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      allergenInfo: getMenuData().menus[0],
      mainDish: getMenuData().menus[1],
      sideDish: getMenuData().menus[2],
      enabledList: getMenuAsEnabledList(getMenuData().menus[0]), // set initial enabled items
      rules: getMenuData().rules
    });
  }

  protected handleAllergenInfoClick(itemId: string) {
    const rules: any = this.state.rules;
    const disabledItems = rules[itemId].reduce((prev: any, curr: any) => {
      prev[curr] = curr;
      return prev;
    }, {});

    const enabledList = this.state.mainDish.reduce((prev: any, curr: any) => {
      if (typeof disabledItems[curr.id] === 'undefined') { 
        prev[curr.id] = curr.value; // Main Dish is not on disabled items
      }
      return prev;
    }, {});

    let enableSubmit = this.state.enableSubmit;
    if (typeof enabledList[this.state.selectedMainDish] === 'undefined') {
      enableSubmit = false;
    }
    if (typeof enabledList[this.state.selectedSideDish] === 'undefined') {
      enableSubmit = false;
    }

    this.setState({
      enabledMainDishes: enabledList,
      enabledList: Object.assign(getMenuAsEnabledList(this.state.allergenInfo), enabledList),
      resetMainDish: true,
      enableSubmit
    });
  }

  
  protected handleMainDishClick(itemId: string) {
    const rules: any = this.state.rules;
    if (typeof rules[itemId] === 'undefined') {    
      this.setState({
        enabledList: Object.assign(
          getMenuAsEnabledList(this.state.allergenInfo),
          this.state.enabledMainDishes,
          getMenuAsEnabledList(this.state.sideDish))
      });
      return;
    }
    const disabledItems = rules[itemId].reduce((prev: any, curr: any) => {
      prev[curr] = curr;
      return prev;
    }, {});

    const enabledList = this.state.sideDish.reduce((prev: any, curr: any) => {
      if (typeof disabledItems[curr.id] === 'undefined') { 
        prev[curr.id] = curr.value; // Side Dish is not on disabled items
      }
      return prev;
    }, {});
    
    let enableSubmit = this.state.enableSubmit;
    if (typeof enabledList[this.state.selectedSideDish] === 'undefined') {
      enableSubmit = false;
    }

    this.setState({
      enabledSideDishes: enabledList,
      enabledList: Object.assign(
        getMenuAsEnabledList(this.state.allergenInfo),
        this.state.enabledMainDishes,
        enabledList),
      resetMainDish: false,
      resetSideDish: true,
      enableSubmit
    });
  }

  
  protected handleSideDishClick(itemId: string) {
    this.setState({
      selectedSideDish: itemId,
      enableSubmit: true
    });
  }

  protected isMenuItemEnabled(itemId: string) {
    const enabledList: any = this.state.enabledList;
    if (typeof enabledList[itemId] !== 'undefined') {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="dinnerMenu">      
        <div className={MenuItemGroupNames.allergenInfo}>
          {this.state.allergenInfo.map(({id, value}: MenuData) => (
            <RadioButton
              key={id}
              groupName={MenuItemGroupNames.allergenInfo}
              itemId={id}
              itemName={value}
              reset={false}
              enabled={this.isMenuItemEnabled(id)}
              clickHandler={this.handleAllergenInfoClick} />
          ))}
        </div>
        <div className={MenuItemGroupNames.mainDish} onChange={() => this.setState({resetMainDish: false})}>
          {this.state.mainDish.map(({id, value}: MenuData) => (
            <RadioButton
              key={id}
              groupName={MenuItemGroupNames.mainDish}
              itemId={id}
              itemName={value}
              reset={this.state.resetMainDish}
              enabled={this.isMenuItemEnabled(id)}
              clickHandler={this.handleMainDishClick} />
          ))}
        </div>
        <div className={MenuItemGroupNames.sideDish} onChange={() => this.setState({resetSideDish: false})}>
          {this.state.sideDish.map(({id, value}: MenuData) => (
            <RadioButton
              key={id}
              groupName={MenuItemGroupNames.sideDish}
              itemId={id}
              itemName={value}
              reset={this.state.resetSideDish}
              enabled={this.isMenuItemEnabled(id)}
              clickHandler={this.handleSideDishClick} />
          ))}
        </div>
        <button type="submit" disabled={!this.state.enableSubmit}>SUBMIT</button>
      </div>
    );
  }
}

export default MenuSelection;