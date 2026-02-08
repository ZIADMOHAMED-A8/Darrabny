// app/company/candidates/profile/_components/documents-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Download, Eye, FileText } from "lucide-react";
import { candidateProfileDummy } from "../_data/candidate-profile.dummy";

export default function DocumentsCard() {
  const file = candidateProfileDummy.documents.file;

  return (
    <Card className="rounded-2xl border-0 bg-[var(--ic-surface)] shadow-md">
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-slate-900">{candidateProfileDummy.documents.title}</p>

        <div className="mt-4 rounded-2xl bg-white/40 p-4 shadow-sm border border-black/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/60 border border-black/10">
                <FileText className="h-5 w-5 text-slate-900" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">{file.name}</p>
                <p className="text-xs text-slate-600">{file.meta}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5">
                <Eye className="h-5 w-5" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
