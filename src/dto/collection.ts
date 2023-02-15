export interface CollectionItemResponseI {
  id: number;
  name: string;
  unified: string;
}

export interface CollectionParentUpdateRequestI {
  collectionId?: number;
  parentId?: number | null;
  unified?: string;
}

export interface CollectionCreateRequestI {
  parentId: number;
  name: string;
}
