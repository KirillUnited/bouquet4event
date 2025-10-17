import { fetchAccountData } from "@/lib/api/account";
import AccountDashboard from "@/components/dashboard/AccountDashboard";

export default async function AccountPage() {
  // Fetch account data using our new utility function
  const { account, error } = await fetchAccountData();

  if (error) {
    console.error("Error in AccountPage:", error);
    // You might want to show an error message to the user here
    return <p className="text-red-500">Ошибка загрузки данных аккаунта.</p>;
  }

  return (
    <>
      {!account ? (
        <>
          <h1 className="text-3xl font-semibold">Мой аккаунт</h1>
          <p className="text-muted-foreground">Вы не авторизованы</p>
        </>
      ) : (
        <AccountDashboard userData={account} />
      )}
    </>
  );
}
