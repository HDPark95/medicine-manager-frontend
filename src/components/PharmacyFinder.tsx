import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  distance: string;
  isOpen: boolean;
  hours: string;
  hasParking: boolean;
  is24Hours: boolean;
}

export function PharmacyFinder() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock pharmacy data
  const pharmacies: Pharmacy[] = [
    {
      id: 1,
      name: '24시 중앙약국',
      address: '서울시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      distance: '0.3km',
      isOpen: true,
      hours: '24시간 운영',
      hasParking: true,
      is24Hours: true,
    },
    {
      id: 2,
      name: '서울대약국',
      address: '서울시 강남구 역삼동 456',
      phone: '02-2345-6789',
      distance: '0.5km',
      isOpen: true,
      hours: '평일 09:00-20:00, 토 09:00-18:00',
      hasParking: false,
      is24Hours: false,
    },
    {
      id: 3,
      name: '건강약국',
      address: '서울시 강남구 논현동 789',
      phone: '02-3456-7890',
      distance: '0.8km',
      isOpen: false,
      hours: '평일 09:00-19:00, 토 09:00-15:00',
      hasParking: true,
      is24Hours: false,
    },
    {
      id: 4,
      name: '우리약국',
      address: '서울시 강남구 삼성동 321',
      phone: '02-4567-8901',
      distance: '1.2km',
      isOpen: true,
      hours: '평일 09:00-21:00, 주말 10:00-18:00',
      hasParking: false,
      is24Hours: false,
    },
  ];

  const filteredPharmacies = searchQuery
    ? pharmacies.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pharmacies;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900 mb-1">주변 약국 찾기</h2>
        <p className="text-slate-600 text-sm">가까운 약국을 찾아 방문하세요</p>
      </div>

      {/* Location & Search */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4 text-blue-600">
          <MapPin className="size-5 flex-shrink-0" />
          <span className="text-slate-700 text-sm truncate">현재 위치: 서울시 강남구 역삼동</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="size-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="약국 이름이나 주소로 검색"
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2 whitespace-nowrap">
            <Navigation className="size-5" />
            내 위치
          </Button>
        </div>
      </Card>

      {/* Map Placeholder */}
      <Card className="p-0 overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
          <div className="text-center">
            <MapPin className="size-12 text-blue-600 mx-auto mb-2" />
            <div className="text-slate-700">지도 영역</div>
            <div className="text-slate-600 text-sm">실제 지도 API 연동 시 표시됩니다</div>
          </div>
          {/* Mock map markers */}
          <div className="absolute top-12 left-20 size-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white animate-bounce">
            📍
          </div>
          <div className="absolute top-20 right-24 size-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white">
            📍
          </div>
          <div className="absolute bottom-16 left-1/3 size-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white">
            📍
          </div>
        </div>
      </Card>

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 text-white whitespace-nowrap text-sm">
          전체
        </button>
        <button className="px-4 py-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 whitespace-nowrap text-sm">
          24시간 운영
        </button>
        <button className="px-4 py-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 whitespace-nowrap text-sm">
          주차 가능
        </button>
        <button className="px-4 py-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 whitespace-nowrap text-sm">
          영업 중
        </button>
      </div>

      {/* Pharmacy List */}
      <div className="space-y-4">
        {filteredPharmacies.map((pharmacy, index) => (
          <Card key={pharmacy.id} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-slate-900 truncate">{pharmacy.name}</h3>
                  <Badge variant={pharmacy.isOpen ? 'default' : 'secondary'} className="text-xs whitespace-nowrap">
                    {pharmacy.isOpen ? '영업 중' : '영업 종료'}
                  </Badge>
                  {pharmacy.is24Hours && (
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs whitespace-nowrap">
                      24시간
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 text-slate-600 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 flex-shrink-0" />
                    <span>{pharmacy.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 flex-shrink-0" />
                    <span className="break-words">{pharmacy.hours}</span>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <div className="text-2xl text-blue-600 mb-1">{index + 1}</div>
                <div className="text-slate-600 text-sm">{pharmacy.distance}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-200">
              {pharmacy.hasParking && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs">
                  🅿️ 주차 가능
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 gap-2 text-sm h-9">
                <Phone className="size-4" />
                전화하기
              </Button>
              <Button className="flex-1 gap-2 text-sm h-9 bg-blue-600 hover:bg-blue-700">
                <Navigation className="size-4" />
                길찾기
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredPharmacies.length === 0 && (
        <Card className="p-12 text-center">
          <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="size-10 text-slate-400" />
          </div>
          <h3 className="text-slate-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-slate-600 text-sm">
            다른 검색어로 다시 시도해보세요
          </p>
        </Card>
      )}

      {/* Info Card */}
      <Card className="p-5 bg-green-50 border-green-200">
        <div className="flex gap-3">
          <div className="text-xl flex-shrink-0">💡</div>
          <div className="min-w-0">
            <h3 className="text-slate-900 mb-2">약국 이용 팁</h3>
            <ul className="space-y-1 text-slate-700 text-sm leading-relaxed">
              <li>• 약봉투 조제는 가까운 어느 약국에서나 가능합니다</li>
              <li>• 24시간 약국은 응급 상황에 유용합니다</li>
              <li>• 약 복용 방법이 궁금하면 약사에게 문의하세요</li>
              <li>• 일요일이나 공휴일에는 당직 약국을 이용하세요</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
