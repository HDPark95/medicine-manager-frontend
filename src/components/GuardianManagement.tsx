import { useState } from 'react';
import { Plus, Users, Mail, Phone, Trash2, Bell, BellOff } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';

interface Guardian {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notifyMedicine: boolean;
  notifyAppointment: boolean;
  notifyDaysBefore: number;
}

export function GuardianManagement() {
  const [guardians, setGuardians] = useState<Guardian[]>([
    {
      id: 1,
      name: '김민수',
      relationship: '아들',
      phone: '010-1234-5678',
      email: 'minsu@example.com',
      notifyMedicine: true,
      notifyAppointment: true,
      notifyDaysBefore: 3,
    },
    {
      id: 2,
      name: '김지현',
      relationship: '딸',
      phone: '010-9876-5432',
      email: 'jihyun@example.com',
      notifyMedicine: false,
      notifyAppointment: true,
      notifyDaysBefore: 5,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: number) => {
    setGuardians(guardians.filter(g => g.id !== id));
  };

  const toggleNotification = (id: number, type: 'medicine' | 'appointment') => {
    setGuardians(guardians.map(g => {
      if (g.id === id) {
        if (type === 'medicine') {
          return { ...g, notifyMedicine: !g.notifyMedicine };
        } else {
          return { ...g, notifyAppointment: !g.notifyAppointment };
        }
      }
      return g;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">보호자 관리</h2>
          <p className="text-slate-600 text-sm">보호자 {guardians.length}명이 등록되어 있습니다</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="size-5" />
              보호자 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>새 보호자 추가하기</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardian-name">이름</Label>
                  <Input id="guardian-name" placeholder="예: 김민수" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">관계</Label>
                  <Input id="relationship" placeholder="예: 아들" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input id="phone" type="tel" placeholder="010-1234-5678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일 (선택)</Label>
                <Input id="email" type="email" placeholder="example@email.com" />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-slate-900">알림 설정</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Bell className="size-5 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-slate-900 text-sm">약 복용 알림</div>
                      <div className="text-slate-600 text-xs truncate">약 복용 시간을 알려드립니다</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Bell className="size-5 text-orange-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-slate-900 text-sm">병원 방문 알림</div>
                      <div className="text-slate-600 text-xs truncate">병원 방문일을 알려드립니다</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="days-before">병원 방문 며칠 전 알림</Label>
                  <Input id="days-before" type="number" defaultValue={3} min={1} max={7} />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1" size="lg">추가하기</Button>
                <Button variant="outline" className="flex-1" size="lg" onClick={() => setIsDialogOpen(false)}>
                  취소
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Card */}
      <Card className="p-5 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <div className="text-xl flex-shrink-0">ℹ️</div>
          <div className="min-w-0">
            <h3 className="text-slate-900 mb-2">보호자 알림 기능</h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-2">
              등록된 보호자들에게 약 복용 시간과 병원 방문일을 자동으로 알려드립니다.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              보호자 등록 인원에는 제한이 없지만, 너무 많은 인원을 등록하면
              알림이 과도하게 전송될 수 있으니 주의하세요.
            </p>
          </div>
        </div>
      </Card>

      {/* Guardian Cards */}
      <div className="space-y-4">
        {guardians.map((guardian) => (
          <Card key={guardian.id} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="size-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-lg">{guardian.name[0]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-slate-900 truncate">{guardian.name}</h3>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">{guardian.relationship}</Badge>
                  </div>
                  <div className="space-y-1 text-slate-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 flex-shrink-0" />
                      <span className="truncate">{guardian.phone}</span>
                    </div>
                    {guardian.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 flex-shrink-0" />
                        <span className="truncate">{guardian.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(guardian.id)}
              >
                <Trash2 className="size-5 text-red-600" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-slate-900 mb-3 text-sm">알림 설정</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {guardian.notifyMedicine ? (
                        <Bell className="size-5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <BellOff className="size-5 text-slate-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm truncate ${guardian.notifyMedicine ? 'text-slate-900' : 'text-slate-500'}`}>
                        약 복용 알림
                      </span>
                    </div>
                    <Switch
                      checked={guardian.notifyMedicine}
                      onCheckedChange={() => toggleNotification(guardian.id, 'medicine')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {guardian.notifyAppointment ? (
                        <Bell className="size-5 text-orange-600 flex-shrink-0" />
                      ) : (
                        <BellOff className="size-5 text-slate-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm truncate ${guardian.notifyAppointment ? 'text-slate-900' : 'text-slate-500'}`}>
                        병원 방문 알림
                      </span>
                    </div>
                    <Switch
                      checked={guardian.notifyAppointment}
                      onCheckedChange={() => toggleNotification(guardian.id, 'appointment')}
                    />
                  </div>

                  {guardian.notifyAppointment && (
                    <div className="pl-7 pt-1">
                      <div className="text-slate-600 text-sm">
                        병원 방문 {guardian.notifyDaysBefore}일 전 알림
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {guardians.length === 0 && (
        <Card className="p-12 text-center">
          <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="size-10 text-slate-400" />
          </div>
          <h3 className="text-slate-900 mb-2">등록된 보호자가 없습니다</h3>
          <p className="text-slate-600 text-sm mb-6">
            가족이나 지인을 보호자로 등록하여<br />
            약 복용과 병원 방문을 함께 관리하세요
          </p>
          <Button size="lg" onClick={() => setIsDialogOpen(true)}>
            <Plus className="size-5 mr-2" />
            보호자 추가하기
          </Button>
        </Card>
      )}
    </div>
  );
}
