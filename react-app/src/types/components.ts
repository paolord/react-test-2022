export const MenuItemGroupNames = {
  allergenInfo: 'allergenInfo',
  mainDish: 'mainDish',
  sideDish: 'sideDish'
}

export interface RadioButtonProps {
  groupName: string,
  itemId: string,
  itemName: string,
  clickHandler: Function,
  enabled: boolean,
  reset: boolean
}

export type MenuData = {
  id: string;
  value: string;
}

export type MenuSelectionProps = {

};

export type MenuSelectionState = {
  allergenInfo: Array<MenuData>;
  mainDish: Array<MenuData>;
  sideDish: Array<MenuData>;
  enabledList: Object;
  enabledMainDishes: Object;
  enabledSideDishes: Object;
  rules: Object;
  selectedMainDish: string,
  selectedSideDish: string,
  enableSubmit: Boolean,
  resetMainDish: boolean,
  resetSideDish: boolean
};

export const labelStatus = {
  enabled: 'label-enabled',
  disabled: 'label-disabled'
}