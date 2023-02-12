import {
  CollectionCreateRequestI,
  CollectionItemResponseI,
  CollectionParentUpdateRequestI,
} from '../dto/collection';
import { CommonResponseI } from '../dto/common';
import apiClient from '../http/HttpClient';

export const getParentList = async (): Promise<
  CommonResponseI<CollectionItemResponseI[]>
> => {
  const res = await apiClient.get(`collection/parent`);
  return res.data as CommonResponseI<CollectionItemResponseI[]>;
};

export const getChildrenList = async (params: {
  id: number;
}): Promise<CommonResponseI<CollectionItemResponseI[]>> => {
  const res = await apiClient.get(`collection/children/${params.id}`);
  return res.data as CommonResponseI<CollectionItemResponseI[]>;
};

export const updateParent = async (params: {
  data: CollectionParentUpdateRequestI;
}): Promise<CommonResponseI<CommonResponseI<null>>> => {
  const res = await apiClient.put(`collection/parent`, params.data);
  return res.data as CommonResponseI<CommonResponseI<null>>;
};

export const createCollection = async (params: {
  data: CollectionCreateRequestI;
}): Promise<CommonResponseI<CommonResponseI<null>>> => {
  const res = await apiClient.post(`collection`, params.data);
  return res.data as CommonResponseI<CommonResponseI<null>>;
};
