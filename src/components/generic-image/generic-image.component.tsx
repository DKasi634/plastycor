
import { MissingItemImage } from "@/assets";
import React, { useEffect, useState } from "react";
// import { ShimerEffect } from "@/styles/globals.styles";

interface GenericImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    hasShimmerEffect?: boolean
}

const GenericImage: React.FC<GenericImageProps> = ({
    src = "", fallbackSrc = MissingItemImage, hasShimmerEffect = true, alt = "", className = "", ...rest
}) => {
    const [imageSrc, setImageSrc] = useState<string>(MissingItemImage);

    const handleError = (_: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // setLoading(false);
        setImageSrc(fallbackSrc);
    };

    useEffect(() => {
        setImageSrc(src);
        // setLoading(true)
    }, [src])

    return (
        <>
            {/* <div className={`${className} relative inline-block`}  {...rest}>
                {
                    loading &&
                    (<ShimerEffect className={`${className} absolute inset-0 w-full h-full bg-dark-variant`} />)
                }
            </div> */}
        <img src={imageSrc} alt={alt} className={className} onError={handleError} {...rest} />
        </>
    )
}

export default GenericImage;