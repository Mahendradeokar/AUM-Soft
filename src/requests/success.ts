import { toast } from '@/components/ui/use-toast';
import { responseMessage } from './message';

export default function successHandler(res: any, options = { showNotification: false }) {
  const { status_message: statusMessage, status_code: stc } = res;
  const statusCode: keyof typeof responseMessage = stc;
  const message = statusMessage ?? responseMessage[statusCode].message;
  const { title } = responseMessage[statusCode];
  if (options.showNotification) {
    toast({
      title,
      description: message,
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
