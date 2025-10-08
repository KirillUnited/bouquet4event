import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import AccountOverview from "@/components/dashboard/AccountOverview";
import BouquetPreferences from "@/components/dashboard/BouquetPreferences";
import ReferralLink from "@/components/dashboard/ReferralLink";
import AccountSettings from "@/components/dashboard/AccountSettings";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyJwt(token) : null;

  console.log(user)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">My Account</h1>
      {!user && (
        <p className="text-muted-foreground">You are not logged in.</p>
      )}
      {user && (
        <div className="grid grid-cols-1 gap-6">
          <AccountOverview email={user.email} accountSum={0} />
          <BouquetPreferences />
          <ReferralLink referralLink="" />
          <AccountSettings email={user.email} />
        </div>
      )}
    </div>
  );
}


