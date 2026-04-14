import { useState, useMemo } from 'react';
import { Check, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface PaperOption {
  paperId: string;
  label: string;
  year: number;
  session: string;
}

interface PaperFilterProps {
  papers: PaperOption[];
  selectedPaperIds: Set<string>;
  onChange: (selected: Set<string>) => void;
}

export function PaperFilter({ papers, selectedPaperIds, onChange }: PaperFilterProps) {
  const [open, setOpen] = useState(false);

  const allIds = useMemo(() => new Set(papers.map(p => p.paperId)), [papers]);
  const allSelected = selectedPaperIds.size === allIds.size;
  const noneSelected = selectedPaperIds.size === 0;

  // Group by year descending
  const grouped = useMemo(() => {
    const map = new Map<number, PaperOption[]>();
    papers.forEach(p => {
      const arr = map.get(p.year) || [];
      arr.push(p);
      map.set(p.year, arr);
    });
    return Array.from(map.entries()).sort(([a], [b]) => b - a);
  }, [papers]);

  const toggleAll = () => {
    onChange(allSelected ? new Set<string>() : new Set(allIds));
  };

  const toggleYear = (year: number) => {
    const yearPapers = papers.filter(p => p.year === year);
    const yearIds = yearPapers.map(p => p.paperId);
    const allYearSelected = yearIds.every(id => selectedPaperIds.has(id));
    const next = new Set(selectedPaperIds);
    if (allYearSelected) {
      yearIds.forEach(id => next.delete(id));
    } else {
      yearIds.forEach(id => next.add(id));
    }
    onChange(next);
  };

  const togglePaper = (paperId: string) => {
    const next = new Set(selectedPaperIds);
    if (next.has(paperId)) next.delete(paperId);
    else next.add(paperId);
    onChange(next);
  };

  const label = allSelected || noneSelected
    ? 'All Papers'
    : selectedPaperIds.size === 1
      ? papers.find(p => p.paperId === Array.from(selectedPaperIds)[0])?.label || '1 Paper'
      : `${selectedPaperIds.size} Papers`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs h-8">
          <Filter className="h-3.5 w-3.5" />
          {label}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="max-h-72 overflow-y-auto">
          {/* Select All */}
          <button
            onClick={toggleAll}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
            <span className="text-sm font-semibold text-foreground">Select All</span>
          </button>

          {/* Grouped by year */}
          {grouped.map(([year, yearPapers]) => {
            const yearIds = yearPapers.map(p => p.paperId);
            const allYearSelected = yearIds.every(id => selectedPaperIds.has(id));
            const someYearSelected = yearIds.some(id => selectedPaperIds.has(id));

            return (
              <div key={year}>
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-muted/40 transition-colors bg-muted/20"
                >
                  <Checkbox
                    checked={allYearSelected}
                    className={cn(!allYearSelected && someYearSelected && 'data-[state=unchecked]:bg-primary/30')}
                    onCheckedChange={() => toggleYear(year)}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{year}</span>
                </button>
                {yearPapers.map(p => (
                  <button
                    key={p.paperId}
                    onClick={() => togglePaper(p.paperId)}
                    className="w-full flex items-center gap-2.5 px-3 pl-7 py-1.5 hover:bg-muted/30 transition-colors"
                  >
                    <Checkbox
                      checked={selectedPaperIds.has(p.paperId)}
                      onCheckedChange={() => togglePaper(p.paperId)}
                    />
                    <span className="text-xs text-foreground">{p.label}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
