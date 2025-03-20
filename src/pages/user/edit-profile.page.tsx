import { IUser, Location } from "@/api/types"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setErrorToast } from "@/store/toast/toast.actions"
import { parsePhoneNumber } from "libphonenumber-js/min"
import { createOrUpdateFirestoreUser } from "@/utils/firebase/firestore.utils"
import { useNavigate } from "react-router-dom"
import { selectCurrentUser } from "@/store/auth/auth.selector"
import BaseButton from "@/components/base-button/base-button.component"
import GenericInput from "@/components/generic-input/generic-input.component"
import ImageUploadFormGroup from "@/components/image-upload-input/image-upload-input.component"
import LoaderLayout from "@/components/loader/loader-layout.component"
import PhoneNumberInput from "@/components/phone-number-input/phone-number-input.component"
import { setCurrentUser } from "@/store/auth/auth.actions"



const EditProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [userProfile, setUserProfile] = useState<IUser | null>(currentUser);
    const [tagsString, setTagsString] = useState<string>((userProfile && userProfile?.tags?.reduce((prevValue, currentValue) => `${prevValue} `+ `${currentValue}`, "")) || '')
    const [isUpdating, setIsUpdating] = useState(false);
    const [canUpdate, setCanUpdate] = useState(false);
    const imagesUploadRef = useRef<{ uploadImages: () => Promise<string[]>, hasSelectedImages: () => boolean }>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setError = (error: string) => { dispatch(setErrorToast(error)) }

    const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => { if (!userProfile || e.target.value.length > 50) { return } setUserProfile(prev => ({ ...prev, firstName: e.target.value } as IUser)) }
    const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => { if (!userProfile || e.target.value.length > 50) { return } setUserProfile(prev => ({ ...prev, lastName: e.target.value } as IUser)) }
    const setPhoneNumber = (value: string) => { if (!userProfile ) { return } setUserProfile(prev => ({ ...prev, phoneNumber: value } as IUser)) }
    const setOrganisation = (e: React.ChangeEvent<HTMLInputElement>) => { if (!userProfile || e.target.value.length > 100) { return } setUserProfile(prev => ({ ...prev, organisation: e.target.value } as IUser)) }
    const setBio = (e: React.ChangeEvent<HTMLInputElement>) => { if (!userProfile || e.target.value.length > 500) { return } setUserProfile(prev => ({ ...prev, bio: e.target.value } as IUser)) }
    const setCity = (e: React.ChangeEvent<HTMLInputElement>) => { if (!userProfile || e.target.value.length > 100) { return } setUserProfile(prev => ({ ...prev, location: prev && { ...prev.location, city: e.target.value } as Location } as IUser)) }
    const setCountry = (e: React.ChangeEvent<HTMLInputElement>) => { if (!userProfile || e.target.value.length > 100) { return } setUserProfile(prev => ({ ...prev, location: prev && { ...prev.location, country: e.target.value } as Location } as IUser)) }
    const setTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!userProfile) { return }
        setTagsString(e.target.value)
    }

    useEffect(()=>{
        if(tagsString){
            // console.log("\nChanged Tags value : ", tagsString.split(" ").filter((tag, idx) => (tag.startsWith("#") && idx <= 3)).map(tag => tag.replace(',', '')))
            setUserProfile(prev => ({ ...prev, tags: [...tagsString.split(" ").filter((tag, idx) => (tag.startsWith("#") && idx <= 3)).map(tag => tag.replace(',', '')).slice(0, 3)] } as IUser))
        }
    }, [tagsString])

    useEffect(() => {
        if (canUpdate && currentUser) {
            setCanUpdate(false);
            updateThisUser();
            dispatch(setCurrentUser(currentUser.email))
        }
    }, [canUpdate])

    const updateThisUser = async () => {
        if (!userProfile) { return }
        // console.log("\nStarted profile update : ", userProfile)
        try {
            const updatedUser = await createOrUpdateFirestoreUser(userProfile);
            if (updatedUser) { dispatch(setCurrentUser(updatedUser.email)); navigate("/me/profile") }
        } catch (error) { 
            setError("Quelque chose a mal tourné, veuillez ressayer plus tart")
            // console.log("Error updating profile as : ", error) 
        }
        finally { setIsUpdating(false) }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isUpdating || !userProfile) { return };
        setIsUpdating(true);
        try {
            if (!userProfile.firstName.trim()) { setError("Nom invalide"); throw new Error("Invalid first name") }
            if (!userProfile.lastName.trim()) { setError("Prénom invalide"); throw new Error("Invalid last name") }
            try {
                if (!parsePhoneNumber(userProfile.phoneNumber).isValid()) { setError("Numéro de teléphone invalide"); throw new Error("Invalid phone number") }
            } catch (error) {
                // console.log(error)
                setError("Veuillez entre un numéro de teléphone valide"); setIsUpdating(false); return
            }
            if (!userProfile.organisation?.trim()) { setError("Organisation ou communauté requise"); throw new Error("Invalid organisation") }
            if (!userProfile.bio?.trim()) { setError("Bio invalide"); throw new Error("Invalid bio") }
            if (!userProfile.location?.city.trim()) { setError("Ville ou localité invalide"); throw new Error("Invalid city") }
            if (!userProfile.location?.country.trim()) { setError("Pays invalide"); throw new Error("Invalid country") }
            if (imagesUploadRef.current) {
                if (imagesUploadRef.current.hasSelectedImages()) {
                    const uploadedImages = await imagesUploadRef.current.uploadImages();
                    if (uploadedImages.length) { setUserProfile(prev => ({ ...prev, profilePicture: uploadedImages[0] } as IUser)) }
                }
            }
            setCanUpdate(true)
        } catch (error) {
            // console.log(error)
            setIsUpdating(false)

        } finally { }

    }

    return (
        <>
            {userProfile &&
                <div className="flex flex-col py-6 min-h-screen px-8 w-full">
                    <div className="flex flex-col w-full max-w-xl ">
                        <h3 className="text-2xl font-bold w-full text-center my-4"> Modifier votre profil </h3>
                        <form className={`flex flex-col w-full gap-2 px-2 py-4`} onSubmit={handleSubmit}>
                            <GenericInput label="Nom" type="text" name="first_name" value={userProfile.firstName} onChange={setFirstName} />
                            <GenericInput label="Prénom" type="text" name="last_name" value={userProfile.lastName} onChange={setLastName} />
                            <PhoneNumberInput label="Teléphone" value={userProfile.phoneNumber} onChange={(value) => setPhoneNumber(value)} />
                            <GenericInput label="Organisation ou Communauté" type="text" name="oragnisation" value={userProfile.organisation || ''} onChange={setOrganisation} />
                            <GenericInput label="Bio" type="text" name="bio" value={userProfile.bio || ''} onChange={setBio} />
                            <GenericInput label="Ville ou Localité" type="text" name="city" value={userProfile.location?.city || ''} onChange={setCity} />
                            <GenericInput label="Pays" type="text" name="country" value={userProfile.location?.country || ''} onChange={setCountry} />
                            <GenericInput label="Hashtags, veullez enter des hashtags relatifs à vos activités separés avec des espaces au milieu dans le format: #GreenSolutions #Creativity. Seuls les 3 premiers seront considerés" type="text" name="tags" value={ tagsString} onChange={setTags} />
                            <ImageUploadFormGroup label='Chosir une image' initialImages={[userProfile.profilePicture]} imagesLimit={1} folderPath='Users'
                                ref={imagesUploadRef} />
                            <BaseButton submitType="submit" className="mt-6 ">Confirmer</BaseButton>

                        </form>
                    </div>
                    {isUpdating && <LoaderLayout />}
                </div>}
        </>
    )
}

export default EditProfilePage