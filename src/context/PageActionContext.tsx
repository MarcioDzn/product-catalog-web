import { createContext, useState } from "react";

export type PageActionConfig = {
    label: string;
    formId: string;
    isPending?: boolean;
    disabled?: boolean;
};

type ContextData = {
    action: PageActionConfig | null;
    setPageAction: (config: PageActionConfig | null) => void;
};

export const PageActionContext = createContext<ContextData>({} as ContextData);

export function PageActionProvider({ children }: { children: React.ReactNode }) {
    const [action, setPageAction] = useState<PageActionConfig | null>(null);

    return (
        <PageActionContext.Provider value={{ action, setPageAction }}>
            {children}
        </PageActionContext.Provider>
    );
}