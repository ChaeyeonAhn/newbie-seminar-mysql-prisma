import React from "react";
import axios from "axios";
import './App.css';

function App() {
  const [SFirstName, setSFirstName] = React.useState("");
  const [SLastName, setSLastName] = React.useState("");
  const [NAccNumber, setNAccNumber] = React.useState(0);
  const [NDeposit, setNDeposit] = React.useState(0);
  const [NWithdraw, setNWithdraw] = React.useState(0);
  const [NBalance, setNBalance] = React.useState(0);

  const [NDepositCount, setNDepositCount] = React.useState(0);
  const [NWithdrawCount, setNWithdrawCount] = React.useState(0);

  React.useEffect( () => {
    const asyncFun = async () => {
      const  data  = await axios.get( `http://localhost:8080/account/deposit`);
      console.log(data.data);
      // setNBalance(data.data.data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
  }, [NDepositCount, NBalance, NAccNumber]);

  const Deposit = () => {
    const asyncFun = async () => {
      const balance = await axios.post(`http://localhost:8080/account/${NAccNumber}/deposit`, { 
        firstName: SFirstName,
        lastName: SLastName,
        accNumber: NAccNumber,
        deposit: NDeposit
      }).then (response => {
        console.log(response);
        console.log(response.data.data);
      }).catch (error => {
        console.error('Deposit request failed:', error);
      });
      setNDepositCount(NDepositCount + 1);
      // console.log(balance);
      // setNBalance(balance.data.data);
      // setSFirstName("");
      // setSLastName("");
      // console.log(NBalance);
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const Withdraw = () => {
    const asyncFun = async () => {
      const balance = await axios.post(`http://localhost:8080/account/${NAccNumber}/withdraw`, { 
        firstName: SFirstName,
        lastName: SLastName,
        accNumber: NAccNumber,
        withdraw: NWithdraw
      }).then (response => {
        console.log(response);
        console.log(response.data.data);
      }).catch (error => {
        console.error('Withdraw request failed:', error);
      });
      setNWithdrawCount(NWithdrawCount + 1);
      // console.log(balance);
      // setNBalance(balance.data.data);
      // setSFirstName("");
      // setSLastName("");
      // console.log(NBalance);
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Chacha MySQL Assignment
        </p>
      </header>
      <p> Customer First Name </p>
      <input type={"text"} value={ SFirstName } onChange={(e) => setSFirstName(e.target.value)}/>

      <p> Customer Last Name </p>
      <input type={"text"}value={ SLastName } onChange={(e) => setSLastName(e.target.value)}/>

      <p> Customer Account Number </p>
      <input type={"number"} value={ NAccNumber } onChange={(e) => setNAccNumber(e.target.value)}/>

      <p> Deposit </p>
      <input type={"number"} value={ NDeposit } onChange={(e) => setNDeposit(e.target.value)}/>
      <div className={"deposit-button"} onClick={(e) => Deposit()}>Deposit!</div>

      <p> Withdraw </p>
      <input type={"number"} value = { NWithdraw } onChange={(e) => setNWithdraw(e.target.value)}/>
      <div className={"deposit-button"} onClick={(e) => Withdraw()}>Withdraw!</div>

      <p> Balance </p>
      <div>{ NBalance }</div>

    </div>
  );
}

export default App;
