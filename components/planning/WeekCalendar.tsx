'use client';

import { useState } from 'react';

interface CalendarBlock {
  id: string;
  type: 'existing' | 'proposed';
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
  setting?: string;
  intention?: string;
}

interface WeekCalendarProps {
  blocks: CalendarBlock[];
  onBlocksChange: (blocks: CalendarBlock[]) => void;
}

const defaultSettings = {
  movement: { color: '#fb923c', label: 'movement' },
  nutrition: { color: '#4ade80', label: 'nutrition' },
  relationships: { color: '#f472b6', label: 'connection' },
  stress: { color: '#60a5fa', label: 'buffers' },
  transcendence: { color: '#fbbf24', label: 'growth' },
};

export default function WeekCalendar({ blocks, onBlocksChange }: WeekCalendarProps) {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [draggedBlock, setDraggedBlock] = useState<CalendarBlock | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8am to 6pm

  const timeToPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return ((hours - 8) * 60 + minutes) / 60;
  };

  const getBlockHeight = (startTime: string, endTime: string) => {
    const start = timeToPosition(startTime);
    const end = timeToPosition(endTime);
    return (end - start) * 58;
  };

  const getBlocksForDay = (day: string) => {
    return blocks.filter(block => block.day === day);
  };

  const handleDragStart = (e: React.DragEvent, block: CalendarBlock) => {
    setDraggedBlock(block);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', block.id);
    const element = e.currentTarget as HTMLElement;
    element.style.opacity = '0.4';

    // Create a drag image
    const dragImage = element.cloneNode(true) as HTMLElement;
    dragImage.style.opacity = '0.8';
    document.body.appendChild(dragImage);
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.style.opacity = '1';
    setDraggedBlock(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDay: string, targetHour: number) => {
    e.preventDefault();
    if (!draggedBlock) return;

    const updatedBlocks = blocks.map(block => {
      if (block.id === draggedBlock.id) {
        const duration = timeToPosition(block.endTime) - timeToPosition(block.startTime);
        const newStartTime = `${targetHour.toString().padStart(2, '0')}:00`;
        const endHour = targetHour + Math.round(duration);
        const newEndTime = `${endHour.toString().padStart(2, '0')}:00`;

        return {
          ...block,
          day: targetDay,
          startTime: newStartTime,
          endTime: newEndTime
        };
      }
      return block;
    });

    onBlocksChange(updatedBlocks);
  };

  const WeekView = () => (
    <div className="flex bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="w-20 border-r border-royal-100 bg-cloud-300">
        <div className="h-16 border-b border-royal-100"></div>
        {hours.map(hour => (
          <div key={hour} className="flex items-center justify-center text-xs text-royal-400 border-b border-cloud-300" style={{ height: '58px' }}>
            {hour === 12 ? '12pm' : hour > 12 ? `${hour-12}pm` : `${hour}am`}
          </div>
        ))}
      </div>

      <div className="flex flex-1">
        {days.map((day, dayIndex) => (
          <div key={day} className="flex-1 border-r border-royal-100 last:border-r-0 relative">
            <div className="h-16 flex flex-col items-center justify-center border-b border-royal-100 bg-gradient-to-b from-cloud-300 to-white">
              <div className="text-xs text-royal-400 uppercase tracking-wide font-medium">{day.substring(0, 3)}</div>
              <div className="text-lg text-royal-500 font-light mt-0.5">{26 + dayIndex}</div>
            </div>

            <div className="relative" style={{ height: `${11 * 58}px` }}>
              {hours.map(hour => (
                <div
                  key={hour}
                  className={`border-b border-cloud-300 transition-colors ${
                    draggedBlock ? 'hover:bg-orange-100 hover:border-orange-300' : ''
                  }`}
                  style={{ height: '58px' }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, hour)}
                ></div>
              ))}

              {getBlocksForDay(day).map(block => (
                <div
                  key={block.id}
                  className={`absolute left-1 right-1 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    block.type === 'existing' ? 'opacity-60 border border-royal-200' : 'border-2 border-dashed border-white/60'
                  } ${draggedBlock?.id === block.id ? 'pointer-events-none' : ''}`}
                  draggable={block.type === 'proposed'}
                  onDragStart={(e) => handleDragStart(e, block)}
                  onDragEnd={handleDragEnd}
                  style={{
                    top: `${timeToPosition(block.startTime) * 58}px`,
                    height: `${getBlockHeight(block.startTime, block.endTime)}px`,
                    backgroundColor: block.color,
                    zIndex: draggedBlock?.id === block.id ? 50 : 10
                  }}
                >
                  <div className="text-white h-full flex flex-col gap-1">
                    <div className="font-medium text-sm leading-tight">{block.title}</div>
                    <div className="text-xs opacity-90 font-light">{block.startTime} - {block.endTime}</div>
                    {block.type === 'proposed' && (
                      <div className="text-xs uppercase tracking-wide opacity-80 font-medium mt-auto">duende suggests</div>
                    )}
                    {block.setting && (
                      <div className="text-xs opacity-75 italic lowercase">{defaultSettings[block.setting as keyof typeof defaultSettings]?.label}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MonthView = () => {
    const monthDays = Array.from({ length: 28 }, (_, i) => ({
      date: 26 + i > 31 ? i - 5 : 26 + i,
      day: days[i % 5] || 'Saturday'
    }));

    const getBlocksForMonthDay = (dayName: string) => {
      if (days.includes(dayName)) {
        return blocks.filter(b => b.day === dayName);
      }
      return [];
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-7 gap-px bg-royal-100">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="bg-cloud-300 p-4 text-center text-xs uppercase tracking-wide text-royal-400 font-medium">
              {day}
            </div>
          ))}
          {monthDays.map(({date, day}, i) => {
            const dayBlocks = getBlocksForMonthDay(day);

            return (
              <div
                key={`${day}-${date}-${i}`}
                className="bg-white p-3 min-h-[140px] cursor-pointer hover:bg-cloud-300 transition-colors"
                onDragOver={handleDragOver}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!draggedBlock) return;
                  const updatedBlocks = blocks.map(block => {
                    if (block.id === draggedBlock.id) {
                      return { ...block, day: day };
                    }
                    return block;
                  });
                  onBlocksChange(updatedBlocks);
                }}
              >
                <div className="text-sm text-royal-400 font-light mb-2">{date}</div>
                <div className="flex flex-col gap-1.5">
                  {dayBlocks.map((block) => (
                    <div
                      key={block.id}
                      className="p-2 rounded cursor-move transition-all hover:translate-x-0.5 hover:shadow-md text-white text-xs"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, block)}
                      onDragEnd={handleDragEnd}
                      style={{
                        backgroundColor: block.color,
                        borderLeft: block.type === 'proposed' ? `3px solid ${block.color}` : 'none',
                        opacity: block.type === 'proposed' ? 0.9 : 0.6
                      }}
                      title={`${block.title} (${block.startTime}-${block.endTime})`}
                    >
                      <div className="text-[10px] opacity-90 mb-0.5">{block.startTime}</div>
                      <div className="font-medium leading-tight">{block.title}</div>
                      {block.setting && (
                        <div className="text-[10px] opacity-75 italic mt-0.5">{defaultSettings[block.setting as keyof typeof defaultSettings]?.label}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const proposedCount = blocks.filter(b => b.type === 'proposed').length;

  return (
    <div className="space-y-6">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-royal-500">week of january 26</h2>

        <div className="flex gap-1 bg-white/60 p-1 rounded-full backdrop-blur-sm">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              view === 'week'
                ? 'bg-white text-royal-500 shadow-sm'
                : 'text-royal-400 hover:text-royal-500'
            }`}
            onClick={() => setView('week')}
          >
            week
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              view === 'month'
                ? 'bg-white text-royal-500 shadow-sm'
                : 'text-royal-400 hover:text-royal-500'
            }`}
            onClick={() => setView('month')}
          >
            month
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-royal-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span>existing meetings</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <span>movement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span>nutrition</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-pink-400"></div>
          <span>connection</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <span>buffers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <span>growth</span>
        </div>
      </div>

      {/* Calendar */}
      {view === 'week' ? <WeekView /> : <MonthView />}

      {/* Status */}
      <div className="text-center">
        <p className="text-royal-600 text-sm">
          <span className="font-medium text-royal-500">{proposedCount} protections</span> ready to sync
          <span className="text-royal-400"> • drag blocks to adjust timing</span>
        </p>
      </div>
    </div>
  );
}
