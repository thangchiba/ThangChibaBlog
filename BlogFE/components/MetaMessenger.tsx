import { MessengerChat } from 'react-messenger-chat-plugin'

export function MetaMessenger() {
  return (
    <MessengerChat
      pageId="113413278026734"
      language="vi_VN"
      themeColor={'#000000'}
      bottomSpacing={10}
      loggedInGreeting="loggedInGreeting"
      loggedOutGreeting="loggedOutGreeting"
    />
  )
}
