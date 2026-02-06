import { FormEvent, useCallback, useState } from "react";

import { LoadingIndicator } from "@/ui/App";
import { useModal } from "@/ui/elements/Modal";
import { CloseIcon, MinusIcon, PlusIcon } from "@/ui/Icons";
import { CTAButton, GhostButton, IconButton, Modal, NeutralButton, Select } from "@/ui/elements";

import addData from "@/modules/ingestion/addData";
import { Dataset } from "@/modules/ingestion/useDatasets";
import cognifyDataset from "@/modules/datasets/cognifyDataset";

interface AddDataToCogneeProps {
  datasets: Dataset[];
  refreshDatasets: () => void;
  useCloud?: boolean;
}

export default function AddDataToCognee({ datasets, refreshDatasets, useCloud = false }: AddDataToCogneeProps) {
  const [filesForUpload, setFilesForUpload] = useState<File[]>([]);

  const addFiles = useCallback((event: FormEvent<HTMLInputElement>) => {
    const formElements = event.currentTarget;
    const newFiles = formElements.files;

    if (newFiles?.length) {
      setFilesForUpload((oldFiles) => [...oldFiles, ...Array.from(newFiles)]);
    }
  }, []);

  const removeFile = useCallback((file: File) => {
    setFilesForUpload((oldFiles) => oldFiles.filter((f) => f !== file));
  }, []);

  const processDataWithCognee = useCallback((state?: object, event?: FormEvent<HTMLFormElement>) => {
    event!.preventDefault();

    if (!filesForUpload) {
      return;
    }

    const formElements = event!.currentTarget;
    const datasetId = formElements.datasetName.value;

    return addData(
      datasetId ? {
        id: datasetId,
      } : {
        name: "main_dataset",
      },
      filesForUpload,
      useCloud
    )
      .then(({ dataset_id, dataset_name }) => {
        refreshDatasets();

        return cognifyDataset(
          {
            id: dataset_id,
            name: dataset_name,
            data: [],  // not important, just to mimick Dataset
            status: "",  // not important, just to mimick Dataset
          },
          useCloud,
        )
          .then(() => {
            setFilesForUpload([]);
          });
      });
  }, [filesForUpload, refreshDatasets, useCloud]);

  const {
    isModalOpen: isAddDataModalOpen,
    openModal: openAddDataModal,
    closeModal: closeAddDataModal,
    isActionLoading: isProcessingDataWithCognee,
    confirmAction: submitDataToCognee,
  } = useModal(false, processDataWithCognee);

  return (
    <>
      <GhostButton onClick={openAddDataModal} className="mb-5 py-1.5 !px-2 text-sm w-full items-center justify-start">
        <PlusIcon />
        Add data to cognee
      </GhostButton>

      <Modal isOpen={isAddDataModalOpen}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-colors dark:text-white">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-semibold">Add new data to a dataset?</span>
            <IconButton disabled={isProcessingDataWithCognee} onClick={closeAddDataModal}><CloseIcon /></IconButton>
          </div>
          <div className="mt-8 mb-6 text-gray-600 dark:text-gray-300">Please select a {useCloud ? "cloud" : "local"} dataset to add data in.<br /> If you don&apos;t have any, don&apos;t worry, we will create one for you.</div>
          <form onSubmit={submitDataToCognee}>
            <div className="max-w-md flex flex-col gap-4">
              <Select defaultValue={datasets.length ? datasets[0].id : ""} name="datasetName">
                {!datasets.length && <option value="">main_dataset</option>}
                {datasets.map((dataset: Dataset) => (
                  <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
                ))}
              </Select>

              <NeutralButton className="w-full relative justify-start pl-4 border-dashed">
                <input onChange={addFiles} required name="files" tabIndex={-1} type="file" multiple className="absolute w-full h-full cursor-pointer opacity-0 inset-0" />
                <span className="flex items-center gap-2"><PlusIcon /> Select files</span>
              </NeutralButton>

              {!!filesForUpload.length && (
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="mb-2 font-medium">Selected files:</div>
                  <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
                    {filesForUpload.map((file) => (
                      <div key={file.name} className="py-2 pl-3 pr-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-row items-center justify-between w-full">
                        <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                        <IconButton onClick={() => removeFile(file)} className="hover:text-red-500 dark:hover:text-red-400"><MinusIcon /></IconButton>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-4 mt-8 justify-end">
              <GhostButton disabled={isProcessingDataWithCognee} type="button" onClick={() => closeAddDataModal()}>Cancel</GhostButton>
              <CTAButton disabled={isProcessingDataWithCognee} type="submit">
                {isProcessingDataWithCognee && <LoadingIndicator color="white" />}
                Add Data
              </CTAButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
