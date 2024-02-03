import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const labels = [
  {
    value: 'bug',
    label: 'Cancelled',
  },
  {
    value: 'feature',
    label: 'Returned',
  },
  {
    value: 'documentation',
    label: 'Completed',
  },
];

export const statuses = [
  {
    value: 'COURIER_RETURN',
    label: 'Courier Returned',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'DELIVERED',
    label: 'Delivered',
    icon: CircleIcon,
  },
  {
    value: 'ON_GOING',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  {
    value: 'CANCELED',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
  {
    value: 'CUSTOMER_RETURN',
    label: 'Returned',
    icon: CrossCircledIcon,
  },
  {
    value: 'RETURNED',
    label: 'Returned',
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
