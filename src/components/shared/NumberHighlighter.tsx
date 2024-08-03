import { isNegative } from '@/lib/utils';

export function NumberHighlighter({ number, content }: { number: number; content: number }) {
  if (isNegative(number)) {
    return <span className="text-2xl font-bold text-red-500">{content}</span>;
  }
  return <span className="text-2xl font-bold text-green-500">{content}</span>;
}
