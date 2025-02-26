import React from 'react'
import { useState } from 'react';
const VoiceToText = ({setsearchvalue}) => {
    const [text, setText] = useState("");

   
  return (
    <div >
    
      <button onClick={startListening} disabled={isListening}>
        🎤
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        ⏹ 
      </button>
      <button onClick={() => setText("")}>🔄</button>
    </div>
  )
}

export default VoiceToText