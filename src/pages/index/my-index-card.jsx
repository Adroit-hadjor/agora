import React,{useState,useEffect} from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useGlobalState, useGlobalMutation } from '../../utils/container'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import useRouter from '../../utils/use-router'
import { Link } from 'react-router-dom'
import AgoraRTC from 'agora-rtc-sdk'
import {Post,Put} from '../../api'
import axios from 'axios'
import {Store} from '../../async'
import {REACT_APP_API_URL} from './../../api'
import { useRecordWebcam } from 'react-record-webcam'
import { HashRouter as Router, Route, Switch,useHistory } from 'react-router-dom'
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')

const CustomRadio = withStyles({
  root: {
    color: '#999999',
    '&$checked': {
      color: '#44A2FC'
    },
    '&:hover': {
      backgroundColor: 'inherit'
    }
  }
})(({ children, ...props }) => {
  return (
    <div className={`role-item ${props.checked ? 'active' : 'inactive'}`} onClick={(evt) => {
      props.onClick(props)
    }}>
      <div className={`icon-${props.value}`}></div>
      <div className={`radio-row ${props.value}`}>
        <div className="custom-radio">
          <input
            readOnly
            type="radio"
            value={props.value}
            checked={props.checked}
          />
          <div className="checkmark"></div>
        </div>
        <Box
          flex="1"
          className={`role-name ${props.checked ? 'active' : 'inactive'}`}
        >
          {props.value}
        </Box>
      </div>
    </div>
  )
})

const useStyles = makeStyles((theme) => ({
  fontStyle: {
    color: '#9ee2ff'
  },
  midItem: {
    marginTop: '1rem',
    marginBottom: '6rem'
  },
  item: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  coverLeft: {
    background: 'linear-gradient(to bottom, #307AFF, 50%, #46cdff)',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  coverContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    display: 'flex',
    minWidth: 700,
    minHeight: 500,
    maxHeight: 500,
    borderRadius: '10px',
    boxShadow: '0px 6px 18px 0px rgba(0,0,0,0.2)'
  },
  input: {
    maxWidth: '250px',
    minWidth: '250px',
    alignSelf: 'center'
  },
  inputx: {
    
    maxWidth: '250px',
    minWidth: '250px',
    alignSelf: 'center'
  },
  grid: {
    margin: '0 !important'
  },
  button: {
    lineHeight: '21px',
    color: 'rgba(255,255,255,1)',
    fontSize: '17px',
    textTransform: 'none',
    height: '44px',
    width: '260px',
    '&:hover': {
      backgroundColor: '#82C2FF'
    },
    margin: theme.spacing(1),
    marginTop: '33px',
    backgroundColor: '#44a2fc',
    borderRadius: '30px'
  },
  radio: {
    padding: '0',
    fontSize: '14px',
    // display: 'flex',
    alignItems: 'center',
    paddingRight: '5px'
  }
}))

export default function IndexCard () {
  const classes = useStyles()
 const [toke,setToke] = useState("")
 const [name,setName] = useState("")
 const [password,setPassword] = useState("")
 const [refId,setRefId] = useState("")
 const [pastor,setPastor] = useState(true)
 const [vmix,setVmix]=useState(false)
  const routerCtx = useRouter()
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()
  const history = useHistory();
  const [open, setOpen] = useState(false);




  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    if(pastor){

    //   await axios.post(`${REACT_APP_API_URL}/auth/local`, {
    //   identifier: name,
    //   password: password,
    // })
    // .then(
    //   (response)=>{

    //     if(response.data.user.roles==='Head Pastor'){
          history.push('/pastor'); 
        // }else{
        //   setOpen(true)
        // }
       
    //   }
    // )
    // .catch(

    // );
    //     return
    }
    if (vmix){
      // await axios.post(`${REACT_APP_API_URL}/auth/local`, {
      //   identifier: name,
      //   password: password,
      // })
      // .then(
      //   (response)=>{
      //     console.log(response.data)
      //     if(response.data.user.roles==='Vmixadmin'){
               routerCtx.history.push( '/upload' )
      //     }else{
      //       setOpen(true)
      //     }
        
      //   }
      // )
      // .catch(
  
      // );
      // return 
    }
  
     
  
  }


  const sendTitle =async() =>{
   
   const ah = await Store("title",name)
  }

  const handleChange = (evt) => {
    const { value, checked } = evt
    console.log('value', evt)
    mutationCtx.updateConfig({
      host: value === 'host',
     
    })
   
  }

  useEffect(()=>{
    createToken();
  },[])

  const getResourceId =async()=>{
   
    const cust_id ="98b9f5d2847a4605a8ab0a401993a750"
    const secret ="0dade57ed94546f4abf8d0b040a84723"
    const stringer = cust_id +":"+secret
    const encodedCredential = Buffer.from(stringer).toString('base64')
    const Authorization = "Basic " + encodedCredential

    const appID = process.env.REACT_APP_AGORA_APP_ID;
    console.log(" resourcebraaaaaaaaaaa ")
    const acquire = await axios.post(
      `https://api.agora.io/v1/apps/${appID}/cloud_recording/acquire`,
      {
        cname: "casa",
        uid: "1",
      
       clientRequest: {
        
        resourceExpiredHour: 24,
      },
      },
      { headers: { Authorization : Authorization},
     
    }
    );
    console.log("res is "+acquire.data.resourceId )
    const mode="mix"
    var waitTill = new Date(new Date().getTime() + 5 * 1000);
  /*   while(waitTill > new Date()){
     
      console.log(JSON.stringify(start))
    } */
    
  console.log("res is "+acquire.data.resourceId )
    const save = await Store("resourceId", acquire.data.resourceId)
  
  }


  const createToken = () =>{
    const appID = 'c40594061e1f4580aae3b2af1963d01e';
    const appCertificate = '3fc30bdae6174ab9be11d72f2ddb43a7';
    const channelName = 'casa'
    const uid = "0";
    //const account = "2882341273";
    const role = RtcRole.PUBLISHER;
    
    const expirationTimeInSeconds = 86300
    
    const currentTimestamp = Math.floor(Date.now() / 1000)
    
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    
    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.
    
    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
    const saveToken = async() =>{ 
      let bod={
        token:tokenA
      }
      localStorage.setItem("token",tokenA);
      let body=JSON.stringify(bod)
      await fetch(`${REACT_APP_API_URL}/api/token/`, {
        method: 'PUT',
        headers: {
             
            'Content-Type': 'application/json',
        },
       body:body
      }).then((response)=>{
        console.log('succeeded',response)
      }).catch((error)=>{
        console.log('failed',error.message)
      })
    }
    saveToken()
    console.log('yh',tokenA)
    setToke(tokenA)
    const c = async()=> {await send(tokenA)}
    c();
  
  }

  const send = async(token)=>{
  console.log("sdsd")
   
  }
  const recordWebcam = useRecordWebcam();

  return (
  <>
    

  <div style={{display:"flex",border:"0px solid red",height:"auto",flexDirection:"column",justifyContent:"space-around",width:"100%",padding:"50px"}}>
    
      
     <div style={{border:"0px solid ",display:"flex",justifyContent:"space-between",padding:"10px 0px"}}>
    <div>
    <input name
            
            type="radio"
            value="pastor"
            checked={pastor}
            onChange={()=>{setPastor(true);setVmix(false)}}
          />Pastor
        </div>
<div>
<input style={{borderRadius:"100px",border:"6px solid red"}}
            readOnly
            type="radio"
            value="vmix"
           checked={vmix}
            onChange={()=>{setPastor(false);setVmix(true)}}
          />Vmix Admin
</div>
          
     </div>
     
   
       <form onSubmit={handleClick} style={{border:"0px solid black",display:"flex",flexDirection:"column",padding:10}}>
     <FormControl >
         <Input 
         placeholder="Enter Username Here"
            value={name}
            onChange={(evt) => {

              setName(evt.target.value)
             
            
            }} />
        </FormControl>
        <FormControl  >
         <Input 
         type="password"
         placeholder="Enter Password Here"
            value={password}
            onChange={(evt) => {

              setPassword(evt.target.value)
             
            
            }} />
        </FormControl>
    
      
     
       
        <FormControl >
          <Button
           /*  onClick={()=>{handleClick();}} */
           type='submit'
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </FormControl>
        
        </form>

    
           </div>
    </>
  )
}
