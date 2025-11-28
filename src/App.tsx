import { useState } from 'react';
import { Bell, Pill, Camera, Users, Sparkles, MapPin, Home, Heart } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { MedicineList } from './components/MedicineList';
import { PrescriptionScanner } from './components/PrescriptionScanner';
import { GuardianManagement } from './components/GuardianManagement';
import { SupplementRecommendation } from './components/SupplementRecommendation';
import { PharmacyFinder } from './components/PharmacyFinder';
import './index.css';

type TabType = 'home' | 'medicines' | 'scanner' | 'guardians' | 'supplements' | 'pharmacy';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'medicines':
        return <MedicineList />;
      case 'scanner':
        return <PrescriptionScanner />;
      case 'guardians':
        return <GuardianManagement />;
      case 'supplements':
        return <SupplementRecommendation />;
      case 'pharmacy':
        return <PharmacyFinder />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-200">
                  <Pill className="size-6 text-white" />
                </div>
                <Heart className="size-3 text-rose-500 absolute -top-0.5 -right-0.5 fill-rose-500" />
              </div>
              <div>
                <h1 className="text-slate-800 text-xl font-bold tracking-tight">내 약 관리</h1>
                <p className="text-emerald-600 text-xs font-medium">건강한 복약 습관</p>
              </div>
            </div>
            <button className="p-2.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 hover:from-emerald-50 hover:to-emerald-100 transition-all shadow-sm relative group">
              <Bell className="size-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-5 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-emerald-100 pb-safe">
        <div className="max-w-7xl mx-auto px-2">
          <div className="grid grid-cols-6 gap-1 py-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-2xl transition-all ${
                activeTab === 'home'
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Home className={`size-5 ${activeTab === 'home' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">홈</span>
            </button>
            <button
              onClick={() => setActiveTab('medicines')}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-2xl transition-all ${
                activeTab === 'medicines'
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Pill className={`size-5 ${activeTab === 'medicines' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">내 약</span>
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-2xl transition-all ${
                activeTab === 'scanner'
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Camera className={`size-5 ${activeTab === 'scanner' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">처방전</span>
            </button>
            <button
              onClick={() => setActiveTab('guardians')}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-2xl transition-all ${
                activeTab === 'guardians'
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Users className={`size-5 ${activeTab === 'guardians' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">보호자</span>
            </button>
            <button
              onClick={() => setActiveTab('supplements')}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-2xl transition-all ${
                activeTab === 'supplements'
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Sparkles className={`size-5 ${activeTab === 'supplements' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">영양제</span>
            </button>
            <button
              onClick={() => setActiveTab('pharmacy')}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-2xl transition-all ${
                activeTab === 'pharmacy'
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <MapPin className={`size-5 ${activeTab === 'pharmacy' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">약국</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
