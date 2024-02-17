import { PowerIcon, SearchXIcon, XIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

import { Classroom, ClassroomItem } from '@/components/ClassroomItem';
import { ConfettiBackground } from '@/components/Confetti';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import bananaCatBreathingImage from '../../assets/banana-cat-breathing.gif';
import bananaCatCryingImage from '../../assets/banana-cat-crying.gif';
import './App.css';

type SearchClassroomDrawerProps = {
  currentClassroom?: Classroom | null;
  classrooms: Classroom[];
  onSelectClassroom: (value: Classroom) => void;
  trigger?: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
};
const SearchClassroomDrawer: React.FC<SearchClassroomDrawerProps> = ({
  currentClassroom,
  classrooms,
  onSelectClassroom,
  trigger,
  open,
  setOpen,
}) => {
  const [query, setQuery] = useState<string>('');

  const filteredClassrooms = useMemo(
    () => classrooms.filter((item) => item.name.includes(query)),
    [classrooms, query],
  );

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <DrawerContent className="w-full max-w-[500px] mx-auto">
        <DrawerHeader>
          <DrawerTitle>강의실 검색</DrawerTitle>
          <DrawerDescription>이런 강의실이 있었넹~!</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 p-4 pb-0">
          <Input
            autoFocus
            className="text-lg bg-slate-100"
            placeholder="검색하세여"
            value={query}
            onChange={(e) => setQuery(e.target.value.trim())}
          />

          <ul className="flex flex-col gap-1">
            {filteredClassrooms.map((item, idx) => (
              <ClassroomItem
                key={idx}
                {...item}
                selected={item.name === currentClassroom?.name}
                onClick={() => {
                  onSelectClassroom(item);
                }}
              />
            ))}

            {filteredClassrooms.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full gap-3 py-6 rounded-lg bg-slate-100">
                <img
                  className="w-[156px] h-[156px] rounded-md"
                  alt="icon"
                  src={bananaCatCryingImage}
                />

                <h3 className="font-medium text-slate-700">
                  그런 강의실은 없는데요;
                </h3>
              </div>
            )}
          </ul>
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const MOCKED_RECENT_CLASSROOMS: Classroom[] = [
  { name: '301동 403호' },
  { name: '301동 404호' },
  { name: '301동 501호' },
];

const Main: React.FC = () => {
  const [isCurrentBeaconOn, setCurrentBeaconOn] = useState<boolean>(false);
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    // { name: '301동 403호' },
    null,
  );
  const [recentClassrooms] = useState<Classroom[]>(MOCKED_RECENT_CLASSROOMS);

  const [isSearchClassroomDrawerOpen, setSearchClassroomDrawerOpen] =
    useState<boolean>(false);

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
                  onCheckedChange={() => setCurrentBeaconOn((p) => !p)}
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
          {!!currentClassroom && (
            <Button
              className="w-full"
              onClick={() => setSearchClassroomDrawerOpen(true)}
            >
              강의실 검색하기
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
          setCurrentClassroom(v);
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
