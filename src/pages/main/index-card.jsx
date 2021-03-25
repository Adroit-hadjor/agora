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
import { useRecordWebcam } from 'react-record-webcam'
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
 const [refId,setRefId] = useState("")
  const routerCtx = useRouter()
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()

  const handleClick = () => {
    if(!name){
      alert("Input title please")
      return
    }
   // recordWebcam.open();
    sendTitle();
     
   
    if(toke){
      
      mutationCtx.startLoading()
      mutationCtx.updateConfig({
     
        token: toke,
      })
      routerCtx.history.push({
        pathname: `/meeting/casa`
      }) 
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
  })

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
    const saveToken = async() =>{ localStorage.setItem("token",tokenA)}
    console.log(tokenA)
    setToke(tokenA)
    const c = async()=> {await send(tokenA)}
    c();
  
  }

  const send = async(token)=>{
  
    const url = "tokens/1"
    const body = {
       token:token
    }
    const sa = await Put(url,body)
   


  }
  const recordWebcam = useRecordWebcam();

  return (
  <>
    

    <Box
      marginTop="114px"
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
    >
      <Link to="/setting" className="setting-btn" />
      
      <a
        href="https://github.com/AgoraIO/Basic-Video-Broadcasting/tree/master/OpenLive-Web"
        className="github"
      ></a>
      <div className="role-container">
        <CustomRadio
          className={classes.radio}
          value="host"
          checked={stateCtx.config.host}
          onClick={handleChange}
        ></CustomRadio>
       
      </div>
      <Box
        marginTop="92"
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <FormControl className={clsx(classes.input, classes.grid)}>
         <Input 
         placeholder="Enter Title Here"
            value={name}
            onChange={(evt) => {

              setName(evt.target.value)
             
            
            }} />
        </FormControl>
        <FormControl className={classes.grid}>
          <Button
            onClick={()=>{getResourceId();handleClick();}}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Start Live Streaming
          </Button>
        </FormControl>
      </Box>
    </Box>
    </>
  )
}
