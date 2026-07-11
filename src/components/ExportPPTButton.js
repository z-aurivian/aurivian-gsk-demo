import React from 'react';
import { FileDown } from 'lucide-react';

// Visual-stub button for "Export to PowerPoint" — every dashboard, tab and
// view in the Vision Doc is supposed to be exportable as a formatted slide.
// The full pptxgenjs implementation will land in a follow-up. For now this
// surfaces the affordance and tells the viewer what they'd get.
export default function ExportPPTButton({ label = 'Export to PPT', surface = 'this view' }) {
  const handleClick = () => {
    window.alert(
      `Export to PowerPoint — coming soon.\n\n` +
      `${surface} will export as a formatted, presentation-ready slide using the brand palette, ` +
      `with AI-generated narrative, metric callouts and visual hierarchy already applied.`
    );
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-auri-border text-auri-muted hover:text-auri-text hover:border-auri-text/50 transition-all"
    >
      <FileDown size={13} />
      {label}
    </button>
  );
}
