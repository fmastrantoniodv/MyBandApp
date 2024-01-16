import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../App.css'

const arrayFavouritesMock = [
    {
        id: "myBandAppCONGA1",
        displayName: "Conga"
    },
    {
        id: "myBandAppGUITAR",
        displayName: "Guitarra"
    },
    {
        id: "myBandAppHIHAT",
        displayName: "Hi Hat"
    },
    {
        id: "myBandAppKICK",
        displayName: "Kick"
    },
    {
        id: "myBandAppRYTHMBASS",
        displayName: "Bass Rythm"
    },
    {
        id: "myBandAppSHAKECONGA",
        displayName: "Shaker"
    },
    {
        id: "myBandAppSUBASSSHOT",
        displayName: "Bass SUB"
    },
    {
        id: "myBandAppTOMSLOWS",
        displayName: "Toms"
    }
]

const useFavouritesSamples = () => {
    const [favouritesList, setFavouritesList] = useState(arrayFavouritesMock)
    
    const getFavouritesSamplesList = () => {
        const favouritesSamplesList = [
            {
                id: "myBandAppCONGA1",
                displayName: "Conga"
            },
            {
                id: "myBandAppGUITAR",
                displayName: "Guitarra"
            },
            {
                id: "myBandAppHIHAT",
                displayName: "Hi Hat"
            },
            {
                id: "myBandAppKICK",
                displayName: "Kick"
            },
            {
                id: "myBandAppRYTHMBASS",
                displayName: "Bass Rythm"
            },
            {
                id: "myBandAppSHAKECONGA",
                displayName: "Shaker"
            },
            {
                id: "myBandAppSUBASSSHOT",
                displayName: "Bass SUB"
            },
            {
                id: "myBandAppTOMSLOWS",
                displayName: "Toms"
            }
        ]
        return favouritesSamplesList
    }

    useEffect(() => {
        console.log(`[useFavouritesSamples].[useEffect]`)
        console.log(favouritesList)
    }, []);
    
    return favouritesList
    
  }

  export default useFavouritesSamples;