"use client";

import { FormEvent, useCallback, useState } from "react";
import { useBoolean } from "@/utils";
import { Accordion, CTAButton, GhostButton, IconButton, Input, Modal } from "@/ui/elements";
import { CloseIcon, MinusIcon, NotebookIcon, PlusIcon } from "@/ui/Icons";
import { Notebook } from "@/ui/elements/Notebook/types";
import { useModal } from "@/ui/elements/Modal";
import { LoadingIndicator } from "@/ui/App";

interface NotebooksAccordionProps {
  notebooks: Notebook[];
  addNotebook: (name: string) => Promise<Notebook>;
  removeNotebook: (id: string) => Promise<void>;
  openNotebook: (id: string) => void;
}

export default function NotebooksAccordion({
  notebooks,
  addNotebook,
  removeNotebook,
  openNotebook,
}: NotebooksAccordionProps) {
  const {
    value: isNotebookPanelOpen,
    setTrue: openNotebookPanel,
    setFalse: closeNotebookPanel,
  } = useBoolean(true);

  const {
    value: isNotebookLoading,
    setTrue: notebookLoading,
    setFalse: notebookLoaded,
  } = useBoolean(false);

  // Notebook removal modal
  const [notebookToRemove, setNotebookToRemove] = useState<Notebook | null>(null);

  const handleNotebookRemove = (notebook: Notebook) => {
    setNotebookToRemove(notebook);
    openRemoveNotebookModal();
  };

  const {
    value: isRemoveNotebookModalOpen,
    setTrue: openRemoveNotebookModal,
    setFalse: closeRemoveNotebookModal,
  } = useBoolean(false);

  const handleNotebookRemoveCancel = () => {
    closeRemoveNotebookModal();
    setNotebookToRemove(null);
  };

  const handleNotebookRemoveConfirm = () => {
    notebookLoading();
    removeNotebook(notebookToRemove!.id)
      .finally(notebookLoaded)
      .finally(closeRemoveNotebookModal)
      .finally(() => setNotebookToRemove(null));
  };

  const handleNotebookAdd = useCallback((_: Notebook, formEvent?: FormEvent<HTMLFormElement>) => {
    if (!formEvent) {
      return;
    }

    formEvent.preventDefault();

    const formElements = formEvent.currentTarget;
    const notebookName = formElements.notebookName.value.trim();

    return addNotebook(notebookName)
      .then(() => { });
  }, [addNotebook]);

  const {
    isModalOpen: isNewNotebookModalOpen,
    openModal: openNewNotebookModal,
    closeModal: closeNewNotebookModal,
    confirmAction: handleNewNotebookSubmit,
    isActionLoading: isNewDatasetLoading,
  } = useModal<Notebook>(false, handleNotebookAdd);

  return (
    <>
      <Accordion
        title={<span>Notebooks</span>}
        isOpen={isNotebookPanelOpen}
        openAccordion={openNotebookPanel}
        closeAccordion={closeNotebookPanel}
        tools={isNewDatasetLoading ? (
          <LoadingIndicator />
        ) : (
          <IconButton onClick={() => openNewNotebookModal()}><PlusIcon /></IconButton>
        )}
      >
        {notebooks.length === 0 && (
          <div className="flex flex-row items-baseline-last text-sm text-gray-400 mt-2 px-2">
            <span>No notebooks here, add one by clicking +</span>
          </div>
        )}
        {notebooks.map((notebook: Notebook) => (
          <div key={notebook.id} className="flex flex-row gap-2.5 items-center justify-between py-1.5 first:pt-3">
            <button onClick={() => openNotebook(notebook.id)} className="flex flex-row gap-2 items-center cursor-pointer">
              {isNotebookLoading ? <LoadingIndicator /> : <NotebookIcon />}
              <span className="text-xs">{notebook.name}</span>
            </button>
            <div>
              {notebook.deletable && <IconButton onClick={() => handleNotebookRemove(notebook)}><MinusIcon /></IconButton>}
            </div>
          </div>
        ))}
      </Accordion>

      <Modal isOpen={isNewNotebookModalOpen}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-colors dark:text-white">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-semibold">Create a new notebook?</span>
            <IconButton onClick={closeNewNotebookModal}><CloseIcon /></IconButton>
          </div>
          <div className="mt-8 mb-6 text-gray-600 dark:text-gray-300">Please provide a name for the notebook being created.</div>
          <form onSubmit={handleNewNotebookSubmit}>
            <div className="max-w-md">
              <Input name="notebookName" type="text" placeholder="Notebook name" required />
              {/* {newDatasetError && <span className="text-sm pl-4 text-gray-400">{newDatasetError}</span>} */}
            </div>
            <div className="flex flex-row gap-4 mt-8 justify-end">
              <GhostButton type="button" onClick={() => closeNewNotebookModal()}>Cancel</GhostButton>
              <CTAButton type="submit">Create</CTAButton>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isRemoveNotebookModalOpen}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-colors dark:text-white">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-semibold">Delete <span className="text-indigo-600 dark:text-indigo-400">{notebookToRemove?.name}</span> notebook?</span>
            <IconButton onClick={handleNotebookRemoveCancel}><CloseIcon /></IconButton>
          </div>
          <div className="mt-8 mb-6 text-gray-600 dark:text-gray-300">Are you sure you want to delete <span className="text-indigo-600 dark:text-indigo-400 font-medium">{notebookToRemove?.name}</span>? This action cannot be undone.</div>
          <div className="flex flex-row gap-4 mt-8 justify-end">
            <GhostButton type="button" onClick={handleNotebookRemoveCancel}>Cancel</GhostButton>
            <CTAButton onClick={handleNotebookRemoveConfirm} type="submit" className="!bg-red-600 hover:!bg-red-700">Delete</CTAButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
