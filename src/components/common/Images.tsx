import {useState} from "react";


interface ImageProps {
    src: string | null | undefined;
    alt: string;
    className?: string;
}


const Images =({src,alt,className}:ImageProps)=>{
    const [failed, setFailed] = useState(false);
    const showFallback = !src || failed;

    if (showFallback) {
        return (
            <div
                className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}
                role="img"
                aria-label={alt}
            >
        <span className="text-3xl" aria-hidden="true">
          🖼️
        </span>
            </div>
        );
    }
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`object-cover ${className}`}
        />
    );
}

export default Images;