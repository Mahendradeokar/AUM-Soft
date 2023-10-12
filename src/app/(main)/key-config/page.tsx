import { APIKeyForm } from '../components/APIkey';

export default function KeyConfig() {
  return (
    <div className="container flex flex-col justify-center h-screen space-y-6 sm:w-[450px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">API Credentials</h1>
        <p className="text-sm text-muted-foreground">
          Select your marketplace and enter the corresponding API key and API secret to proceed.
        </p>
      </div>
      <APIKeyForm />
    </div>
  );
}

// @TODO :- solved scroll issue
