"use client"

import { SettingCard, SettingCardProps } from "@/components/setting-card";
import settings from "@/lib/data/settings.json";
import { use } from "react";

export default function SettingPage({ params }: { params: Promise<{ id: string }> }) {

    async function save() {

    }

    const { id } = use(params);

    return (
        <div className={ "px-4 flex flex-col items-center space-y-10" }>
            {
                // @ts-ignore
                settings[id].map((setting: SettingCardProps) => {
                    return (
                        <SettingCard key={ setting.id } id={ setting.id } title={ setting.title }
                                     value={ setting.value } description={ setting.description }
                                     notes={ setting.notes } onSave={ save }/>
                    )
                })
            }
        </div>
    )
}
