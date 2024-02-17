import ConfettiGenerator from 'confetti-js';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCapIcon, PowerIcon, SearchXIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { cn } from '@/utils';
import { Separator } from '@/components/ui/separator';

import bananaCatCryingImage from '../../assets/banana-cat-crying.gif';
import bananaCatBreathingImage from '../../assets/banana-cat-breathing.gif';
import { Badge } from '@/components/ui/badge';

type Classroom = {
  name: string;
};
type ClassroomItemProps = Classroom & {
  className?: string;
  selected?: boolean;
  onClick?: () => void;
};
export const ClassroomItem: React.FC<ClassroomItemProps> = ({
  className,
  name,
  selected,
  onClick,
}) => {
  return (
    <li
      className={cn(
        'flex items-center gap-2 border border-solid border-slate-200 rounded-lg',
        'px-3 py-1.5 shadow-sm',
        onClick &&
          'cursor-pointer hover:bg-slate-100 transition-colors duration-200 ease-in-out',
        className,
      )}
      onClick={onClick}
    >
      <GraduationCapIcon className="text-slate-700" size={18} />
      <span className="font-medium tracking-tight text-slate-700">{name}</span>
      {selected && <Badge>선택됨</Badge>}
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
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    // null,
    { name: '301동 403호' },
  );
  const [recentClassrooms] = useState<Classroom[]>(MOCKED_RECENT_CLASSROOMS);

  useEffect(() => {
    const confettiSettings = {
      target: 'confetti',
      max: 30,
      size: 3,
      animate: true,
      props: ['square'],
      colors: [
        [255, 201, 0],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126],
      ],
      clock: 40,
      rotate: false,
      width: 1400,
    };

    const confettiCanvas = document.getElementById('confetti');
    if (!confettiCanvas) {
      return;
    }

    confettiCanvas.style.opacity = '0.1';
    const confetti = new ConfettiGenerator(confettiSettings);

    let confettiIntervalID: NodeJS.Timeout;
    if (isCurrentBeaconOn) {
      confetti.render();

      let confettiOpacity = 0.1;
      confettiIntervalID = setInterval(function () {
        confettiCanvas.style.opacity = confettiOpacity.toString();

        if (confettiOpacity >= 0.8) {
          clearInterval(confettiIntervalID);
        }
        confettiOpacity += 0.07;
      }, 100);
    } else {
      confetti.clear();
    }

    return () => {
      if (confettiIntervalID) {
        clearInterval(confettiIntervalID);
      }
      confetti.clear();
    };
  }, [isCurrentBeaconOn]);

  return (
    <div className="flex flex-col gap-2 px-4 py-6 max-w-[500px] mx-auto">
      <Card className="relative z-0">
        <CardHeader>
          <CardTitle>현황</CardTitle>
        </CardHeader>

        <CardContent>
          <canvas
            id="confetti"
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full -z-10"
          />
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
