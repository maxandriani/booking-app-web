import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RouteErrorBoundary() {
    const error = useRouteError();
    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
            <>
            <h1>Oops!</h1>
            <p>{error.statusText}</p>
            <pre>{JSON.stringify(error.data, null, 2)}</pre>
        </>
        )
    }

    if (error instanceof Error) {
        return (
            <>
            <h1>Oops!</h1>
            <p>{error.name}</p>
            <p>{error.message}</p>
        </>
        )
    }

    return (
        <>
            <h1>Oops!</h1>
            <p>Unknown Error</p>
        </>
    )
}