import React from 'react';
import { X, FileCode } from 'lucide-react';
import { ModelFile } from '../types/model';

interface FileUploadListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export default function FileUploadList({ files, onRemove }: FileUploadListProps) {
  return (
    <ul className="mt-2 divide-y divide-gray-200">
      {files.map((file, index) => (
        <li key={index} className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <FileCode className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}