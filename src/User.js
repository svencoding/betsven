import './App.css';
import { getDatabase, ref, onValue, push } from "firebase/database";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import random from 'alphanumeric'

export function UserPage() {

  const [totalBets, setTotalBets] = useState([]);
  const [coupon, setCoupon] = useState([])
  const [showConfirmation, setShowConfirmation] = useState()
  const [id,setId] = useState();

  const writeTransaction = (id,coupon,date) => {
    console.log(id,coupon,date)
    const db = getDatabase();
    push(ref(db, 'transactions/'), {
      id,
      coupon,
      date
    });
  }


  const db = getDatabase();
  useEffect(()=>{
    const starCountRef = ref(db, 'bets/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      Object.values(data)
      setTotalBets(Object.values(data));
    });
  },[])

  const handleAddToCoupon = (e) =>{
    console.log('e',e)
    if(coupon.length === 3){
      console.log('hola')
      toast("Se pueden agregas un máximo de 3 selecciones");
      return;
    } 
    let alreadyOnCoupon = false
    // eslint-disable-next-line array-callback-return
    coupon.map(state =>{if(state.name === e.name){alreadyOnCoupon = true} })

    if(alreadyOnCoupon){
      console.log('hola 2')
      toast("Esta selección ya existe en tu cupón, mongol");
      return;
    }
    setCoupon((prevState)=>{
      return [...prevState,e]
    })
  }

  const handlePutBet = () =>{
    setShowConfirmation(true);
    let id = random(5) //EKdJ4
    writeTransaction(id,coupon,moment().format('DD MM YYYY hh:mm'))
    setId(id);
  }

  let cuponMultiplier = 0
  return (
    <div >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Apuestas
        </p>

        {showConfirmation &&
        
        <div style={{border:'3px solid red',marginBottom:30,padding:20}}>
          ¡Listo!
          <div>
            Ahora solo envía un YAPE al número +51949215428 con el código "{id}" como mensaje,
            procura hacerlo antes de que acabe el tiempo de una de tus selecciones
          </div>
          <div style={{marginTop:30}}>
            Acuérdate que el máximo de apuesta en singulares es 20 soles y en combinadas 5.
            Para otras preguntas lee nuestros <Link style={{color:'lightblue'}} to="/terms">Terminos y condiciones</Link>
          </div>
        </div>
        }

        {!showConfirmation && coupon.length > 0 && 
          <div style={{border:'2px solid lightblue',marginBottom:30,padding:20}}>
            <p>Tu cupón</p>
            <button onClick={()=>setCoupon([])}>Eliminar cupón</button>
              {coupon.map(e => {
                console.log(e)
                if(cuponMultiplier === 0){
                  cuponMultiplier = e.stake;
                }
                else{
                  cuponMultiplier = cuponMultiplier*e.stake
                }
                return <div>{e.name} - {e.stake}</div>
              })
              }
              <div>Stake: <span style={{textDecoration:'line-through'}}>{(cuponMultiplier*1).toFixed(2)}</span></div>
              <div style={{fontWeight:'bold'}}>Nos volvimos locos! ¡Nueva cuota!: <span>{(cuponMultiplier*1*0.9).toFixed(2)}</span></div>
            <button onClick={()=>handlePutBet()} style={{padding:10}}>Colocar apuesta</button>
          </div>
        }

        {console.log(moment().diff(moment('30/12/2022', 'DD-MM-YYYY'),'hours'),'EUY')}
        {totalBets.sort((a,b)=> moment(b.date, 'DD-MM-YYYY') - moment(a.date, 'DD-MM-YYYY')).map((e)=>{
          if(moment().diff(moment(e.date, 'DD-MM-YYYY'),'hours') > 24){
            return(
              <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',width:'80%',border:'1px solid white',margin:'auto',marginBottom:30 }}>
              <div style={{ flex: 1, textDecoration:'line-through'  }}>{e.name}</div>
              <div style={{ flex: 1, textDecoration:'line-through'  }}>Límite: {e.hour} del {e.date}</div>
              <div style={{ flex: 1, textAlign: 'right',textDecoration:'line-through' }}>Cuota: {e.stake}</div>
              <div style={{ flex: 1,backgroundColor:'red',color:'white',marginLeft:20 }}>Inactiva</div>
              </div>
            )
          } else {
            return(
              <div onClick={()=>handleAddToCoupon(e)} style={{cursor:'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center',width:'80%',border:'1px solid white',margin:'auto',marginBottom:30}}>
              <div style={{ flex: 1 }}>{e.name}</div>
              <div style={{ flex: 1 }}>Límite: {e.hour} del {e.date}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>Cuota: {e.stake}</div>
              <div style={{ flex: 1,backgroundColor:'green',color:'white',marginLeft:20}}>Activa</div>
              </div>
            )
          }

        })}
    </div>
  );
}

