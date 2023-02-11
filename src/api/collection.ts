import { CollectionItemResponseI } from '../dto/collection';
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
