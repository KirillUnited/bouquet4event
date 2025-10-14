import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cookies} from "next/headers";
import {verifyJwt} from "@/lib/auth";
import {getNavItemIcon} from "@/lib/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const ProfileIcon = getNavItemIcon('Профиль');
const LogoutIcon = getNavItemIcon('Выйти');
const LoginIcon = getNavItemIcon('Войти');
const CreateUserIcon = getNavItemIcon('Создать аккаунт');

export default async function AuthButtons() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const user = token ? await verifyJwt(token) : null;

    return (
        user ? (
            <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-2 rounded-lg p-2 hover:cursor-pointer'>
                    <Avatar>
                        <AvatarImage src={`https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png`}
                                     alt={user.email}/>
                        <AvatarFallback className='text-xs'>{`UP`}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col text-start leading-none'>
                        <span className='max-w-[17ch] truncate text-sm leading-none font-semibold'>{'Имя'}</span>
                        <span className='text-muted-foreground max-w-[20ch] truncate text-xs'>{user.email}</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

                    <DropdownMenuSeparator/>

                    <DropdownMenuGroup>
                        <Link href="/account">
                            <DropdownMenuItem className='hover:bg-accent hover:cursor-pointer'>
                                <ProfileIcon className="w-5 h-5 text-muted-foreground"/>
                                <span>Профиль</span>
                            </DropdownMenuItem>
                        </Link>

                        <Link href="/">
                            <DropdownMenuItem className='hover:bg-accent hover:cursor-pointer'>
                                <LogoutIcon className="w-5 h-5 text-muted-foreground"/>
                                <span>Выйти</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (

            <>
                <Button asChild variant="link">
                    <div className="flex items-center gap-2">
                        <LoginIcon className="w-5 h-5 text-muted-foreground"/>
                        <Link href="/login">Войти</Link>
                    </div>
                </Button>
                <Button asChild>
                    <div className="flex items-center gap-2">
                        <CreateUserIcon className="w-5 h-5 text-muted-foreground"/>
                        <Link href={`/signup`}>Создать аккаунт</Link>
                    </div>
                </Button>
            </>
        )
    )
}