export interface ItemModel {
  description: string;
  id?: string;
  price: number;
  name: string;
  image_url: string;
}

export interface ItemProps {
  item: ItemModel;
}
