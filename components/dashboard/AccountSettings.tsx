"use client";

import {useState} from "react";

type Props = {
    email: string;
    onChangePassword?: (data: { currentPassword: string; newPassword: string }) => void;
};

export default function AccountSettings({email, onChangePassword}: Props) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    return (
        <div className="rounded-lg border p-4">
            <h2 className="text-xl font-medium">Настройки</h2>
            <div className="mt-2 text-sm text-muted-foreground">Вы вошли как {email}</div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm text-muted-foreground">Текущий пароль</label>
                    <input
                        className="mt-1 w-full rounded border px-3 py-2"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Новый пароль</label>
                    <input
                        className="mt-1 w-full rounded border px-3 py-2"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-4">
                <button
                    className="rounded bg-black px-4 py-2 text-white"
                    onClick={() => onChangePassword?.({currentPassword, newPassword})}
                >
                    Изменить пароль
                </button>
            </div>
        </div>
    );
}


