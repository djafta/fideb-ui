"use client"

import { SettingCard, SettingCardProps } from "@/components/setting-card";
import data from "@/lib/data/settings.json";

export default function AllSettings(){

    async function save(){

    }

    return (
        <div className={"px-4 flex flex-col items-center space-y-10"}>
            {
                Object.keys(data).map((key) => {
                    const settings = (data as unknown as {[key:string]: SettingCardProps[]})[key];

                    return settings.map((setting: SettingCardProps) => {
                        return (
                            <SettingCard key={setting.id} id={setting.id} title={setting.title} value={setting.value} description={setting.description} notes={setting.notes} onSave={save}/>
                        )
                    })
                })
            }
        </div>
    )
}
