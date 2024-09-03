import React, { useEffect, useState, useContext } from "react";
import 'react-range-slider-input/dist/style.css';
import exportIcon from '../../img/exportIcon.svg'
import saveIcon from '../../img/saveIcon.svg'
import MasterAudioContext from '../../contexts/MasterAudioContext'
import ProjectContext from '../../contexts/ProjectContext'
import { saveProjectServ } from '../../services/projectsServ'
import CurrentTime from "./CurrentTime";
import useToast from "../../hooks/useToast";
import ToastContainer from "../Modals/ToastContainer";


export default function ProjectEditor ({}) {
    const { exportWavFile, playBackTracks, getTracklist, setProjectBPM, projectBPM, playbackState } = useContext(MasterAudioContext)
    const { loading, getProjectInfo } = useContext(ProjectContext)
    const [toast, showToast] = useToast()

    useEffect(() => {
      console.log('[ProjectEditor].[useEffect].loading', loading)
      console.log('[ProjectEditor].[useEffect].getProjectInfo=', getProjectInfo())
      setProjectBPM(getProjectInfo().tempo)
    }, [loading]);
      
    const ProjectBPM = () =>{
      const [inputBPMSavedValue, setInputBPMSavedValue] = useState()
      const [inputBPMValue, setInputBPMValue] = useState(projectBPM)

      const focusInput = () =>{
        document.getElementById('input-bpm').focus()
      }
      return(
        <div className="bpm-container">
          <input id='input-bpm' min={1} max={999} maxLength={3} value={inputBPMValue} 
            onChange={(e)=>{setInputBPMValue(parseInt(e.target.value))}}
            onFocus={(e)=>{setInputBPMSavedValue(parseInt(e.target.value))}}
            onBlur={(e)=>{
              if(e.target.value < 1 || e.target.value === ''){
                setInputBPMValue(inputBPMSavedValue)
                setProjectBPM(inputBPMSavedValue)
              }else{
                setProjectBPM(parseInt(e.target.value))
              }
            }}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                e.target.blur()
              }
            }}
            />
          <span 
          onClick={()=>{focusInput()}}>BPM</span>
        </div>
      )
    }

    const PlayButton = () => {
      return(
        <button className="svg-button btn-play" onClick={() =>{
          if(playbackState !== 'play'){
            playBackTracks('play')
          }
        }}>
        </button>
      )
    }

    const StopButton = () => {
      return(
        <button className="svg-button btn-stop" onClick={() => playBackTracks('stop')}>
        </button>
      )
    }

    const PauseButton = () => {
      return(
        <button className="svg-button btn-pause" onClick={() => playBackTracks('pause')}>
        </button>
      )
    }

    const ExportProject = () =>{
      return(
        <button className="btn-svg-container" onClick={async () => {
          const resultExport = await exportWavFile()
          console.log('resultExport=',resultExport)
          if(resultExport === 'success'){
            showToast('¡Proyecto descargado!', 'success')
          }else{
            showToast('No se pudo exportar', 'error')
          }  
          }}>
          <img src={exportIcon} alt="icono de exportar archivo" width="100%" />
        </button>
      )
    }

    const saveProjectFunc = async () => {
      let trackList = getTracklist()
      let projectInfo = getProjectInfo()
      console.log('[ProjectEditor.js].saveProjectFunc.trackList', trackList)
      var channelListReq = new Array;
      trackList.map(track => {
          var channelItem = {
              sampleId: track.id,
              channelConfig: track.channelConfig
          }
          channelListReq.push(channelItem)
      })
      const req = {
          "projectId": projectInfo.id,
          "userId": projectInfo.userId,
          "projectName": projectInfo.projectName,
          "totalDuration": 0,
          "tempo": projectBPM,
          "channelList": channelListReq
      }
      console.log('[ProjectContext.js].req=', req)
      const saveProjectResult = await saveProjectServ(req)
      console.log('[ProjectContext.js].saveProjectResult=', saveProjectResult)
      if(saveProjectResult === 'ERROR') return showToast('No se pudo guardar el proyecto', 'error')
      showToast('¡Proyecto guardado!', 'success')
  }
  
    const SaveProject = () =>{
      return(
        <button className="btn-svg-container" onClick={() => saveProjectFunc()}>
          <img src={saveIcon} alt="icono de guardar proyecto" width="100%"/>
        </button>
      )
    }

    return (
        <>
          <ToastContainer toasts={toast}/>
            <div className='project-controls' >
              <div className='project-info'>
                <span>{getProjectInfo().projectName}</span>
                <div className='project-info-btns'>
                  <ExportProject />
                  <SaveProject />
                </div>
              </div>
              <div className="project-controls-btn-container">
                <PlayButton />
                <PauseButton />
                <StopButton />
              </div>
              <CurrentTime playing={playbackState}/>
              <ProjectBPM />
            </div>
        </>
        )
}
