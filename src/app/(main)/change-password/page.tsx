import { Separator } from '@/components/ui/separator';
import ChangePassword from '../components/changePassword/changePasswordForm';

export default function SettingsProfilePage() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3 space-y-6 mx-1">
        <div>
          <h3 className="text-lg font-medium"> Password Update</h3>
          <p className="text-sm text-muted-foreground">Update Your Password Here</p>
        </div>
        <Separator />
        <ChangePassword />
      </div>
    </div>
  );
}
