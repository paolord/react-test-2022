export interface MenuItemProps {
  selected: string,
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