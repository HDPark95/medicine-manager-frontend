import { useState } from 'react';
import { Plus, Pill, Clock, Calendar, Trash2, Edit, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  hospital: string;
  notes: string;
}

export function MedicineList() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: '혈압약 (암로디핀)',
      dosage: '5mg',
      frequency: '하루 1회',
      times: ['08:00'],
      startDate: '2025-11-01',
      endDate: '2025-12-01',
      hospital: '서울대병원 내과',
      notes: '아침 식후 복용',
    },
    {
      id: 2,
      name: '당뇨약 (메트포민)',
      dosage: '500mg',
      frequency: '하루 2회',
      times: ['08:00', '20:00'],
      startDate: '2025-11-01',
      endDate: '2025-12-01',
      hospital: '서울대병원 내과',
      notes: '식후 30분 이내 복용',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: number) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">내 약 목록</h2>
          <p className="text-slate-600 text-sm">현재 복용 중인 약 {medicines.length}개</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="size-5" />
              약 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>새 약 추가하기</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="medicine-name">약 이름</Label>
                <Input id="medicine-name" placeholder="예: 혈압약 (암로디핀)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosage">용량</Label>
                  <Input id="dosage" placeholder="예: 5mg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">복용 횟수</Label>
                  <Input id="frequency" placeholder="예: 하루 1회" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>복용 시간</Label>
                <div className="flex gap-2">
                  <Input type="time" />
                  <Button variant="outline" size="sm">
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">복용 시작일</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">복용 종료일</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital">처방 병원</Label>
                <Input id="hospital" placeholder="예: 서울대병원 내과" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">복용 메모</Label>
                <Input id="notes" placeholder="예: 아침 식후 복용" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1" size="lg">저장하기</Button>
                <Button variant="outline" className="flex-1" size="lg" onClick={() => setIsDialogOpen(false)}>
                  취소
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Medicine Cards */}
      <div className="space-y-4">
        {medicines.map((medicine) => {
          const daysRemaining = getDaysRemaining(medicine.endDate);

          return (
            <Card key={medicine.id} className="p-5">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-slate-900 truncate">{medicine.name}</h3>
                      <Badge variant="secondary" className="text-xs whitespace-nowrap">{medicine.dosage}</Badge>
                    </div>
                    <div className="text-slate-600 text-sm truncate">{medicine.hospital}</div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="size-5 text-slate-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(medicine.id)}
                    >
                      <Trash2 className="size-5 text-red-600" />
                    </Button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-blue-50">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="size-4 text-blue-600" />
                      <span className="text-slate-700 text-sm">복용 시간</span>
                    </div>
                    <div className="text-slate-900 text-sm">
                      {medicine.times.join(', ')}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-green-50">
                    <div className="flex items-center gap-2 mb-1">
                      <Pill className="size-4 text-green-600" />
                      <span className="text-slate-700 text-sm">복용 횟수</span>
                    </div>
                    <div className="text-slate-900 text-sm">{medicine.frequency}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-50">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="size-4 text-orange-600" />
                      <span className="text-slate-700 text-sm">복용 기간</span>
                    </div>
                    <div className="text-slate-900 text-xs break-words">
                      {medicine.startDate} ~ {medicine.endDate}
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl ${
                    daysRemaining <= 3 ? 'bg-red-50' : 'bg-purple-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Bell className={`size-4 ${
                        daysRemaining <= 3 ? 'text-red-600' : 'text-purple-600'
                      }`} />
                      <span className="text-slate-700 text-sm">남은 기간</span>
                    </div>
                    <div className={`text-sm ${
                      daysRemaining <= 3 ? 'text-red-700' : 'text-slate-900'
                    }`}>
                      {daysRemaining}일 남음
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {medicine.notes && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-700 mb-1 text-sm">복용 메모</div>
                    <div className="text-slate-900 text-sm">{medicine.notes}</div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {medicines.length === 0 && (
        <Card className="p-12 text-center">
          <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Pill className="size-10 text-slate-400" />
          </div>
          <h3 className="text-slate-900 mb-2">등록된 약이 없습니다</h3>
          <p className="text-slate-600 text-sm mb-6">
            처방전을 스캔하거나 직접 약을 추가해보세요
          </p>
          <Button size="lg" onClick={() => setIsDialogOpen(true)}>
            <Plus className="size-5 mr-2" />
            약 추가하기
          </Button>
        </Card>
      )}
    </div>
  );
}
