import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { ProfileForm } from '../components/profile/profileForm';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile',
};

export default function SettingsProfilePage() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3 space-y-6 mx-1">
        <div>
          <h3 className="text-lg font-medium">User Profile</h3>
          <p className="text-sm text-muted-foreground">Manage Your Personal Information</p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </div>
  );
}
