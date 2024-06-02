
import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from "ton-core";

import WebApp from '@twa-dev/sdk';

WebApp.showAlert("Hi there!")

function App() {

  const {
    contract_address,
    contract_balance,
    counter_value,
//    recent_sender,
//    owner_address,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest
  } = useMainContract();

  const { connected } = useTonConnect()

  const showAlert = () => {
    WebApp.showAlert("Hi there!")
  }

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>

      <div>
       <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our contract address</b>
          <div className='Hint'>{contract_address?.slice(0,30) + "..."}</div>
          <b>Our contract balance</b>
          {contract_balance && (
            <div className='Hint'>{fromNano(contract_balance)}</div>
          )}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading ..."}</div>
        </div>  

        <a onClick={() => {
            showAlert()
          } 
          }>
            Show Alert
        </a>

        {connected && (
          <a onClick={() => {
            sendIncrement()
          } 
          }>
            Increment by 5
          </a>
        )}


        <br/>
        {connected && (
          <a onClick={() => {
            sendDeposit()
          } 
          }>
            Request deposit of 1 TON
          </a>
        )}

<br/>
        {connected && (
          <a onClick={() => {
            sendWithdrawalRequest()
          } 
          }>
            Request withdrawal of 1 TON
          </a>
        )}

      </div>
    </div>
  )
}

export default App
