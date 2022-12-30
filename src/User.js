import './App.css';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
export function UserPage() {

  const [totalBets, setTotalBets] = useState([]);
  const [coupon, setCoupon] = useState([])
  const db = getDatabase();
  useEffect(()=>{
    const starCountRef = ref(db, 'bets/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      Object.values(data)
      setTotalBets(Object.values(data));
    });
  },[])

  console.log(totalBets,'totalBets')
  let cuponMultiplier = 0
  return (
    <div >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Apuestas
        </p>

        {coupon.length > 0 && 
          <div>
            <p>Tu cupón</p>
            {coupon.map(e =>{
              if(cuponMultiplier === 0){
                cuponMultiplier = e.stake;
              }
              else{
                cuponMultiplier = cuponMultiplier*e.stake
              }
              <div>{e.name} - {e.stake}</div>
            })
            }
          </div>
        }

        {totalBets.sort((a,b)=> moment(b.date, 'DD-MM-YYYY') - moment(a.date, 'DD-MM-YYYY')).map((e)=>{
          if(moment().diff(moment(e.date, 'DD-MM-YYYY')) > 0){
            return(
              <div onClick={()=>setCoupon(coupon.push(e))} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',width:'80%',border:'1px solid white',margin:'auto',marginBottom:30 }}>
              <div style={{ flex: 1, textDecoration:'line-through'  }}>{e.name}</div>
              <div style={{ flex: 1, textDecoration:'line-through'  }}>Límite: {e.hour} del {e.date}</div>
              <div style={{ flex: 1, textAlign: 'right',textDecoration:'line-through' }}>Cuota: {e.stake}</div>
              <div style={{ flex: 1,backgroundColor:'red',color:'white',marginLeft:20 }}>Inactiva</div>
              </div>
            )
          } else {
            return(
              <div onClick={()=>setCoupon(coupon.push(e))} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',width:'80%',border:'1px solid white',margin:'auto',marginBottom:30}}>
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

