'use client';

/* eslint-disable react/require-default-props */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface DashCartProps {
  title: string;
  content: string;
  description: string;
  Icon?: React.FC | null;
}

export default function DashCart({ title, content, description, Icon = null }: DashCartProps) {
  const handleClick = () => {
    // alert('handle click');
  };

  return (
    <Card onClick={handleClick} className="cursor-pointer border border-spacing-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
