import React from 'react';
import { SubsidyDetail } from '@/utils/api-client';

interface SubsidyDetailModalProps {
  subsidy: SubsidyDetail;
  onClose: () => void;
}

const SubsidyDetailModal: React.FC<SubsidyDetailModalProps> = ({ subsidy, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{subsidy.subsidy_name}</h2>
        <p className="text-lg font-semibold mb-2">{subsidy.catch_copy}</p>
        <p className="mb-4">{subsidy.summary}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">目的</h3>
            <p>{subsidy.purpose}</p>
          </div>
          <div>
            <h3 className="font-bold">対象業種</h3>
            <p>{subsidy.target_industry}</p>
          </div>
          <div>
            <h3 className="font-bold">対象地域</h3>
            <p>{subsidy.target_area}</p>
          </div>
          <div>
            <h3 className="font-bold">詳細地域</h3>
            <p>{subsidy.target_area_detail}</p>
          </div>
          <div>
            <h3 className="font-bold">従業員数</h3>
            <p>{subsidy.target_number_of_employees}</p>
          </div>
          <div>
            <h3 className="font-bold">補助金上限</h3>
            <p>{subsidy.subsidy_max_limit?.toLocaleString() ?? '未定義'}円</p>
          </div>
          <div>
            <h3 className="font-bold">募集開始</h3>
            <p>{subsidy.acceptance_start_datetime ? new Date(subsidy.acceptance_start_datetime).toLocaleString() : '未定義'}</p>
          </div>
          <div>
            <h3 className="font-bold">募集終了</h3>
            <p>{subsidy.acceptance_end_datetime ? new Date(subsidy.acceptance_end_datetime).toLocaleString() : '未定義'}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SubsidyDetailModal;