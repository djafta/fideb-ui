"use client"

import { SettingCard } from "@/components/setting-card";
import { useSettings } from "@/hooks/use-settings";
import { Setting } from "@/services/settings";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AllSettings() {
  const { settings, mutation } = useSettings();

  async function handleUpdate(updatedSetting: Setting) {
    mutation.mutate(updatedSetting);
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Configuração actualizada com sucesso");
    }
  }, [mutation])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações do Sistema</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da aplicação. Clique no ícone de edição para modificar os valores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          { settings?.map((setting, index) => (
            <SettingCard
              key={ `${ setting.name }-${ index }` }
              setting={ setting }
              onUpdate={ handleUpdate }
              isEditable={ true }
            />
          )) }
        </div>
      </div>
    </div>
  )
}
