import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import RandomGenerator from 'components/utils/RandomGenerator'

export async function getStaticProps({ locale }: { locale: string }) {
  const translation = await serverSideTranslations(locale, ['common'])
  return {
    props: translation,
  }
}

export default function Index() {
  return (
    <div>
      <RandomGenerator />
    </div>
  )
}
