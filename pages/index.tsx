import type { NextPage } from 'next'
import { useState } from 'react'
import StackingPage from './index.view'

const Home: NextPage = () => {
  const [tab, setTab] = useState<string>('NFTs')
  const [tabClick, setTabClick] = useState(false)

  const onChangeTab = () => {
    setTabClick(prev => !prev)
  }
  const onClickTabChoice = (item: string) => {
    setTab(item)
    setTabClick(false)
  }

  return (
    <StackingPage
      tab={tab}
      tabClick={tabClick}
      onChangeTab={onChangeTab}
      onClickTabChoice={onClickTabChoice}
    />
  )
}

export default Home
