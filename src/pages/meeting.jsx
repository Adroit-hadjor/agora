import React, { useEffect, useState, useMemo } from 'react'
import clsx from 'clsx'
import { useGlobalState, useGlobalMutation } from '../utils/container'
import { makeStyles } from '@material-ui/core/styles'
import useRouter from '../utils/use-router'
import useStream from '../utils/use-stream'
import RTCClient from '../rtc-client'
import Tooltip from '@material-ui/core/Tooltip'
import LiveTvIcon from '@material-ui/icons/LiveTv';
import CircularProgress from '@material-ui/core/CircularProgress'
import {Put} from '../api'
import StreamPlayer from './meeting/stream-player'
import io from "socket.io-client";
import { List,InfiniteLoader } from "react-virtualized";
import axios from 'axios'
import {Store,Get} from '../async'
import { css } from '@emotion/css'
import {
  RecordWebcam,
  useRecordWebcam,
  CAMERA_STATUS
} from "react-record-webcam";
import ScrollToBottom ,{useScrollToBottom,useSticky}from 'react-scroll-to-bottom';
import ScrollableFeed from 'react-scrollable-feed'
import { Button } from '@material-ui/core'
import { TvRounded } from '@material-ui/icons'
import {REACT_APP_API_URL} from './../api'


const useStyles = makeStyles({
  menu: {
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customBtn: {
    width: '50px',
    height: '50px',
    marginLeft: '20px',
    borderRadius: '26px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundSize: '50px',
    cursor: 'pointer'
  },
  leftAlign: {
    display: 'flex',
    flex: '1',
    justifyContent: 'space-evenly'
  },
  rightAlign: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center'
  },
  menuContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: '2'
  },
  chat:{
    position:"absolute",
    bottom:0,
    left:0,
    border:"1px solid black",
    height:300,
    width:300,

  }
})

const MeetingPage = () => {

  const classes = useStyles()
  const recordWebcam = useRecordWebcam();
  const routerCtx = useRouter()
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()
  const [say,setSay]=useState(0)
 
  const ROOT_CSS = css({
  
   position:"absolute",
   bottom:0,
   border: '1px solid red',
    height:400,
    width:400,
   
   zIndex:1000000,
   backgroundColor:"transparent"

  });
  
  useEffect(()=>{
    record();
  },[say])
  
  const localClient = useMemo(() => {
    const client = new RTCClient()
    if (!client._created) {
      client.createClient({ codec: stateCtx.codec, mode: stateCtx.mode })
      client._created = true
    }
    return client
  }, [stateCtx.codec, stateCtx.mode])
 const [ isRecording,setIsRecording] = useState(false)
  const [localStream, currentStream] = useStream(localClient)
  const [muteVideo, setMuteVideo] = useState(stateCtx.muteVideo)
  const [muteAudio, setMuteAudio] = useState(stateCtx.muteAudio)
  const [sid, setSid] = useState("")
  const [messages,setMessages] = useState([ ])
  const [count,setCount]=useState(0)
  const [counter,setCounter]=useState(0)
  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
  

  const [opacity,setOpacity]=useState(true)
// useEffect(()=>{
//   socket.on('chat message', (ch)=> {
//     console.log(ch)
//     if(Object.keys(ch).length>0){
//      setm(ch)
//     }
  
//     /* if(messages.length > 6){
//       setMessages([])
//     } */
      
    
//      })
//      return () => {
//       socket.off("chat message");
//     };
// },[count])
// useEffect(()=>{

// socket.on('fire', (ch)=> {

     
    
//      setf()
    
    
//      })
//      return () => {
//       socket.off("chat message");
//     };
// },[counter])

const send = async()=>{
  const t ="21221"
  const url = "api/token"
  console.log("step 1")
  const body = {
     token:t
  }
  console.log("step 2")
  const sa = await Put(url,body)
 
}


const record = async()=>{
if(recordWebcam.status==="INIT"){
  recordWebcam.start();
}
else if(recordWebcam.status==="CLOSED"){
  recordWebcam.open();
}
else if(recordWebcam.status==="RECORDING"){
  recordWebcam.stop();
}
else if(recordWebcam.status==="PREVIEW"){
  recordWebcam.download();
}
      console.log("status is "+recordWebcam.status)
 /* 
  const cust_id ="f6e4ed00e2354a7a81cc51dd54319d62"
  const secret ="6377755919704abea22d0a99d539dd3f"
  const stringer = cust_id +":"+secret
  const encodedCredential = Buffer.from(stringer).toString('base64')
  const Authorization = "Basic " + encodedCredential
  const resourceId = await Get("resourceId")
  
 
  const appID = '1affe319d604483b9a0d45eb8b460c46';
 const mode = "mix"

 
 console.log(" resourcebraaaaaaaaaaa ")


 const start = await axios.post(
      
  `https://api.sd-rtn.com/v1/apps/${appID}/cloud_recording/resourceid/${resourceId}/mode/${mode}/start`,
  {
    cname: "casa",
    uid: "1",
    clientRequest: {
   
      recordingConfig: {
        maxIdleTime: 30,
        streamTypes: 2,
        channelType: 1,
        videoStreamType:1,
        transcodingConfig: {
            height: 640, 
            width: 360,
            bitrate: 500, 
            fps: 15, 
            mixedVideoLayout: 1,
            backgroundColor: "#FF0000",
                    }
    }, 
    recordingFileConfig: {
        avFileType: ["hls"]
    },
      storageConfig: {
        vendor: 1,
        region: 1,
        bucket: "samtv1",
        accessKey: "AKIAXLPJGNHWD2CNML6I",
        secretKey: "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",
        fileNamePrefix: ["directory1", "directory2"],
      },
    },
  },
  { headers: {Authorization} 
  } 
);
  console.log("start.data")
  console.log(JSON.stringify(start))
 setSid(start.data.sid) */

}

const stopRec = async()=>{
 
  recordWebcam.stop();
 
      recordWebcam.download()
     
/*  console.log("sisisisis")
  const cust_id ="f6e4ed00e2354a7a81cc51dd54319d62"
  const secret ="6377755919704abea22d0a99d539dd3f"
  const stringer = cust_id +":"+secret
  const encodedCredential = Buffer.from(stringer).toString('base64')
  const Authorization = "Basic " + encodedCredential
   const resourceId = await Get("resourceId")
 
 
  const appID = '1affe319d604483b9a0d45eb8b460c46';
 const mode = "mix"

 
 console.log(" resourcebraaaaaaaaaaa sid ")


 const stop = await axios.post(
      
  `https://api.sd-rtn.com/v1/apps/${appID}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/${mode}/stop`,
  {
    cname: "casa",
    uid: "1",
    clientRequest: {
     token:stateCtx.config.token,
      
    },
  },
  { headers: {Authorization} 
  } 
).then(response=>{
  console.log(JSON.stringify(response))
});
console.log("sid is ")
console.log(sid)
console.log(JSON.stringify(stop)) */
 
}

const setm = (ch) =>{
  setMessages([...messages,ch])
  
  setCount(count+1)
 
}

const setf = () =>{
  setCounter(counter+1)

}
const shutdown = () =>{
   

}


  const config = useMemo(() => {
    return {
      token: stateCtx.config.token,
      channel: "casa",
      microphoneId: stateCtx.config.microphoneId,
      cameraId: stateCtx.config.cameraId,
      resolution: stateCtx.config.resolution,
      muteVideo: muteVideo,
      muteAudio: muteAudio,
      uid: "0",
      host: stateCtx.config.host
      
    }
  }, [stateCtx, muteVideo, muteAudio])


  
  useEffect(() => {
    if (
      config.channel &&
      localClient._created &&
      localClient._joined === false
    ) {
      localClient
        .join(config)
        .then((uid) => {
          if (config.host) {
            localClient.publish()
          }
          mutationCtx.updateConfig({ uid })
          mutationCtx.stopLoading()
        })
        .catch((err) => {
          alert('Error is here')
          // mutationCtx.toastError(`Media ${err.info}`)
           routerCtx.history.push('/')
        })
    }
  }, [localClient, mutationCtx, config, routerCtx])





  useEffect(() => {
    return () => {
      localClient && localClient.leave(() => mutationCtx.clearAllStream())
    }
  }, [localClient])

  const history = routerCtx.history

  const params = new URLSearchParams(window.location.search)

  useEffect(() => {
    const roleParams = params.get('role')
    if (!config.channel && roleParams !== 'audience') {
      history.push('/')
    }
  }, [config.channel, history, params])

  
  const handleClick = (name) => {
    return (evt) => {
      evt.stopPropagation()
      switch (name) {
        case 'video': {
          muteVideo
            ? localStream.muteVideo()
            : localStream.unmuteVideo()
          setMuteVideo(!muteVideo)
          break
        }
        case 'audio': {
         
          muteAudio
            ? localStream.muteAudio()
            : localStream.unmuteAudio()
          setMuteAudio(!muteAudio)
          break
        }
        case 'screen': {
          
          if(isRecording){
           
          // setIsRecording(false)
          const ans =()=>{
            console.log("ans")
            return(
              recordWebcam.stop
             // recordWebcam.download
            )
           
           }
           const ans2 =()=>{
            console.log("ans2")
            return(
            
              recordWebcam.download
            )
           
           }
        
          
              const down = () =>{
                console.log("is working")
                ans();
                ans2();
            }
              down();
          
          }
          break
        }
        case 'profile': {

          break
        }
        default:
          throw new Error(`Unknown click handler, name: ${name}`)
      }
    }
  }

  const handleDoubleClick = (stream) => {
    mutationCtx.setCurrentStream(stream)
  }

  const otherStreams = useMemo(() => {
    return stateCtx.streams.filter(
      (it) => it.getId() !== currentStream.getId()
    )
  }, [stateCtx.streams, currentStream])
  const [started,setStarted]=useState(false)
  return (
    <>

    <div className="meeting">
   
      <div className="current-view">
        <div className="nav">
          <div >
           
          </div>
          <Tooltip title="quit">
            <div
              className="quit"
              onClick={ async() => { 
                   await recordWebcam.download();
                   recordWebcam.close();
                   send();
                   localClient.leave().then(() => {
                    
                  mutationCtx.clearAllStream()
                  // mutationCtx.resetState()
                  routerCtx.history.push('/')
                })   
              }}
            ></div>
          </Tooltip>
        </div>
        {currentStream ? (
          <StreamPlayer
            className={'main-stream-profile'}
            showProfile={stateCtx.profile}
            local={
              config.host
                ? currentStream &&
                  localStream &&
                  currentStream.getId() === localStream.getId()
                : false
            }
            stream={currentStream}
            onDoubleClick={handleDoubleClick}
            uid={currentStream.getId()}
            domId={`stream-player-${currentStream.getId()}`}
          >
            <div className={classes.menuContainer}>
              {config.host && (
                <div className={classes.menu}>
                  <Tooltip title={muteVideo ? 'mute-video' : 'unmute-video'}>
                    <i
                      onClick={handleClick('video')}
                      className={clsx(
                        classes.customBtn,
                        muteVideo ? 'mute-video' : 'unmute-video'
                      )}
                    />
                  </Tooltip>
                  <Tooltip title={muteAudio ? 'mute-audio' : 'unmute-audio'}>
                    <i
                      onClick={handleClick('audio')}
                      className={clsx(
                        classes.customBtn,
                        muteAudio ? 'mute-audio' : 'unmute-audio'
                      )}
                    />
                  </Tooltip>
                  <Tooltip title={stateCtx.screen ? 'stop-screen-share' : 'start-screen-share'}>
                    <i
                      onClick={()=>record()}
                      className={clsx(
                        classes.customBtn,
                        recordWebcam.status==="INIT"
                          ? 'stop-screen-share'
                          : 'start-screen-share'
                      )}
                    />
                  </Tooltip>
                 
                  {/* <i onClick={handleClick('profile')} className={clsx(classes.customBtn, 'show-profile')}/> */}
                </div>
              )}
            </div>
          </StreamPlayer>
        ) : null}
        <div className="stream-container">
          {stateCtx.otherStreams.map((stream, index) => (
            <StreamPlayer
              className={'stream-profile'}
              showProfile={stateCtx.profile}
              local={
                config.host
                  ? stream.getId() === localStream && localStream.getId()
                  : false
              }
              key={`${index}${stream.getId()}`}
              stream={stream}
              isPlaying={stream.isPlaying()}
              uid={stream.getId()}
              domId={`stream-player-${stream.getId()}`}
              onDoubleClick={handleDoubleClick}
              showUid={true}
            ></StreamPlayer>
          ))}
        </div>

      </div>
    </div>
  
    <div>
    
    
    </div>
   <div className={"chatbox"}>
   <ScrollableFeed  >
    {  messages.reverse().map((message)=>{ return(

  <div style={{backgroundColor:"white",width:"50%",height:"auto",borderRadius:10,padding:10,display:"flex",flexDirection:"column",margin:10}}>
  <text style={{color:"grey"}}>
     @ {message.username}
   </text>
     <text>
  {message.message}
            
     </text>
  </div>
  
    )
   }) }
      {/* <List height={600} width={400} rowHeight={100} estimatedRowSize={44.5} rowCount={messages.length}  rowRenderer={({key,index,style,parent})=>{
   const message = messages[index]
   return(
    <div style={{backgroundColor:"white",width:"50%",height:"auto",borderRadius:10,padding:10,display:"flex",flexDirection:"column",margin:10}}>
    <text style={{color:"grey"}}>
       @ {message.username}
     </text>
       <text>
    {message.message}
              
       </text>
    </div>
   )
      }}/> */}
     
     
    
     
    </ScrollableFeed>    
   </div>
   
    
   
  {/*   <div className="heartbox" >
      <div className="wrapper">
        
      <div className=" x1"></div>
      <div className=" x2"></div>
      <div className=" x3"></div>
      <div className=" x4"></div>
      <div className=" x5"></div>
      <div className=" x7"></div>
      <div className=" x8"></div>
    
      <div className=" x11"></div>
      <div className=" x12"></div>
      <div className=" x13"></div>
      <div className=" x14"></div>
      <div className=" x15"></div>
      <div className=" x17"></div>
      <div className=" x18"></div>
    
      </div>
      </div> */}
       
       <div style={{border:"0px solid green",width:"250px",display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center",paddingBottom:"30%"}}>
    {/* statuses:INIT,OPEN,RECORDING,PREVIEW,CLOSED */}
      <LiveTvIcon style={{fontSize:40}} variant='contained' color={started?'secondary':'primary'} />
      {
        recordWebcam.status==='INIT'?
        <CircularProgress color="secondary" />
        :
        <>
        <Button disabled variant='contained'>
        {recordWebcam.status==='PREVIEW'?'CLICK QUIT TO DOWNLOAD':recordWebcam.status}
        </Button>
        {
          recordWebcam.status==='PREVIEW'||recordWebcam.status==='CLOSED'?

            null

              :
              <Button size='large'  variant='contained' color={recordWebcam.status==='RECORDING'?'secondary':'primary'}  style={{width:"75%",borderRadius:"5px"}} 
              onClick={()=>{
                if(recordWebcam.status==='RECORDING'){
            recordWebcam.stop() 
                }else{
                  setStarted(true)
              recordWebcam.start(); 
                }
               
                
              }}>{recordWebcam.status==='RECORDING'?'Stop recording':'Start recording'}</Button>
        }
        
         
         </>
        

      }
      
     
    </div>
    </>
  )
}

export default React.memo(MeetingPage)
