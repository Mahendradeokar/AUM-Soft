import { setTimesTamp } from '@/common/common-function';
import Session from '@/model/session.model';

export const expiredValidSession = async (params: any) => {
  const { userId } = params;
  return Session.findOneAndUpdate(
    {
      user_id: userId,
      is_expired: false,
    },
    {
      is_expired: true,
      deleted_at: setTimesTamp(),
    },
  );
};
