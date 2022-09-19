import type { NextPage } from 'next'
import { useState } from 'react'
import Group from '../components/Group'
import Info from '../components/Info'
import Single from '../components/Single'
import { StackingPageProps } from './index.types'
import { MainContainer, TabModal } from './index.styles'

const StackingPage: NextPage<StackingPageProps> = ({
  tab,
  tabClick,
  onChangeTab,
  onClickTabChoice,
}): JSX.Element => {
  return (
    <MainContainer>
      <img className="crystal-img" src="/images/crystal.png" alt="crystal" />
      <div className="top-title">
        <h1>
          Staking <span>{tab}</span>
        </h1>
        <div className="arrow-inner">
          <img src="/images/arrow-down.png" onClick={onChangeTab} />
          {tabClick && (
            <TabModal>
              <div className="tab-inner">
                {['NFTs', 'ORT'].map(item => (
                  <p
                    className={item === tab ? 'color' : ''}
                    onClick={() => onClickTabChoice(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </TabModal>
          )}
        </div>
      </div>

      <Info />
      <Single />
      <Group />
    </MainContainer>
  )
}

export default StackingPage
