import { toast } from '@/components/ui/use-toast';
import { responseMessage } from './message';

export default function successHandler(res: any, options = { showNotification: false }) {
  const { status_message: statusMessage, status_code: statusCode } = res;
  const message = statusMessage ?? responseMessage[statusCode];

  if (options.showNotification) {
    toast({
      description: message,
      title: 'Success Handler',
      variant: 'success',
    });
  }

  return {
    statusMessage,
    statusCode,
    isSuccess: true,
    data: res.data,
  };
}
