import _range from 'lodash/range'
import QRCode from 'react-qr-code'
import Form, { FormItem, useForm, useWatch } from "@/components/form/Form"
import Input from "@/components/form/Input"
import QtyInput from "@/components/form/QtyInput"
import Card from "@/components/ui/Card"
import Icon from "@/components/ui/Icon"
import { t } from "@/utils/translate"
import { generatePromptPay } from '@/utils/promptpay'
import Upload from '@/components/form/Upload'
import Button from '@/components/ui/Button'
import { requestUploadAttachment } from '@/apis/client/attachment'
import { useState } from 'react'
import Image from 'next/image'
import { requestPlaceOrder } from '@/apis/client/order'

const HomePage = () => {

  const [form] = useForm()
  const [submit, setSubmit] = useState<boolean>(false)

  const playerQty = useWatch('player_qty', form) || 0
  const watcherQty = useWatch('watcher_qty', form) || 0

  const totalQty = playerQty + watcherQty
  const totalPrice = ((playerQty * 1000) + (watcherQty * 300))

  const onPlaceOrder = async (values: any) => {
    const { url } = await requestUploadAttachment({
      file_name: values?.slip_url?.file_name,
      path: 'slip',
      image_data: values?.slip_url?.image_data
    })

    await requestPlaceOrder({
      user: { email: values.email, mobile_no: values.phone_no },
      slip_url: url,
      items: {
        players: values.players,
        extra_ticket: values.watcher_qty
      }
    })
    setSubmit(true)
  }

  if (submit) {
    return (
      <div className={'w-full h-full px-12 flex flex-col justify-center items-center'}>
        <Image
          src={'/images/correct-circle.svg'}
          height={150}
          width={150}
          alt='success'
        />
        <div className={'header text-center mt-6'}>
          {t('order_success_title')}
        </div>
        <div className={'body-base text-center mt-3'}>
          {t('order_success_description')}
        </div>
      </div>
    )
  }

  return (
    <>
      <Form
        form={form}
        name={'home-form'}
        className={'space-y-3'}
        onFinish={onPlaceOrder}
      >
        <Card>
          <div className={'body-strong'}>
            {t('ticket_type_player')}
          </div>
          <div className={'tagline-base text-font-light mt-1 whitespace-pre-line'}>
            {t('ticket_type_player_description')}
          </div>
          <div className={'tagline-base text-font-light !text-error mt-1 whitespace-pre-line'}>
            {t('ticket_type_player_description_2')}
          </div>
          <div className={'flex flex-row items-center mt-2'}>
            <div className={'flex flex-1 flex-col'}>
              <div className={'body-strong mb-1'}>
                {t('ticket_registration_fee')}
              </div>
              <div className={'flex flex-row items-center space-x-3'}>
                <Icon
                  name={'Coins'}
                  size={24}
                  className={'text-icon'}
                />
                <div className={'body-strong text-primary'}>
                  {`1,000 ฿`}
                </div>
              </div>
            </div>
            <FormItem
              name={'player_qty'}
              noStyle
            >
              <QtyInput min={0} max={10} />
            </FormItem>
          </div>
          {playerQty > 0 &&
            <div className={'py-3 space-y-3'}>
              {_range(playerQty).map((i, index) => {
                return (
                  <div key={`item-${index}`}>
                    <FormItem
                      label={t('player_name')}
                      name={['players', index, 'name']}
                      description={t('player_name_th')}
                      required
                    >
                      <Input />
                    </FormItem>
                    <FormItem
                      label={t('player_nickname')}
                      name={['players', index, 'nickname']}
                      description={t('plyaer_nickname_th')}
                      required
                    >
                      <Input />
                    </FormItem>
                    {index < playerQty - 1 && (
                      <div className={'h-px w-full bg-line my-4'} />
                    )}
                  </div>
                )
              })}
            </div>
          }
        </Card>
        <Card>
          <div className={'body-strong'}>
            {t('ticket_type_watcher')}
          </div>
          <div className={'tagline-base text-font-light mt-1'}>
            {t('ticket_type_watcher_description')}
          </div>
          <div className={'flex flex-row items-center mt-2'}>
            <div className={'flex flex-1 flex-row items-center space-x-3'}>
              <Icon
                name={'Coins'}
                size={24}
                className={'text-icon'}
              />
              <div className={'body-strong text-primary'}>
                {`300 ฿`}
              </div>
            </div>
            <FormItem
              name={'watcher_qty'}
              noStyle
            >
              <QtyInput min={0} max={10} />
            </FormItem>
          </div>
        </Card>
        <Card>
          <FormItem
            label={t('parent_email')}
            name={'email'}
            description={t('parent_email_th')}
            required
          >
            <Input />
          </FormItem>
          <FormItem
            label={t('parent_phone_no')}
            name={'phone_no'}
            description={t('parent_phone_no_th')}
            required
          >
            <Input />
          </FormItem>
        </Card>
        <Card>
          <div className={'flex flex-row items-center justify-between'}>
            <div className={'body-base'}>
              {t('total_ticket')}
            </div>
            <div className={'body-strong'}>
              {(playerQty * 2) + (watcherQty)} ใบ
            </div>
          </div>
          <div className={'tagline-base text-font-light mb-2 whitespace-pre-line'}>
            {t('ticket_send_information')}
          </div>
          <div className={'flex flex-row items-center justify-between'}>
            <div className={'body-strong'}>
              {t('total_price')}
            </div>
            <div className={'subheader-strong !text-primary'}>
              {totalPrice.toLocaleString()} ฿
            </div>
          </div>
        </Card>
        {totalQty > 0 &&
          <Card>
            <div className={'body-strong mb-6'}>
              {t('payment_title')}
            </div>
            <QRCode
              value={generatePromptPay('1101402067124', totalPrice)}
              className={'mx-auto'}
              size={192}
            />
            <div className={'body-base mt-3 whitespace-pre-line text-center mb-6'}>
              {t('payment_account')}
            </div>
            <FormItem
              name={'slip_url'}
              required
            >
              <Upload
                name={'slip'}
                accept={['image/png', 'image/jpeg', 'image/jpg']}
              />
            </FormItem>
            <Button type={'primary'} htmlType={'submit'} className={'mt-6'}>
              {t('payment_button_confirm_order')}
            </Button>
          </Card>
        }
      </Form>
    </>
  )
}

export default HomePage