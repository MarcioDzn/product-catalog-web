import Navbar from "./Navbar";
import Button from "../Button";
import { useContext } from "react";
import { PageActionContext } from "../../context/PageActionContext";


export default function ActionNavbar() {
    const { action } = useContext(PageActionContext);

    return (
        <>
            <Navbar>
                {action && (
                    <Button
                        type="submit"
                        formId={action.formId}
                        disabled={action.isPending || action.disabled}
                        onClick={() => console.log("Criar produto")}
                    >
                        {action.isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            </span>
                        ) : (
                            action.label
                        )}
                    </Button>
                )}

            </Navbar>
        </>
    )
}