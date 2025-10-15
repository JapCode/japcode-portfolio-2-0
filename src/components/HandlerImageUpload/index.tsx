'use client';

import { CirclePlus, Pen } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import './handlerImage.modules.css';

interface HandlerImageUploadProps {
  onImageUpload: Dispatch<SetStateAction<File | null>>;
  defaultImageUrl?: string;
}

export default function HandlerImageUpload({
  onImageUpload,
  defaultImageUrl,
}: HandlerImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (defaultImageUrl != null) {
      setImage(defaultImageUrl);
    }
  }, []);

  return (
    <div className="handlerImage-container">
      <div className="handlerImage-image-box" onClick={handleEditClick}>
        {image ? (
          <>
            <img src={image} alt="Preview" className="handlerImage-preview" />
            <div className="handlerImage-edit-icon">
              <Pen
                size={15}
                style={{
                  marginRight: '1px',
                }}
              />
            </div>
          </>
        ) : (
          <span className="handlerImage-placeholder">
            <CirclePlus size={54} />
          </span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    </div>
  );
}
