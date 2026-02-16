import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Cell
} from 'recharts';
import { ChevronDown, ChevronUp, ArrowLeft, TrendingUp, Target, Zap, Brain, FileText, CheckCircle2 } from 'lucide-react';
import {
  mockTopicMastery, mockPastPaperResults,
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

function CircularProgress({ percentage, size = 80, strokeWidth = 6 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = getMasteryColor(percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={masteryColorMap[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

function TopicRow({ topic, index }: { topic: TopicMastery; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const color = getMasteryColor(topic.overallScore);
  const label = getMasteryLabel(topic.overallScore);

  const radarData = [
    { metric: 'Accuracy', value: topic.accuracy, fullMark: 100 },
    { metric: 'Readiness', value: topic.readiness, fullMark: 100 },
    { metric: 'Speed', value: topic.speed, fullMark: 100 },
  ];

  const barData = [
    { name: 'Accuracy', value: topic.accuracy, weight: '40%' },
    { name: 'Readiness', value: topic.readiness, weight: '30%' },
    { name: 'Speed', value: topic.speed, weight: '30%' },
  ];

  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex-1 flex items-center gap-4">
          <span className="text-sm font-semibold text-foreground min-w-[160px] text-left">{topic.topic}</span>
          <div className="flex-1 max-w-[300px]">
            <Progress
              value={topic.overallScore}
              className="h-3 [&>div]:transition-all [&>div]:duration-700"
              style={{
                ['--progress-color' as string]: masteryColorMap[color],
              }}
            />
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${masteryBgMap[color]}`}>
            {Math.round(topic.overallScore)}% — {label}
          </span>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="border-t border-border p-5 bg-secondary/20 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Skill Breakdown</h4>
              <ChartContainer config={{
                value: { label: 'Score', color: masteryColorMap[color] }
              }} className="w-full max-w-[250px] aspect-square">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke={masteryColorMap[color]}
                    fill={masteryColorMap[color]}
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ChartContainer>
            </div>

            {/* Bar breakdown */}
            <div className="flex flex-col">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Weighted Factors</h4>
              <ChartContainer config={{
                value: { label: 'Score', color: 'hsl(var(--primary))' }
              }} className="w-full h-[200px]">
                <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.value > 80 ? masteryColorMap.green : entry.value >= 50 ? masteryColorMap.yellow : masteryColorMap.red} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {barData.map((item) => (
                  <div key={item.name} className="rounded-lg bg-muted/50 p-2">
                    <p className="text-[10px] text-muted-foreground uppercase">{item.name}</p>
                    <p className="text-sm font-bold text-foreground">{item.value}%</p>
                    <p className="text-[10px] text-muted-foreground">Weight: {item.weight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudentAnalytics() {
  const navigate = useNavigate();
  const avgScore = mockTopicMastery.reduce((sum, t) => sum + t.overallScore, 0) / mockTopicMastery.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:px-6 max-w-5xl">
        {/* Back button */}
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            Student Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track your mastery across topics and past papers</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Target className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{Math.round(avgScore)}%</p>
              <p className="text-xs text-muted-foreground">Avg Mastery</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <FileText className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{mockPastPaperResults.length}</p>
              <p className="text-xs text-muted-foreground">Papers Attempted</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Zap className="h-5 w-5 text-warning mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {mockTopicMastery.filter(t => t.overallScore > 80).length}
              </p>
              <p className="text-xs text-muted-foreground">Topics Mastered</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Brain className="h-5 w-5 text-success mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {Math.round(mockTopicMastery.reduce((s, t) => s + t.readiness, 0) / mockTopicMastery.length)}%
              </p>
              <p className="text-xs text-muted-foreground">Avg Independence</p>
            </CardContent>
          </Card>
        </div>

        {/* Section 1: Topic Mastery Matrix */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Topic Mastery Matrix
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Overall = Accuracy (40%) + Independence (30%) + Speed (30%). Click a row to expand the breakdown.
          </p>
          <div className="space-y-3">
            {mockTopicMastery.map((topic, i) => (
              <TopicRow key={topic.topic} topic={topic} index={i} />
            ))}
          </div>
        </section>

        {/* Section 2: Past Paper Timeline */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Past Paper Timeline
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockPastPaperResults.map((paper, i) => (
              <Card
                key={paper.paperId}
                className="bg-card border-border overflow-hidden animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">{paper.paperTitle}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Completed: {new Date(paper.completedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                  <CircularProgress percentage={paper.completionPercentage} size={90} strokeWidth={7} />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Questions Solved</span>
                      <span className="font-medium text-foreground">{paper.solvedQuestions}/{paper.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Marks Obtained</span>
                      <span className="font-medium text-foreground">{paper.marksObtained}/{paper.totalMarks}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Score</span>
                      <span className={`font-bold ${
                        (paper.marksObtained / paper.totalMarks) * 100 > 70 ? 'text-success' :
                        (paper.marksObtained / paper.totalMarks) * 100 >= 50 ? 'text-warning' : 'text-destructive'
                      }`}>
                        {Math.round((paper.marksObtained / paper.totalMarks) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
