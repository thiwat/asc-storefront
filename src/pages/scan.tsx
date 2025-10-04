import _get from 'lodash/get'
import useScan from "@/services/scan"
import { Scanner } from "@yudiel/react-qr-scanner"
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'

const ScanPage = () => {

  const {
    status,
    showModal,
    onScan,
    onCloseModal
  } = useScan()

  const color = status == 'success'
    ? 'text-green-400'
    : 'text-red-400'

  return (
    <>
      <Scanner
        onScan={(code) => onScan(_get(code, '0.rawValue'))}
      />
      {showModal &&
        <>
          <div
            className='fixed top-0 left-0 w-screen h-screen bg-black opacity-50'
          />
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-screen h-screen max-w-[300px] max-h-[300px] flex flex-col justify-center items-center space-y-3 px-6'>
            {status === 'success'
              ? <Icon name={'CheckCircle'} weight={'fill'} size={48} className={'text-green-400'} />
              : <Icon name={'ExclamationMark'} weight={'fill'} size={48} className={'text-red-400'} />
            }
            <div className={`text-lg font-bold ${color}`}>
              {status == 'success' ? 'สำเร็จ' : 'ไม่สามารถใช้งานได้'}
            </div>
            <Button onClick={onCloseModal} type='primary'>
              {'ปิด'}
            </Button>

          </div>
        </>
      }
    </>

  )
}

export default ScanPage