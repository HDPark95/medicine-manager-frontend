import { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle2, X, Pill, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

// API URL 설정 (환경변수 또는 기본값)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7080';

interface ScannedData {
  hospital: string;
  date: string;
  patientName?: string;
  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;
  prescribingDoctor?: string;
  totalAmount?: number;
  copayment?: number;
  medicines: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    usage?: string;
    effect?: string;
  }>;
}

export function PrescriptionScanner() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const selectedFileRef = useRef<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      selectedFileRef.current = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        setScannedImage(e.target?.result as string);
        setError(null);
        extractPrescription(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractPrescription = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/api/prescription/extract`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();

      // API 응답을 ScannedData 형식으로 변환
      const mappedData: ScannedData = {
        hospital: data.pharmacy?.name || '알 수 없음',
        date: data.dispensingDate || new Date().toISOString().split('T')[0],
        patientName: data.patient?.name,
        pharmacyName: data.pharmacy?.name,
        pharmacyAddress: data.pharmacy?.address,
        pharmacyPhone: data.pharmacy?.phoneNumber,
        prescribingDoctor: data.prescribingDoctor,
        totalAmount: data.totalAmount,
        copayment: data.copayment,
        medicines: (data.medicines || []).map((item: any) => ({
          name: item.name || '알 수 없음',
          dosage: item.dosagePerIntake || '',
          frequency: item.dailyFrequency || '',
          duration: item.totalDays || '',
          usage: item.usageInstruction || '',
          effect: item.effect || '',
        })),
      };

      setScannedData(mappedData);
    } catch (err) {
      console.error('OCR 처리 오류:', err);
      setError(err instanceof Error ? err.message : 'OCR 처리 중 오류가 발생했습니다');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    // Save to medicine list
    alert('약 정보가 저장되었습니다!');
    setScannedImage(null);
    setScannedData(null);
  };

  const handleReset = () => {
    setScannedImage(null);
    setScannedData(null);
    setIsProcessing(false);
    setError(null);
    selectedFileRef.current = null;
  };

  const handleRetry = () => {
    if (selectedFileRef.current) {
      setError(null);
      extractPrescription(selectedFileRef.current);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900 mb-1">처방전 스캔</h2>
        <p className="text-slate-600 text-sm">처방전 사진을 찍거나 업로드하여 약 정보를 자동으로 입력하세요</p>
      </div>

      {!scannedImage ? (
        <>
          {/* Upload Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-8 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
              <label htmlFor="camera-input" className="cursor-pointer block">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera className="size-8 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-slate-900 mb-2">사진 촬영</h3>
                    <p className="text-slate-600 text-sm">카메라로 처방전 촬영하기</p>
                  </div>
                </div>
                <input
                  id="camera-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </Card>

            <Card className="p-8 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
              <label htmlFor="file-input" className="cursor-pointer block">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Upload className="size-8 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-slate-900 mb-2">파일 업로드</h3>
                    <p className="text-slate-600 text-sm">저장된 이미지 선택하기</p>
                  </div>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="p-5 bg-blue-50 border-blue-200">
            <h3 className="text-slate-900 mb-3">촬영 팁</h3>
            <ul className="space-y-2 text-slate-700 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="size-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">1</span>
                <span>처방전을 평평한 곳에 놓고 촬영하세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="size-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">2</span>
                <span>글씨가 선명하게 보이도록 충분한 조명을 확보하세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="size-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">3</span>
                <span>처방전 전체가 화면에 들어오도록 촬영하세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="size-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">4</span>
                <span>그림자나 반사광이 없는지 확인하세요</span>
              </li>
            </ul>
          </Card>
        </>
      ) : (
        <>
          {/* Scanned Image Preview */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900">스캔한 처방전</h3>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <X className="size-5" />
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={scannedImage}
                alt="Scanned prescription"
                className="w-full h-auto"
              />
            </div>
          </Card>

          {/* Processing State */}
          {isProcessing && (
            <Card className="p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="size-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="text-center">
                  <h3 className="text-slate-900 mb-2">처방전 분석 중...</h3>
                  <p className="text-slate-600 text-sm">약 정보를 읽어오고 있습니다</p>
                </div>
              </div>
            </Card>
          )}

          {/* Error State */}
          {error && !isProcessing && (
            <Card className="p-5 bg-red-50 border-red-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-1">분석 실패</h3>
                  <p className="text-slate-700 text-sm mb-3">{error}</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleRetry}>
                      다시 시도
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleReset}>
                      취소
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Scanned Results */}
          {scannedData && !isProcessing && (
            <div className="space-y-4">
              <Card className="p-5 bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-slate-900">스캔 완료!</h3>
                    <p className="text-slate-700 text-sm">처방전 정보를 확인하고 수정하세요</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-slate-900 mb-4">처방 정보</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>약국명</Label>
                      <Input value={scannedData.hospital} className="mt-1" readOnly />
                    </div>
                    <div>
                      <Label>조제일</Label>
                      <Input value={scannedData.date} className="mt-1" readOnly />
                    </div>
                  </div>
                  {scannedData.pharmacyAddress && (
                    <div>
                      <Label>약국 주소</Label>
                      <Input value={scannedData.pharmacyAddress} className="mt-1" readOnly />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    {scannedData.pharmacyPhone && (
                      <div>
                        <Label>약국 전화</Label>
                        <Input value={scannedData.pharmacyPhone} className="mt-1" readOnly />
                      </div>
                    )}
                    {scannedData.prescribingDoctor && (
                      <div>
                        <Label>처방의</Label>
                        <Input value={scannedData.prescribingDoctor} className="mt-1" readOnly />
                      </div>
                    )}
                  </div>
                  {scannedData.patientName && (
                    <div>
                      <Label>환자명</Label>
                      <Input value={scannedData.patientName} className="mt-1" readOnly />
                    </div>
                  )}
                  {(scannedData.totalAmount !== undefined || scannedData.copayment !== undefined) && (
                    <div className="grid grid-cols-2 gap-4">
                      {scannedData.totalAmount !== undefined && (
                        <div>
                          <Label>총 금액</Label>
                          <Input value={`${scannedData.totalAmount.toLocaleString()}원`} className="mt-1" readOnly />
                        </div>
                      )}
                      {scannedData.copayment !== undefined && (
                        <div>
                          <Label>본인부담금</Label>
                          <Input value={`${scannedData.copayment.toLocaleString()}원`} className="mt-1" readOnly />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-slate-900 mb-4">처방 약품 ({scannedData.medicines.length}개)</h3>
                <div className="space-y-3">
                  {scannedData.medicines.map((medicine, index) => (
                    <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-start gap-3">
                        <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Pill className="size-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="font-medium text-slate-900">{medicine.name}</div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="bg-white p-2 rounded border">
                              <span className="text-slate-500 block text-xs">1회 용량</span>
                              <span className="text-slate-800">{medicine.dosage || '-'}</span>
                            </div>
                            <div className="bg-white p-2 rounded border">
                              <span className="text-slate-500 block text-xs">1일 횟수</span>
                              <span className="text-slate-800">{medicine.frequency || '-'}</span>
                            </div>
                            <div className="bg-white p-2 rounded border">
                              <span className="text-slate-500 block text-xs">투약일수</span>
                              <span className="text-slate-800">{medicine.duration || '-'}</span>
                            </div>
                          </div>
                          {medicine.usage && (
                            <div className="text-sm text-slate-600">
                              <span className="text-slate-500">용법:</span> {medicine.usage}
                            </div>
                          )}
                          {medicine.effect && (
                            <div className="text-sm text-blue-600">
                              <span className="text-slate-500">효능:</span> {medicine.effect}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleSave}>
                  <CheckCircle2 className="size-5 mr-2" />
                  내 약 목록에 추가
                </Button>
                <Button size="lg" variant="outline" onClick={handleReset}>
                  다시 스캔
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
