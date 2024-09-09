import axios from 'axios';

const API_BASE_URL = 'https://api.jgrants-portal.go.jp/exp/v1/public';

export interface SubsidySearchParams {
  keyword?: string;
  sort?: string;
  order?: string;
  acceptance?: string;
  use_purpose?: string;
  industry?: string;
  target_number_of_employees?: string;
  target_area_search?: string;
}

export interface SubsidyInfo {
  id: string;
  subsidy_name: string;
  purpose: string;
  target_industry: string;
  target_number_of_employees: string;
  target_area: string;
  catch_copy: string;
  summary: string;
  target_area_detail: string;
  subsidy_max_limit: number;
  acceptance_start_datetime: string;
  acceptance_end_datetime: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchSubsidies = async (params: SubsidySearchParams): Promise<SubsidyInfo[]> => {
  try {
    const response = await apiClient.get('/subsidies', { params });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching subsidies:', error);
    throw error;
  }
};

export interface SubsidyDetail extends SubsidyInfo {
    catch_copy: string;
    summary: string;
    target_area_detail: string;
    subsidy_max_limit: number;
    acceptance_start_datetime: string;
    acceptance_end_datetime: string;
  }
  
export const getSubsidyDetail = async (id: string): Promise<SubsidyDetail> => {
  try {
    const response = await axios.get(`/api/subsidies?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subsidy detail:', error);
    throw error;
  }
};

