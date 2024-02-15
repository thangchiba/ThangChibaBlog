import { MessengerChat } from 'react-messenger-chat-plugin'

export function MetaMessenger() {
  return (
    <MessengerChat
      pageId="113413278026734"
      language="vi_VN"
      themeColor={'#000000'}
      bottomSpacing={10}
      loggedInGreeting="Đây là mục chat riêng tư với tôi, hãy để lại tin nhắn của bạn"
      loggedOutGreeting="Xin chào và hẹn gặp lại"
    />
  )
}
