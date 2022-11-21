import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { InfoContainer } from './style';

const Info = ({
  totalCount,
  stakingNfts,
  totalORT,
  isPark,
}: {
  totalCount: number;
  stakingNfts: number;
  totalORT: number;
  isPark: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [questCollapse, setQuestCollapse] = useState(false);

  return (
    <InfoContainer>
      <div className={`quest-box ${questCollapse ? 'collapse' : ''}`}>
        <div className="top">
          <h2>Unlock Quest</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            onClick={() => setQuestCollapse(!questCollapse)}
          >
            <path
              d="M12.276 18.943 16 15.219l3.724 3.724a1.333 1.333 0 1 0 1.885-1.886l-4.666-4.666a1.333 1.333 0 0 0-1.886 0l-4.666 4.666a1.333 1.333 0 1 0 1.885 1.886z"
              fill="#FFF"
              fillRule="nonzero"
            />
          </svg>
          <p className="description">
            {`Complete the list and
unlock the Parking contents.`}
          </p>
        </div>
        <div className="content">
          <div className="progress">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#5E4FFF" opacity=".2" cx="14" cy="14" r="14" />
                <path
                  d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 14 4z"
                  fill="#5E4FFF"
                  fillRule="nonzero"
                />
                <circle fill="#FFF" cx="14" cy="14" r="3" />
              </g>
            </svg>
            <div className="separator" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#E6E8EC" cx="10" cy="10" r="10" />
                <circle fill="#FFF" cx="10" cy="10" r="3" />
              </g>
            </svg>
            <div className="separator" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#E6E8EC" cx="10" cy="10" r="10" />
                <circle fill="#FFF" cx="10" cy="10" r="3" />
              </g>
            </svg>
            <div className="separator" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#E6E8EC" cx="10" cy="10" r="10" />
                <circle fill="#FFF" cx="10" cy="10" r="3" />
              </g>
            </svg>
            <div className="separator" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#E6E8EC" cx="10" cy="10" r="10" />
                <circle fill="#FFF" cx="10" cy="10" r="3" />
              </g>
            </svg>
          </div>
          <div className="step">
            <p>Become a Creator</p>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#0C0E20" cx="16" cy="16" r="16" />
                <path
                  d="M22 17v3.667c0 .736-.597 1.333-1.333 1.333h-9.334A1.333 1.333 0 0 1 10 20.667v-9.334c0-.736.597-1.333 1.333-1.333H15c.184 0 .333.15.333.333V11c0 .184-.149.333-.333.333h-3.667v9.334h9.334V17c0-.184.149-.333.333-.333h.667c.184 0 .333.149.333.333zm-.147-6.667-.18-.18a.5.5 0 0 0-.34-.153H17a.333.333 0 0 0-.333.333V11c0 .184.149.333.333.333h2.727L14.1 16.96a.333.333 0 0 0 0 .473l.467.467a.333.333 0 0 0 .473 0l5.627-5.62V15c0 .184.149.333.333.333h.667c.184 0 .333-.149.333-.333v-4.333a.5.5 0 0 0-.147-.34v.006z"
                  fill="#FCFCFD"
                />
              </g>
            </svg>
          </div>
          <div className="step">
            <p>Sync with XREATORS Discord</p>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#0C0E20" cx="16" cy="16" r="16" />
                <path
                  d="M22 17v3.667c0 .736-.597 1.333-1.333 1.333h-9.334A1.333 1.333 0 0 1 10 20.667v-9.334c0-.736.597-1.333 1.333-1.333H15c.184 0 .333.15.333.333V11c0 .184-.149.333-.333.333h-3.667v9.334h9.334V17c0-.184.149-.333.333-.333h.667c.184 0 .333.149.333.333zm-.147-6.667-.18-.18a.5.5 0 0 0-.34-.153H17a.333.333 0 0 0-.333.333V11c0 .184.149.333.333.333h2.727L14.1 16.96a.333.333 0 0 0 0 .473l.467.467a.333.333 0 0 0 .473 0l5.627-5.62V15c0 .184.149.333.333.333h.667c.184 0 .333-.149.333-.333v-4.333a.5.5 0 0 0-.147-.34v.006z"
                  fill="#FCFCFD"
                />
              </g>
            </svg>
          </div>
          <div className="step">
            <p>Join MBRC Discord Server</p>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#0C0E20" cx="16" cy="16" r="16" />
                <path
                  d="M18.793 13.793 16 16.586l-2.793-2.793a1 1 0 1 0-1.414 1.414l3.5 3.5a1 1 0 0 0 1.414 0l3.5-3.5a1 1 0 1 0-1.414-1.414z"
                  fill="#FCFCFD"
                />
              </g>
            </svg>
          </div>
          <div className="step">
            <p>Follow XREATORS twitter</p>

            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#0C0E20" cx="16" cy="16" r="16" />
                <path
                  d="M22 17v3.667c0 .736-.597 1.333-1.333 1.333h-9.334A1.333 1.333 0 0 1 10 20.667v-9.334c0-.736.597-1.333 1.333-1.333H15c.184 0 .333.15.333.333V11c0 .184-.149.333-.333.333h-3.667v9.334h9.334V17c0-.184.149-.333.333-.333h.667c.184 0 .333.149.333.333zm-.147-6.667-.18-.18a.5.5 0 0 0-.34-.153H17a.333.333 0 0 0-.333.333V11c0 .184.149.333.333.333h2.727L14.1 16.96a.333.333 0 0 0 0 .473l.467.467a.333.333 0 0 0 .473 0l5.627-5.62V15c0 .184.149.333.333.333h.667c.184 0 .333-.149.333-.333v-4.333a.5.5 0 0 0-.147-.34v.006z"
                  fill="#FCFCFD"
                />
              </g>
            </svg>
          </div>
          <div className="step">
            <p>Make a Vote in the Community</p>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#0C0E20" cx="16" cy="16" r="16" />
                <path
                  d="M18.793 13.793 16 16.586l-2.793-2.793a1 1 0 1 0-1.414 1.414l3.5 3.5a1 1 0 0 0 1.414 0l3.5-3.5a1 1 0 1 0-1.414-1.414z"
                  fill="#FCFCFD"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className={`status-box ${collapse ? 'collapse' : ''}`}>
        <div className="title-head">
          <h2>Parking Status</h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <path
              d="M12.276 18.943 16 15.219l3.724 3.724a1.333 1.333 0 1 0 1.885-1.886l-4.666-4.666a1.333 1.333 0 0 0-1.886 0l-4.666 4.666a1.333 1.333 0 1 0 1.885 1.886z"
              fill="#777E90"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="status-list">
          <div>
            <div className="head">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect fill="#5E4FFF" width="20" height="20" rx="6" />
                  <path
                    d="M12.5 13a1 1 0 0 0 1-1V7.5a1 1 0 0 0-1-1h-2.295a.5.5 0 0 1-.35-.145l-.71-.71a.5.5 0 0 0-.35-.145H5.5a1 1 0 0 0-1 1V12a1 1 0 0 0 1 1h7zm2-4.5V13a1 1 0 0 1-1 1h-7a1 1 0 0 0 1 1h6a2 2 0 0 0 2-2V9.5a1 1 0 0 0-1-1z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
              <p>Total MBRCs</p>
            </div>
            <div className="content">
              <p className="count">{totalCount}</p>
              <Button
                width="134px"
                height="32px"
                margin="0 auto"
                buttonTheme="black"
                disabled={!isPark}
                onClick={() => {}}
              >
                Park All
              </Button>
            </div>
          </div>
          <div>
            <div className="head">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect fill="#FA9EE4" width="20" height="20" rx="6" />
                  <path
                    d="M15.682 7.76 13.26 5.13a1.167 1.167 0 0 0-.858-.38H7.597c-.327 0-.638.138-.858.38L4.32 7.76a.583.583 0 0 0-.152.397v.175c0 .136.047.268.134.373l5.25 6.335a.583.583 0 0 0 .898 0l5.25-6.335a.583.583 0 0 0 .134-.373v-.175a.583.583 0 0 0-.151-.397zm-6.16 5.43-3.88-4.666a.148.148 0 0 1 .111-.274h2.071a.583.583 0 0 1 .583.402l1.395 4.405a.155.155 0 1 1-.28.134zm4.701-4.94h-3.599a.146.146 0 0 1-.11-.245l1.784-1.972a.146.146 0 0 1 .216 0l1.814 1.972a.146.146 0 0 1-.105.245z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
              <p>Parked MBRCs</p>
            </div>

            <div className="content">
              <p className="count">{stakingNfts}</p>
            </div>
          </div>
          <div>
            <div className="head">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect fill="#50A5FF" width="20" height="20" rx="6" />
                  <path
                    d="M14.667 5.333h-1.75V4.75a.583.583 0 0 0-.584-.583H7.667a.583.583 0 0 0-.584.583v.583h-1.75a.583.583 0 0 0-.583.584V8.25a2.333 2.333 0 0 0 2.333 2.333h.082a2.333 2.333 0 0 0 2.252 1.75v2.334H7.958a.292.292 0 0 0-.291.291v.584c0 .16.13.291.291.291h4.084c.16 0 .291-.13.291-.291v-.584a.292.292 0 0 0-.291-.291h-1.459v-2.334a2.333 2.333 0 0 0 2.252-1.75h.082A2.333 2.333 0 0 0 15.25 8.25V5.917a.583.583 0 0 0-.583-.584zM5.917 8.25V6.5h1.166v2.917A1.167 1.167 0 0 1 5.917 8.25zm8.166 0c0 .644-.522 1.167-1.166 1.167V6.5h1.166v1.75z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </g>
              </svg>

              <p>Earned ORT</p>
              <p className="count">{totalCount}</p>
            </div>
            <div className="content">
              <p className="count">{totalCount}</p>
            </div>
          </div>
          <div>
            <div className="head">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <rect fill="#00C389" width="20" height="20" rx="6" />
                  <path
                    d="M10 3.583a6.417 6.417 0 1 0 0 12.834 6.417 6.417 0 0 0 0-12.834zm-.614 10.5c-1.263 0-2.174-.348-2.737-1.04-.36-.443-.603-1.07-.732-1.876h2.468L10 14.083h-.614zm.842-4.82a1.85 1.85 0 0 1-.79.154H5.916c.076-1.12.338-1.958.794-2.507.545-.663 1.422-.993 2.623-.993h.103c.601 0 1.04.168 1.315.505.277.337.415.735.415 1.194 0 .23-.035.452-.1.671-.07.219-.17.409-.304.574a1.49 1.49 0 0 1-.535.401zm3.084 3.406c-.314.4-.742.674-1.28.831l-1.449-2.743c.45-.14.83-.342 1.141-.61.311-.267.564-.574.762-.924.194-.35.34-.724.43-1.123.091-.4.14-.803.14-1.21 0-.335-.036-.66-.097-.973.133.11.256.228.363.367.505.66.761 1.726.761 3.196-.003 1.473-.259 2.536-.771 3.189z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
              <p>Claimable ORT</p>
            </div>
            <div className="content">
              <p className="count">{Number(totalORT).toFixed(2)}</p>
              <Button
                width="134px"
                height="32px"
                margin="0 auto"
                buttonTheme="black"
                disabled={totalORT === 0}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Claim All
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="event-box">
        <h1>
          Event
          <br />
          Assets
          <br />
          of the Week
          <br />
        </h1>
        <p className="date">10.3~10.16</p>
      </div>
      {isOpen && (
        <Modal
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <h1 className="modal-title">Claim All Rewards</h1>
          <p className="description">
            Claim all cumulated ORTs you can at once and save on transaction
            fees.
          </p>
          <div className="claim-btn">
            <Button
              width="100%"
              height="48px"
              buttonTheme="black"
              onClick={() => {}}
            >
              Claim All
            </Button>
          </div>
          <div>
            <Button
              width="100%"
              height="48px"
              buttonTheme="white"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </InfoContainer>
  );
};

export default Info;
