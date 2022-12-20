const textArea=document.querySelector("textarea");
voiceList=document.querySelector("select");
speechBtn=document.querySelector("button");
let synth=speechSynthesis;
isSpeaking=true;
voices();
function voices(){
    for(let voices of synth.getVoices()){
        let selected=voices.name === "Google US English" ? "selected" :"";
        let option=`<option value="${voices.name}" ${selected}>${voices.name} ${voices.lang}</option>`;
        voiceList.insertAdjacentHTML("beforeend",option);
    }
}
synth.addEventListener("voiceschanged",voices);
function textToSpeech(text){
    let uttername=new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            uttername.voices=voice;
        }
    }
    synth.speak(uttername);
}
speechBtn.addEventListener('click',e=>{
    e.preventDefault();
    if(textArea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textArea.value)
        }
        if(textArea.value.length > 80){
            if(isSpeaking){
                synth.resume();
                isSpeaking=false;
                speechBtn.innerText="Pause Speech";
            }
            else{
                synth.pause();
                isSpeaking=true;
                speechBtn.innerText="Resume Speech";
            }
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking=true;
                    speechBtn.innerText="Convert To Speech";
                }
            });
        }else{
            speechBtn.innerText="Convert To Speech";
        }
    }
})