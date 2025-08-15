import _isEmpty from 'lodash/isEmpty'
import _round from 'lodash/round'
import useUpload from "@/hooks/upload";
import { t } from '@/utils/translate';
import { UploadProps } from './types';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { useContext } from 'react';
import { FormContext } from '../Form';

const Upload = ({
  name,
  value,
  path,
  disabled,
  description,
  isFile,
  accept,
  resizable,
  onBlur,
  onChange
}: UploadProps) => {

  const { form } = useContext(FormContext)

  const {
    inputRef,
    dragOver,
    preventEvent,
    onDrop,
    onDragLeave,
    onDragOver,
  } = useUpload({
    data: value,
    path,
    accept,
    resizable,
    onBlur,
    onChange,
  })

  const onRemove = (e) => {
    e.preventDefault()
    onChange(undefined)
    onBlur()
    form?.onBlur()
    inputRef.current.value = null
  }

  const haveValue = !_isEmpty(value)

  const borderClass = haveValue && isFile
    ? 'border-secondary group-[.field-error]:border-error'
    : 'border-line border-dashed group-[.field-error]:border-error'

  return (
    <>
      <div
        className={`overflow-hidden rounded-lg w-full border ${borderClass} ${dragOver ? 'bg-primary bg-opacity-[0.15]' : 'bg-white'} `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={preventEvent}
        onDrop={onDrop}
      >
        <label htmlFor={name} className={'flex flex-col items-center w-full h-full'}>
          <div className={`relative overflow-hidden w-full h-full flex flex-col justify-center items-center`}>
            {!haveValue &&
              <>
                <Icon
                  name={'UploadSimple'}
                  size={55}
                  className={'text-primary mt-6'}
                />
                <div className={'text-lg font-medium mt-3 mb-4'}>
                  {t('common_upload_title')}
                </div>
                <div
                  className={`cursor-pointer flex px-4 justify-center items-center w-full min-w-[150px] max-w-[200px] font-semibold rounded-full text-sm h-[40px] bg-primary text-white hover:bg-opacity-90 disabled:bg-plane`}
                >
                  {t('common_upload_button_upload')}
                </div>
                <div className={'text-xs font-light whitespace-pre-line text-neutral-300 text-center mt-4 pb-6'}>
                  {description}
                </div>
              </>
            }
            {haveValue && !isFile &&
              <>
                <img
                  src={value?.url || value?.image_data}
                  className={`h-full w-full object-cover min-h-[300px]`}
                  onError={e => e.currentTarget.src = '/images/placeholder-image.jpg'}
                />
                <div
                  onClick={onRemove}
                  className={'cursor-pointer absolute top-1 right-1 bg-black bg-opacity-70 rounded-full p-1.5 text-white hover:text-error'}
                >
                  <Icon name={'Trash'} size={18} />
                </div>
              </>
            }
            {haveValue && isFile &&
              <div className={'flex flex-row w-full px-3 py-3 space-x-3'}>
                <Icon name={'File'} size={24} className={'text-font'} />
                <div className={'flex-1 overflow-x-auto'}>
                  <div className={'body-strong truncate'}>
                    {value?.file_name || value?.url?.split('/').at(-1)}
                  </div>
                  <div className={'text-xs text-icon mt-1 mb-1'}>
                    {`${_round(value?.size / 1000 / 1000, 2)} MB`}
                  </div>
                  <Button
                    type={'primary'}
                    link
                    disabled={disabled}
                    className={'group-[.field-error]:hidden'}
                  >
                    {t('common_upload_button_open_file')}
                  </Button>
                </div>
                <div
                  onClick={onRemove}
                  className={'cursor-pointer pl-2 pb-2 text-font hover:text-error'}
                >
                  <Icon name={'Trash'} size={20} />
                </div>
              </div>
            }
          </div>
          <input
            ref={inputRef}
            type='file'
            id={name}
            className={'hidden'}
            onChange={onDrop}
            disabled={disabled}
            accept={_isEmpty(accept) ? '' : accept.join(', ')}
          />
        </label>
      </div>
    </>
  )
}

export default Upload