export interface CollectionItemResponseI {
  id: number;
  name: string;
}

export interface CollectionParentUpdateRequestI {
  collectionId: number;
  parentId: number;
}

export interface CollectionCreateRequestI {
  parentId: number;
  name: string;
}
