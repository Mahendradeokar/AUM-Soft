import { toast } from '@/components/ui/use-toast';
import { deleteToken } from '@/lib/utils';
import { StatusCodes } from 'http-status-codes';
import { responseMessage } from './message';

export default function errorHandler(error: any, options = { showNotification: false }) {
  const { status_message: statusMessage, status_code: stc } = error;
  const statusCode: keyof typeof responseMessage = stc;
  const message: string = statusMessage ?? responseMessage[statusCode]?.message ?? error.message;

  const rc = {
    statusMessage,
    statusCode,
    isSuccess: false,
    data: error.data,
  };

  if (statusCode === StatusCodes.UNAUTHORIZED || message.toLowerCase().includes('token expired')) {
    deleteToken();
    window.location.replace('/login');
    return rc;
  }

  if (options.showNotification) {
    toast({
      description: message ?? responseMessage?.default?.message,
      title: responseMessage[statusCode]?.title,
      variant: 'destructive',
    });
  }

  return rc;
}
