import React, { useRef, useState } from 'react'
import axios from 'axios'
import './LandingScreen.css'
//import data from '../key.json'

const LandingScreen = () => {

    const inputRef = useRef();
    const [image, setimage] = useState();

    const url = "https://api-inference.huggingface.co/models/prompthero/openjourney-v4";


    function clickHandler() {

        const data = {
            "input": `${inputRef.current.value}`
        }

        axios.post(url, {
            inputs: JSON.stringify(data)
        }, {
            headers: {
                Autherization: data.access_token
            },
            responseType: "blob"
        })
            .then((res) => {
                const image = URL.createObjectURL(res.data);
                setimage(image)
            })
    }

    return (
        <div id='container'>
            <header>
                <h1>Image generator</h1>
            </header>
            <div id='input-container'>
                <input ref={inputRef} type='text' placeholder='Enter-text' />
                <button onClick={clickHandler}>Generate</button>
            </div>
            <div id='image-container'>
                {image && <img src={image} alt={`image of ${inputRef.current?.value}`} />}
            </div>
        </div>
    )
}

export default LandingScreen;