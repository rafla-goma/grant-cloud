'use client'

import React from 'react';
import Layout from '../components/Layout';
import SubsidySearchForm from '../components/subsidy/SubsidySearchForm';
import SubsidyList from '../components/subsidy/SubsidyList';
import { searchSubsidies, SubsidyInfo, SubsidySearchParams } from '@/utils/api-client';

const SearchPage: React.FC = () => {
    const [subsidies, setSubsidies] = React.useState<SubsidyInfo[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
  
    const handleSearch = async (params: SubsidySearchParams) => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchSubsidies(params);
        setSubsidies(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : '検索中に予期せぬエラーが発生しました。');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Layout>
        <div className="flex-1 bg-gray-900 text-white overflow-auto">
          <SubsidySearchForm onSearch={handleSearch} />
          {isLoading ? (
            <p className="text-center mt-4">検索中...</p>
          ) : error ? (
            <p className="text-red-500 text-center mt-4">{error}</p>
          ) : (
            <SubsidyList subsidies={subsidies} />
          )}
        </div>
      </Layout>
    );
  };
  
  export default SearchPage;