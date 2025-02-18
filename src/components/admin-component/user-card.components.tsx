// src/components/UserCard.tsx
import { IUser, ADMIN_STATUS } from '@/api/types';
import { upgradeUserToCoAdmin, downgradeUserFromCoAdmin, disableFirebaseUser, enableFirebaseUser } from '@/utils/firebase/firestore.utils';
import React, { useState } from 'react';
import BaseButton, { buttonType } from '../base-button/base-button.component';
import LoaderItem from '../loader/loader.component';


interface UserCardProps {
  user: IUser;
  onUserUpdated: (updatedUser: IUser) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUserUpdated }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setLoading(true);
    setError(null);
    const updated = await upgradeUserToCoAdmin(user);
    if (updated) {
      onUserUpdated(updated);
    } else {
      setError('Failed to upgrade user.');
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
      setError('Failed to downgrade user.');
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
      setError('Failed to disable user.');
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
      setError('Failed to enable user.');
    }
    setLoading(false);
  };

  return (
    <div className="relative border rounded p-4 shadow-md flex flex-col">
      <div className="mb-2">
        <p className="font-bold">{user.email}</p>
        <p>Status: {user.disabled ? 'Disabled' : 'Active'}</p>
        <p>Role: {user.adminStatus === ADMIN_STATUS.CO_ADMIN ? 'Co-Admin' : 'User'}</p>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {user.adminStatus !== ADMIN_STATUS.CO_ADMIN ? (
          <BaseButton
            clickHandler={handleUpgrade} rounded={false}
            className={` text-white !px-2 !py-[0.2rem] !text-xs !font-bold rounded hover:bg-blue-600 ${loading && "!cursor-none"}`}
          >
            Upgrade to Co-Admin
          </BaseButton>
        ) : (
          <BaseButton
            clickHandler={handleDowngrade} type={buttonType.green} rounded={false}
            className={`!bg-yellow !border-yellow !text-xs !text-green !font-bold !px-2 !py-[0.2rem] rounded hover:bg-yellow/80 ${loading && "!cursor-none"}`}
          >
            Downgrade from Co-Admin
          </BaseButton>
        )}
        {user.disabled ? (
          <BaseButton
            clickHandler={handleEnable}
            type={buttonType.green} rounded={false}
            className={` text-white !px-2 !py-[0.2rem] !font-bold !text-xs ${loading && "!cursor-none"}`}
          >
            Enable User
          </BaseButton>
        ) : (
          <BaseButton
            clickHandler={handleDisable} rounded={false}
            className={`!bg-red-500 !border-red-500 text-white !font-bold !text-xs !px-2 !py-[0.2rem]  hover:!bg-red-600 ${loading && "!cursor-none"}`}
          >
            Disable User
          </BaseButton>
        )}
      </div>
      {loading && <div className='absolute inset-0 bg-light/80 z-10 !font-bold flex items-center justify-center'><LoaderItem/> </div>}
    </div>
  );
};

export default UserCard;
