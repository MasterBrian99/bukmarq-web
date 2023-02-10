import { CommonResponseI } from '../dto/common';
import { FolderItemResponseI } from '../dto/folder';
import apiClient from '../http/HttpClient';

export const getParentList = async (): Promise<
  CommonResponseI<FolderItemResponseI[]>
> => {
  const res = await apiClient.get(`folder/parent`);
  return res.data as CommonResponseI<FolderItemResponseI[]>;
};

export const getChildrenList = async (params: {
  id: number;
}): Promise<CommonResponseI<FolderItemResponseI[]>> => {
  const res = await apiClient.get(`folder/children/${params.id}`);
  return res.data as CommonResponseI<FolderItemResponseI[]>;
};
