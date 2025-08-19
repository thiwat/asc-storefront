import _template from 'lodash/template'

let TRANSLATES: object = {
  ticket_type_player: 'Registration Form / แบบฟอร์มลงทะเบียน',
  ticket_type_player_description: 'You will receive 2 free concert tickets per 1 registered performer.\nท่านจะได้รับบัตรเข้าชมการแสดงฟรี 2 ใบ ต่อการลงทะเบียนนักแสดง 1 ท่าน',
  ticket_type_player_description_2: '***Performers do NOT need concert tickets\n***นักแสดงไม่ต้องซื้อบัตรเข้างาน',
  player_nickname: 'Performer\'s Nickname (in English)',
  plyaer_nickname_th: 'ชื่อเล่นภาษาอังกฤษ',
  player_name: "Performer's Full Name (in English) *This will be printed on certificate, please check carefully",
  player_name_th: 'ชื่อจริง-นามสกุล ภาษาอังกฤษ *ข้อมูลนี้จะปรากฏในใบประกาศนียบัตร โปรดตรวจสอบความถูกต้อง',
  parent_email: 'Parent\'s Email Address *Concert Tickets will be sent via this email, please check carefully',
  parent_email_th: 'อีเมลผู้ปกครอง *บัตรเข้าชมการแสดงจะถูกส่งไปยังอีเมลที่ระบุ โปรดตรวจสอบความถูกต้อง',
  parent_phone_no: 'Parent\'s Phone Number',
  parent_phone_no_th: 'เบอร์โทรศัพย์ผู้ปกครอง',
  ticket_type_watcher: 'Extra Concert Tickets',
  ticket_type_watcher_description: 'บัตรเข้าชมการแสดง กรณีที่ท่านต้องการซื้อบัตรเพิ่มเติม',
  total_ticket: 'Total Concert Tickets / จำนวนบัตรที่จะได้รับ',
  total_price: 'ราคาทั้งหมด',
  ticket_registration_fee: 'Registration Fee / ค่าลงทะเบียน',
  ticket_send_information: 'Concert Tickets will be sent to your email address within 48 hours\nบัตรเข้าชมการแสดงจะถูกส่งไปยังอีเมลของท่านภายใน 48 ชั่วโมง',
  payment_title: 'Payment',
  payment_account: '1101402067124\nพีรพล โอภาสพันธ์วงศ์',
  common_upload_title: 'Upload your slip',
  common_upload_button_upload: 'Upload File',
  payment_button_confirm_order: 'Submit',
  common_error_require: 'Please fill in this field',
  order_success_title: 'Order Confirmed',
  order_success_description: 'Thank you for your order. you will receive email confirmation shortly.'
}

export const t = (key: string, data?: unknown): string => {
  return _template(TRANSLATES[key] || key)(data)
}

export const setTranslate = (translate: object) => {
  TRANSLATES = translate
}
