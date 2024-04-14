import { MessengerChat } from 'react-messenger-chat-plugin'
import { useTheme } from 'next-themes'
import { useLocale } from '~/hooks/useLocale'
import { useTranslation } from 'next-i18next'

function getLocaleLanguageMessage(localeCodes: string) {
  if (localeCodes === 'vi') {
    return 'vi_VN'
  }
  if (localeCodes === 'ja') {
    return 'ja_JP'
  }
  return 'en_US'
}

export function MetaMessenger() {
  let { theme, resolvedTheme } = useTheme()
  let isDark = theme === 'dark' || resolvedTheme === 'dark'
  let [localeCodes] = useLocale()
  const languageLocale = getLocaleLanguageMessage(localeCodes.code)
  let { t } = useTranslation('common')
  return (
    <MessengerChat
      pageId="113413278026734"
      language={languageLocale}
      themeColor={isDark ? '#ffffff' : '#000000'}
      bottomSpacing={10}
      loggedInGreeting={t('fb_messenger.logged_in_greeting')}
      loggedOutGreeting={t('fb_messenger.logged_out_greeting')}
      greetingDialogDisplay={'show'}
    />
  )
}
