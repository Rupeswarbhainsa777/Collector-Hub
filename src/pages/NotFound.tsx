import { useNavigate } from "react-router";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                {/* 404 Badge */}
                <p className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
                    404 Error
                </p>
                
                {/* Heading */}
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Page not found
                </h1>
                
                {/* Description */}
                <p className="mt-6 text-base leading-7 text-gray-500 max-w-md mx-auto">
                    Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or never existed in the first place.
                </p>
                
                {/* Actions */}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={() => navigate("/")}
                        className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 active:scale-[0.97]"
                    >
                        Go back home
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200"
                    >
                        Go back <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;