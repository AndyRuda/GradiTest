export interface Media {
  alt: string;
  id: number;
  position: number;
  preview_image: Array<{
    aspect_ratio: number;
    height: number;
    width: number;
    src: string;
  }>;
  aspect_ratio: number;
  height: number;
  media_type: string;
  src: string;
  width: number;
}
