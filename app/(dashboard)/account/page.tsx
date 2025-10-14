import { fetchAccountData } from "@/lib/api/account";
import AccountOverview from "@/components/dashboard/AccountOverview";
import BouquetPreferences from "@/components/dashboard/BouquetPreferences";
import ReferralLink from "@/components/dashboard/ReferralLink";
import AccountSettings from "@/components/dashboard/AccountSettings";

export default async function AccountPage() {
    // Fetch account data using our new utility function
    const { account, error } = await fetchAccountData();
    
    if (error) {
        console.error('Error in AccountPage:', error);
        // You might want to show an error message to the user here
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Мой аккаунт</h1>
            {!account ? (
                <p className="text-muted-foreground">Вы не авторизованы</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <AccountOverview
                        email={account.email}
                        accountSum={account?.totalAmount}
                        name={account?.name}
                        phone={account?.phone}
                        region={account?.region}
                    />
                    <BouquetPreferences
                        bouquetCategory={account?.bouquetCategory}
                        deliveryInterval={account?.deliveryInterval}
                    />
                    <ReferralLink referralLink={account?.referralLink} />
                    <AccountSettings
                        email={account.email}
                    />
                </div>
            )}
        </div>
    );
}


