const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input disabled = {!isValid} type="submit" width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  const TransactionOption = ({onChange}) =>{
    return (
        <div className="select-options">
            <label>Select an action below to continue</label><br/>
            <select onChange={onChange} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">Deposit</option>
            <option id="cashback-selection" value="Cash Back">Cash Back</option>
            </select>
        </div>
        
    )

};

  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
  
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [validOption, setValidOption] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    console.log(`valid option is : ${validOption}`);
    const handleChange = (event) => {
      let cantidad = event.target.value;
      console.log(`handleChange ${cantidad}`);
      setDeposit(Number(cantidad));
      if(cantidad <= 0 || (!isDeposit && cantidad > totalState)){
        setValidTransaction(false);
      }
      else if(isDeposit || (cantidad <= totalState) ){
         setValidTransaction(true);
      }
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(true);
      event.preventDefault();
    };
  
    const handleModeSelect = e => {
      let option = e.target.value;
      if (option === ""){
         setValidOption(false);
         console.log(`valid option is vacio`);
      }
      else if(option === 'Deposit'){
        setIsDeposit(true);
        setValidTransaction(true);
        setValidOption(true);
        console.log(`valid option is deposit`);
      }
      else{
        setIsDeposit(false);
        setValidOption(true);
        console.log(`valid option is retiro`);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
            <h2 id="total">{status}</h2>
        <TransactionOption onChange={handleModeSelect} ></TransactionOption>
        {
          validOption && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        }
        
       
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));