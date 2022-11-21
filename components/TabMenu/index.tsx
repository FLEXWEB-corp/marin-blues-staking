import styled from 'styled-components';

export default function TabMenu({
  tab,
  onMove,
}: {
  tab: 'single' | 'group';
  onMove: (tab: 'single' | 'group') => void;
}) {
  return (
    <Root>
      <div
        onClick={() => {
          onMove('single');
        }}
        className={`single ${tab === 'single' ? 'active' : ''}`}
      >
        <span>Single</span>
        <div>0</div>
      </div>
      <div
        onClick={() => {
          onMove('group');
        }}
        className={`group ${tab === 'group' ? 'active' : ''}`}
      >
        <span>Group</span>
        <div>0</div>
      </div>
    </Root>
  );
}

const Root = styled.div`
  display: none;
  gap: 0 19px;
  height: 48px;
  padding: 6px;
  border-radius: 12px;
  background-color: #f4f5f6;
  margin: 48px 0 16px;
  @media (max-width: 480px) {
    display: flex;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    span {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.75;
      color: #b1b5c3;
    }
    > div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 23px;
      height: 24px;
      border-radius: 6px;
      margin-left: 7px;
      background-color: #b1b5c3;
      font-weight: 600;
      color: #fcfcfd;
    }
    &.active {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      background-color: #fff;
      span {
        color: #0c0e20;
      }
      > div {
        background-color: #00c389;
      }
    }
  }
`;
