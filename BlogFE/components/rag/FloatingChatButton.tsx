import React, { useState } from 'react'

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  // 1) Nguồn iframe
  const iframeSrc =
    'http://api.thangchiba.com:25020/chat/share?shared_id=15cb280cc86d11ef97b20242ac120004&from=chat&auth=Q4NWRiMmUwYzgxMzExZWY4ZTA0MDI0Mm'
  // 2) Ảnh nút bấm mở chat
  const chatButtonImage = '/static/icons/cuterobot2-removebg.png'
  // 3) Ảnh avatar ở header
  const avatarImage = '/static/icons/cuterobot2-removebg.png' // bạn thay path của bạn

  // 4) Bật/tắt chat
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* NÚT FLOATING CHAT */}
      <button
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          width: 90,
          height: 90,
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          zIndex: 9999,
          padding: 0,
          transform: 'scaleX(-1)',
        }}
      >
        <img
          src={chatButtonImage}
          alt="Chat Button"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      </button>

      {/* KHUNG CHAT (CHỈ ẨN/HIỆN THÔNG QUA STYLE) */}
      <div
        style={{
          // nếu isOpen = false => display none, isOpen = true => block
          display: isOpen ? 'block' : 'none',
          position: 'fixed',
          bottom: 90,
          right: 20,
          width: 400,
          height: 500,
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          borderRadius: 15,
          zIndex: 10000,
          overflow: 'hidden',
        }}
      >
        {/* Tạo 1 container để áp media query (full màn hình khi mobile) */}
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* HEADER */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#f5f5f5',
              padding: '10px 40px 10px 10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Avatar */}
            <img
              src={avatarImage}
              alt="Avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                marginRight: 8,
              }}
            />
            {/* Tiêu đề */}
            <span
              style={{
                fontWeight: 'bold',
                fontSize: 24,
                color: 'violet',
              }}
            >
              {/*ThangChiba&apos;s Slave*/}
              Nô tì của Thắng
            </span>

            {/* Nút đóng (X) ở góc phải */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '50%',
                right: 15,
                transform: 'translateY(-50%)',
                width: 30,
                height: 30,
                border: 'none',
                borderRadius: '50%',
                backgroundColor: '#ff4d4f',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>

          {/* IFRAME */}
          <div
            style={{
              width: '100%',
              height: 'calc(100% - 70px)', // trừ ra chiều cao của header
            }}
          >
            <iframe
              src={iframeSrc}
              frameBorder="0"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            ></iframe>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          div[style*='position: fixed'][style*='bottom: 90px'] {
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
          }

          div[style*='position: relative'][style*='background-color: #f5f5f5'] {
            padding: 15px 50px 15px 15px !important;
          }
        }
      `}</style>
    </>
  )
}
