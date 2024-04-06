import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import RandomGenerator from 'components/utils/RandomGenerator'
import TextToSpeech from '~/components/utils/TextToSpeech'

export async function getStaticProps({ locale }: { locale: string }) {
  const translation = await serverSideTranslations(locale, ['common'])
  return {
    props: translation,
  }
}

export default function Index() {
  return (
    <div>
      utils
      <RandomGenerator />
      <div className="my-5"></div>
      <TextToSpeech />
    </div>
  )
}
