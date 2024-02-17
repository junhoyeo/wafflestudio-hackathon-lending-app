import { PowerIcon, SearchXIcon, XIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

import { Classroom, ClassroomItem } from '@/components/ClassroomItem';
import { ConfettiBackground } from '@/components/Confetti';
import { SearchClassroomDrawer } from '@/components/SearchClassroomDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import useLocalStorage from '@/hooks/useLocalStorage';

import bananaCatBreathingImage from '../../assets/banana-cat-breathing.gif';
import bananaCatCryingImage from '../../assets/banana-cat-crying.gif';
import './App.css';

const MOCKED_RECENT_CLASSROOMS: Classroom[] = [
  { id: 1, name: '301동 403호' },
  { id: 2, name: '301동 404호' },
  { id: 3, name: '301동 501호' },
];

const Main: React.FC = () => {
  const [isCurrentBeaconOn, setCurrentBeaconOn] = useState<boolean>(false);
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    // { name: '301동 403호' },
    null,
  );
  const [recentClassrooms, setRecentClassrooms] = useLocalStorage<Classroom[]>(
    '@recentClassrooms',
    [],
  );

  const [isSearchClassroomDrawerOpen, setSearchClassroomDrawerOpen] =
    useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(
      'toggle-beacon',
      isCurrentBeaconOn,
      currentClassroom,
    );
  }, [isCurrentBeaconOn, currentClassroom]);

  useEffect(() => {
    if (!currentClassroom) {
      setCurrentBeaconOn(false);
    }
  }, [currentClassroom]);

  const changeCurrentClassroom = useCallback(
    (classroom: Classroom) => {
      if (!recentClassrooms.some((v) => v.name === classroom.name)) {
        setRecentClassrooms(recentClassrooms.concat(classroom));
      }
      setCurrentClassroom(classroom);
    },
    [recentClassrooms, setRecentClassrooms, setCurrentClassroom],
  );

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
                    <span className="flex items-center gap-1">
                      <ClassroomItem {...currentClassroom} />
                      <Button
                        variant="ghost"
                        className="p-0 w-[32px] h-[32px]"
                        onClick={() => setCurrentClassroom(null)}
                      >
                        <XIcon size={16} />
                      </Button>
                    </span>
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
                      (현재 비컨이{' '}
                      <span className="font-bold text-pink-500">켜져</span>{' '}
                      있어요.)
                    </span>
                  ) : (
                    <span>
                      (현재 비컨이{' '}
                      <span className="font-bold text-pink-500">꺼져</span>{' '}
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
                  className="data-[state=checked]:bg-pink-500"
                  onCheckedChange={() => {
                    setCurrentBeaconOn((prev) => !prev);
                  }}
                />
                <Label htmlFor="beacon-toggle"></Label>
              </div>
            </div>
          )}
          {!currentClassroom && (
            <div className="flex flex-col items-center justify-center w-full gap-3 py-6 rounded-lg bg-slate-100">
              <SearchXIcon size={32} className="text-slate-700" />
              <h3 className="font-medium text-slate-700">
                먼저 강의실을 <span className="text-pink-500">선택</span>
                해주세요!
              </h3>
              <Button onClick={() => setSearchClassroomDrawerOpen(true)}>
                강의실 찾기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>최근 강의실 목록</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {recentClassrooms.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full gap-3 pt-2 pb-6 rounded-lg bg-slate-100">
              <img
                className="w-[100px] h-[100px] rounded-md"
                alt="icon"
                src={bananaCatCryingImage}
              />

              <h3 className="font-medium text-slate-700">아무것도 없네영;</h3>
            </div>
          )}
          {recentClassrooms.length > 0 && (
            <ul className="flex flex-col gap-1">
              {recentClassrooms.map((item, idx) => (
                <ClassroomItem
                  key={idx}
                  {...item}
                  selected={item.name === currentClassroom?.name}
                  onClick={() => setCurrentClassroom(item)}
                />
              ))}
            </ul>
          )}
          {!!currentClassroom && (
            <Button
              className="w-full"
              onClick={() => setSearchClassroomDrawerOpen(true)}
            >
              강의실 검색하기
            </Button>
          )}
          {recentClassrooms.length > 0 && (
            <Button
              className="w-fit"
              variant="outline"
              size="sm"
              onClick={() => setRecentClassrooms([])}
            >
              초기화
            </Button>
          )}
        </CardContent>
      </Card>

      <SearchClassroomDrawer
        open={isSearchClassroomDrawerOpen}
        setOpen={setSearchClassroomDrawerOpen}
        currentClassroom={currentClassroom}
        classrooms={MOCKED_RECENT_CLASSROOMS}
        onSelectClassroom={(v) => {
          changeCurrentClassroom(v);
          setSearchClassroomDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
