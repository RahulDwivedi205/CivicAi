import React from 'react';
import { AlertTriangle, PhoneCall, ShieldCheck } from 'lucide-react';

export default function EmergencyNotice({ language = 'en' }) {
  const isHindi = language === 'hi';

  return (
    <div className="bg-gradient-to-r from-red-50 via-amber-50 to-red-50 border-y border-red-200/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-2.5 text-red-900 font-medium text-center md:text-left">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="w-3.5 h-3.5" />
          </span>
          <span>
            {isHindi ? (
              <>
                <strong className="font-semibold text-red-800">आपातकालीन सूचना:</strong> आग (101), एम्बुलेंस (108), या पुलिस आपातकाल (112) के लिए सीधे आपातकालीन नंबर डायल करें। CivicAI केवल प्रशासनिक नागरिक शिकायतों के वर्गीकरण और निवारण हेतु है।
              </>
            ) : (
              <>
                <strong className="font-semibold text-red-800">Emergency Protocol:</strong> For life safety, fire (101), ambulance (108), or police (112), dial national emergency dispatch immediately. CivicAI is designed for administrative municipal grievance triage.
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-white/90 border border-red-200 shadow-xs px-2.5 py-1 rounded-md text-xs font-semibold text-red-700">
            <PhoneCall className="w-3 h-3 text-red-600" />
            <span>Emergency: 112</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/90 border border-emerald-200 shadow-xs px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-700">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Nagar Nigam: 1533</span>
          </div>
        </div>
      </div>
    </div>
  );
}
