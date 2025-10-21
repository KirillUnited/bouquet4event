import { fetchAccountData } from "@/lib/api/account";
import AccountDashboard from "@/components/dashboard/AccountDashboard";
import AuthButtons from "@/components/dashboard/ui/AuthButtons";
import { AlertCircleIcon } from "lucide-react";

export default async function AccountPage() {
  // Fetch account data using our new utility function
  const { account, error } = await fetchAccountData();

  if (error) {
    console.error("Error in AccountPage:", error);
    // You might want to show an error message to the user here
    // return <p className="text-red-500">Ошибка загрузки данных аккаунта.</p>;
  }

  return (
    <>
      {!account ? (
        <div className="flex flex-col gap-2 items-center text-center">
          <AlertCircleIcon size={64} className="text-yellow-500" />
          <h1 className="text-3xl font-semibold">Мой аккаунт</h1>
          <p className="text-muted-foreground">Вы не авторизованы</p>
          <AuthButtons className="gap-2 mt-4 pt-4 xl:pt-4 border-t" />
        </div>
      ) : (
        <AccountDashboard userData={account} />
      )}
    </>
  );
}
