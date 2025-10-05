import { useUser } from "@/hooks/use-user";

export type PrivateComponentProps = {
  readonly roles?: string[]
  readonly children?: React.ReactNode
}

export function PrivateComponent({ roles, children }: PrivateComponentProps) {
  const { user } = useUser();

  if (user && roles && roles.length > 0) {
    if (user.groups.some(group => roles.includes(group))) {
      return <>{ children }</>
    }
  }

  return <></>
}