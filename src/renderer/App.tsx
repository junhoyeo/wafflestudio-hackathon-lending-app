import { PowerIcon, SearchXIcon } from 'lucide-react';
import { useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

import { Classroom, ClassroomItem } from '@/components/ClassroomItem';
import { ConfettiBackground } from '@/components/Confetti';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import bananaCatBreathingImage from '../../assets/banana-cat-breathing.gif';
import bananaCatCryingImage from '../../assets/banana-cat-crying.gif';
import './App.css';

const MOCKED_RECENT_CLASSROOMS: Classroom[] = [
  { name: '301동 403호' },
  { name: '301동 404호' },
  { name: '301동 501호' },
];

function Hello() {
  const [isCurrentBeaconOn, setCurrentBeaconOn] = useState<boolean>(false);
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    // null,
    { name: '301동 403호' },
  );
  const [recentClassrooms] = useState<Classroom[]>(MOCKED_RECENT_CLASSROOMS);

  return (
    <div className="flex flex-col gap-2 px-4 py-6 max-w-[500px] mx-auto">
      <Card className="relative z-0">
        <CardHeader>
          <CardTitle>현황</CardTitle>
        </CardHeader>

        <CardContent>
          <ConfettiBackground enabled={isCurrentBeaconOn} />
          {currentClassroom && (
            <div className="flex flex-col gap-3">
              <>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <Badge className="w-fit">현재 강의실</Badge>
                    <ClassroomItem {...currentClassroom} />
                  </div>

                  {isCurrentBeaconOn ? (
                    <img
                      className="w-[156px] h-[156px] rounded-md"
                      alt="icon"
                      src={bananaCatBreathingImage}
                    />
                  ) : (
                    <img
                      className="w-[156px] h-[156px] rounded-md"
                      alt="icon"
                      src={bananaCatCryingImage}
                    />
                  )}

                  {isCurrentBeaconOn ? (
                    <span>
                      (현재 비컨이 <span className="font-bold">켜져</span>{' '}
                      있어요.)
                    </span>
                  ) : (
                    <span>
                      (현재 비컨이 <span className="font-bold">꺼져</span>{' '}
                      있어요.)
                    </span>
                  )}
                </div>
                <Separator />
              </>

              <div className="flex items-center justify-center space-x-2">
                <Label>
                  <span className="flex items-center gap-2">
                    <PowerIcon size={18} />
                    <span>전원</span>
                  </span>
                </Label>
                <Switch
                  id="beacon-toggle"
                  onCheckedChange={() => setCurrentBeaconOn((p) => !p)}
                />
                <Label htmlFor="beacon-toggle"></Label>
              </div>
            </div>
          )}
          {!currentClassroom && (
            <div>
              <SearchXIcon />
              <h3>강의실을 선택해주세요!</h3>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>최근 강의실 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-1">
            {recentClassrooms.map((item, idx) => (
              <ClassroomItem
                key={idx}
                {...item}
                selected={item.name === currentClassroom?.name}
                onClick={() => {
                  setCurrentClassroom(item);
                }}
              />
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
