import React, {useState, useEffect } from 'react'
import { useGlobalState, useGlobalMutation } from '../utils/container'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import IndexCard from './index/mycard'
import axios from 'axios'
import io from "socket.io-client";

import Button from '@material-ui/core/Button'

const STRAPI_ENDPOINT = 'http://18.217.254.80:1337/';
const socket = io(STRAPI_ENDPOINT);

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    minWidth: 800,
    minHeight: 600,
    boxSizing: 'content-box',
    display: 'flex',
    justifyContent: 'center'
  }
}))
const Data = [
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  },
  {
    title:"das",
    url:"fdfdfdf"
  }
]

const Upload = () => {
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()
  const [videoText,setVideoText]=useState('')
  const [youtube,setYoutube]=useState('')
  const [video,setVideo]=useState(null)
  const [allVids,setAllVids]=useState([])
  const classes = useStyles()

  useEffect(() => {
    if (stateCtx.loading === true) {
      mutationCtx.stopLoading()
    }
  }, [stateCtx.loading, mutationCtx])

  useEffect(()=>{
    socket.on('start',(start)=>{
      console.log(start)
    })
  },[])

  const YSubmit=async(e)=>{
    e.preventDefault();
    var bo={
      link:youtube
    }
    
    var body=JSON.stringify(bo)
    const response = await fetch(`http://18.217.254.80:1337/youtubes/`+1, {
      method: 'PUT',
      headers: {
           
          'Content-Type': 'application/json',
      },
     body:body
    })

  }
  const Submit=async (e)=>{

    e.preventDefault();
    var bo={
      title:videoText
    }
    
    var body=JSON.stringify(bo)
    const response = await fetch(`http://18.217.254.80:1337/videos/`, {
      method: 'POST',
      headers: {
           
          'Content-Type': 'application/json',
      },
     body:body
   })
   if(response.ok){
     console.log('Je Suis')
    const data = await response.json()
    console.log(data)
    const num = data.id
   
if(data.id > 0){
    const sena = async()=>{
    console.log("step 4")
    console.log(video)
    const formData = new FormData();
    formData.append('files', video) // optional, you need it if you want to link the image to an entry
    formData.append('ref', 'videos') 
    formData.append('refId', data.id) // optional, you need it if you want to link the image to an entry
    formData.append('field', 'video') // optional, you need it if you want to link the image to an entry
    //data.append('source', 'users-permissions');y
      console.log(formData)
     const ss = await axios.post('http://18.217.254.80:1337/upload', formData , {headers: {'Content-Type': 'multipart/form-data'}}) 
   
    }

    sena();
   }
   }
  

               
                // console.log(video,videoText)
  }

  useEffect(()=>{
    const fetchVideos=async()=>{
      await axios.get('http://18.217.254.80:1337/videos').then((response)=>{
        if(response){
            setAllVids(response.data)
            console.log(response.data)
        }
      }).catch(
        (error)=>{
            console.log(error)
        }
      )
    }
    fetchVideos()
  },[])


  return (
    <div style={{display:"flex",width:"100%",height:"100%",border:"0px solid green"}}>
        <div style={{display:"flex",flexDirection:"column",width:"50%",height:"100%",border:"0px solid red",justifyContent:"space-between",alignItems:"center",padding:"50px 10px "}}>
         <h1 style={{fontSize:'3vw'}}>
           All Uploaded Videos
         </h1>
         <div style={{height:"60%",border:"0px solid yellow",width:"80%",overflowY:"scroll",marginBottom:"100px"}}>
         {  allVids.map((vids)=>{ return(
<>
<div style={{display:"flex"}}>
<div style={{backgroundColor:"gainsboro",width:"50%",height:"auto",borderRadius:10,padding:10,display:"flex",flexDirection:"column",margin:10,paddingRight:"20%"}}>
<text style={{color:"grey"}}>
   @ {vids.title}
 </text>
   <text>
{vids.video.url}
          
   </text>
</div>
<Button 
onClick={async ()=>{
  await axios.delete('http://18.217.254.80:1337/videos/'+vids.id)
  .then((res)=>{
    if(res){
      window.location.href='/upload'
    }
  }).catch((error)=>{console.log(error)})
}}
variant='contained'
color='secondary'
style={{width:"20%",height:"auto",borderRadius:10,padding:10,display:"flex",flexDirection:"column",margin:10}}>
          Delete Video
</Button>
</div>
</>

  )
 }) }
         </div>
        </div>
        <div  style={{display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'center',width:"50%",height:"100%",borderLeft:"1px solid gainsboro",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column",width:"300px",padding:10,justifyContent:"start",height:"100px"}}>
        <span style={{display:'block', textAlign:'center',fontSize:18,fontWeight:'500',marginBottom:15,}}>Upload Youtube Live Link</span>

        <form onSubmit={YSubmit} style={{display:'flex'}} >
        <input type="text" placeholder="Enter title of video here" style={{width:300}} value={youtube} onChange={e=>setYoutube(e.target.value)}/>
          <Button 
           type='submit'
           style={{backgroundColor:'teal',color:"white"}}>
            Done
          </Button>
          
        </form>
          
          </div> 
        
        
        
        <div style={{display:"flex",flexDirection:"column",width:"300px",padding:10,justifyContent:"center",height:"300px"}}>
        <span style={{display:'block', textAlign:'center',marginBottom:15,fontSize:18,fontWeight:'500'}}>Input Title of video and select video you wish to upload</span>
        <form onSubmit={Submit} >
        <input type="text" placeholder="Enter title of video here" value={videoText} onChange={e=>setVideoText(e.target.value)} style={{width:'100%',height:30,marginBottom:10}} />
          <input type="file"  accept='videos/*' onChange={e=>{setVideo(e.target.files[0]) ;console.log(e.target.files)}} />
          <Button 
           type='submit'
           size='large'
           style={{backgroundColor:'teal',color:"white",width:'50%',marginTop:10}}>
            Done
          </Button>
          
        </form>
          
          </div> 
        
          </div>
    </div>
  )
}

export default Upload
