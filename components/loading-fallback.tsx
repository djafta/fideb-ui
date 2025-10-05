import { Spinner } from "@/components/ui/spinner";

export function LoadingFallback() {

    return (
        <div className={ "fixed left-0 top-0 h-full w-full flex items-center justify-center z-50" }>
            <div>
                <Spinner size={ "md" }/>
            </div>
        </div>
    )
}