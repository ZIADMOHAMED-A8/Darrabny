export default function AcademicRecordCard({ record }: any) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-bold text-base text-slate-800 mb-6">Academic Record</h2>
  
        <div className="space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Institution
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {record?.institution || "Not provided"}
            </p>
          </div>
  
          <div className="border-t border-slate-100 pt-5">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Major
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {record?.major || "Not provided"}
            </p>
          </div>
  
          <div className="border-t border-slate-100 pt-5">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Expected Graduation
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {record?.expectedGraduation || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    );
  }