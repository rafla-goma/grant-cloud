'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SubsidyList from './SubsidyList';

interface SubsidyInfo {
  id: string;
  name: string;
  title: string;
  target_area_search: string;
  subsidy_max_limit: number;
  acceptance_start_datetime: string;
  acceptance_end_datetime: string;
  target_number_of_employees: string;
}

interface ApiResponse {
  metadata: {
    type: string;
    resultset: {
      count: number;
    }
  };
  result: SubsidyInfo[];
}

interface SubsidySearchParams {
    keyword: string;
    sort: string;
    order: string;
    acceptance: string;
    use_purpose: string;
    industry: string;
    target_number_of_employees: string;
    target_area_search: string;
  }

interface SubsidySearchFormProps {
    onSearch: (params: SubsidySearchParams) => Promise<void>;
  }
  
  const SubsidySearchForm: React.FC<SubsidySearchFormProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('created_date');
  const [order, setOrder] = useState('DESC');
  const [acceptance, setAcceptance] = useState('1');
  const [usePurpose, setUsePurpose] = useState<string[]>([]);
  const [targetNumberOfEmployees, setTargetNumberOfEmployees] = useState('');
  const [targetAreaSearch, setTargetAreaSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SubsidyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const titleAnimation = setInterval(() => {
      setAnimateTitle(prev => !prev);
    }, 2000);

    return () => clearInterval(titleAnimation);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formattedUsePurpose = usePurpose.join(' / ');
    const searchParams = new URLSearchParams({
      keyword,
      sort,
      order,
      acceptance,
      use_purpose: formattedUsePurpose,
      industry: '製造業', // 固定値
      target_number_of_employees: targetNumberOfEmployees,
      target_area_search: targetAreaSearch
    });

    try {
      const response = await fetch(`/api/subsidies?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: ApiResponse = await response.json();
      setSearchResults(data.result);
      setShowModal(true);
    } catch (err) {
      setError('検索中にエラーが発生しました。もう一度お試しください。');
      console.error('Search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const usePurposeOptions = [
    "新たな事業を行いたい",
    "販路拡大・海外展開をしたい",
    "イベント・事業運営支援がほしい",
    "事業を引き継ぎたい",
    "研究開発・実証事業を行いたい",
    "人材育成を行いたい",
    "資金繰りを改善したい",
    "設備整備・IT導入したい",
    "雇用・職場環境を改善したい",
    "エコ・SDG's活動支援がほしい",
    "災害（自然災害、感染症等）支援がほしい",
    "教育・子育て・少子化への支援がほしい",
    "スポーツ・文化への支援がほしい",
    "安全・防災対策支援がほしい",
    "まちづくり・地域振興支援がほしい"
  ];

  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", 
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", 
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", 
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", 
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", 
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", 
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  return (
    <>
      <div className="p-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-lg max-w-4xl mx-auto text-white">
        <h2 className={`text-4xl font-bold mb-6 text-center transition-all duration-500 ${animateTitle ? 'scale-110 text-yellow-300' : 'scale-100 text-white'}`}>
          🌟 補助金検索 🌟
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keyword" className="text-xl">キーワード*</Label>
            <Input
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="例: 小規模事業者"
              required
              minLength={2}
              maxLength={255}
              className="bg-white/20 text-white placeholder-white/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sort" className="text-xl">ソート項目*</Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger id="sort" className="bg-white/20 text-white">
                  <SelectValue placeholder="ソート項目を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_date">作成日時</SelectItem>
                  <SelectItem value="acceptance_start_datetime">募集開始日時</SelectItem>
                  <SelectItem value="acceptance_end_datetime">募集終了日時</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order" className="text-xl">ソート順*</Label>
              <Select value={order} onValueChange={setOrder}>
                <SelectTrigger id="order" className="bg-white/20 text-white">
                  <SelectValue placeholder="ソート順を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DESC">降順</SelectItem>
                  <SelectItem value="ASC">昇順</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="acceptance" className="text-xl">募集期間内絞込み*</Label>
            <Select value={acceptance} onValueChange={setAcceptance}>
              <SelectTrigger id="acceptance" className="bg-white/20 text-white">
                <SelectValue placeholder="絞込みを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">要</SelectItem>
                <SelectItem value="0">否</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xl">利用目的</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {usePurposeOptions.map((purpose) => (
                <div key={purpose} className="flex items-center space-x-2">
                  <Checkbox
                    id={`purpose-${purpose}`}
                    checked={usePurpose.includes(purpose)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setUsePurpose([...usePurpose, purpose]);
                      } else {
                        setUsePurpose(usePurpose.filter(p => p !== purpose));
                      }
                    }}
                    className="bg-white/20"
                  />
                  <Label htmlFor={`purpose-${purpose}`} className="text-sm">{purpose}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_number_of_employees" className="text-xl">従業員数</Label>
            <Select value={targetNumberOfEmployees} onValueChange={setTargetNumberOfEmployees}>
              <SelectTrigger id="target_number_of_employees" className="bg-white/20 text-white">
                <SelectValue placeholder="従業員数を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="従業員の制約なし">制約なし</SelectItem>
                <SelectItem value="5名以下">5名以下</SelectItem>
                <SelectItem value="20名以下">20名以下</SelectItem>
                <SelectItem value="50名以下">50名以下</SelectItem>
                <SelectItem value="100名以下">100名以下</SelectItem>
                <SelectItem value="300名以下">300名以下</SelectItem>
                <SelectItem value="900名以下">900名以下</SelectItem>
                <SelectItem value="901名以上">901名以上</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_area_search" className="text-xl">補助対象地域</Label>
            <Select value={targetAreaSearch} onValueChange={setTargetAreaSearch}>
              <SelectTrigger id="target_area_search" className="bg-white/20 text-white">
                <SelectValue placeholder="地域を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全国">全国</SelectItem>
                <SelectItem value="北海道地方">北海道地方</SelectItem>
                <SelectItem value="東北地方">東北地方</SelectItem>
                <SelectItem value="関東・甲信越地方">関東・甲信越地方</SelectItem>
                <SelectItem value="東海・北陸地方">東海・北陸地方</SelectItem>
                <SelectItem value="近畿地方">近畿地方</SelectItem>
                <SelectItem value="中国地方">中国地方</SelectItem>
                <SelectItem value="四国地方">四国地方</SelectItem>
                <SelectItem value="九州・沖縄地方">九州・沖縄地方</SelectItem>
                {prefectures.map((prefecture) => (
                  <SelectItem key={prefecture} value={prefecture}>{prefecture}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-full transform transition duration-200 hover:scale-105" 
            disabled={isLoading}
          >
            {isLoading ? '検索中...' : <><Search className="mr-2 h-6 w-6" /> 補助金を探す</>}
          </Button>
        </form>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gray-800 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">🎉 補助金発見！ 🎉</DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              あなたにピッタリの補助金が見つかりました！
            </DialogDescription>
          </DialogHeader>
          {searchResults.length > 0 ? (
            <ul className="space-y-4 mt-4">
              {searchResults.map((subsidy, index) => (
                <li 
                  key={subsidy.id} 
                  className="border-2 border-yellow-400 p-4 rounded-md bg-gray-700 transition-all duration-300 hover:scale-105"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <h4 className="font-bold text-xl text-yellow-400">{subsidy.title}</h4>
                  <p className="text-gray-400 mt-2">対象地域: {subsidy.target_area_search}</p>
                  <p className="text-gray-400">補助金上限: {subsidy.subsidy_max_limit.toLocaleString()}円</p>
                  <p className="text-gray-400">募集期間: {new Date(subsidy.acceptance_start_datetime).toLocaleDateString()} ～ {new Date(subsidy.acceptance_end_datetime).toLocaleDateString()}</p>
                  <p className="text-gray-400">従業員数: {subsidy.target_number_of_employees}</p>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full">
                      詳細を見る
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-xl mt-4 text-gray-400">検索結果がありません。別の条件で試してみてください！</p>
          )}
          <div className="mt-6 flex justify-center">
            <Button onClick={() => setShowModal(false)} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-full">
              閉じる
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubsidySearchForm;