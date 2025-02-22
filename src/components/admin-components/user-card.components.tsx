import { IUser, ADMIN_STATUS } from '@/api/types';
import { upgradeUserToCoAdmin, downgradeUserFromCoAdmin, disableFirebaseUser, enableFirebaseUser } from '@/utils/firebase/firestore.utils';
import React, { useState } from 'react';
import BaseButton, { buttonType } from '../base-button/base-button.component';
import LoaderItem from '../loader/loader.component';
import { useDispatch } from 'react-redux';
import { setErrorToast } from '@/store/toast/toast.actions';
import GenericImage from '../generic-image/generic-image.component';

interface UserCardProps {
  user: IUser;
  onUserUpdated: (updatedUser: IUser) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUserUpdated }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleUpgrade = async () => {
    if (!(user.bio && user.location && user.organisation && user.phoneNumber)) {
      dispatch(setErrorToast("Cet utilisateur doit fournir un numéro de téléphone, un lieu, une biographie et une organisation dans son profil avant de pouvoir être promu !"));
      return;
    }
    setLoading(true);
    setError(null);
    const updated = await upgradeUserToCoAdmin(user);
    if (updated) {
      onUserUpdated(updated);
    } else {
      setError('Échec de la promotion de l\'utilisateur.');
    }
    setLoading(false);
  };

  const handleDowngrade = async () => {
    setLoading(true);
    setError(null);
    const updated = await downgradeUserFromCoAdmin(user);
    if (updated) {
      onUserUpdated(updated);
    } else {
      setError('Échec de la rétrogradation de l\'utilisateur.');
    }
    setLoading(false);
  };

  const handleDisable = async () => {
    setLoading(true);
    setError(null);
    const updated = await disableFirebaseUser(user);
    if (updated) {
      onUserUpdated(updated);
    } else {
      setError('Échec de la désactivation de l\'utilisateur.');
    }
    setLoading(false);
  };

  const handleEnable = async () => {
    setLoading(true);
    setError(null);
    const updated = await enableFirebaseUser(user);
    if (updated) {
      onUserUpdated(updated);
    } else {
      setError('Échec de l\'activation de l\'utilisateur.');
    }
    setLoading(false);
  };

  return (
    <div className="relative border rounded p-4 shadow-md flex flex-col">
      <div className="mb-2 w-full">
        <div className="flex items-center justify-center py-2">
          <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
            <GenericImage loading="lazy" src={user?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
          </div>
        </div>
        <p className="text-lg font-bold">{user.firstName} {user.lastName}</p>
        <p className="text-sm text-dark/80 font-bold">{user.email}</p>
        <p className='text-xs text-dark font-extrabold'>Statut: <span className={user.disabled ? `text-red-500` : 'text-green'}> {user.disabled ? 'Désactivé' : 'Actif'} </span> </p>
        <p className='text-xs text-dark/80 font-extrabold'>Rôle: {user.adminStatus === ADMIN_STATUS.CO_ADMIN ? 'Co-Administrateur' : 'Utilisateur'}</p>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {user.adminStatus !== ADMIN_STATUS.CO_ADMIN ? (
          <BaseButton
            clickHandler={handleUpgrade} rounded={false}
            className={` text-white !px-2 !py-[0.2rem] !text-xs !font-bold rounded hover:bg-blue-600 ${loading && "!cursor-none"}`}
          >
            Promouvoir en Co-Administrateur
          </BaseButton>
        ) : (
          <BaseButton
            clickHandler={handleDowngrade} type={buttonType.green} rounded={false}
            className={`!bg-yellow !border-yellow !text-xs !text-green !font-bold !px-2 !py-[0.2rem] rounded hover:bg-yellow/80 ${loading && "!cursor-none"}`}
          >
            Rétrograder de Co-Administrateur
          </BaseButton>
        )}
        {user.disabled ? (
          <BaseButton
            clickHandler={handleEnable}
            type={buttonType.green} rounded={false}
            className={` text-white !px-2 !py-[0.2rem] !font-bold !text-xs ${loading && "!cursor-none"}`}
          >
            Activer l'utilisateur
          </BaseButton>
        ) : (
          <BaseButton
            clickHandler={handleDisable} rounded={false}
            className={`!bg-red-500 !border-red-500 text-white !font-bold !text-xs !px-2 !py-[0.2rem]  hover:!bg-red-600 ${loading && "!cursor-none"}`}
          >
            Désactiver l'utilisateur
          </BaseButton>
        )}
      </div>
      {loading && <div className='absolute inset-0 bg-light/80 z-10 !font-bold flex items-center justify-center'><LoaderItem /> </div>}
    </div>
  );
};

export default UserCard;
