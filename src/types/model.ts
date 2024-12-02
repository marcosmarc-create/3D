export interface Model3D {
  id: string;
  title: string;
  description: string;
  author: string;
  uploadDate: string;
  files: ModelFile[];
  previewImage: string | null;
  previewImageFile: string | null;
}

export interface ModelFile {
  id: string;
  name: string;
  url: string;
  size: number;
}

export interface Author {
  id: string;
  name: string;
}