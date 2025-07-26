import React from 'react';

type NudgeProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export default function Nudge({ className, children, ...props }: NudgeProps) {
  return (
    <div className={`text-sm bg-yellow-200 text-black ${className ?? ''}`} {...props}>
      <p className="text-center">{children}</p>
    </div>
  );
}
