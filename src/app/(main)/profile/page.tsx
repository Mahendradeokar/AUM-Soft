import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '../components/profile/profileForm';

export default function SettingsProfilePage() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3 space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">Your Profile Section</p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </div>
  );
}
