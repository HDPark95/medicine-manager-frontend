import { Bell, Pill, Calendar, Clock, Camera, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

type TabType = 'home' | 'medicines' | 'scanner' | 'guardians' | 'supplements' | 'pharmacy';

interface DashboardProps {
  onNavigate: (tab: TabType) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Mock data
  const todayMedicines = [
    { id: 1, name: '혈압약 (암로디핀)', time: '08:00', taken: true },
    { id: 2, name: '당뇨약 (메트포민)', time: '12:00', taken: false },
    { id: 3, name: '소화제', time: '20:00', taken: false },
  ];

  const upcomingAppointments = [
    { id: 1, hospital: '서울대병원 내과', date: '2025-11-28', daysLeft: 5 },
    { id: 2, hospital: '연세병원 정형외과', date: '2025-12-05', daysLeft: 12 },
  ];

  const takenCount = todayMedicines.filter(m => m.taken).length;
  const totalCount = todayMedicines.length;

  return (
    <div className="space-y-5">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl p-5 text-white shadow-lg shadow-emerald-200 mt-1">
        <div className="flex items-center gap-4">
          <div className="size-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-2 ring-white/30">
            <Pill className="size-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold text-lg">안녕하세요!</h2>
            <p className="text-emerald-100 text-sm">오늘도 건강한 하루 보내세요</p>
          </div>
        </div>
        {/* Progress indicator */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-100 text-sm">오늘의 복약</span>
            <span className="text-white font-medium">{takenCount}/{totalCount}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(takenCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('scanner')}
          className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100 transition-all active:scale-[0.98] group"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="size-5 text-emerald-600" />
            </div>
            <div className="text-center">
              <div className="text-slate-800 font-medium text-sm">처방전 스캔</div>
              <div className="text-slate-500 text-xs mt-0.5">약 정보 자동 입력</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('medicines')}
          className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100 transition-all active:scale-[0.98] group"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Pill className="size-5 text-teal-600" />
            </div>
            <div className="text-center">
              <div className="text-slate-800 font-medium text-sm">약 추가</div>
              <div className="text-slate-500 text-xs mt-0.5">직접 입력하기</div>
            </div>
          </div>
        </button>
      </div>

      {/* Today's Medicines */}
      <Card className="p-4 border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Pill className="size-4 text-emerald-600" />
            </div>
            <h3 className="text-slate-800 font-semibold">오늘 복용할 약</h3>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
            {todayMedicines.filter(m => !m.taken).length}개 남음
          </span>
        </div>

        <div className="space-y-2.5">
          {todayMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className={`p-3.5 rounded-xl border transition-all ${
                medicine.taken
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-gradient-to-r from-emerald-50/50 to-transparent border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${medicine.taken ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {medicine.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className={`size-3.5 ${medicine.taken ? 'text-slate-400' : 'text-emerald-500'}`} />
                    <span className={`text-xs ${medicine.taken ? 'text-slate-400' : 'text-slate-600'}`}>
                      {medicine.time}
                    </span>
                  </div>
                </div>
                {medicine.taken ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">
                    <CheckCircle2 className="size-3.5" />
                    완료
                  </div>
                ) : (
                  <button className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-all text-xs font-medium shadow-sm shadow-emerald-200">
                    복용 체크
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="p-4 border-amber-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-amber-100 rounded-lg">
            <Calendar className="size-4 text-amber-600" />
          </div>
          <h3 className="text-slate-800 font-semibold">다가오는 병원 방문</h3>
        </div>

        <div className="space-y-2.5">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-slate-800 font-medium text-sm truncate">{appointment.hospital}</div>
                  <div className="text-slate-500 text-xs mt-1">{appointment.date}</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-200/70 text-amber-800 rounded-lg text-xs font-medium whitespace-nowrap">
                  <Bell className="size-3.5" />
                  <span>D-{appointment.daysLeft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate('guardians')}
          className="w-full mt-3 p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Users className="size-4" />
          <span>보호자에게도 알림 보내기</span>
        </button>
      </Card>

      {/* Health Tip */}
      <Card className="p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200/50 shadow-sm">
        <div className="flex gap-3">
          <div className="p-2 bg-white/70 rounded-xl shadow-sm flex-shrink-0">
            <Sparkles className="size-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-slate-800 font-semibold text-sm mb-1.5">건강 팁</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              약은 정해진 시간에 규칙적으로 복용하는 것이 중요합니다.
              알람을 설정하여 복용 시간을 놓치지 마세요!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
