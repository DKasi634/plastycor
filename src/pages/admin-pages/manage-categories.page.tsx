
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryStart,
  updateCategoryStart
} from "@/store/categories/categories.actions";
import { Category } from "@/api/types";
import { selectCategories, selectCategoriesLoading } from "@/store/categories/categories.selector";
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import GenericInput from "@/components/generic-input/generic-input.component";
import LoaderLayout from "@/components/loader/loader-layout.component";
import { setErrorToast } from "@/store/toast/toast.actions";

type FormState = {
  categoryName: string;
  disabled: boolean;
};

const ManageCategoriesPage: React.FC = () => {
  const dispatch = useDispatch();
  // Assumes that your Redux state has a "categories" slice with a "data" array.
  const categories = useSelector(selectCategories);
  const categoriesLoading = useSelector(selectCategoriesLoading);

  // State for modal visibility and whether we’re creating or editing.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<FormState>({
    categoryName: "",
    disabled: false,
  });



  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      categoryName: value,
    }));
  };

  const openCreateModal = () => {
    setFormData({ categoryName: "", disabled: false });
    setIsEditing(false);
    setSelectedCategory(null);
    setIsEditModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ categoryName: category.categoryName, disabled: category.disabled });
    setIsEditing(true);
    setIsEditModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedCategory(null);
  }

  const openDeleteModal = (category: Category) => {
    setIsDeleteModalOpen(true)
    setSelectedCategory(category);
  }

  const closeEditModal = () => {
    setSelectedCategory(null)
    setIsEditModalOpen(false);
  };

  const handleEnableCategory = (category: Category) => {
    dispatch(updateCategoryStart({ ...category, disabled: false } as Category));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.categoryName) {
      dispatch(setErrorToast("Le nom de catégories ne peut rester vide !"))
        ; return
    }
    if (isEditing && selectedCategory) {
      // For editing, send the complete category.
      const updatedCategory: Category = {
        ...selectedCategory,
        categoryName: formData.categoryName,
        disabled: formData.disabled,
      };
      dispatch(updateCategoryStart(updatedCategory));
    } else {
      // For creation, saga will set createdAt and categoryId.
      const newCategory: Category = {
        categoryId: "", // will be set by the saga
        categoryName: formData.categoryName,
        disabled: formData.disabled,
        createdAt: "", // will be set by the saga
      };
      dispatch(createCategoryStart(newCategory));
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(null)
    setIsDeleteModalOpen(false)
    dispatch(updateCategoryStart({ ...category, disabled: false } as Category));
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gérer les Catégories</h1>
        <BaseButton
          clickHandler={openCreateModal}
          className="!px-4 !py-2"
        >
          Creér une categorie
        </BaseButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:flex xl:flex-wrap xl:items-center justify-start">
        {categories && categories.length > 0 ?
          <>
            {
              categories.map((category) => (
                <div key={category.categoryId} className="bg-white shadow-dark-transparent shadow-md w-full max-w-[32rem] xl:max-w-[24rem] rounded-lg border border-dark-variant p-4 flex flex-col gap-2 items-start">
                  <h2 className="text-2xl text-dark/70 text-left font-semibold mb-2">{category.categoryName}</h2>
                  <p className="text-dark text-sm">
                    Créée: {new Date(category.createdAt).toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric'})}
                  </p>
                  <div className="flex items-center justify-between gap-2 p-2 w-full">
                    <BaseButton
                      clickHandler={() => openEditModal(category)}
                      type={buttonType.green}
                      rounded={false}
                      className="!px-3 !py-1"
                    >
                      Modifier
                    </BaseButton>
                    {!category.disabled ?
                      <BaseButton clickHandler={() => openDeleteModal(category)} rounded={false} type={buttonType.clear}
                        className="!bg-red-500 !border-red-400  text-white !px-3 !py-1"
                      >
                        Desactiver
                      </BaseButton> :
                      <BaseButton clickHandler={() => handleEnableCategory(category)} rounded={false}
                        className=" text-white !px-3 !py-1"
                      >
                        Activer
                      </BaseButton>
                    }
                  </div>
                </div>)
              )
            }
          </> :
          <p className="col-span-full text-center text-gray-500">Pas de catégories</p>
        }
      </div>

      {/* Modal for Create/Edit Category */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded px-6 py-4 w-full max-w-[24rem]">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Category" : "Create Category"}
            </h2>
            <form onSubmit={handleSubmit}>

              <GenericInput
                label="Category Name"
                type="text"
                id="categoryName"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleNameChange}
              />

              <div className="flex items-center justify-between px-2 py-4">
                <BaseButton
                  clickHandler={closeEditModal}
                  type={buttonType.clear}
                  submitType="button"
                  className="!px-4 !py-[0.4rem]"
                >
                  Cancel
                </BaseButton>
                <BaseButton submitType="submit" className="!px-4 !py-[0.4rem]">
                  {isEditing ? "Update" : "Create"}
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      )}
      {(isDeleteModalOpen && selectedCategory) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded px-6 py-4 w-full max-w-[24rem]">
            <h2 className="text-xl font-semibold mb-4"> Voulez-vous désactiver <span className="text-dark/80 font-bold">{selectedCategory.categoryName}</span> ? </h2>
            <div className="flex items-center justify-between px-2 py-4">
              <BaseButton clickHandler={closeDeleteModal} type={buttonType.clear} submitType="button"
                className="!px-4 !py-[0.4rem]" >
                Annuler
              </BaseButton>
              <BaseButton clickHandler={() => handleDelete(selectedCategory)} className="!px-4 !py-[0.4rem]">
                Confirmer
              </BaseButton>
            </div>
          </div>
        </div>
      )

      }
      {
        categoriesLoading && <LoaderLayout />
      }
    </div>
  );
};

export default ManageCategoriesPage;
