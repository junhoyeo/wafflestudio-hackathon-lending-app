import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BedIcon, GraduationCapIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { cn } from '@/utils';

type Classroom = {
  name: string;
};
type ClassroomItemProps = Classroom;
export const ClassroomItem: React.FC<ClassroomItemProps> = ({ name }) => {
  return (
    <li
      className={cn(
        'flex items-center gap-2 border border-solid border-slate-200 rounded-lg',
        'px-3 py-1.5 shadow-sm',
      )}
    >
      <GraduationCapIcon className="text-slate-700" size={18} />
      <span className="text-slate-700 font-medium tracking-tight">{name}</span>
    </li>
  );
};

const MOCKED_RECENT_CLASSROOMS: Classroom[] = [
  { name: '301동 403호' },
  { name: '301동 404호' },
  { name: '301동 501호' },
];

function Hello() {
  const [isCurrentBeaconOn, setCurrentBeaconOn] = useState<boolean>(false);
  const [recentClassrooms] = useState<Classroom[]>(MOCKED_RECENT_CLASSROOMS);

  return (
    <div className="flex flex-col gap-2 px-4">
      <Card>
        <CardHeader>
          <CardTitle>현황</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center space-x-2">
              <Label>전원</Label>
              <Switch
                id="beacon-toggle"
                onCheckedChange={() => setCurrentBeaconOn((p) => !p)}
              />
              <Label htmlFor="beacon-toggle">
                {isCurrentBeaconOn
                  ? '(현재 비컨이 켜져 있어요.)'
                  : '(현재 비컨이 꺼져 있어요.)'}
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>최근 강의실 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-1">
            {recentClassrooms.map((classroom, idx) => (
              <ClassroomItem key={idx} {...classroom} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
