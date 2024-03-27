import {useRef,useState,useEffect}  from 'react';
import './App.css';
import {uploadFile} from "./services/api.js";

function App() {

  const fileInputRef = useRef();
  const logo = "https://img.freepik.com/premium-photo/glacier-mountain-landscape-with-flowers-lake-beautiful-sunset-with-full-moon_713888-1322.jpg";
  
  const [file , setFile] = useState('');
  const [result,setResult] = useState('');

    useEffect(() => {
    const getImage = async() =>{
      if(file){
        const data = new FormData();
        data.append("name",file.name);
        data.append("file",file);
        //console.log(data);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
    }, [file])
    


    const onUploadClick = ()=>{
      fileInputRef.current.click();
    }
     console.log(file); 
  return (
    <div className="container">
    <img src={logo} alt="banner"/>
    <div className="wrapper"> 
    <h1>Simple File Sharing</h1>
    <p>Upload and share the download link</p>

    <button
    onClick={()=> onUploadClick()}
     >Upload
     </button>
    <input type='file' ref={fileInputRef} style={{display:"none"}}
      onChange={(e)=> setFile(e.target.files[0])}
    />
    <a href={result} >{result}</a>
    </div>
    
    </div>
  );
}

export default App;
