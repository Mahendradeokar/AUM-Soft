'use client';

/* eslint-disable react/require-default-props */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isNegative } from '@/lib/utils';
import React from 'react';

interface DashCartProps {
  title: string;
  content: number;
  originalValue: number;
  description?: string;
  Icon?: React.FC | null;
}

function NumberHighlighter({ number, content }: { number: number; content: number }) {
  if (isNegative(number)) {
    return <div className="text-2xl font-bold text-red-500">{content}</div>;
  }
  return <div className="text-2xl font-bold text-green-500">{content}</div>;
}

export default function DashCart({ title, content, originalValue, description, Icon = null }: DashCartProps) {
  const handleClick = () => {
    // alert('handle click');
  };

  return (
    <Card onClick={handleClick} className="cursor-pointer border border-spacing-3 drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon />}
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="text-2xl font-bold">
          <NumberHighlighter number={originalValue} content={content} />
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
