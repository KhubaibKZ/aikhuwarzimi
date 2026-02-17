import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  ChevronDown, ChevronUp, ArrowLeft, TrendingUp, TrendingDown,
  Minus, Target, Zap, Brain, FileText, Sparkles, BarChart3
} from 'lucide-react';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import {
  getMasteryColor, getMasteryLabel,
  type TopicMastery
} from '@/lib/analyticsData';

const masteryColorMap = {
  green: 'hsl(142, 76%, 36%)',
  yellow: 'hsl(38, 92%, 50%)',
  red: 'hsl(0, 62%, 50%)',
};

const masteryBgMap = {
  green: 'bg-success/20 text-success',
  yellow: 'bg-warning/20 text-warning',
  red: 'bg-destructive/20 text-destructive',
};

// ─── Circular Gauge ───
function MasteryGauge({ percentage, size = 160, strokeWidth = 10 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = getMasteryColor(percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={masteryColorMap[color]} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{percentage}%</span>
        <span className="text-xs text-muted-foreground mt-0.5">{getMasteryLabel(percentage)}</span>
      </div>
    </div>
  );
}

function SmallCircle({ percentage, size = 70, strokeWidth = 5 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = getMasteryColor(percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={masteryColorMap[color]} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

// ─── Trend Icon ───
function TrendIndicator({ trend, delta }: { trend: TopicMastery['trend']; delta: number }) {
  if (trend === 'new') return <span className="text-[10px] text-muted-foreground italic">NEW</span>;
  if (trend === 'stable') return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  if (trend === 'up') return (
    <span className="flex items-center gap-0.5 text-success text-xs font-semibold">
      <TrendingUp className="h-3.5 w-3.5" />+{delta}
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-destructive text-xs font-semibold">
      <TrendingDown className="h-3.5 w-3.5" />{delta}
    </span>
  );
}

// ─── Topic Row with paper-wise expansion ───
function TopicRow({ topic, index }: { topic: TopicMastery; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const color = getMasteryColor(topic.overallScore);

  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3.5 hover:bg-secondary/30 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground min-w-[140px] text-left truncate">{topic.topic}</span>
        <div className="flex-1 max-w-[220px]">
          <Progress
            value={topic.overallScore}
            className="h-2.5 [&>div]:transition-all [&>div]:duration-700"
            style={{ ['--progress-color' as string]: masteryColorMap[color] }}
          />
        </div>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${masteryBgMap[color]}`}>
          {topic.overallScore}%
        </span>
        <TrendIndicator trend={topic.trend} delta={topic.trendDelta} />
        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-border bg-secondary/10 animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border/50">
                  <th className="text-left py-2 px-4 font-medium">Paper</th>
                  <th className="text-center py-2 px-2 font-medium">Accuracy</th>
                  <th className="text-center py-2 px-2 font-medium">Independence</th>
                  <th className="text-center py-2 px-2 font-medium">Speed</th>
                  <th className="text-center py-2 px-2 font-medium">Overall</th>
                  <th className="text-center py-2 px-2 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {topic.paperScores.map((ps, i) => {
                  const prev = i > 0 ? topic.paperScores[i - 1].overall : null;
                  const diff = prev !== null ? ps.overall - prev : null;
                  const psColor = getMasteryColor(ps.overall);
                  return (
                    <tr key={ps.paperId} className="border-b border-border/30 last:border-0">
                      <td className="py-2.5 px-4 font-medium text-foreground">{ps.paperLabel}</td>
                      <td className="py-2.5 px-2 text-center">{ps.accuracy}%</td>
                      <td className="py-2.5 px-2 text-center">{ps.readiness}%</td>
                      <td className="py-2.5 px-2 text-center">{ps.speed}%</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`font-bold px-1.5 py-0.5 rounded ${masteryBgMap[psColor]}`}>{ps.overall}%</span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        {diff === null ? (
                          <span className="text-muted-foreground">—</span>
                        ) : diff > 0 ? (
                          <span className="text-success font-semibold">↑ +{diff}</span>
                        ) : diff < 0 ? (
                          <span className="text-destructive font-semibold">↓ {diff}</span>
                        ) : (
                          <span className="text-muted-foreground">→ 0</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 grid grid-cols-3 gap-3 border-t border-border/30">
            {[
              { label: 'Accuracy', value: topic.latestAccuracy, weight: '40%' },
              { label: 'Independence', value: topic.latestReadiness, weight: '30%' },
              { label: 'Speed', value: topic.latestSpeed, weight: '30%' },
            ].map(item => (
              <div key={item.label} className="rounded-lg bg-muted/50 p-2.5 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
                <p className="text-lg font-bold text-foreground">{item.value}%</p>
                <p className="text-[10px] text-muted-foreground">Weight: {item.weight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───
export default function StudentAnalytics() {
  const navigate = useNavigate();
  const { data, isLoading } = useStudentProgress();

  const topicMastery = data?.topicMastery || [];
  const paperResults = data?.paperResults || [];

  const avgScore = topicMastery.length > 0 ? Math.round(topicMastery.reduce((s, t) => s + t.overallScore, 0) / topicMastery.length) : 0;
  const avgAccuracy = topicMastery.length > 0 ? Math.round(topicMastery.reduce((s, t) => s + t.latestAccuracy, 0) / topicMastery.length) : 0;
  const avgIndependence = topicMastery.length > 0 ? Math.round(topicMastery.reduce((s, t) => s + t.latestReadiness, 0) / topicMastery.length) : 0;
  const avgSpeed = topicMastery.length > 0 ? Math.round(topicMastery.reduce((s, t) => s + t.latestSpeed, 0) / topicMastery.length) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-6 md:px-6 max-w-5xl">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>

        {/* ── Hero: Overall Mastery ── */}
        <Card className="bg-card border-border mb-6 overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2 mb-1">
              <BarChart3 className="h-5 w-5 text-primary" />
              Student Analytics
            </h1>
            <p className="text-xs text-muted-foreground mb-5">
              {topicMastery.length === 0 && !isLoading
                ? 'Complete some past paper questions to see your analytics here.'
                : 'Performance across all past papers attempted'}
            </p>
            <MasteryGauge percentage={avgScore} />
            <p className="text-xs text-muted-foreground mt-3">Overall Mastery</p>
          </CardContent>
        </Card>

        {/* ── Key Metrics Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <FileText className="h-5 w-5 text-primary mb-1.5" />
              <p className="text-2xl font-bold text-foreground">{paperResults.length}</p>
              <p className="text-[11px] text-muted-foreground">Papers Attempted</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Brain className="h-5 w-5 text-success mb-1.5" />
              <p className="text-2xl font-bold text-foreground">{avgIndependence}%</p>
              <p className="text-[11px] text-muted-foreground">AI Independence</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Target className="h-5 w-5 text-warning mb-1.5" />
              <p className="text-2xl font-bold text-foreground">{avgAccuracy}%</p>
              <p className="text-[11px] text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Zap className="h-5 w-5 text-primary mb-1.5" />
              <p className="text-2xl font-bold text-foreground">{avgSpeed}%</p>
              <p className="text-[11px] text-muted-foreground">Speed</p>
            </CardContent>
          </Card>
        </div>

        {/* ── Topic Mastery Matrix ── */}
        <section className="mb-10">
          <h2 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Topic Mastery Matrix
          </h2>
          <p className="text-[11px] text-muted-foreground mb-4">
            Overall = Accuracy (40%) + Independence (30%) + Speed (30%). Tap a topic for paper-wise breakdown & improvement trends.
          </p>
          {topicMastery.length === 0 && !isLoading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No data yet. Submit answers on past papers to see your topic mastery.</p>
          ) : (
            <div className="space-y-2.5">
              {topicMastery.map((topic, i) => (
                <TopicRow key={topic.topicId} topic={topic} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* ── Past Paper Timeline ── */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Past Paper Timeline
          </h2>
          {paperResults.length === 0 && !isLoading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No papers attempted yet. Start solving past papers to track your progress.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {paperResults.map((paper, i) => {
                const scorePercent = paper.totalMarks > 0 ? Math.round((paper.marksObtained / paper.totalMarks) * 100) : 0;
                return (
                  <Card
                    key={paper.paperId}
                    className="bg-card border-border overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <CardContent className="p-5 flex items-center gap-5">
                      <SmallCircle percentage={paper.completionPercentage} />
                      <div className="flex-1 space-y-1.5">
                        <p className="text-sm font-semibold text-foreground">{paper.paperTitle}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {paper.completedDate ? new Date(paper.completedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                        </p>
                        <div className="flex gap-4 text-xs">
                          <span className="text-muted-foreground">Solved: <span className="text-foreground font-medium">{paper.solvedQuestions}/{paper.totalQuestions}</span></span>
                          <span className="text-muted-foreground">Score: <span className={`font-bold ${
                            scorePercent > 70 ? 'text-success' : scorePercent >= 50 ? 'text-warning' : 'text-destructive'
                          }`}>{scorePercent}%</span></span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
