// frontend/src/components/ImageUpload.tsx
import { useState, useEffect, useMemo, CSSProperties } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { URLS } from '../urls';
import { Badge } from './ui/badge';
import ScreenRecorder from './recording/ScreenRecorder';
import { ScreenRecorderState } from '../types';
import { useTranslation } from 'react-i18next';

const baseStyle: CSSProperties = {
  flex: 1,
  width: '80%',
  margin: '0 auto',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle: CSSProperties = {
  borderColor: '#2196f3',
};

const acceptStyle: CSSProperties = {
  borderColor: '#00e676',
};

const rejectStyle: CSSProperties = {
  borderColor: '#ff1744',
};

function fileToDataURL(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

type FileWithPreview = {
  preview: string;
} & File;

interface Props {
  setReferenceImages: (
    referenceImages: string[],
    inputMode: 'image' | 'video'
  ) => void;
}

function ImageUpload({ setReferenceImages }: Props) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [screenRecorderState, setScreenRecorderState] =
    useState<ScreenRecorderState>(ScreenRecorderState.INITIAL);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      maxSize: 1024 * 1024 * 20, // 20 MB
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg'],
        'image/jpg': ['.jpg'],
        'video/quicktime': ['.mov'],
        'video/mp4': ['.mp4'],
        'video/webm': ['.webm'],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file: File) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ) as FileWithPreview[]
        );

        Promise.all(acceptedFiles.map((file) => fileToDataURL(file)))
          .then((dataUrls) => {
            if (dataUrls.length > 0) {
              setReferenceImages(
                dataUrls.map((dataUrl) => dataUrl as string),
                (dataUrls[0] as string).startsWith('data:video')
                  ? 'video'
                  : 'image'
              );
            }
          })
          .catch((error) => {
            toast.error('Error reading files' + error);
            console.error('Error reading files:', error);
          });
      },
      onDropRejected: (rejectedFiles) => {
        toast.error(rejectedFiles[0].errors[0].message);
      },
    });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section className='container'>
      {screenRecorderState === ScreenRecorderState.INITIAL && (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} className="file-input" />
          <p className='text-slate-700 text-lg'>{t('imageupload.upload_prompt')}</p>
        </div>
      )}
      {screenRecorderState === ScreenRecorderState.INITIAL && (
        <div className='text-center text-sm text-slate-800 mt-4'>
          <Badge>{t('imageupload.new')}</Badge>{' '}
          {t('imageupload.upload_video')}{' '}
          <a
            className='underline'
            href={URLS['intro-to-video']}
            target='_blank'
          >
            {t('imageupload.learn_more')}
          </a>
        </div>
      )}
      <ScreenRecorder
        screenRecorderState={screenRecorderState}
        setScreenRecorderState={setScreenRecorderState}
        generateCode={setReferenceImages}
      />
    </section>
  );
}

export default ImageUpload;
