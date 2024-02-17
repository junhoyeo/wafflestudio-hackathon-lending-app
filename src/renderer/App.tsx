import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BedIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function Hello() {
  const [isCurrentBeaconOn, setCurrentBeaconOn] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 px-4">
      <Card>
        <CardHeader>
          <CardTitle>현황</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>최근 강의실 목록</CardTitle>
        </CardHeader>
      </Card>

      {/* TODO: ManageBeaconCard */}
      <Card>
        <CardHeader>
          <CardTitle>비컨</CardTitle>
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
