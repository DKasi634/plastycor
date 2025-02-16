import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ImagesDisplayBox from "../images-display-box/images-display-box.component";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/utils/firebase/firebase.config";
import { SelectedImage } from "@/types";
import { setErrorToast } from "@/store/toast/toast.actions";
import { useDispatch } from "react-redux";

type ImagesUploadFormGroupProps = {
  imagesLimit: number;
  label: string;
  initialImages?: string[]; // Accepts remote image URLs
  folderPath: string;
};

const ImageUploadFormGroup = forwardRef<
  { uploadImages: () => Promise<string[]> },
  ImagesUploadFormGroupProps
>(
  ({ imagesLimit, label, folderPath, initialImages = [] }, uploadToStorageRef) => {
    const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
    const [remoteImages, setRemoteImages] = useState<string[]>(initialImages); // State for remote images
    const [isErrorToastVisible, setErrorToastVisible] = useState(false);
    const toastTimeout = 5000;
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const triggerInputClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    useEffect(() => {
      if (isErrorToastVisible) {
        dispatch(
          setErrorToast(
            `Vous ne pouvez pas ajouter plus de ${imagesLimit} image${imagesLimit > 1 ? "s" : ""}`
          )
        );
      }
    }, [isErrorToastVisible]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const files = Array.from(e.target.files);

      // Check if adding new images exceeds the limit
      if (selectedImages.length + files.length > imagesLimit) {
        setErrorToastVisible(true);
        setTimeout(() => setErrorToastVisible(false), toastTimeout);
      } else {
        const newSelectedImages = files.map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }));

        setSelectedImages((prev) => [...prev, ...newSelectedImages]);
      }

      e.target.value = "";
    };

    const handleUploadToStorage = async (): Promise<string[]> => {
      const storage = firebaseStorage;
      const urls: string[] = [];

      if (!selectedImages || !selectedImages.length) {
        return [];
      }

      for (const { file } of selectedImages) {
        const imageName = `image_${new Date().getTime()}`;
        const storageRef = ref(storage, `${folderPath}/${imageName}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
      }

      setSelectedImages([]); // Clear local images after upload
      return urls;
    };

    const hasSelectedImages = (): boolean => !!selectedImages.length;

    useImperativeHandle(uploadToStorageRef, () => ({
      uploadImages: handleUploadToStorage,
      hasSelectedImages,
    }));

    const handleRemoveImage = (urlToRemove: string) => {
      // Remove from local images
      setSelectedImages((prev) =>
        prev.filter(({ url }) => url !== urlToRemove)
      );

      // Remove from remote images
      setRemoteImages((prev) => prev.filter((url) => url !== urlToRemove));
    };

    return (
      <>
        <div className="flex flex-col justify-start w-full gap-1">
          <label
            className="text-sm text-dark w-full text-left font-semibold"
            htmlFor="image"
          >
            {label}*
          </label>
          <div className="flex items-center justify-start gap-2">
            {selectedImages.length + remoteImages.length < imagesLimit && (
              <>
                <button
                  type="button"
                  onMouseDown={triggerInputClick}
                  className="flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-lg border-[1.5px] border-orange bg-gray-variant w-[6rem]"
                >
                  <span className="text-xl">
                    <IoCloudUploadOutline />
                  </span>
                  <span className="text-sm text-dark font-semibold w-full text-center">
                    Upload
                  </span>
                </button>
                <input
                  type="file"
                  id="image"
                  name="image"
                  multiple={imagesLimit > 1}
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden px-4 py-[0.6rem] rounded-lg bg-gray-variant text-dark text-xs font-medium"
                />
              </>
            )}
            <ImagesDisplayBox
              images={[...selectedImages.map(({ url }) => url), ...remoteImages]}
              onRemoveImage={handleRemoveImage}
            />
          </div>
        </div>
      </>
    );
  }
);

export default ImageUploadFormGroup;