import { CheckCircledIcon, CrossCircledIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export const TOKEN = 'ST'; // session token

export const MARKETPLACE_TYPE = {
  flipkart: 'Flipkart',
  amazon: 'Amazon',
  meesho: 'Meesho',
};

export const FLIPKART_STATUS = {
  courier_return: {
    value: 'COURIER_RETURN',
    label: 'Courier Returned',
    icon: QuestionMarkCircledIcon,
  },
  completed: {
    value: 'COMPLETED',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  customer_return: {
    value: 'CUSTOMER_RETURN',
    label: 'Returned',
    icon: CrossCircledIcon,
  },
  replacement: {
    value: 'Replacement',
    label: 'Replacement',
    icon: CrossCircledIcon,
  },
};

export const MONTH_LIST = [
  { name: 'January', number: 1 },
  { name: 'February', number: 2 },
  { name: 'March', number: 3 },
  { name: 'April', number: 4 },
  { name: 'May', number: 5 },
  { name: 'June', number: 6 },
  { name: 'July', number: 7 },
  { name: 'August', number: 8 },
  { name: 'September', number: 9 },
  { name: 'October', number: 10 },
  { name: 'November', number: 11 },
  { name: 'December', number: 12 },
];
