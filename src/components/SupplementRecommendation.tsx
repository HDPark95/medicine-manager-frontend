import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Supplement {
  id: number;
  name: string;
  category: string;
  icon: string;
  benefits: string[];
  recommended: boolean;
  description: string;
  dosage: string;
}

export function SupplementRecommendation() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체', icon: '📋' },
    { id: 'heart', name: '심혈관', icon: '❤️' },
    { id: 'bone', name: '뼈/관절', icon: '🦴' },
    { id: 'eye', name: '눈 건강', icon: '👁️' },
    { id: 'brain', name: '두뇌', icon: '🧠' },
    { id: 'immunity', name: '면역력', icon: '🛡️' },
  ];

  const supplements: Supplement[] = [
    {
      id: 1,
      name: '오메가-3',
      category: 'heart',
      icon: '🐟',
      benefits: ['심혈관 건강', '혈액순환 개선', '콜레스테롤 관리'],
      recommended: true,
      description: '중장년층의 심혈관 건강에 도움을 주는 필수 영양제입니다.',
      dosage: '1일 1회, 1캡슐',
    },
    {
      id: 2,
      name: '칼슘 + 비타민D',
      category: 'bone',
      icon: '🦴',
      benefits: ['뼈 건강', '골다공증 예방', '칼슘 흡수 촉진'],
      recommended: true,
      description: '뼈 건강을 유지하고 골다공증을 예방하는데 도움을 줍니다.',
      dosage: '1일 1회, 1정',
    },
    {
      id: 3,
      name: '루테인',
      category: 'eye',
      icon: '👁️',
      benefits: ['눈 건강', '시력 보호', '황반변성 예방'],
      recommended: true,
      description: '눈의 황반 색소 밀도를 높여 눈 건강에 도움을 줍니다.',
      dosage: '1일 1회, 1캡슐',
    },
    {
      id: 4,
      name: '코엔자임 Q10',
      category: 'heart',
      icon: '💊',
      benefits: ['항산화', '에너지 생성', '심장 건강'],
      recommended: false,
      description: '세포의 에너지 생성을 돕고 항산화 작용을 합니다.',
      dosage: '1일 1회, 1캡슐',
    },
    {
      id: 5,
      name: '글루코사민',
      category: 'bone',
      icon: '🦵',
      benefits: ['관절 건강', '연골 보호', '관절 통증 완화'],
      recommended: false,
      description: '관절 연골 건강에 도움을 주는 영양제입니다.',
      dosage: '1일 1~2회, 1정',
    },
    {
      id: 6,
      name: '은행잎 추출물',
      category: 'brain',
      icon: '🍃',
      benefits: ['혈액순환', '기억력 개선', '집중력 향상'],
      recommended: false,
      description: '뇌 혈액순환을 개선하여 기억력과 집중력에 도움을 줍니다.',
      dosage: '1일 1회, 1정',
    },
    {
      id: 7,
      name: '홍삼',
      category: 'immunity',
      icon: '🌿',
      benefits: ['면역력 강화', '피로 회복', '활력 증진'],
      recommended: true,
      description: '면역력 강화와 피로 개선에 도움을 주는 전통 건강식품입니다.',
      dosage: '1일 1~2회',
    },
    {
      id: 8,
      name: '비타민 B 복합체',
      category: 'immunity',
      icon: '💊',
      benefits: ['에너지 생성', '피로 개선', '신경 기능'],
      recommended: false,
      description: '에너지 대사와 피로 개선에 도움을 줍니다.',
      dosage: '1일 1회, 1정',
    },
  ];

  const filteredSupplements = selectedCategory === 'all'
    ? supplements
    : supplements.filter(s => s.category === selectedCategory);

  const recommendedSupplements = supplements.filter(s => s.recommended);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900 mb-1">영양제 추천</h2>
        <p className="text-slate-600 text-sm">중장년층에게 도움이 되는 영양제를 추천해드립니다</p>
      </div>

      {/* Personalized Recommendations */}
      <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-center gap-2 mb-4">
          <Star className="size-5 text-amber-600" />
          <h3 className="text-slate-900">맞춤 추천 영양제</h3>
        </div>
        <p className="text-slate-700 text-sm mb-4">
          현재 복용 중인 약과 건강 상태를 고려한 추천 영양제입니다
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendedSupplements.map((supplement) => (
            <div key={supplement.id} className="p-3 rounded-xl bg-white border-2 border-amber-200">
              <div className="text-2xl mb-2">{supplement.icon}</div>
              <div className="text-slate-900 mb-1 text-sm">{supplement.name}</div>
              <div className="text-slate-600 text-xs">{supplement.dosage}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all whitespace-nowrap text-sm ${
              selectedCategory === category.id
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Supplements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSupplements.map((supplement) => (
          <Card key={supplement.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{supplement.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-slate-900 truncate">{supplement.name}</h3>
                    {supplement.recommended && (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs whitespace-nowrap">
                        추천
                      </Badge>
                    )}
                  </div>
                  <div className="text-slate-600 text-sm">{supplement.dosage}</div>
                </div>
              </div>
            </div>

            <p className="text-slate-700 text-sm mb-3 leading-relaxed">{supplement.description}</p>

            <div className="mb-3">
              <div className="text-slate-700 mb-2 text-sm">주요 효능</div>
              <div className="flex flex-wrap gap-2">
                {supplement.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2 text-sm h-9">
              <ShoppingCart className="size-4" />
              구매 정보 보기
            </Button>
          </Card>
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="p-5 bg-amber-50 border-amber-200">
        <div className="flex gap-3">
          <div className="text-xl flex-shrink-0">⚠️</div>
          <div className="min-w-0">
            <h3 className="text-slate-900 mb-2">주의사항</h3>
            <ul className="space-y-1 text-slate-700 text-sm leading-relaxed">
              <li>• 영양제는 의약품이 아니며, 질병 치료 목적으로 사용할 수 없습니다</li>
              <li>• 현재 복용 중인 약과 상호작용이 있을 수 있으니 의사나 약사와 상담하세요</li>
              <li>• 권장 섭취량을 지키고, 과다 섭취하지 않도록 주의하세요</li>
              <li>• 알레르기가 있는 경우 성분을 꼼꼼히 확인하세요</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
