import { Outlet } from "react-router-dom";
import { PageActionProvider } from "../../context/PageActionContext";

export default function PageActionProviderLayout() {
    return (
        <PageActionProvider>
            <Outlet /> 
        </PageActionProvider>
    );
}